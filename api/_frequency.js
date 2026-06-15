/**
 * SONIQ — Frequency Mode endpoint (delegated module, NOT its own function)
 *
 * Hosted via api/track.js to stay under Vercel's 12-function Hobby limit:
 * track.js delegates here when the request carries header `X-Soniq-Mod: freq`.
 * The browser calls /api/track (GET for catalog, POST to compose) with that
 * header. Underscore-prefixed so Vercel does NOT deploy it as a standalone fn.
 *
 *   GET  (X-Soniq-Mod: freq)
 *     → { chants: [client-safe chant projections], frequencies: FREQUENCIES }
 *       The per-chant `sunoPrompt` (server-only IP) is OMITTED from the GET list.
 *
 *   POST (X-Soniq-Mod: freq)   body: { chantStyleId, frequencyId, intent? }
 *     → { title, chantLyrics, sunoPrompt, frequency:{id,label,carrierHz,beatHz,mode,target} }
 *       sunoPrompt = chant.sunoPrompt + ambient/healing tail derived from the frequency.
 *       chantLyrics defaults to the chant's loopable seed — DEFAULT PATH MAKES NO LLM CALL.
 *       The optional LLM craft path is GATED OFF by default: it runs only when
 *       `intent` is non-empty AND env FREQ_LLM_ENABLED==='1' AND a key exists
 *       (try/catch, always falls back to the seed). Default production = ZERO paid calls.
 *
 * Consistent with the other api/*.js handlers: CommonJS,
 *   module.exports = async function handler(req, res).
 */

const { FREQUENCIES } = require('./_frequency_catalog');
const { CHANTS }      = require('./_frequency_chants');

// ── client-safe projections ──────────────────────────────────────────────────
// Strip the server-only `sunoPrompt` and `chantSeed` from the chant list before
// it ever reaches the browser. The browser only needs enough to render the pad.
function clientSafeChant(c) {
  return {
    id: c.id,
    name: c.name,
    tradition: c.tradition,
    emoji: c.emoji,
    color: c.color,
    vibe: c.vibe,
    clientDesc: c.clientDesc,
    pairsWith: Array.isArray(c.pairsWith) ? c.pairsWith.slice() : []
  };
}

// Slim frequency projection echoed back on POST (matches the contract exactly).
function frequencyEcho(f) {
  return {
    id: f.id,
    label: f.label,
    carrierHz: f.carrierHz,
    beatHz: f.beatHz,
    mode: f.mode,
    target: f.target
  };
}

// ── prompt composition ───────────────────────────────────────────────────────
// Build the ambient/healing tail from the chosen frequency and append it to the
// chant's server-only Suno style string. This is the only place sunoPrompt is
// composed for the client.
function buildSunoPrompt(chant, freq) {
  const hz = Number(freq.carrierHz) || 0;
  const tail =
    'sustained drone pad, no percussion, slow, meditative, ' +
    hz + ' Hz feel';
  // chant.sunoPrompt is wrapped in [ ... ]; keep it intact, comma-join the tail.
  return chant.sunoPrompt + ', ' + tail;
}

// Default (zero-cost) lyric block: structure the loopable seed into a short,
// repeating chant the user can paste straight into Suno. No model call.
function defaultChantLyrics(chant) {
  const seed = (chant.chantSeed || '').trim();
  if (!seed) return '';
  // A short loopable block: a couple of repetitions inside a [Chant] section so
  // it reads as a render-ready loop, not a one-off line.
  return [
    '[Chant - loop]',
    seed,
    seed,
    seed,
    '[Repeat softly, fading]'
  ].join('\n');
}

function buildTitle(chant, freq) {
  return chant.name + ' · ' + freq.label;
}

// ── optional LLM path (only when intent provided AND a key exists) ────────────
// Mirrors api/generate.js: Anthropic primary, OpenRouter fallback. Wrapped by
// the caller in try/catch — any failure falls back to the seed.
function anthropicKey() {
  return process.env.ANTHROPIC_API_KEY || process.env.Claude || process.env.CLAUDE || '';
}
function openrouterKey() {
  return process.env.OPENROUTER_API_KEY || '';
}
function hasLLMKey() {
  return !!(anthropicKey() || openrouterKey());
}

