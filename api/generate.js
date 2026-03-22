/**
 * SONIQ — Universal API Proxy with automatic fallback
 * Primary: ANTHROPIC_API_KEY → fallback: OPENROUTER_API_KEY (and vice versa)
 * POST /api/generate
 */

const anonUsage = new Map();
function checkLimit(ip) {
  const now = Date.now();
  const e = anonUsage.get(ip);
  if (!e || now - e.reset > 3600000) { anonUsage.set(ip,{count:1,reset:now}); return true; }
  if (e.count >= 10) return false;
  e.count++; return true;
}

async function callAnthropic(apiKey, messages, system, max_tokens) {
  const payload = {model:'claude-sonnet-4-20250514', max_tokens, messages};
  if (system) payload.system = system;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01'},
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error('Anthropic error ' + r.status + ': ' + t.slice(0,200));
  }
  const d = await r.json();
  return d.content?.map(c=>c.text||'').join('') || '';
}

async function orRequest(apiKey, orMsgs, max_tokens) {
  return fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://soniq.vercel.app',
      'X-Title': 'SONIQ'
    },
    body: JSON.stringify({model:'anthropic/claude-sonnet-4-5', max_tokens, messages:orMsgs})
  });
}

async function callOpenRouter(apiKey, messages, system, max_tokens) {
  const orMsgs = system ? [{role:'system',content:system}, ...messages] : messages;
  let r = await orRequest(apiKey, orMsgs, max_tokens);

  // On 402, extract the affordable token count and retry once
  if (r.status === 402) {
    const t = await r.text();
    const match = t.match(/can only afford (\d+)/);
    const affordable = match ? parseInt(match[1]) - 50 : 0;
    if (affordable >= 300) {
      r = await orRequest(apiKey, orMsgs, affordable);
    } else {
      throw new Error('CREDITS_LOW');
    }
  }

  if (!r.ok) {
    const t = await r.text();
    throw new Error('OpenRouter error ' + r.status + ': ' + t.slice(0,200));
  }
  const d = await r.json();
  return d.choices?.[0]?.message?.content || '';
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (!anthropicKey && !openrouterKey) {
    return res.status(500).json({
      error: 'No API key configured. Add ANTHROPIC_API_KEY or OPENROUTER_API_KEY in Vercel → Settings → Environment Variables, then Redeploy.'
    });
  }

  const ip = (req.headers['x-forwarded-for']||'').split(',')[0].trim()||'unknown';
  if (!checkLimit(ip)) return res.status(429).json({error:'Hourly limit reached. Try again soon.'});

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({error:'Invalid JSON'}); }

  const { messages, system, max_tokens = 2048 } = body || {};
  if (!messages?.length) return res.status(400).json({error:'messages required'});

  const errors = [];

  // Try Anthropic first, then OpenRouter as fallback
  if (anthropicKey) {
    try {
      const text = await callAnthropic(anthropicKey, messages, system, max_tokens);
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      console.error('Anthropic failed, trying fallback:', err.message);
      errors.push('Anthropic: ' + err.message);
    }
  }

  if (openrouterKey) {
    try {
      const text = await callOpenRouter(openrouterKey, messages, system, max_tokens);
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      if (err.message === 'CREDITS_LOW') {
        return res.status(402).json({error: 'Your OpenRouter credit balance is too low. Add credits at openrouter.ai/settings/credits to continue.'});
      }
      console.error('OpenRouter failed:', err.message);
      errors.push('OpenRouter: ' + err.message);
    }
  }

  return res.status(502).json({error: 'All API providers failed. ' + errors.join(' | ')});
};
