/**
 * SONIQ — Universal API Proxy with automatic fallback
 * Primary: ANTHROPIC_API_KEY → fallback: OPENROUTER_API_KEY (and vice versa)
 * POST /api/generate
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const { createClient } = require('@supabase/supabase-js');

function getSupabaseClient(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  });
}

async function redisGet(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    const d = await r.json();
    return d.result;
  } catch (e) {
    console.error('Redis GET error:', e.message);
    return null;
  }
}

async function redisIncrExpire(key, ttl) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  try {
    await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${UPSTASH_TOKEN}` },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, ttl]
      ])
    });
  } catch (e) {
    console.error('Redis INCR/EXPIRE error:', e.message);
  }
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

const PLAN_LIMITS = {
  free: 3,
  pro: Infinity, pro_annual: Infinity,
  studio: Infinity, studio_annual: Infinity,
  founding: Infinity,
  founding_t1: Infinity, founding_t1_annual: Infinity,
  founding_t2: Infinity, founding_t2_annual: Infinity,
};

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
  const allowed = ['https://www.mysoniq.com', 'https://mysoniq.com', 'https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  // ── Auth check ──────────────────────────────────────────────────
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) {
    return res.status(401).json({ error: 'auth_required', message: 'Sign in to generate songs' });
  }

  const supabase = getSupabaseClient(token);
  if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return res.status(401).json({ error: 'auth_required', message: 'Sign in to generate songs' });
  }

  // ── Plan lookup + rate limiting ─────────────────────────────────
  let plan = 'free';
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();
    if (profile?.plan) plan = profile.plan;
  } catch (e) {
    console.error('Profile fetch error:', e.message);
  }

  const limit = PLAN_LIMITS[plan] ?? 3;
  if (isFinite(limit)) {
    const dateKey = getTodayDate();
    const redisKey = `soniq:ratelimit:daily:${user.id}:${dateKey}`;
    const current = parseInt(await redisGet(redisKey) || '0', 10);
    if (current >= limit) {
      return res.status(429).json({
        error: 'limit_reached',
        message: `You've used your ${limit} free songs today. Upgrade for unlimited generations.`,
        limit,
        plan
      });
    }
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({error:'Invalid JSON'}); }

  // Treat 'server-side' sentinel as no user key
  const userKey = (body?.userKey && body.userKey !== 'server-side') ? body.userKey : null;

  if (userKey) {
    // User-supplied key: use their key directly
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
    const { buildVariantPrompt } = require('./_brain');
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

  // If using server key and this is a legacy raw-message request (no variant),
  // lock the system prompt. For brain-built variant prompts, keep their specialized system.
  if (!userKey && !body?.variant) {
    system = 'You are Soniq, an expert AI music producer and songwriter. Follow all instructions carefully and output only the requested song content.';
  }

  if (!messages?.length) return res.status(400).json({error:'messages required'});

  const errors = [];

  // Try Anthropic first, then OpenRouter as fallback
  if (anthropicKey) {
    try {
      const text = await callAnthropic(anthropicKey, messages, system, max_tokens);
      // Increment rate-limit counter after successful generation
      if (isFinite(limit)) {
        const dateKey = getTodayDate();
        redisIncrExpire(`soniq:ratelimit:daily:${user.id}:${dateKey}`, 86400);
      }
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      console.error('Anthropic failed, trying fallback:', err.message);
      errors.push('Anthropic: ' + err.message);
    }
  }

  if (openrouterKey) {
    try {
      const text = await callOpenRouter(openrouterKey, messages, system, max_tokens);
      // Increment rate-limit counter after successful generation
      if (isFinite(limit)) {
        const dateKey = getTodayDate();
        redisIncrExpire(`soniq:ratelimit:daily:${user.id}:${dateKey}`, 86400);
      }
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
