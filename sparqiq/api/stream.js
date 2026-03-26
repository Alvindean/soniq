/**
 * SparqIQ — Streaming API (SSE)
 * Primary: ANTHROPIC_API_KEY → fallback: OPENROUTER_API_KEY
 * POST /api/stream → Server-Sent Events
 * Text event: data: {"text":"..."}\n\n
 * Done event: data: {"done":true}\n\n
 * Error event: data: {"error":"..."}\n\n
 */

const anonUsage = new Map();
function checkLimit(ip) {
  const now = Date.now();
  const e = anonUsage.get(ip);
  if (!e || now - e.reset > 3600000) { anonUsage.set(ip, { count: 1, reset: now }); return true; }
  if (e.count >= 20) return false;
  e.count++; return true;
}

async function pipeSSE(r, res, extractText) {
  const reader = r.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if (raw === '[DONE]') continue;
      try {
        const ev = JSON.parse(raw);
        const text = extractText(ev);
        if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
      } catch {}
    }
  }
}

async function streamAnthropic(apiKey, messages, system, max_tokens, res) {
  const payload = { model: 'claude-sonnet-4-20250514', max_tokens, stream: true, messages };
  if (system) payload.system = system;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error('Anthropic ' + r.status + ': ' + t.slice(0, 200));
  }
  await pipeSSE(r, res, ev => ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta' ? ev.delta.text : null);
}

async function streamOpenRouter(apiKey, messages, system, max_tokens, res) {
  const orMsgs = system ? [{ role: 'system', content: system }, ...messages] : messages;
  let r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://sparqiq.com',
      'X-Title': 'SparqIQ'
    },
    body: JSON.stringify({ model: 'anthropic/claude-sonnet-4-5', max_tokens, stream: true, messages: orMsgs })
  });
  if (r.status === 402) {
    const t = await r.text();
    const match = t.match(/can only afford (\d+)/);
    const affordable = match ? parseInt(match[1]) - 50 : 0;
    if (affordable >= 300) {
      r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
          'HTTP-Referer': 'https://sparqiq.com',
          'X-Title': 'SparqIQ'
        },
        body: JSON.stringify({ model: 'anthropic/claude-sonnet-4-5', max_tokens: affordable, stream: true, messages: orMsgs })
      });
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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (!anthropicKey && !openrouterKey) {
    return res.status(500).json({ error: 'No API key configured.' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkLimit(ip)) return res.status(429).json({ error: 'Hourly limit reached.' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).end(); }

  const { messages, system, max_tokens = 3000 } = body || {};
  if (!messages?.length) return res.status(400).end();

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const errors = [];

  if (anthropicKey) {
    try {
      await streamAnthropic(anthropicKey, messages, system, max_tokens, res);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      return res.end();
    } catch (err) {
      console.error('Anthropic stream failed:', err.message);
      errors.push('Anthropic: ' + err.message);
    }
  }

  if (openrouterKey) {
    try {
      await streamOpenRouter(openrouterKey, messages, system, max_tokens, res);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      return res.end();
    } catch (err) {
      if (err.message === 'CREDITS_LOW') {
        res.write(`data: ${JSON.stringify({ error: 'OpenRouter credit balance too low.' })}\n\n`);
        return res.end();
      }
      console.error('OpenRouter stream failed:', err.message);
      errors.push('OpenRouter: ' + err.message);
    }
  }

  res.write(`data: ${JSON.stringify({ error: 'All providers failed. ' + errors.join(' | ') })}\n\n`);
  res.end();
};
