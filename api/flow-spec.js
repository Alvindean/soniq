/**
 * SONIQ — Flow: concept → song spec.
 * Given a free-form concept, returns a FlowSpec JSON
 * (genre, optional subGenre, mood, tempo, key, vocal,
 * instrumentation, mood arc, structure, title, sunoPrompt).
 *
 * Mirrors /api/generate.js for CORS, auth and AI fallback.
 */

const { createClient } = require('@supabase/supabase-js');

function getSupabaseClient(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  });
}

async function callAnthropic(apiKey, messages, system, max_tokens) {
  const payload = { model: 'claude-sonnet-4-20250514', max_tokens, messages };
  if (system) payload.system = system;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const d = await r.json();
  return d.content?.map(c => c.text || '').join('') || '';
}

async function callOpenRouter(apiKey, messages, system, max_tokens) {
  const orMsgs = system ? [{ role: 'system', content: system }, ...messages] : messages;
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://mysoniq.com',
      'X-Title': 'SONIQ',
    },
    body: JSON.stringify({ model: 'anthropic/claude-sonnet-4-5', max_tokens, messages: orMsgs }),
  });
  if (!r.ok) throw new Error('OpenRouter ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const d = await r.json();
  return d.choices?.[0]?.message?.content || '';
}

async function callAI(messages, system, max_tokens) {
  const ak = process.env.ANTHROPIC_API_KEY;
  const ok = process.env.OPENROUTER_API_KEY;
  if (!ak && !ok) throw new Error('No AI provider configured');
  try {
    if (ak) return await callAnthropic(ak, messages, system, max_tokens);
    return await callOpenRouter(ok, messages, system, max_tokens);
  } catch (e) {
    if (ok && ak) return await callOpenRouter(ok, messages, system, max_tokens);
    throw e;
  }
}

const SPEC_SYSTEM = `You are a senior music producer and A&R. Given a songwriter's concept, return the optimal song spec as JSON.

Think across the full landscape of popular music — not just the obvious dozen. Comfort with fusion genres (dream-pop, neo-soul, indie folk, dark americana, ambient r&b, drill, bedroom pop, lo-fi hip-hop, post-punk, shoegaze, synth-pop, future-soul, etc.).

Rules:
- Match the concept's emotional weight (a funeral-bright concept is not "pop, 128 bpm").
- Tempo fits the vocal phrasing the concept implies (ballads 60-84, mid 84-110, drive 110-140, dance 120-180).
- Vocal archetype must be specific (gender, range, texture). 3-6 words.
- Instrumentation: 3-5 distinct items.
- Mood arc shows movement OR explicitly says it stays in one state.
- Title: evocative, 1-6 words. No subtitles. No quotes.
- sunoPrompt: comma-separated style descriptors only — NO lyrics. 8-14 tokens.
- If fusion: set fusion=true and fill subGenre. Else fusion=false, subGenre=null.

Return ONLY valid JSON in this shape:
{"title":"...","genre":"...","subGenre":null,"fusion":false,"tempo":72,"key":"A minor","vocal":"...","instrumentation":["...","...","..."],"mood":"...","moodArc":{"start":"...","end":"..."},"structure":"V1 → C → V2 → C → B → C","sunoPrompt":"..."}

No prose. No markdown fences.`;

module.exports = async function handler(req, res) {
  // CORS — same allowlist as /api/generate
  const origin = req.headers.origin || '';
  const allowed = ['https://www.mysoniq.com', 'https://mysoniq.com', 'http://localhost:3000', 'http://localhost:5000'];
  const cors = allowed.includes(origin) ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Admin bypass
  const { createHmac } = require('crypto');
  const adminTokenHeader = req.headers['x-admin-token'] || '';
  let isAdmin = false;
  if (adminTokenHeader) {
    const secret = process.env.ADMIN_TOKEN_SECRET;
    const adminPw = process.env.ADMIN_PASSWORD || '';
    if (secret && secret.length >= 16 && adminPw) {
      const expected = createHmac('sha256', secret).update(adminPw).digest('hex');
      isAdmin = adminTokenHeader === expected;
    }
  }

  // Auth — Supabase JWT
  if (!isAdmin) {
    const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ error: 'auth_required', message: 'Sign in to use Flow' });
    const supabase = getSupabaseClient(token);
    if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return res.status(401).json({ error: 'auth_required' });
  }

  // Body
  let concept = '';
  try {
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    concept = (body.concept || '').trim();
  } catch (e) {
    return res.status(400).json({ error: 'invalid JSON body' });
  }
  if (!concept) return res.status(400).json({ error: 'concept is required' });
  if (concept.length > 600) return res.status(400).json({ error: 'concept must be 600 chars or fewer' });

  // Generate spec
  try {
    const text = await callAI(
      [{ role: 'user', content: 'CONCEPT:\n' + concept + '\n\nReturn the FlowSpec JSON now.' }],
      SPEC_SYSTEM,
      800,
    );
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    let spec;
    try {
      spec = JSON.parse(cleaned);
    } catch (e) {
      return res.status(502).json({ error: 'Model returned invalid JSON', detail: cleaned.slice(0, 200) });
    }
    // Shape check
    if (
      !spec.title || !spec.genre || !spec.tempo || !spec.key || !spec.vocal ||
      !Array.isArray(spec.instrumentation) || spec.instrumentation.length === 0 ||
      !spec.moodArc || !spec.moodArc.start || !spec.moodArc.end ||
      !spec.structure || !spec.sunoPrompt
    ) {
      return res.status(502).json({ error: 'Spec was incomplete — try a more specific concept' });
    }
    return res.status(200).json({ spec });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Spec generation failed' });
  }
};
