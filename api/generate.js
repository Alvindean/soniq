/**
 * SONIQ — Universal API Proxy with automatic fallback
 * Primary: ANTHROPIC_API_KEY → fallback: OPENROUTER_API_KEY (and vice versa)
 * POST /api/generate
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
  const origin = req.headers.origin || '';
  const allowed = ['https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://soniq.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({error:'Invalid JSON'}); }

  // Treat 'server-side' sentinel as no user key
  const userKey = (body?.userKey && body.userKey !== 'server-side') ? body.userKey : null;

  if (userKey) {
    // User-supplied key: skip rate limit, use their key directly
    const { messages, system } = body;
    const max_tokens = Math.min(Math.max(parseInt(body.max_tokens) || 2048, 256), 4096);
    if (!messages?.length) return res.status(400).json({error:'messages required'});
    try {
      const text = await callAnthropic(userKey, messages, system, max_tokens);
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      console.error('User-key Anthropic error:', err.message);
      return res.status(502).json({error: 'API key rejected — check it is valid at console.anthropic.com'});
    }
  }

  const ip = req.headers['x-real-ip'] ||
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket?.remoteAddress || 'unknown';
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return res.status(429).json({error: `Rate limit exceeded. Try again in ${rl.minutesLeft} minutes.`});

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (!anthropicKey && !openrouterKey) {
    return res.status(500).json({
      error: 'No API key configured. Add ANTHROPIC_API_KEY or OPENROUTER_API_KEY in Vercel → Settings → Environment Variables, then Redeploy.'
    });
  }

  let { messages, system } = body || {};
  const max_tokens = Math.min(Math.max(parseInt(body?.max_tokens) || 2048, 256), 4096);

  if (body?.variant) {
    const { buildVariantPrompt } = require('./brain');
    const song = {
      title: body.title || 'Untitled',
      lyrics: body.lyrics || '',
      genre: body.genre || '',
      genre2: body.genre2 || '',
      topic: body.topic || ''
    };
    try {
      const variantPrompt = buildVariantPrompt(body.variant, song);
      messages = [{ role: 'user', content: variantPrompt }];
      system = 'You are Soniq, an expert music producer and songwriter. Follow the instructions exactly and output only the requested content.';
    } catch(e) {
      return res.status(400).json({ error: 'Unknown variant: ' + body.variant });
    }
  }

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

  const firstError = errors[0] || '';
  let errMsg;
  if (firstError.includes('401') || firstError.includes('invalid') || firstError.includes('authentication')) {
    errMsg = 'API key rejected. Go to Vercel → Settings → Environment Variables, check ANTHROPIC_API_KEY, then Redeploy.';
  } else if (firstError.includes('429') || firstError.includes('rate')) {
    errMsg = 'Rate limit hit. Wait a moment and try again.';
  } else {
    errMsg = 'Song generation failed. ' + (errors.length ? errors.join(' | ') : 'Check Vercel function logs.');
  }
  return res.status(502).json({error: errMsg});
};
