/**
 * SONIQ — Streaming API endpoint (SSE)
 * POST /api/stream → streams Anthropic response as Server-Sent Events
 * Each event: data: {"text":"..."}\n\n
 * Final event: data: {"done":true}\n\n
 */

const anonUsage = new Map();
function checkLimit(ip) {
  const now = Date.now();
  const e = anonUsage.get(ip);
  if (!e || now - e.reset > 3600000) { anonUsage.set(ip, {count: 1, reset: now}); return true; }
  if (e.count >= 10) return false;
  e.count++; return true;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return res.status(500).json({error: 'ANTHROPIC_API_KEY not set in Vercel Environment Variables'});
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkLimit(ip)) {
    return res.status(429).json({error: 'Hourly limit reached. Try again soon.'});
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).end(); }

  const {messages, system, max_tokens = 2048} = body || {};
  if (!messages?.length) return res.status(400).end();

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const payload = {
    model: 'claude-sonnet-4-20250514',
    max_tokens,
    stream: true,
    messages
  };
  if (system) payload.system = system;

  let upstreamRes;
  try {
    upstreamRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    res.write(`data: ${JSON.stringify({error: 'Network error: ' + err.message})}\n\n`);
    return res.end();
  }

  if (!upstreamRes.ok) {
    const t = await upstreamRes.text();
    res.write(`data: ${JSON.stringify({error: 'Anthropic error ' + upstreamRes.status + ': ' + t.slice(0, 200)})}\n\n`);
    return res.end();
  }

  const reader = upstreamRes.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, {stream: true});
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') continue;
        try {
          const event = JSON.parse(raw);
          if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
            res.write(`data: ${JSON.stringify({text: event.delta.text})}\n\n`);
          } else if (event.type === 'message_stop') {
            res.write(`data: ${JSON.stringify({done: true})}\n\n`);
          }
        } catch {}
      }
    }
  } catch (err) {
    res.write(`data: ${JSON.stringify({error: 'Stream error: ' + err.message})}\n\n`);
  }

  res.end();
};
