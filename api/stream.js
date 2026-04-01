/**
 * SONIQ — Streaming API endpoint (SSE)
 * Tries ANTHROPIC_API_KEY first, falls back to OPENROUTER_API_KEY
 * POST /api/stream → streams response as Server-Sent Events
 * Each text event: data: {"text":"..."}\n\n
 * Final event:     data: {"done":true}\n\n
 * Error event:     data: {"error":"..."}\n\n
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

function getThisMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

// free = 3 lifetime songs (trial); paid = monthly
const PLAN_LIMITS = {
  free:                3,    // lifetime trial
  founding_t1:         20,   // per month ($5 early founder)
  founding_t1_annual:  20,
  founding_t2:         10,   // per month ($9.99 entry)
  founding_t2_annual:  10,
  pro:                 20,   // per month ($19)
  pro_annual:          20,
  studio:              50,   // per month ($49)
  studio_annual:       50,
  founding:            50,   // legacy
};

// Emails that always get Studio plan + unlimited access (no admin token needed)
const ADMIN_EMAILS = new Set(['thealvindean@gmail.com']);

// Plans that use monthly counting (free uses lifetime)
const MONTHLY_LIMIT_PLANS = new Set([
  'founding_t1','founding_t1_annual',
  'founding_t2','founding_t2_annual',
  'pro','pro_annual',
  'studio','studio_annual','founding'
]);

// Minimum quality score per plan (0 = no guarantee)
const PLAN_MIN_SCORES = {
  free:               0,
  founding_t2:        75,  founding_t2_annual:  75,
  founding_t1:        75,  founding_t1_annual:  75,
  pro:                81,  pro_annual:          81,
  studio:             85,  studio_annual:       85,
  founding:           85,
};

const PLAN_MAX_RETRIES = {
  founding_t2: 2, founding_t2_annual: 2,
  founding_t1: 2, founding_t1_annual: 2,
  pro: 2,         pro_annual: 2,
  studio: 3,      studio_annual: 3,
  founding: 3,
};

// Score a generated song using Claude Haiku (cheap, fast)
async function scoreSong(text, genre, anthropicKey) {
  if (!anthropicKey || !text) return 100;
  try {
    const prompt = `Score this ${genre || 'pop'} song 0-100 using these criteria:
- Lyric Craft (0-30): rhyme scheme, imagery, line rhythm
- Structure (0-25): correct verse/hook/bridge for genre
- Genre DNA (0-25): authentic genre markers and style
- Hook Strength (0-20): memorability and emotional payoff

Song:
${text.slice(0, 2500)}

Reply ONLY with JSON: {"score":<0-100>}`;

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json','x-api-key':anthropicKey,'anthropic-version':'2023-06-01'},
      body: JSON.stringify({model:'claude-haiku-4-5-20251001', max_tokens:60, messages:[{role:'user',content:prompt}]})
    });
    const d = await r.json();
    const raw = d.content?.[0]?.text || '';
    const m = raw.match(/\{[\s\S]*?\}/);
    if (m) return JSON.parse(m[0]).score || 0;
  } catch (e) { console.error('Score error:', e.message); }
  return 100; // fail open
}

// Generate full text (buffered, not streamed) via Anthropic
async function generateBuffered(anthropicKey, messages, system, max_tokens) {
  const payload = {model:'claude-sonnet-4-20250514', max_tokens, stream:true, messages};
  if (system) payload.system = system;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{'Content-Type':'application/json','x-api-key':anthropicKey,'anthropic-version':'2023-06-01'},
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status);
  const reader = r.body.getReader();
  const decoder = new TextDecoder();
  let buf = '', result = '';
  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    buf += decoder.decode(value, {stream:true});
    const lines = buf.split('\n'); buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      try {
        const ev = JSON.parse(line.slice(6));
        if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') result += ev.delta.text;
      } catch {}
    }
  }
  return result;
}

// Stream pre-buffered text as SSE chunks
function streamBuffered(text, score, res) {
  const chunkSize = 40;
  for (let i = 0; i < text.length; i += chunkSize) {
    res.write(`data: ${JSON.stringify({text: text.slice(i, i + chunkSize)})}\n\n`);
  }
  res.write(`data: ${JSON.stringify({done: true, score})}\n\n`);
  res.end();
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
  const origin = req.headers.origin || '';
  const allowed = ['https://www.mysoniq.com', 'https://mysoniq.com', 'https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // ── Admin bypass check ─────────────────────────────────────────
  const adminTokenHeader = req.headers['x-admin-token'] || '';
  if (adminTokenHeader) {
    const { createHmac } = require('crypto');
    const secret = process.env.ADMIN_TOKEN_SECRET || 'soniq-default-secret';
    const adminPw = process.env.ADMIN_PASSWORD || '';
    const expected = createHmac('sha256', secret).update(adminPw).digest('hex');
    if (adminTokenHeader === expected) {
      // Valid admin — skip auth, grant unlimited access
      req._adminBypass = true;
      req._adminPlan = 'studio';
    }
  }

  // ── Auth check ──────────────────────────────────────────────────
  if (!req._adminBypass) {
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
  req._user = user;
  req._supabase = supabase;
  }

  // ── Plan lookup + rate limiting ─────────────────────────────────
  const user    = req._adminBypass ? { id: 'admin' } : req._user;
  const supabase = req._adminBypass ? null : req._supabase;

  let plan = req._adminBypass ? req._adminPlan : 'free';
  if (!req._adminBypass) {
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
    // Email whitelist — always studio, always bypasses rate limiting
    if (ADMIN_EMAILS.has(user.email)) {
      plan = 'studio';
      req._adminBypass = true;
    }
  }

  const limit = PLAN_LIMITS[plan] ?? 3;
  if (!req._adminBypass && isFinite(limit)) {
    const isLifetime = plan === 'free';
    const isMonthly  = MONTHLY_LIMIT_PLANS.has(plan);
    const redisKey   = isLifetime
      ? `soniq:ratelimit:lifetime:${user.id}`
      : `soniq:ratelimit:monthly:${user.id}:${getThisMonth()}`;
    const current = parseInt(await redisGet(redisKey) || '0', 10);
    if (current >= limit) {
      const upgradeHint = isLifetime
        ? 'Your 3 free songs are used. Upgrade to keep creating.'
        : plan === 'founding_t2' || plan === 'founding_t2_annual'
          ? 'Upgrade to Pro for 20 songs/month.'
          : plan === 'pro' || plan === 'pro_annual'
            ? 'Upgrade to Studio for 50 songs/month.'
            : 'Contact info@mysoniq.com for Enterprise volume.';
      return res.status(429).json({
        error: 'limit_reached',
        message: upgradeHint,
        limit,
        plan
      });
    }
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).end(); }

  // ── Server-side prompt building (protects IP) ──
  let messages, system, max_tokens;
  if (body.variant) {
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
      max_tokens = 2048;
    } catch(e) {
      res.status(400).end('Unknown variant: ' + body.variant);
      return;
    }
  } else if (body.action === 'generate' || body.action === 'lucky') {
    try {
      const brain = require('./_brain');
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
    system = 'You are Soniq, an expert AI music producer and songwriter. Follow all instructions carefully and output only the requested song content.';
    // Cap max_tokens — never let a client request blow through credit limits
    max_tokens = Math.min(Math.max(parseInt(body.max_tokens) || 2048, 256), 4096);
  }

  // Treat 'server-side' sentinel (set by client on Vercel) as no user key
  const userKey = (body?.userKey && body.userKey !== 'server-side') ? body.userKey : null;

  // If using server key and this is a legacy raw-message request (no action/variant),
  // lock the system prompt. For brain-built prompts (action/variant), keep their specialized system.
  if (!userKey && !body.action && !body.variant) {
    system = 'You are Soniq, an expert AI music producer and songwriter. Follow all instructions carefully and output only the requested song content.';
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

  // Helper: increment rate limit after successful generation
  const recordUsage = () => {
    if (!req._adminBypass && isFinite(limit)) {
      const isLifetime = plan === 'free';
      const redisKey   = isLifetime
        ? `soniq:ratelimit:lifetime:${user.id}`
        : `soniq:ratelimit:monthly:${user.id}:${getThisMonth()}`;
      const ttl = isLifetime ? 10 * 365 * 24 * 3600 : 32 * 24 * 3600;
      redisIncrExpire(redisKey, ttl);
    }
  };

  const minScore   = PLAN_MIN_SCORES[plan] ?? 0;
  const maxRetries = PLAN_MAX_RETRIES[plan] ?? 0;

  // Paid plans with score guarantee: buffer, score, retry if needed
  if (anthropicKey && minScore > 0) {
    let bestText = '', bestScore = 0, attempts = 0;
    const totalAttempts = maxRetries + 1;
    try {
      while (attempts < totalAttempts) {
        attempts++;
        const text = await generateBuffered(anthropicKey, messages, system, max_tokens);
        const score = await scoreSong(text, body.genre, anthropicKey);
        if (score > bestScore) { bestScore = score; bestText = text; }
        if (score >= minScore) break;
      }
      recordUsage();
      streamBuffered(bestText, bestScore, res);
      return;
    } catch (err) {
      console.error('Buffered generation failed:', err.message);
    }
  }

  if (anthropicKey) {
    try {
      await streamAnthropic(anthropicKey, messages, system, max_tokens, res);
      recordUsage();
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
      recordUsage();
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