function buildCraftPrompt(chant, freq, intent) {
  return [
    'You write short, loopable chant lyrics for a meditation/ambient track.',
    'Tradition / style: ' + chant.tradition + ' (' + chant.name + ').',
    'Seed mantra to honor and stay close to: "' + chant.chantSeed + '".',
    'Frequency backdrop: ' + freq.label + ' (' + freq.target + ').',
    'User intent for this session: "' + intent + '".',
    '',
    'Write a SHORT loopable chant (4-10 short lines max) that keeps the sound and',
    'spirit of the seed mantra, is easy to repeat, and gently reflects the intent.',
    'No verses, no rhyme scheme, no explanation. Output ONLY the chant lines.',
    'No medical claims of any kind.'
  ].join('\n');
}

async function callAnthropicChant(apiKey, prompt) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error('Anthropic error ' + r.status + ': ' + t.slice(0, 160));
  }
  const d = await r.json();
  return (d.content || []).map(c => c.text || '').join('').trim();
}

async function callOpenRouterChant(apiKey, prompt) {
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://soniq.vercel.app',
      'X-Title': 'SONIQ'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4-5',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error('OpenRouter error ' + r.status + ': ' + t.slice(0, 160));
  }
  const d = await r.json();
  return (d.choices?.[0]?.message?.content || '').trim();
}

async function craftCustomChant(chant, freq, intent) {
  const prompt = buildCraftPrompt(chant, freq, intent);
  const ak = anthropicKey();
  if (ak) return callAnthropicChant(ak, prompt);
  const ok = openrouterKey();
  if (ok) return callOpenRouterChant(ok, prompt);
  // No key — caller should never reach here, but be safe.
  throw new Error('NO_LLM_KEY');
}

// ── body parsing (tolerant of string/object body across runtimes) ─────────────
function parseBody(req) {
  let b = req.body;
  if (typeof b === 'string') {
    try { b = JSON.parse(b || '{}'); } catch { b = null; }
  }
  return b && typeof b === 'object' ? b : {};
}

// ── handler ───────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET: catalog for the UI ────────────────────────────────────────────────
  if (req.method === 'GET') {
    return res.status(200).json({
      chants: CHANTS.map(clientSafeChant),   // sunoPrompt intentionally omitted
      frequencies: FREQUENCIES
    });
  }

  // ── POST: compose a render-ready chant + Suno prompt ───────────────────────
  if (req.method === 'POST') {
    const body = parseBody(req);
    const chantStyleId = typeof body.chantStyleId === 'string' ? body.chantStyleId.trim() : '';
    const frequencyId  = typeof body.frequencyId === 'string' ? body.frequencyId.trim() : '';
    const intentRaw    = typeof body.intent === 'string' ? body.intent.trim() : '';

    if (!chantStyleId || !frequencyId) {
      return res.status(400).json({ error: 'chantStyleId and frequencyId are required.' });
    }

    const chant = CHANTS.find(c => c.id === chantStyleId);
    if (!chant) {
      return res.status(404).json({ error: 'Unknown chantStyleId: ' + chantStyleId });
    }
    const freq = FREQUENCIES.find(f => f.id === frequencyId);
    if (!freq) {
      return res.status(404).json({ error: 'Unknown frequencyId: ' + frequencyId });
    }

    // Default path — ZERO paid calls.
    let chantLyrics = defaultChantLyrics(chant);

    // Paid-call guard: the optional LLM craft path is DISABLED unless explicitly
    // enabled via env (FREQ_LLM_ENABLED=1). With it off, no request — authenticated
    // or not — can trigger model spend. Standing rule: never burn credits.
    // Never blocks the response: any failure (or missing key) falls back to the seed.
    if (intentRaw && process.env.FREQ_LLM_ENABLED === '1' && hasLLMKey()) {
      try {
        const crafted = await craftCustomChant(chant, freq, intentRaw);
        if (crafted && crafted.length > 0) {
          chantLyrics = ['[Chant - loop]', crafted, '[Repeat softly, fading]'].join('\n');
        }
      } catch (_err) {
        // fall back to the seed-based default — already set above
      }
    }

    return res.status(200).json({
      title: buildTitle(chant, freq),
      chantLyrics,
      sunoPrompt: buildSunoPrompt(chant, freq),
      frequency: frequencyEcho(freq)
    });
  }

  // ── anything else ──────────────────────────────────────────────────────────
  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return res.status(405).json({ error: 'Method not allowed' });
};
