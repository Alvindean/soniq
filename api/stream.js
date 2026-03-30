/**
 * SONIQ — Streaming API endpoint (SSE)
 * Tries ANTHROPIC_API_KEY first, falls back to OPENROUTER_API_KEY
 * POST /api/stream → streams response as Server-Sent Events
 * Each text event: data: {"text":"..."}\n\n
 * Final event:     data: {"done":true}\n\n
 * Error event:     data: {"error":"..."}\n\n
 */

const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    // Delete stale entry, create fresh one
    rateLimitMap.delete(ip);
    const fresh = { count: 1, resetAt: now + RATE_WINDOW };
    rateLimitMap.set(ip, fresh);
    return { allowed: true, minutesLeft: Math.ceil(RATE_WINDOW / 60000), count: 1 };
  }
  entry.count++;
  const remaining = Math.ceil((entry.resetAt - now) / 60000);
  return { allowed: entry.count <= RATE_LIMIT, minutesLeft: remaining, count: entry.count };
}

async function streamAnthropic(apiKey, messages, system, max_tokens, res) {
  const payload = {model: 'claude-sonnet-4-20250514', max_tokens, stream: true, messages};
  if (system) payload.system = system;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01'},
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error('Anthropic ' + r.status + ': ' + t.slice(0, 200));
  }
  await pipeSSE(r, res, ev => ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta' ? ev.delta.text : null);
}

async function orFetch(apiKey, orMsgs, max_tokens) {
  return fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://soniq.vercel.app',
      'X-Title': 'SONIQ'
    },
    body: JSON.stringify({model: 'anthropic/claude-sonnet-4-5', max_tokens, stream: true, messages: orMsgs})
  });
}

async function streamOpenRouter(apiKey, messages, system, max_tokens, res) {
  const orMsgs = system ? [{role: 'system', content: system}, ...messages] : messages;
  let r = await orFetch(apiKey, orMsgs, max_tokens);

  // On 402, extract affordable token count and retry once
  if (r.status === 402) {
    const t = await r.text();
    const match = t.match(/can only afford (\d+)/);
    const affordable = match ? parseInt(match[1]) - 50 : 0;
    if (affordable >= 300) {
      r = await orFetch(apiKey, orMsgs, affordable);
    } else {
      throw new Error('CREDITS_LOW');
    }
  }

  if (!r.ok) {
    const t = await r.text();
    throw new Error('OpenRouter ' + r.status + ': ' + t.slice(0, 200));
  }
  await pipeSSE(r, res, ev => ev.choices?.[0]?.delta?.content || null);
}

