/**
 * SONIQ — Universal API Proxy with automatic fallback
 * Primary: ANTHROPIC_API_KEY → fallback: OPENROUTER_API_KEY (and vice versa)
 * POST /api/generate
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const { createClient } = require('@supabase/supabase-js');
const { validatePhrase: _laValidatePhrase, selectAnchorTransform: _laSelectAnchorTransform } = require('./_loop_anchor');

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
const ADMIN_EMAILS = new Set(['thealvindean@gmail.com', 'lamusicproducers8@gmail.com', 'amdesousa.exo@gmail.com']);

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

const _generateHandler = async function handler(req, res) {
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
  //   { mode: 'flow-song', concept, spec } → { title, lyrics, sunoPrompt }
  //   { mode: 'flow-score', lyrics, genre, topic } → { score }
  //
  // Both modes participate in the SAME plan/rate-limit gate as normal
  // generate — flow-song increments usage on success, flow-score is the
  // cheap async scorer and only blocks at the burst cap.
  const flowMode = req.body && req.body.mode;

  // Shared Flow AI caller — must live at handler scope so both the
  // flow-song branch AND the flow-score branch can reach it.
  // (Was previously nested inside the song if-block, which made the
  // function declaration's block-scoped hoist invisible from flow-score.)
  async function flowCallAI(messages, system, max_tokens, budgetMs) {
    const ak = process.env.ANTHROPIC_API_KEY || process.env.Claude || process.env.CLAUDE;
    const ok = process.env.OPENROUTER_API_KEY;
    if (!ak && !ok) throw new Error('No AI provider configured');
    const limit = typeof budgetMs === 'number' ? budgetMs : 55000;
    const tStart = Date.now();
    const withTimeout = function(promise, ms){
      let to;
      const guard = new Promise((_, rej) => {
        to = setTimeout(() => rej(new Error('AI timeout (' + ms + 'ms)')), ms);
      });
      guard.catch(() => {});
      return Promise.race([promise, guard]).finally(() => clearTimeout(to));
    };
    // OpenRouter is the primary provider — the funded, working account. It
    // gets the full budget: a real generation runs ~37-40s and a split would
    // abort slow-but-valid completions. Anthropic is the fallback — it only
    // fires if OpenRouter errors fast, leaving real time on the clock.
    try {
      if (ok) return await withTimeout(callOpenRouter(ok, messages, system, max_tokens), limit);
      return await withTimeout(callAnthropic(ak, messages, system, max_tokens), limit);
    } catch (e) {
      const remaining = limit - (Date.now() - tStart) - 500;
      if (ak && ok && remaining > 5000) {
        return await withTimeout(callAnthropic(ak, messages, system, max_tokens), remaining);
      }
      throw e;
    }
  }
  if (flowMode === 'flow-song') {
    const flowConcept = (req.body.concept || '').trim();
    if (!flowConcept) return res.status(400).json({ error: 'concept is required' });
    if (flowConcept.length > 1000) return res.status(400).json({ error: 'concept must be 1000 chars or fewer' });

    // flow-song is metered by the plan/rate-limit gate below — no burst cap
    // needed. The unmetered flow-score mode has its own burst cap in its
    // dedicated branch further down.

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

    // mode === 'flow-song' — ONE AI call. Concept → SONIQ brain → finished song.
    // No upstream spec call. The brain handles genre/mood/structure from the
    // concept text directly using lightweight heuristics below.
    const spec = req.body.spec || {};

    // User exclude / avoid styles — applies to every genre. Mirrors the
    // sanitisation in stream.js: ASCII-only, 40 chars max, 10 entries max,
    // de-duped, "no " prefix stripped (the engine adds it back). Accepts
    // either body.exclude (array or comma-separated string) or
    // body.vocalDescriptors.negativeAdd from the front-end VD picker.
    function _flowParseExcludes(src) {
      if (!src) return [];
      const arr = Array.isArray(src)
        ? src
        : (typeof src === 'string' ? src.split(/[,\n]/) : []);
      const safe = /^[a-z0-9 _\-()'/]{1,40}$/;
      return arr
        .map(s => String(s || '').trim().toLowerCase().replace(/^no\s+/, ''))
        .filter(s => s && safe.test(s))
        .filter((s, i, a) => a.indexOf(s) === i)
        .slice(0, 10);
    }
    const flowExclude = _flowParseExcludes(
      req.body.exclude
      || (req.body.vocalDescriptors && req.body.vocalDescriptors.negativeAdd)
    );

    // Optional loop-anchor phrase — turns a single phrase into the song's
    // load-bearing center. Brain handles transform selection.
    const _flowParseAnchor = function(src) {
      if (!src || typeof src !== 'string') return null;
      const phrase = src.trim().slice(0, 80);
      if (!phrase || phrase.length < 2) return null;
      if (!/^[\x20-\x7E]+$/.test(phrase)) return null;
      // Reject prompt-injection patterns before they reach the brain.
      if (/(>>>|<<<|\bsystem\s*:|\bassistant\s*:|\buser\s*:|\bignore\s+previous\s+instructions\b|\boverride\s*:|```)/i.test(phrase)) return null;
      // Enforce the syllable/quality contract that the UI advertises.
      const result = _laValidatePhrase(phrase);
      if (!result || !result.ok) return null;
      return result.normalized || phrase;
    };
    // Plan gate — Loop Anchor is a Pro+ feature. Free + founding_t2 + legacy
    // starter/creator are locked out. Strip silently if the user submits the
    // field without entitlement (defense-in-depth — UI also locks the input).
    const _LOOP_ANCHOR_PLANS = new Set([
      'pro','pro_annual',
      'studio','studio_annual',
      'founding','founding_t1','founding_t1_annual',
    ]);
    const flowAnchorEntitled = isAdmin || _LOOP_ANCHOR_PLANS.has(flowPlan);
    const flowAnchorPhrase = flowAnchorEntitled
      ? _flowParseAnchor(
          req.body.loopAnchorPhrase
          || (req.body.loopAnchor && req.body.loopAnchor.phrase)
          || ''
        )
      : null;

    // Map Flow's natural-language genre to a brain genre key.
    // ── Weighted-score genre classifier (replaces priority-ordered chain) ──
    // Fixes the "Americana outlaw soul → R&B" class of bugs. A priority
    // chain returns whichever genre's keyword appears first in the chain,
    // not the genre with strongest evidence. This scores all genres in
    // parallel, applies anti-token suppression, AND-gates fusion genres,
    // and returns the highest scorer.
    //
    // Each taxonomy entry maps to a `brainKey` that the SONIQ brain knows
    // about (pop / hiphop / rnb / country / folk / rock / edm / blues /
    // jazz / gospel / reggae / latin / kpop). The richer `key` and `label`
    // are passed into the prompt so the model writes the correct subtype.
    const FLOW_GENRE_TAXONOMY = [
      // Americana / Outlaw Country (the bug input) ────────────────────
      { key:'americana', brainKey:'country', label:'Americana',
        tokens:{ 5:['americana','outlaw country','alt-country','alt.country'],
                 3:['outlaw','appalachia','holler','dust bowl','southern gothic'],
                 1:['rust','creek','porch','diesel','whiskey'] },
        antiTokens:[] },
      { key:'outlaw_country', brainKey:'country', label:'Outlaw Country',
        tokens:{ 5:['outlaw country','waylon','willie nelson'],
                 3:['outlaw','prison','renegade'] }, antiTokens:[] },
      { key:'country', brainKey:'country', label:'Country',
        tokens:{ 5:['country','honky-tonk','honky tonk','nashville','bluegrass'],
                 3:['truck','beer','dirt road','tailgate','boots','hometown'],
                 1:['fiddle','banjo'] } },
      // Folk family ────────────────────────────────────────────────────
      { key:'dark_folk', brainKey:'folk', label:'Dark Folk',
        tokens:{ 5:['dark folk','gothic americana','neofolk'],
                 3:['southern gothic','funeral folk','grave','raven'] } },
      { key:'indie_folk', brainKey:'folk', label:'Indie Folk',
        tokens:{ 5:['indie folk','singer-songwriter','singer songwriter'],
                 3:['fingerpicked','campfire','journal','bedroom guitar'],
                 1:['acoustic'] } },
      { key:'folk', brainKey:'folk', label:'Folk',
        tokens:{ 5:['folk','traditional ballad'],
                 3:['mountain','protest song','sea shanty'] } },
      // R&B / Soul family — "soul" alone is WEAK and gets suppressed by
      // americana/country/gospel context ──────────────────────────────
      { key:'trap_soul', brainKey:'rnb', label:'Trap-Soul',
        requires:[['trap'],['soul','moody','slow burn']],
        tokens:{ 5:['trap soul','trap-soul'] } },
      { key:'neo_soul', brainKey:'rnb', label:'Neo-Soul',
        tokens:{ 5:['neo-soul','neo soul'],
                 3:['rhodes','fender rhodes'] } },
      { key:'rnb', brainKey:'rnb', label:'R&B',
        tokens:{ 5:['r&b','rnb','rhythm and blues','contemporary r&b'],
                 3:['silk','velvet'] },
        weakAlone:{ 1:['soul','smooth'] },
        antiTokens:['americana','outlaw','country','gospel','folk'] },
      // Hip-Hop family ─────────────────────────────────────────────────
      { key:'drill', brainKey:'hiphop', label:'Drill',
        tokens:{ 5:['drill','uk drill','ny drill','chicago drill'] } },
      { key:'phonk', brainKey:'hiphop', label:'Phonk',
        tokens:{ 5:['phonk','drift phonk','memphis phonk'] } },
      { key:'trap', brainKey:'hiphop', label:'Trap',
        tokens:{ 5:['trap'],
                 3:['808','hi-hat roll','atlanta trap'] },
        antiTokens:['soul','rnb','r&b'] },
      { key:'boom_bap', brainKey:'hiphop', label:'Boom Bap',
        tokens:{ 5:['boom bap','boombap'],
                 3:['90s rap','golden era','sp-1200','dilla','premier'] } },
      { key:'conscious_rap', brainKey:'hiphop', label:'Conscious Rap',
        tokens:{ 5:['conscious rap','lyrical rap','backpack rap'] } },
      { key:'hiphop', brainKey:'hiphop', label:'Hip-Hop',
        tokens:{ 5:['hip-hop','hiphop','hip hop','rap'],
                 3:['emcee','bars','flow','freestyle','cypher'] } },
      // Rock family ────────────────────────────────────────────────────
      { key:'post_punk', brainKey:'rock', label:'Post-Punk',
        tokens:{ 5:['post-punk','post punk','goth rock','deathrock'] } },
      { key:'shoegaze', brainKey:'rock', label:'Shoegaze',
        tokens:{ 5:['shoegaze','blackgaze'],
                 3:['wall of sound','reverb wall'] } },
      { key:'slowcore', brainKey:'rock', label:'Slowcore',
        tokens:{ 5:['slowcore','sadcore','slow-core'],
                 3:['glacial tempo','sparse slow rock','funeral pace'] } },
      { key:'math_rock', brainKey:'rock', label:'Math Rock',
        tokens:{ 5:['math rock','math-rock'],
                 3:['polyrhythm','7/8','odd meter','time signature'] } },
      { key:'metal', brainKey:'rock', label:'Metal',
        tokens:{ 5:['metal','death metal','black metal','doom metal','djent'],
                 3:['blast beat','growl'] } },
      { key:'punk', brainKey:'rock', label:'Punk',
        tokens:{ 5:['punk','hardcore punk','oi punk'] } },
      { key:'rock', brainKey:'rock', label:'Rock',
        tokens:{ 5:['rock','alt-rock','alternative rock','indie rock','classic rock','hard rock'],
                 3:['riff','amp','distortion','marshall','guitar solo'] } },
      // Electronic family ──────────────────────────────────────────────
      { key:'synthwave', brainKey:'edm', label:'Synthwave',
        tokens:{ 5:['synthwave','retrowave','outrun','vaporwave','darkwave'],
                 3:['80s neon','miami vice','laser','retro-future'] } },
      { key:'hyperpop', brainKey:'edm', label:'Hyperpop',
        tokens:{ 5:['hyperpop','glitchpop','digicore'],
                 3:['chopped pitched','bitcrush','100 gecs'] } },
      { key:'dream_pop', brainKey:'edm', label:'Dream-Pop',
        tokens:{ 5:['dream pop','dreampop','ethereal wave'],
                 3:['hazy','drift','float','mist'] } },
      { key:'lofi', brainKey:'edm', label:'Lo-Fi Hip-Hop',
        tokens:{ 5:['lo-fi','lofi','lo fi','chillhop','study beats','jazzhop'],
                 3:['vinyl crackle','tape warble'] } },
      { key:'house', brainKey:'edm', label:'House',
        tokens:{ 5:['house music','deep house','tech house','techno'],
                 3:['four-on-floor','128 bpm'] } },
      { key:'edm', brainKey:'edm', label:'EDM',
        tokens:{ 5:['edm','electronic dance','trance','drum and bass','dnb'],
                 3:['drop','build-up','synth'] } },
      // Gospel / Soul / Blues / Jazz ──────────────────────────────────
      { key:'gospel_house', brainKey:'gospel', label:'Gospel-House',
        requires:[['gospel'],['house']],
        tokens:{ 5:['gospel house','gospel-house','soulful house'] } },
      { key:'gospel', brainKey:'gospel', label:'Gospel',
        tokens:{ 5:['gospel','choir','hymn','praise & worship'],
                 3:['church','sunday','hallelujah'] } },
      { key:'blues', brainKey:'blues', label:'Blues',
        tokens:{ 5:['blues','delta blues','chicago blues'],
                 3:['harmonica','slide guitar','12-bar'] } },
      { key:'jazz', brainKey:'jazz', label:'Jazz',
        tokens:{ 5:['jazz','bebop','hard bop','modal jazz','jazz fusion'],
                 3:['saxophone','swing','improv'] } },
      // Latin / World / Reggae ────────────────────────────────────────
      { key:'amapiano', brainKey:'amapiano', label:'Amapiano',
        tokens:{ 5:['amapiano','log drum'] } },
      { key:'afrobeats', brainKey:'afrobeats', label:'Afrobeats',
        tokens:{ 5:['afrobeats','afro-pop','afroswing','naija'] } },
      { key:'reggaeton', brainKey:'reggaeton', label:'Reggaeton',
        tokens:{ 5:['reggaeton','perreo','dembow'] } },
      { key:'cumbia', brainKey:'latin', label:'Cumbia',
        tokens:{ 5:['cumbia','sonidero'] } },
      { key:'bossa_nova', brainKey:'jazz', label:'Bossa Nova',
        tokens:{ 5:['bossa nova','brazilian jazz','mpb'] } },
      { key:'latin', brainKey:'latin', label:'Latin',
        tokens:{ 5:['latin','salsa','bachata','merengue','mariachi'] } },
      { key:'dancehall', brainKey:'dancehall', label:'Dancehall',
        tokens:{ 5:['dancehall','riddim','bashment'] } },
      { key:'reggae', brainKey:'reggae', label:'Reggae',
        tokens:{ 5:['reggae','roots reggae','dub'],
                 3:['one drop','kingston','jah'] } },
      // K-Pop, Bedroom Pop ────────────────────────────────────────────
      { key:'kpop', brainKey:'pop', label:'K-Pop',
        tokens:{ 5:['k-pop','kpop','korean pop'] } },
      { key:'bedroom_pop', brainKey:'pop', label:'Bedroom Pop',
        tokens:{ 5:['bedroom pop','lo-fi pop'],
                 3:['tape hiss','demo aesthetic'] } },
      { key:'indie_pop', brainKey:'pop', label:'Indie Pop',
        tokens:{ 5:['indie pop','indie-pop','twee'] } },
      { key:'pop', brainKey:'pop', label:'Pop',
        tokens:{ 5:['pop','top 40','mainstream pop'],
                 3:['hook','anthem','radio'] } },
    ];

    function flowClassifyGenre(text) {
      const t = ' ' + String(text || '').toLowerCase() + ' ';
      // Match a token only when it's flanked by non-alphanumerics (or string
      // edge) — a real word boundary. The old bare substring test fired "rap"
      // inside "the-rap-y" and "rock" inside "rocket", which mis-classified
      // ordinary words and made "trap soul" spuriously fuse (rap ⊂ trap).
      // `t` is already space-padded at both ends. Token-internal punctuation
      // (r&b, hip-hop, lo-fi, 808) is fine — only the edges are checked.
      const hasToken = (tok) => {
        let i = t.indexOf(tok);
        while (i !== -1) {
          const before = i === 0 ? ' ' : t[i - 1];
          const after = (i + tok.length >= t.length) ? ' ' : t[i + tok.length];
          if (!/[a-z0-9]/.test(before) && !/[a-z0-9]/.test(after)) return true;
          i = t.indexOf(tok, i + 1);
        }
        return false;
      };
      const scores = [];
      for (const g of FLOW_GENRE_TAXONOMY) {
        // AND-gated fusion genres: all groups must hit at least one token
        if (g.requires) {
          const allHit = g.requires.every(group => group.some(tok => hasToken(tok)));
          if (!allHit) continue;
        }
        let s = 0;
        const addAll = (table) => {
          for (const w in table) {
            for (const tok of table[w]) {
              if (hasToken(tok)) s += Number(w);
            }
          }
        };
        addAll(g.tokens || {});
        addAll(g.weakAlone || {});
        if (g.antiTokens && g.antiTokens.some(a => hasToken(a))) s *= 0.5;
        if (s > 0) scores.push({ key:g.key, brainKey:g.brainKey, label:g.label, score:s });
      }
      scores.sort((a,b) => b.score - a.score);
      if (!scores.length) return { brainKey:'pop', label:'Pop', key:'pop', fusion:null };
      const top = scores[0];
      const fusion = scores[1] && scores[1].score >= top.score * 0.7 && scores[1].brainKey !== top.brainKey
        ? scores[1] : null;
      return { ...top, fusion };
    }

    // Back-compat wrapper for existing call sites that just want the brain key.
    function flowGenreToBrainKey(g) {
      return flowClassifyGenre(g).brainKey;
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

    // Flow song: ONE direct AI call, lyrics only, no production brief.
    // The brain's 62KB super-prompt was burning OpenRouter credits and
    // pushing Vercel's 60s budget. Production data still flows through
    // the Editor when the user clicks "Continue to Production".
    // Classify the user's ACTUAL concept text — it carries the subgenre and
    // fusion signal ("drill type beat", "hip hop AND rock"). The client's
    // spec.genre is a single collapsed label (reveal-animation only) and was
    // SHADOWING the concept here — which is exactly why Flow defaulted to one
    // generic parent genre with no subtype and never detected fusions. Fall
    // back to the client hint only when the concept names no genre at all.
    const _conceptClass = flowClassifyGenre(flowConcept);
    const flowClassification = (_conceptClass.score > 0)
      ? _conceptClass
      : flowClassifyGenre(spec.genre || flowConcept);
    const brainGenre = flowClassification.brainKey;
    let flowGenreLabel = flowClassification.label;         // e.g. "Drill", "Americana"
    const flowFusionLabel = flowClassification.fusion ? flowClassification.fusion.label : null;

    // SUBGENRE RESOLUTION — when the concept names only a broad parent genre
    // ("hip hop") with no subtype, pick a specific subgenre for variety so Flow
    // stops writing generic parent-genre songs. An explicit subgenre in the
    // concept, or an explicit client substyle, always wins.
    const FLOW_BARE_PARENTS = new Set(['Hip-Hop','Rock','Pop','R&B','Country','Folk','EDM','Jazz','Latin','Reggae']);
    const flowPickSubstyle = (brainKey, excludeLabel) => {
      const subs = FLOW_GENRE_TAXONOMY.filter(g =>
        g.brainKey === brainKey && g.label !== excludeLabel && !g.requires && !FLOW_BARE_PARENTS.has(g.label));
      return subs.length ? subs[Math.floor(Math.random() * subs.length)].label : '';
    };
    let flowSubstyle = (spec && spec.substyle) || '';
    if (!flowSubstyle) {
      flowSubstyle = FLOW_BARE_PARENTS.has(flowGenreLabel)
        ? flowPickSubstyle(brainGenre, flowGenreLabel)   // broad parent → pick a subtype for variety
        : flowGenreLabel;                                 // concept already named a subtype
    }
    // When we upgraded a bare parent to a concrete subtype, surface it in the
    // user-facing label too (drives GENRE_LOCK, the Suno string, and the reveal).
    if (flowSubstyle && FLOW_BARE_PARENTS.has(flowGenreLabel)) flowGenreLabel = flowSubstyle;
    const brainMood  = flowMoodToBrainMood(spec.mood || (spec.moodArc && spec.moodArc.end) || flowConcept);
    const PLATINUM_PLANS = new Set(['studio','studio_annual','founding','founding_t1','founding_t1_annual','founding_t2','founding_t2_annual','pro','pro_annual']);
    const flowAllowPlatinum = isAdmin || PLATINUM_PLANS.has(flowPlan);

    // Genre-specific vocabulary + sound guidance — embedded in the prompt
    // so the model can't drift to an adjacent genre based on a single token
    // in the concept. The LOCK section makes the genre non-negotiable.
    const GENRE_LOCK = {
      'Americana':       'rusted-pickup-truck / Appalachian-creek / front-porch-whiskey imagery; weathered storyteller voice; soul-vocal PHRASING over country/folk roots — NOT R&B; instruments: acoustic guitar, pedal steel, dobro, upright bass, brushed snare, mandolin; 78-100 BPM; minor or modal keys; gritty male/female lead, often with harmony stack',
      'Outlaw Country':  'prison-letter / dust-road / devil-on-my-shoulder imagery; renegade defiance; instruments: telecaster, walking bass, train-beat drums, fiddle, harmonica; 92-118 BPM; A minor or D major; weathered baritone lead',
      'Country':         'small-town specificity (gas station names, county roads, county fair); first-person storyteller; instruments: acoustic guitar, fiddle, pedal steel, banjo, tight rhythm section; 96-130 BPM; major keys with the IV chord; warm vocal',
      'Dark Folk':       'southern gothic imagery (raven, hymn, grave, creek baptism); minor-key dread; instruments: fingerpicked acoustic, droning cello, hand drums, distant pump organ; 68-86 BPM; A minor or D Dorian; haunted breathy vocal',
      'Indie Folk':      'first-person diary specificity; fingerpicked acoustic; instruments: nylon-string or steel-string acoustic, brushed snare, light upright bass, occasional violin; 70-95 BPM; major or modal keys; intimate breathy vocal',
      'Folk':            'storyteller narrative, communal feel; instruments: fingerpicked acoustic guitar, banjo, harmonica, upright bass, hand percussion; 90-120 BPM; major or Mixolydian; conversational close-mic vocal',
      'Trap-Soul':       'moody nocturnal R&B over trap drums; instruments: spacious 808s, hi-hat rolls, lush sub-bass, melodic synth pad, sparse piano; 70-85 BPM half-time; minor keys; falsetto-laced R&B vocal',
      'Neo-Soul':        'jazz-soul progressions, lush chord voicings; instruments: Rhodes piano, fretless bass, brush drums, vintage guitar, Hammond B3; 75-95 BPM; minor 9th and 11th chords; conversational soulful vocal with runs',
      'R&B':             'contemporary R&B production; instruments: glossy synths, programmed drums, 808 sub, vocal stacks; 70-95 BPM; minor keys; sultry tenor or alto lead with airy ad-libs',
      'Drill':           'gritty street narrative, slide-808 menace; instruments: heavy sliding 808s, sparse hi-hats with skittering rolls, dark minor synth, no melody; 138-148 BPM; minor; deadpan flow',
      'Phonk':           'Memphis horror imagery, drift-car aesthetic; instruments: distorted 808, cowbell pattern, slowed Memphis chants, lo-fi vinyl crackle, demonic ad-libs; 140-160 BPM; minor; pitched-down delivery',
      'Trap':            'Atlanta trap signature — 808 melodies, triplet hats, drip imagery; instruments: 808 bass, hi-hat rolls, dark synth lead, vocal ad-libs; 130-150 BPM half-time; minor; melodic mumble or sharp staccato delivery',
      'Boom Bap':        '90s golden-era boom bap; instruments: SP-1200/MPC drums, walking upright bass loop, chopped jazz/soul sample, scratch hook; 88-96 BPM; punchy snare on the 2 and 4; lyrical conversational delivery',
      'Conscious Rap':   'social-political weight, specific narrative detail; instruments: live or sampled soul/jazz, warm sub bass, head-nodding drums; 85-95 BPM; pocket-driven; thoughtful spoken-cadence flow',
      'Hip-Hop':         'genre-spanning rap, boom-bap or modern trap as fits; rhyme-dense with internal rhyme; instruments: punchy kick-snare or trap 808s, hi-hats, chopped sample or synth hook, sub-bass; 85-100 BPM; minor keys; rhyme-dense flow with ad-libs in parens',
      'Post-Punk':       'angular guitars, claustrophobic mood; instruments: chorused-out clean guitar, melodic prominent bass, motorik drums, cold reverb; 115-145 BPM; minor; deadpan baritone delivery',
      'Shoegaze':        'wall-of-sound fuzz with melodic chord changes buried under reverb; instruments: heavily distorted shimmer-reverb guitar, dreamy synth, motorik drums, soft buried vocal; 88-115 BPM; warm major or modal',
      'Math Rock':       'odd time signatures (5/8, 7/8), tapped clean-tone interplay; instruments: bright clean tapped guitars, syncopated off-grid drums, melodic bass; 130-170 BPM; major or Lydian; conversational vocal',
      'Metal':           'heavy palm-muted riffs, double-bass drums; instruments: drop-tuned guitar, distorted bass, blast-beat or galloping drums; 90-160 BPM; minor; growl or clean wail vocal',
      'Punk':            '1-2-3-4 power chord, fast 3-chord progressions; instruments: distorted guitar, driving bass, kick-snare punk beat; 160-200 BPM; major or power chords; shouted vocal',
      'Rock':            'guitar-forward arrangement; instruments: distorted electric guitar, bass guitar, full drum kit, optional piano/organ; 100-140 BPM; major or minor; confident lead vocal',
      'Synthwave':       '80s neon-night driving aesthetic; instruments: gated reverb snares, FM bass, arpeggiated synth, hi-tom fills; 100-126 BPM; major or minor; airy vocal with chorus',
      'Hyperpop':        'pitched-up bitcrushed mania; instruments: glitched 808, pitched-up vocal stacks, sidechained supersaw, bitcrush, formant-shifted vocal chops, sudden tempo shifts; 140-180 BPM; major; manic high-register vocal',
      'Dream-Pop':       'hazy reverb-soaked melodies; instruments: shimmer-reverb guitar, soft synth pad, light drums, airy bass; 90-110 BPM; major or modal; breathy female lead',
      'Lo-Fi Hip-Hop':   'sample-based head-nod beats; instruments: vinyl-crackle drum loop, chopped piano/Rhodes sample, simple bass; 75-90 BPM; minor; spoken-word or no vocal',
      'House':           'four-on-the-floor groove; instruments: kick on every beat, hi-hat on offbeat, deep bass, soulful chord stab, vocal hook; 120-128 BPM; major or minor; soulful diva-style vocal',
      'EDM':             'big-room build/drop; instruments: supersaw lead, sub-heavy drop, snare buildup, vocal chops; 128-140 BPM; major; vocal hook then instrumental drop',
      'Gospel-House':    'church-organ stab over 4/4 house pump; instruments: Hammond B3, four-on-floor drums, gospel choir stack, hand claps; 122-128 BPM; major; testimony-style soulful vocal',
      'Gospel':          'praise & worship testimony; instruments: piano, Hammond B3, bass, drums, choir; 75-115 BPM; major; powerful run-laden vocal',
      'Blues':           '12-bar form, call-and-response phrasing; instruments: electric guitar with bends, walking bass, shuffle drums, harmonica; 70-110 BPM; dominant 7th progressions; weathered holler',
      'Jazz':            'sophisticated chord substitutions; instruments: piano or guitar comping, walking upright bass, brushed drums, optional horns; 90-130 BPM; modal or ii-V-I; smoky conversational vocal',
      'Bossa Nova':      'Brazilian samba-jazz; instruments: nylon-string guitar with the bossa pattern, soft brush drums, melodic bass, optional muted trumpet; 110-130 BPM; major 7th chords; intimate breathy vocal',
      'Amapiano':        'log-drum-driven SA house; instruments: log drum bass, shaker, soft kick, jazz piano, vocal chants; 110-115 BPM; minor; smooth groove with talk-singing',
      'Afrobeats':       'syncopated polyrhythmic groove; instruments: log drum or shekere, talking drum, melodic synth, vocal harmony stack; 100-115 BPM; major or modal; melodic patois-tinged vocal',
      'Reggaeton':       'dembow rhythm; instruments: dembow pattern (boom-ch-boom-chick), 808 bass, plucky synth, vocal ad-libs; 90-100 BPM; minor; rhythmic Spanish flow',
      'Latin':           'broad Latin; instruments: nylon guitar, congas and bongo, brass stabs, accordion; clave-driven; 95-110 BPM; major keys; warm melodic Spanish vocal',
      'Dancehall':       'reggae-derived bashment; instruments: digital reggae riddim, heavy bass, vocal ad-libs; 90-110 BPM; minor; patois delivery',
      'Reggae':          'one-drop drum pattern, offbeat skank; instruments: offbeat rhythm guitar, prominent bass, one-drop drums, optional Hammond bubble; 70-90 BPM; major or minor; conscious lyrical content',
      'K-Pop':           'maximalist genre-jumping pop; instruments: supersaw synths, punchy programmed drums, 808 sub, EDM drop and trap hi-hat section swaps, dense vocal stacks, rap break; 90-130 BPM; major; multi-voice arrangement',
      'Bedroom Pop':     'demo-aesthetic intimacy; instruments: tape-saturated everything, simple drum machine, picked guitar or keys, soft synth; 80-105 BPM; major; close-mic-ed soft vocal',
      'Indie Pop':       'jangly indie pop; instruments: chorused clean jangle guitar, melodic bass, tight live drums, tambourine, optional analog synth; 108-132 BPM; major; bright wistful vocal with harmony',
      'Pop':             'radio-ready hook focus; instruments: programmed drums, pop bass, synth or piano, vocal stacks; 100-128 BPM; major; clean lead with stacked harmony',
    };
    const lockDirective = GENRE_LOCK[flowGenreLabel] || '';
    const fusionLockDirective = flowFusionLabel ? (GENRE_LOCK[flowFusionLabel] || '') : '';

    // Pull the SONIQ brain's per-genre library into Flow's prompt — the
    // ADLIB_BIBLE / GENRE_BIBLE / VOCAL_STACK_PROFILES already encode 30+
    // genres' worth of vocabulary, structure rules, ad-lib libraries,
    // counter-melody devices, and rule-breaker outliers. Inject only the
    // sections relevant to the detected genre (and the fusion partner if
    // applicable). Keeps the prompt under 4KB instead of the full 62KB.
    let brainLibBlock = '';
    try {
      const brain = require('./_brain.js');
      const buildBrainBlock = (key, label) => {
        const gb = brain.GENRE_BIBLE && brain.GENRE_BIBLE[key];
        const ab = brain.ADLIB_BIBLE && brain.ADLIB_BIBLE[key];
        const vp = brain.VOCAL_STACK_PROFILES && brain.VOCAL_STACK_PROFILES[key];
        const bp = brain.BREATH_PROFILES && brain.BREATH_PROFILES[key];
        if (!gb && !ab && !vp && !bp) return '';
        const parts = [`──── ${label} (${key}) ────`];
        if (gb && gb.dna) parts.push('DNA: ' + gb.dna);
        if (gb && gb.structure) parts.push('STRUCTURE: ' + gb.structure);
        if (gb && gb.keys && gb.keys.length) parts.push('CORE RULES:\n- ' + gb.keys.join('\n- '));
        if (gb && gb.counter && gb.counter.device) {
          parts.push('COUNTER-MELODY: ' + gb.counter.device + ' — ' + (gb.counter.does || ''));
        }
        if (gb && gb.vocables) {
          parts.push('VOCABLES (brain canonical): ' + gb.vocables.sounds + ' — placement: ' + (gb.vocables.notes || gb.vocables.when || ''));
        }
        if (ab) {
          const adlibLine = 'AD-LIBS (use these — do NOT invent new ones for this genre): '
            + ab.sounds.map(s => `(${s})`).join(' ')
            + ' | placement: ' + (ab.placement || '')
            + ' | density: ' + (ab.density || 'medium')
            + (ab.example ? ' | example: ' + ab.example : '')
            + (ab.outro ? ' | outro: ' + ab.outro : '');
          parts.push(adlibLine);
        }
        if (vp) {
          const v = vp;
          const vocalLine = 'VOCAL STACK: '
            + (v.lead ? 'lead = ' + v.lead + '; ' : '')
            + (v.harmony ? 'harmony = ' + v.harmony + '; ' : '')
            + (v.adlib ? 'ad-lib = ' + v.adlib + '; ' : '')
            + (v.notes ? 'notes = ' + v.notes : '');
          parts.push(vocalLine);
        }
        if (bp && (bp.technique || bp.notes)) {
          parts.push('BREATH/PHRASING: ' + (bp.technique || '') + (bp.notes ? ' — ' + bp.notes : ''));
        }
        if (gb && gb.outliers && gb.outliers.length) {
          const o = gb.outliers[0];
          if (o && o.song && o.rule) {
            parts.push('RULE-BREAKER REFERENCE (do not name in lyrics, study the move): ' + o.song + ' — ' + o.rule);
          }
        }
        return parts.join('\n');
      };
      const primaryBlock = buildBrainBlock(brainGenre, flowGenreLabel);
      const fusionBlock = flowClassification.fusion ? buildBrainBlock(flowClassification.fusion.brainKey, flowClassification.fusion.label) : '';
      brainLibBlock = [primaryBlock, fusionBlock].filter(Boolean).join('\n\n');
    } catch (e) {
      // brain unavailable — proceed without it, the GENRE_LOCK still carries the weight
      console.error('[flow-song] brain library extract failed:', e && e.message);
    }

    // Build a deterministic Suno-ready style prompt from the classification
    // so the user always has SOMETHING in the "Song Prompt" tab — no extra
    // AI call required.
    const sunoPromptParts = [];
    // Loop-anchor audio transform leads the prompt when active — the bracket-
    // tagged motif (e.g. "[chopped soul vocal sample, pitched +5 semitones,
    // vinyl crackle, MPC swing]") is the song's primary sonic identity and
    // Suno reads bracketed style tokens at the front with the highest weight.
    let _laTransform = null;
    if (flowAnchorPhrase) {
      try {
        _laTransform = _laSelectAnchorTransform({
          genre: brainGenre,
          substyle: spec && spec.substyle,
          mood: brainMood,
        });
        // Lead with the audio-transform bracket string (verbatim, including
        // brackets — Suno parses these as production tags).
        if (_laTransform && _laTransform.sunoStylePrefix) {
          sunoPromptParts.push(_laTransform.sunoStylePrefix);
        }
      } catch (_) { /* fall through — non-fatal if module load fails */ }
    }
    sunoPromptParts.push(flowGenreLabel.toLowerCase());
    if (flowFusionLabel) sunoPromptParts.push('blended with ' + flowFusionLabel.toLowerCase());
    // BPM / key: prefer explicit spec, else pull from the genre lock so the
    // front-loaded string always carries tempo + key (Suno weights these high).
    const _lockBpm = (lockDirective.match(/(\d+\s*-\s*\d+|\d+)\s*BPM/i) || [])[1];
    const _lockKey = (lockDirective.match(/\b([A-G][#b]?\s*(?:minor|major|modal|Dorian|Mixolydian|Lydian))\b/i) || [])[1];
    if (spec.tempo) sunoPromptParts.push(spec.tempo + ' BPM');
    else if (_lockBpm) sunoPromptParts.push(_lockBpm.replace(/\s+/g, '') + ' BPM');
    if (spec.key) sunoPromptParts.push(spec.key);
    else if (_lockKey) sunoPromptParts.push(_lockKey.trim());
    // Instruments BEFORE vocal — instruments are more sound-defining, so they
    // earn the higher front-loaded weight. Dedup the instrument list against
    // the loop-anchor bracket prefix so tokens (e.g. "pedal steel",
    // "vinyl crackle") aren't printed twice and diluted.
    const instMatch = lockDirective.match(/instruments?:\s*([^;]+)/i);
    if (instMatch) {
      let inst = instMatch[1].trim();
      if (_laTransform && _laTransform.sunoStylePrefix) {
        const seen = _laTransform.sunoStylePrefix.toLowerCase();
        inst = inst.split(',').map(s => s.trim())
          .filter(tok => tok && !seen.includes(tok.toLowerCase().split(/\s+/)[0]))
          .join(', ');
      }
      if (inst) sunoPromptParts.push(inst);
    }
    if (spec.vocal) sunoPromptParts.push(spec.vocal);
    sunoPromptParts.push(brainMood.toLowerCase());
    // User excludes are deliberately NOT pushed into this positive style string.
    // Suno parses "avoid: x" as POSITIVE tokens — an inline "avoid: autotune"
    // SUMMONS autotune. Excludes flow only through the sanitized excludeStyles
    // field (vocalDescriptors.negativeAdd → _brain.js) and the brain _avoidLine.
    // Reinforce the loop anchor — phrase + motif role in plain English.
    if (flowAnchorPhrase) {
      sunoPromptParts.push('vocal phrase "' + flowAnchorPhrase + '" loops as the central motif');
    }
    // Atomize instrument/mood lists, dedup tokens, drop empties; keep
    // structured parts (bracket prefix, "vocal phrase …") whole.
    const _seenTok = new Set();
    let generatedSunoPrompt = sunoPromptParts
      .filter(Boolean)
      .flatMap(p => (p.startsWith('[') || p.startsWith('vocal phrase'))
        ? [p]
        : p.split(',').map(s => s.trim()))
      .filter(tok => { const k = tok.toLowerCase(); if (!tok || _seenTok.has(k)) return false; _seenTok.add(k); return true; })
      .join(', ');
    // Cap the style string — Suno front-loads, so trailing tokens dilute the
    // genre/BPM/instrument signal. Generous cap (only trims genuine bloat);
    // never cut mid-token.
    const SUNO_MAX = 300;
    if (generatedSunoPrompt.length > SUNO_MAX) {
      const toks = generatedSunoPrompt.split(', ');
      let out = '';
      for (const t of toks) { if ((out ? out + ', ' + t : t).length > SUNO_MAX) break; out = out ? out + ', ' + t : t; }
      generatedSunoPrompt = out || generatedSunoPrompt.slice(0, SUNO_MAX);
    }

    // ═══════════════════════════════════════════════════════════════
    // PRIMARY PATH: call the SONIQ brain's buildSongPrompt — same engine
    // Lucky and Write use. This injects buildGenreAgentSystem(genre) as
    // the system prompt ("You are a world-class [genre] songwriter")
    // which is the structural anchor that prevents genre drift, plus
    // SUBSTYLE_LOCK + PRODUCTION_LOCK + TYPE 3 bracket mandate baked in.
    // length: 'short' keeps the response within Vercel's 60s budget.
    // ═══════════════════════════════════════════════════════════════
    let built;
    try {
      const brain = require('./_brain.js');
      built = brain.buildSongPrompt({
        genre: brainGenre,
        // Subgenre drives the brain's SUBSTYLE_NOTES + SUBSTYLE_LOCK so the
        // lyrics/structure reflect the actual subtype (Drill/Boom Bap/Phonk/…),
        // not a generic parent-genre song.
        substyle: flowSubstyle,
        // Cross-genre fusion ("hip hop and rock") → secondary-genre blend so
        // the brain folds in the other genre's DNA instead of ignoring it.
        blend: flowClassification.fusion
          ? { genre2: flowClassification.fusion.brainKey, ratio: 65 }
          : {},
        topic: flowConcept,
        mood: brainMood,
        vocal: spec.vocal || 'any',
        structure: 'standard',
        era: 'current',
        length: 'short',
        // Emit only the 3 brief sections Flow surfaces (Arrangement / Vocal /
        // Sonic References), skipping the heavy production-brief tail so the
        // response completes those sections inside Flow's tight token+time budget.
        leanBrief: true,
        quality: flowAllowPlatinum ? 'viral' : 'high',
        bracketMode: 'suno',
        platform: 'suno',
        platinum: flowAllowPlatinum,
        lyricTier: flowAllowPlatinum ? 'street' : 'radio',
        isAdmin: isAdmin,
        plan: flowPlan,
        // Flow omits the craft dropdowns Lucky's path exposes — auto-set
        // server-side so flow-song songs get the same quality levers.
        //   emotionalVelocity: 'auto' → brain resolves to the genre default.
        //   surprise: {} object → brain's selectSurpriseMoves runs in full
        //     auto mode (genre/mood-scored move picks). Same shape Lucky and
        //     Write pass; absent fields default safely inside the engine.
        emotionalVelocity: 'auto',
        surprise: { intensity: 'medium', autoMode: true },
        // Forward user excludes to the brain so they get merged into the
        // resolved genre profile's negative tag list inside _vocal-descriptors.js
        // (works for every genre — the merge is genre-agnostic).
        vocalDescriptors: flowExclude.length
          ? { autoMode: true, negativeAdd: flowExclude }
          : { autoMode: true },
        loopAnchor: flowAnchorPhrase ? { phrase: flowAnchorPhrase } : undefined,
      });
      if (!built || !built.system || !built.prompt) throw new Error('Brain returned empty prompt');
    } catch (brainErr) {
      console.error('[flow-song] brain.buildSongPrompt failed, falling back to lean prompt:', brainErr && brainErr.message);
      // Lean fallback ONLY if brain require fails. Keeps Flow alive even
      // if _brain.js has a load-time issue.
      const _avoidLine = flowExclude.length
        ? `\n\nSTRICTLY AVOID these styles/sounds/techniques anywhere in the lyrics, production hints, or section tags: ${flowExclude.join(', ')}.`
        : '';
      const _anchorLine = flowAnchorPhrase
        ? `\n\nThe phrase "${flowAnchorPhrase}" MUST appear in the chorus verbatim and loop in the outro.`
        : '';
      built = { system: 'You are a world-class songwriter. Write ONE complete, performance-ready 3-minute song.',
                prompt: `Write a complete 3-minute ${flowGenreLabel} song about: ${flowConcept}\n\nFirst line MUST be [Verse 1]. Tag every section. Lyrics only.${_avoidLine}${_anchorLine}` };
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
        2200,                    // 3-min song (~1500 tok) + lean brief tail (Arrangement/Vocal/Sonic Refs, ~350 tok); headroom so the 3 surfaced sections finish, not truncate
        52000,                   // sit under Vercel's 60s ceiling with headroom for POST-processing (section parse, Suno-settings, rate-limit increment, serialization) — a song runs ~35-40s, fallback needs near-full budget, but the AI call must leave ~8s so a slow-but-valid completion + a slow Supabase round-trip don't tip the whole function past 60s and 500
      );
      console.log('[flow-song] ai-ok', { ms: Date.now() - t0, lyricChars: lyrics.length });
    } catch (e) {
      console.error('[flow-song] ai-fail', {
        ms: Date.now() - t0,
        msg: e && e.message,
        stack: e && e.stack && e.stack.split('\n').slice(0,3).join(' | '),
      });
      // No usage was incremented yet (that happens further down only on success),
      // so the user is not charged. Surface that to them in the error.
      return res.status(500).json({
        error: (e && e.message) || 'Lyric generation failed',
        notCharged: true,
        message: 'No song generated — you were not charged. Try again.',
      });
    }

    // Use the Suno prompt from the spec call — it's already grounded in
    // the same concept and avoids a second sequential AI call that was
    // pushing flow-song past Vercel's 60s ceiling. A future improvement
    // could move Suno-regen to a separate client-fired mode like flow-score.
    // Scrub two kinds of noise from any user-facing prompt text:
    //   1. Real artist-name references the model occasionally slips in
    //      ("like X", "in the style of Y", "X vibes")
    //   2. Meta / compliance lines the brain asks the model to include
    //      ("⚠️ SUNO COMPLIANCE CHECK: Zero artist names below", any
    //      line starting with ⚠️, "COMPLIANCE:" / "RULES:" / "DO NOT")
    const scrubArtistRefs = (s) => String(s || '')
      // Strip whole lines that are model-facing compliance reminders
      .replace(/^[ \t]*⚠️[^\n]*\n?/gm, '')
      .replace(/^[ \t]*(?:SUNO COMPLIANCE|COMPLIANCE CHECK|COMPLIANCE|RULES|DO NOT|REMEMBER|NOTE TO MODEL)[^\n]*\n?/gmi, '')
      .replace(/\b(?:like|à la|a la|in the style of|reminiscent of|à la|feat\.?|featuring|inspired by)\s+[A-Z][A-Za-z0-9.'’&\- ]{1,40}/g, '')
      .replace(/\b[A-Z][A-Za-z0-9.'’\-]+(?:\s+[A-Z][A-Za-z0-9.'’\-]+){0,2}\s+(?:vibes?|sound|feel|energy|era)\b/g, (m) => m.replace(/^[A-Z][A-Za-z0-9.'’\-]+(?:\s+[A-Z][A-Za-z0-9.'’\-]+){0,2}\s+/, ''))
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+,/g, ',')
      .replace(/,\s*,/g, ',')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
    let sunoPrompt = scrubArtistRefs(spec.sunoPrompt || generatedSunoPrompt || '');
    // Also scrub the CORE PROMPT / SONG PROMPT block embedded in the lyrics response
    lyrics = lyrics.replace(/((?:CORE|SONG) PROMPT:\s*\n?)([^\n]+(?:\n[^\nA-Z][^\n]*)*)/i, (full, header, body) => header + scrubArtistRefs(body));

    // Score moved to a separate client-fired `flow-score` call to keep this
    // request under Vercel's 60s function timeout. The client renders the
    // song immediately, then asynchronously requests the score.

    // Charge the song against the user's monthly quota (same as normal generate)
    if (!isAdmin && isFinite(flowLimit)) {
      const ttl = flowIsLifetime ? 10 * 365 * 24 * 3600 : 32 * 24 * 3600;
      redisIncrExpire(flowRedisKey, ttl);
    }

    // Per-song Suno "Exclude Styles" value — genre defaults + the user's typed
    // excludes + the genre's vocal anti-defaults. Surfaced so the user can paste
    // it straight into Suno's Exclude Styles box (the reliable way to exclude,
    // vs. a prose AVOID line in the prompt that Suno may ignore).
    let flowExcludeStyles = [];
    try {
      flowExcludeStyles = require('./_brain.js').buildSunoSettings({
        genre: brainGenre,
        mood: brainMood,
        substyle: flowSubstyle,
        userExcludes: flowExclude,
      }).excludeStyles || [];
    } catch (_) { /* non-fatal — omit the exclude field if the brain is unavailable */ }

    return res.status(200).json({
      title: spec.title || (flowConcept.split(/[.,—–\-]/)[0] || 'Untitled').trim().slice(0, 60),
      lyrics: lyrics.trim(),
      sunoPrompt: sunoPrompt,
      excludeStyles: flowExcludeStyles,
      // Resolved genre so the UI can show the real subgenre/fusion the brain
      // wrote (not the client's coarse reveal-animation guess).
      genre: flowGenreLabel,
      fusion: flowFusionLabel || null,
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
      // 3-field rubric fits cleanly and parses every time.
      const fbText = await flowCallAI(
        [{ role: 'user', content:
          `Genre: ${brainGenre}\nConcept: ${sTopic}\n\nLYRICS:\n${sLyrics}\n\n` +
          `Score this song on two axes, 0-100 each (50=workable, 70=strong, 85=hit):\n` +
          `- hookScore: chorus/hook strength — memorability, payoff, sing-along potential.\n` +
          `- songScore: overall song quality — structure, lyric craft, concept execution, prompt-readiness.\n` +
          `Return ONLY one JSON line: {"hookScore":<int>,"songScore":<int>,"verdict":"<one sentence ≤140 chars: what works AND one specific thing to sharpen>"}`
        }],
        `You are SONIQ's song coach. Honest, terse, one-shot scoring. Output strict JSON only — no markdown, no preamble.`,
        240,
        20000,
      );
      const cleaned = fbText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      let scoreData = null;
      try { scoreData = JSON.parse(cleaned); } catch (e) {}
      if (!scoreData || typeof scoreData.hookScore !== 'number') {
        return res.status(502).json({ error: 'Score parse failed' });
      }
      // songScore is new — if the model omitted it, fall back to hookScore so
      // the client always has a number to render rather than dashes.
      if (typeof scoreData.songScore !== 'number') {
        scoreData.songScore = scoreData.hookScore;
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

  // Try OpenRouter first (the funded primary), then Anthropic as fallback
  if (openrouterKey) {
    try {
      const text = await callOpenRouter(openrouterKey, messages, system, max_tokens);
      recordUsage();
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      if (err.message === 'CREDITS_LOW' && !anthropicKey) {
        return res.status(402).json({error: 'Your OpenRouter credit balance is too low. Add credits at openrouter.ai/settings/credits to continue.'});
      }
      console.error('OpenRouter failed, trying fallback:', err.message);
      errors.push('OpenRouter: ' + (err.message === 'CREDITS_LOW' ? 'credit balance too low' : err.message));
    }
  }

  if (anthropicKey) {
    try {
      const text = await callAnthropic(anthropicKey, messages, system, max_tokens);
      recordUsage();
      return res.status(200).json({content:[{type:'text', text}]});
    } catch(err) {
      console.error('Anthropic failed:', err.message);
      errors.push('Anthropic: ' + err.message);
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

// Top-level safety net. Without this, ANY uncaught throw in the handler
// (post-AI section parsing, a slow Supabase round-trip, serialization, a
// function timeout) escapes to Vercel, which then returns its own
// object-shaped platform error — { error: { code: 'FUNCTION_INVOCATION_FAILED',
// message } }. The client used to print that object as the useless
// "[HTTP 500] [object Object]". This converts any such crash into a clean
// JSON body with a STRING `error`, so the client always has a real message.
// CORS headers are set at the very top of the handler before anything can
// throw, so the error response still carries them.
module.exports = async function handler(req, res) {
  try {
    return await _generateHandler(req, res);
  } catch (e) {
    console.error('[generate] uncaught handler error:', (e && e.stack) || e);
    if (res.headersSent) return;
    if (!res.getHeader || !res.getHeader('Access-Control-Allow-Origin')) {
      const origin = (req.headers && req.headers.origin) || '';
      const allowed = ['https://www.mysoniq.com', 'https://mysoniq.com', 'https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
      res.setHeader('Access-Control-Allow-Origin', allowed.includes(origin) ? origin : 'https://www.mysoniq.com');
      res.setHeader('Vary', 'Origin');
    }
    return res.status(500).json({
      error: (e && e.message) ? String(e.message) : 'Server error',
      message: 'Something went wrong generating your song — you were not charged. Please try again.',
      notCharged: true,
    });
  }
};
