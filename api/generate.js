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

function getThisMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

// Emails that always get Studio plan + unlimited access
const ADMIN_EMAILS = new Set(['thealvindean@gmail.com', 'lamusicproducers8@gmail.com']);

// Must match stream.js exactly — generate.js is a fallback path for the same users
const PLAN_LIMITS = {
  free:                3,   // lifetime trial
  founding_t1:         20,  founding_t1_annual: 20,
  founding_t2:         10,  founding_t2_annual: 10,
  pro:                 20,  pro_annual:         20,
  studio:              50,  studio_annual:      50,
  founding:            50,
  starter: 10, starter_annual: 10, // legacy
};

const MONTHLY_LIMIT_PLANS = new Set([
  'founding_t1','founding_t1_annual',
  'founding_t2','founding_t2_annual',
  'pro','pro_annual',
  'studio','studio_annual','founding',
  'starter','starter_annual',
]);

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
  // Scope preview CORS to this project's preview subdomains only (was
  // echoing any *.vercel.app — i.e. every Vercel deploy on the planet
  // could call our paid endpoint).
  const isPreview = /^https:\/\/soniq-[a-z0-9\-]+-alvindean\.vercel\.app$/i.test(origin)
                 || /^https:\/\/soniq-[a-z0-9\-]+\.vercel\.app$/i.test(origin);
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  // ── Admin bypass check ─────────────────────────────────────────
  const { createHmac } = require('crypto');
  const adminTokenHeader = req.headers['x-admin-token'] || '';
  let isAdmin = false;
  if (adminTokenHeader) {
    const secret = process.env.ADMIN_TOKEN_SECRET;
    const adminPw = process.env.ADMIN_PASSWORD || '';
    if (secret && secret.length >= 16 && adminPw) {
      const expected = createHmac('sha256', secret).update(adminPw).digest('hex');
      isAdmin = (adminTokenHeader === expected);
    }
  }

  // ── Auth check ──────────────────────────────────────────────────
  let user = isAdmin ? { id: 'admin' } : null;
  let supabase = null;
  if (!isAdmin) {
    const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
    if (!token) {
      return res.status(401).json({ error: 'auth_required', message: 'Sign in to generate songs' });
    }
    supabase = getSupabaseClient(token);
    if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });
    const { data: { user: u }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !u) {
      return res.status(401).json({ error: 'auth_required', message: 'Sign in to generate songs' });
    }
    user = u;
  }

  // ── Flow dispatch ──────────────────────────────────────────────
  // Flow piggybacks here to fit the 12-function Hobby cap. Two modes:
  //   { mode: 'flow-spec', concept } → { spec }
  //   { mode: 'flow-song', concept, spec } → { title, lyrics, sunoPrompt }
  //
  // Both modes participate in the SAME plan/rate-limit gate as normal
  // generate — flow-song increments usage on success, flow-spec is the
  // cheap classifier and only blocks at the gate.
  const flowMode = req.body && req.body.mode;

  // Shared Flow AI caller — must live at handler scope so both the
  // flow-spec/flow-song branch AND the flow-score branch can reach it.
  // (Was previously nested inside the spec/song if-block, which made the
  // function declaration's block-scoped hoist invisible from flow-score.)
  async function flowCallAI(messages, system, max_tokens, budgetMs) {
    // Tolerate the prod env var being named `Claude` instead of
    // ANTHROPIC_API_KEY. Without this fallback, Anthropic primary is
    // disabled and every call routes to OpenRouter only — which can push
    // a 62KB brain prompt + 4000-token output past Vercel's 60s timeout.
    const ak = process.env.ANTHROPIC_API_KEY || process.env.Claude || process.env.CLAUDE;
    const ok = process.env.OPENROUTER_API_KEY;
    if (!ak && !ok) throw new Error('No AI provider configured');
    // Hard internal timeout — must return BEFORE Vercel's 60s axe.
    // CRITICAL: clear the setTimeout when the AI call wins, otherwise the
    // late-firing rejection becomes an unhandled promise rejection.
    const limit = typeof budgetMs === 'number' ? budgetMs : 50000;
    const withTimeout = function(promise){
      let to;
      const guard = new Promise((_, rej) => {
        to = setTimeout(() => rej(new Error('AI timeout (' + limit + 'ms)')), limit);
      });
      guard.catch(() => {}); // belt-and-suspenders against late rejection
      return Promise.race([promise, guard]).finally(() => clearTimeout(to));
    };
    try {
      if (ak) return await withTimeout(callAnthropic(ak, messages, system, max_tokens));
      return await withTimeout(callOpenRouter(ok, messages, system, max_tokens));
    } catch (e) {
      if (ok && ak) return await withTimeout(callOpenRouter(ok, messages, system, max_tokens));
      throw e;
    }
  }
  if (flowMode === 'flow-spec' || flowMode === 'flow-song') {
    const flowConcept = (req.body.concept || '').trim();
    if (!flowConcept) return res.status(400).json({ error: 'concept is required' });
    if (flowConcept.length > 1000) return res.status(400).json({ error: 'concept must be 1000 chars or fewer' });

    // Per-user-per-minute cap on the unmetered support modes (flow-spec,
    // flow-score) so they can't be spammed to drain AI credits.
    if (!isAdmin && (flowMode === 'flow-spec' || flowMode === 'flow-score')) {
      const burstKey = `soniq:flow:burst:${flowMode}:${user.id}:${Math.floor(Date.now()/60000)}`;
      const burstCount = parseInt(await redisGet(burstKey) || '0', 10);
      if (burstCount >= 12) {
        return res.status(429).json({ error: 'rate_limit', message: 'Slow down — try again in a minute.' });
      }
      redisIncrExpire(burstKey, 90);
    }

    // Plan + rate-limit gate (mirrors the normal-flow block below)
    let flowPlan = isAdmin ? 'studio' : 'free';
    if (!isAdmin) {
      try {
        const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single();
        if (profile?.plan) flowPlan = profile.plan;
      } catch (e) { /* fall through */ }
      if (ADMIN_EMAILS.has(user.email)) { flowPlan = 'studio'; isAdmin = true; }
    }
    const flowLimit = PLAN_LIMITS[flowPlan] ?? 3;
    const flowIsLifetime = flowPlan === 'free';
    const flowRedisKey = flowIsLifetime
      ? `soniq:ratelimit:lifetime:${user.id}`
      : `soniq:ratelimit:monthly:${user.id}:${getThisMonth()}`;
    if (!isAdmin && isFinite(flowLimit)) {
      const cur = parseInt(await redisGet(flowRedisKey) || '0', 10);
      if (cur >= flowLimit) {
        const hint = flowIsLifetime
          ? 'Your 3 free songs are used. Upgrade to keep creating.'
          : 'Monthly limit reached. Upgrade for more songs.';
        return res.status(429).json({ error: 'limit_reached', message: hint, limit: flowLimit, plan: flowPlan });
      }
    }

    if (flowMode === 'flow-spec') {
      const SPEC_SYSTEM = `You are a senior music producer and A&R. Given a songwriter's concept, return the optimal song spec as JSON.

Think across the full landscape of popular music — fusion-aware (dream-pop, neo-soul, indie folk, dark americana, ambient r&b, drill, bedroom pop, lo-fi hip-hop, post-punk, shoegaze, synth-pop, future-soul, etc.).

Rules:
- Match the concept's emotional weight.
- Tempo fits vocal phrasing (ballads 60-84, mid 84-110, drive 110-140, dance 120-180).
- Vocal: 3-6 words, specific.
- Instrumentation: 3-5 distinct items.
- Mood arc shows movement OR explicitly says it stays still.
- Title: 1-6 evocative words. No subtitles. No quotes.
- sunoPrompt: 8-14 comma-separated style descriptors. NO lyrics.
- Fusion: set fusion=true and subGenre when blending. Else fusion=false, subGenre=null.

Return ONLY valid JSON:
{"title":"...","genre":"...","subGenre":null,"fusion":false,"tempo":72,"key":"A minor","vocal":"...","instrumentation":["...","...","..."],"mood":"...","moodArc":{"start":"...","end":"..."},"structure":"V1 → C → V2 → C → B → C","sunoPrompt":"..."}

No prose. No markdown fences.`;
      try {
        const text = await flowCallAI(
          [{ role: 'user', content: 'CONCEPT:\n' + flowConcept + '\n\nReturn the FlowSpec JSON now.' }],
          SPEC_SYSTEM,
          800,
        );
        const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        let spec;
        try { spec = JSON.parse(cleaned); }
        catch (e) { return res.status(502).json({ error: 'Model returned invalid JSON', detail: cleaned.slice(0, 200) }); }
        if (!spec.title || !spec.genre || !spec.tempo || !spec.key || !spec.vocal ||
            !Array.isArray(spec.instrumentation) || spec.instrumentation.length === 0 ||
            !spec.moodArc || !spec.moodArc.start || !spec.moodArc.end ||
            !spec.structure || !spec.sunoPrompt) {
          return res.status(502).json({ error: 'Spec was incomplete — try a more specific concept' });
        }
        return res.status(200).json({ spec });
      } catch (e) {
        return res.status(500).json({ error: e.message || 'Spec generation failed' });
      }
    }

    // mode === 'flow-song' — ONE AI call. Concept → SONIQ brain → finished song.
    // No upstream spec call. The brain handles genre/mood/structure from the
    // concept text directly using lightweight heuristics below.
    const spec = req.body.spec || {};

    // Map Flow's natural-language genre to a brain genre key.
    function flowGenreToBrainKey(g) {
      const s = String(g || '').toLowerCase();
      if (s.includes('hip') || s.includes('rap') || s.includes('trap') || s.includes('drill')) return 'hiphop';
      if (s.includes('r&b') || s.includes('rnb') || s.includes('soul') || s.includes('neo')) return 'rnb';
      if (s.includes('country') || s.includes('americana') || s.includes('bluegrass')) return 'country';
      if (s.includes('folk') || s.includes('singer') || s.includes('acoustic') || s.includes('indie folk')) return 'folk';
      if (s.includes('metal') || s.includes('punk') || s.includes('grunge') || s.includes('hard rock')) return 'rock';
      if (s.includes('rock') || s.includes('alternative') || s.includes('indie rock') || s.includes('shoegaze') || s.includes('post-punk')) return 'rock';
      if (s.includes('edm') || s.includes('electronic') || s.includes('house') || s.includes('techno') || s.includes('trance') || s.includes('hyperpop') || s.includes('synth')) return 'edm';
      if (s.includes('blues')) return 'blues';
      if (s.includes('jazz')) return 'jazz';
      if (s.includes('gospel') || s.includes('worship') || s.includes('christian')) return 'gospel';
      if (s.includes('reggae') || s.includes('dancehall') || s.includes('dub')) return 'reggae';
      if (s.includes('latin') || s.includes('salsa') || s.includes('bachata') || s.includes('reggaeton')) return 'latin';
      if (s.includes('kpop') || s.includes('k-pop')) return 'kpop';
      return 'pop';
    }
    function flowMoodToBrainMood(m) {
      const s = String(m || '').toLowerCase();
      if (/hope|uplift|inspir|triumph/.test(s)) return 'Hopeful';
      if (/sad|melanchol|grief|sorrow|loss/.test(s)) return 'Melancholic';
      if (/dark|brood|sinister|ominous/.test(s)) return 'Dark';
      if (/angry|rage|defian|rebellious/.test(s)) return 'Defiant';
      if (/calm|peace|tender|gentle/.test(s)) return 'Peaceful';
      if (/nostalg|reflect|wistful/.test(s)) return 'Nostalgic';
      if (/play|fun|joy|euphor/.test(s)) return 'Playful';
      if (/longing|yearn/.test(s)) return 'Longing';
      return 'Emotional';
    }

    let built, brainGenre, flowAllowPlatinum;
    try {
      const brain = require('./_brain.js');
      // Derive genre + mood directly from the concept text (and any
      // optional spec hints the client passed). No upstream AI spec call.
      brainGenre = flowGenreToBrainKey(spec.genre || flowConcept);
      const brainMood = flowMoodToBrainMood(
        spec.mood || (spec.moodArc && spec.moodArc.end) || flowConcept
      );
      // Topic = the concept itself, with a brief production cue so the
      // brain emits section markers, ad-libs in parens, and Suno tags.
      const enrichedTopic =
        `${flowConcept}\n\n` +
        `Add real [Verse], [Pre-Chorus], [Chorus], [Bridge] markers, ` +
        `instrumental cues like [Guitar Solo] or [Drum Fill] when the genre calls for them, ` +
        `and ad-libs in parentheses on the same line (e.g. "I held my breath (uh) waiting for the light"). ` +
        `Use the genre's Suno tag conventions — the song must read like a finished production brief.`;

      // Plan-gate platinum + premium quality to match stream.js. Free-tier
      // users still get Flow, just on the same brain budget Write gives them.
      const PLATINUM_PLANS = new Set(['studio','studio_annual','founding','founding_t1','founding_t1_annual','founding_t2','founding_t2_annual','pro','pro_annual']);
      flowAllowPlatinum = isAdmin || PLATINUM_PLANS.has(flowPlan);
      built = brain.buildSongPrompt({
        genre: brainGenre,
        topic: enrichedTopic,
        mood: brainMood,
        vocal: spec.vocal || 'any',
        structure: 'standard',
        era: 'modern',
        length: 'medium',
        quality: flowAllowPlatinum ? 'viral' : 'high',
        bracketMode: 'suno',
        platform: 'suno',
        platinum: flowAllowPlatinum,
        isAdmin: isAdmin,
        plan: flowPlan,
      });
    } catch (e) {
      console.error('[flow-song] brain.buildSongPrompt failed:', e && e.message);
      return res.status(500).json({ error: 'Failed to build song prompt' });
    }

    if (!built || !built.prompt || !built.system) {
      return res.status(500).json({ error: 'Brain returned empty prompt' });
    }

    const t0 = Date.now();
    console.log('[flow-song] start', {
      userId: user && user.id,
      plan: flowPlan,
      platinum: flowAllowPlatinum,
      genre: brainGenre,
      promptChars: built.prompt.length,
      hasAnthropic: !!(process.env.ANTHROPIC_API_KEY || process.env.Claude || process.env.CLAUDE),
      hasOpenRouter: !!process.env.OPENROUTER_API_KEY,
    });
    let lyrics;
    try {
      lyrics = await flowCallAI(
        [{ role: 'user', content: built.prompt }],
        built.system,
        2000,                    // tightened — brain emits a full song in ~1500-1800 tokens, headroom gives Vercel breathing room
        50000,                   // hard 50s internal timeout — fails clean before Vercel kills the function
      );
      console.log('[flow-song] ai-ok', { ms: Date.now() - t0, lyricChars: lyrics.length });
    } catch (e) {
      console.error('[flow-song] ai-fail', {
        ms: Date.now() - t0,
        msg: e && e.message,
        stack: e && e.stack && e.stack.split('\n').slice(0,3).join(' | '),
      });
      return res.status(500).json({ error: (e && e.message) || 'Lyric generation failed' });
    }

    // Use the Suno prompt from the spec call — it's already grounded in
    // the same concept and avoids a second sequential AI call that was
    // pushing flow-song past Vercel's 60s ceiling. A future improvement
    // could move Suno-regen to a separate client-fired mode like flow-score.
    const sunoPrompt = spec.sunoPrompt || '';

    // Score moved to a separate client-fired `flow-score` call to keep this
    // request under Vercel's 60s function timeout. The client renders the
    // song immediately, then asynchronously requests the score.

    // Charge the song against the user's monthly quota (same as normal generate)
    if (!isAdmin && isFinite(flowLimit)) {
      const ttl = flowIsLifetime ? 10 * 365 * 24 * 3600 : 32 * 24 * 3600;
      redisIncrExpire(flowRedisKey, ttl);
    }

    return res.status(200).json({
      title: spec.title || (flowConcept.split(/[.,—–\-]/)[0] || 'Untitled').trim().slice(0, 60),
      lyrics: lyrics.trim(),
      sunoPrompt: sunoPrompt,
    });
  }

  // mode === 'flow-score' — async scoring fired separately by the client
  // after the song lands. Tight 600-token budget so it never times out.
  if (flowMode === 'flow-score') {
    const sLyrics = String(req.body.lyrics || '').slice(0, 6000);
    const sGenre  = String(req.body.genre || 'pop');
    const sTopic  = String(req.body.topic || '').slice(0, 400);
    if (!sLyrics) return res.status(400).json({ error: 'lyrics required' });
    try {
      const brain = require('./_brain.js');
      const brainGenre = (function(g){
        const s = String(g || '').toLowerCase();
        if (s.includes('hip')||s.includes('rap')||s.includes('trap')) return 'hiphop';
        if (s.includes('r&b')||s.includes('soul')||s.includes('neo')) return 'rnb';
        if (s.includes('country')) return 'country';
        if (s.includes('folk')||s.includes('singer')||s.includes('acoustic')) return 'folk';
        if (s.includes('rock')||s.includes('metal')||s.includes('punk')) return 'rock';
        if (s.includes('edm')||s.includes('electronic')||s.includes('synth')||s.includes('hyperpop')) return 'edm';
        if (s.includes('blues')) return 'blues';
        if (s.includes('jazz')) return 'jazz';
        if (s.includes('gospel')) return 'gospel';
        if (s.includes('reggae')) return 'reggae';
        return 'pop';
      })(sGenre);
      // Lightweight scorer — don't use the full 9-dimension feedback prompt,
      // it overflows the 300-token budget and the JSON gets cut off. A tight
      // 2-field rubric fits cleanly and parses every time.
      const fbText = await flowCallAI(
        [{ role: 'user', content:
          `Genre: ${brainGenre}\nConcept: ${sTopic}\n\nLYRICS:\n${sLyrics}\n\n` +
          `Score this song's hook strength 0-100 (50=workable, 70=strong, 85=hit). ` +
          `Return ONLY one JSON line: {"hookScore":<int>,"verdict":"<one sentence ≤140 chars: what works AND one specific thing to sharpen>"}`
        }],
        `You are SONIQ's hook coach. Honest, terse, one-shot scoring. Output strict JSON only — no markdown, no preamble.`,
        180,
        20000,
      );
      const cleaned = fbText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      let scoreData = null;
      try { scoreData = JSON.parse(cleaned); } catch (e) {}
      if (!scoreData || typeof scoreData.hookScore !== 'number') {
        return res.status(502).json({ error: 'Score parse failed' });
      }
      return res.status(200).json({ score: scoreData });
    } catch (e) {
      return res.status(500).json({ error: e.message || 'Scoring failed' });
    }
  }

  // ── Plan lookup + rate limiting ─────────────────────────────────
  let plan = isAdmin ? 'studio' : 'free';
  if (!isAdmin) {
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
      isAdmin = true;
    }
  }

  const limit = PLAN_LIMITS[plan] ?? 3;
  if (!isAdmin && isFinite(limit)) {
    const isLifetime = plan === 'free';
    const redisKey = isLifetime
      ? `soniq:ratelimit:lifetime:${user.id}`
      : `soniq:ratelimit:monthly:${user.id}:${getThisMonth()}`;
    const current = parseInt(await redisGet(redisKey) || '0', 10);
    if (current >= limit) {
      const upgradeHint = isLifetime
        ? 'Your 3 free songs are used. Upgrade to keep creating.'
        : 'Monthly limit reached. Upgrade for more songs.';
      return res.status(429).json({ error: 'limit_reached', message: upgradeHint, limit, plan });
    }
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({error:'Invalid JSON'}); }

  // Treat 'server-side' sentinel as no user key. Also validate that a
  // submitted key is actually an Anthropic key format — refuse to forward
  // arbitrary strings to anthropic.com on the user's behalf.
  const _rawKey = (body?.userKey && body.userKey !== 'server-side') ? String(body.userKey).trim() : null;
  const userKey = (_rawKey && /^sk-ant-[A-Za-z0-9_\-]{20,}$/.test(_rawKey)) ? _rawKey : null;
  if (_rawKey && !userKey) {
    return res.status(400).json({ error: 'invalid_api_key_format' });
  }

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
      topic: body.topic || '',
      mood: body.mood || '',
      plan: plan,
      isAdmin: !!isAdmin
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

  const recordUsage = () => {
    if (!isAdmin && isFinite(limit)) {
      const isLifetime = plan === 'free';
      const redisKey = isLifetime
        ? `soniq:ratelimit:lifetime:${user.id}`
        : `soniq:ratelimit:monthly:${user.id}:${getThisMonth()}`;
      const ttl = isLifetime ? 10 * 365 * 24 * 3600 : 32 * 24 * 3600;
      redisIncrExpire(redisKey, ttl);
    }
  };

  // Try Anthropic first, then OpenRouter as fallback
  if (anthropicKey) {
    try {
      const text = await callAnthropic(anthropicKey, messages, system, max_tokens);
      recordUsage();
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      console.error('Anthropic failed, trying fallback:', err.message);
      errors.push('Anthropic: ' + err.message);
    }
  }

  if (openrouterKey) {
    try {
      const text = await callOpenRouter(openrouterKey, messages, system, max_tokens);
      recordUsage();
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