async function pipeSSE(r, res, extractText) {
  const reader = r.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let cancelled = false;

  // Cancel upstream reader if client disconnects
  res.on('close', () => { cancelled = true; reader.cancel().catch(() => {}); });

  while (true) {
    if (cancelled) break;
    const {done, value} = await reader.read();
    if (done) break;
    buf += decoder.decode(value, {stream: true});
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if (raw === '[DONE]') continue;
      try {
        const ev = JSON.parse(raw);
        const text = extractText(ev);
        if (text) res.write(`data: ${JSON.stringify({text})}\n\n`);
      } catch {}
    }
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).end(); }

  // ── Server-side prompt building (protects IP) ──
  let messages, system, max_tokens;
  if (body.action === 'generate' || body.action === 'lucky') {
    try {
      const brain = require('./brain');
      let built;
      if (body.action === 'generate') {
        const p = body.params || {};
        if (p.genre === 'hiphop' && p.rapLabActive) {
          built = brain.buildRapLabPrompt(p);
        } else {
          built = brain.buildSongPrompt(p);
        }
      } else {
        built = brain.buildLuckyPrompt(body.params || {});
      }
      messages = [{role: 'user', content: built.prompt}];
      system = built.system;
      max_tokens = 4096;
      if (built.meta) {
        res.setHeader('X-Soniq-Meta', Buffer.from(JSON.stringify(built.meta)).toString('base64'));
      }
    } catch (err) {
      console.error('Brain prompt build failed:', err.message);
      return res.status(500).json({ error: 'Prompt build error: ' + err.message });
    }
  } else {
    // Legacy: client sends raw messages (for visual prompts, titles, etc.)
    messages = body.messages;
    system = body.system;
    // Cap max_tokens — never let a client request blow through credit limits
    max_tokens = Math.min(Math.max(parseInt(body.max_tokens) || 2048, 256), 4096);
  }

  // Treat 'server-side' sentinel (set by client on Vercel) as no user key
  const userKey = (body?.userKey && body.userKey !== 'server-side') ? body.userKey : null;

  if (!userKey) {
    // Use x-real-ip (set by Vercel, can't be spoofed) then fall back to last
    // entry of x-forwarded-for (the trusted proxy's addition), never the first
    // entry which a client can freely set.
    const ip = req.headers['x-real-ip'] ||
      (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
      req.socket?.remoteAddress || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) return res.status(429).json({error: `Rate limit reached — ${rl.minutesLeft} min left. Add your own API key in Settings to bypass.`});
  }

  const anthropicKey = userKey || process.env.ANTHROPIC_API_KEY;
  const openrouterKey = userKey ? null : process.env.OPENROUTER_API_KEY;

  if (!anthropicKey && !openrouterKey) {
    return res.status(500).json({
      error: 'No API key configured. Add ANTHROPIC_API_KEY or OPENROUTER_API_KEY in Vercel → Settings → Environment Variables, then Redeploy.'
    });
  }

  if (!messages?.length) return res.status(400).end();

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const errors = [];

  if (anthropicKey) {
    try {
      await streamAnthropic(anthropicKey, messages, system, max_tokens, res);
      res.write(`data: ${JSON.stringify({done: true})}\n\n`);
      return res.end();
    } catch (err) {
      console.error('Anthropic stream failed:', err.message);
      // Surface auth errors immediately — no point trying OpenRouter if key is wrong
      if (err.message.includes('401') || err.message.includes('invalid') || err.message.includes('authentication')) {
        const keyHint = body?.userKey ? 'Your API key' : 'ANTHROPIC_API_KEY in Vercel env vars';
        res.write(`data: ${JSON.stringify({error: `API key rejected — check ${keyHint} is correct and active.`})}\n\n`);
        return res.end();
      }
      errors.push('Anthropic: ' + err.message);
    }
  }

  if (openrouterKey) {
    try {
      await streamOpenRouter(openrouterKey, messages, system, max_tokens, res);
      res.write(`data: ${JSON.stringify({done: true})}\n\n`);
      return res.end();
    } catch (err) {
      if (err.message === 'CREDITS_LOW') {
        res.write(`data: ${JSON.stringify({error: 'OpenRouter credit balance too low — add credits at openrouter.ai/settings/credits.'})}\n\n`);
        return res.end();
      }
      console.error('OpenRouter stream failed:', err.message);
      errors.push('OpenRouter: ' + err.message);
    }
  }

  // Both failed — surface actionable error
  const firstError = errors[0] || '';
  let clientError;
  if (firstError.includes('401') || firstError.includes('invalid') || firstError.includes('authentication')) {
    clientError = 'API key rejected. Go to Vercel → Settings → Environment Variables and check ANTHROPIC_API_KEY, then Redeploy.';
  } else if (firstError.includes('429') || firstError.includes('rate')) {
    clientError = 'Anthropic rate limit hit. Wait a moment and try again, or add your own API key in Settings.';
  } else if (firstError.includes('529') || firstError.includes('overloaded')) {
    clientError = 'Anthropic is overloaded right now. Try again in 30 seconds.';
  } else {
    clientError = 'Song generation failed. ' + (errors.length ? errors.join(' | ') : 'Check Vercel function logs for details.');
  }
  res.write(`data: ${JSON.stringify({error: clientError})}\n\n`);
  res.end();
};
