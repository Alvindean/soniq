/**
 * SONIQ — Audio Render module  ("make the actual song")
 * ---------------------------------------------------------------------------
 * Turns the { lyrics, sunoPrompt/style, title } that generate.js already
 * produces into a rendered mp3 via a Suno-wrapper provider (sunoapi.org).
 *
 * HOSTED, NOT A FUNCTION. SONIQ is on Vercel Hobby AT the 12-serverless-function
 * cap, so this is an underscore module (never deployed as its own function).
 * api/track.js delegates here when a request carries header `X-Soniq-Mod: render`
 * — exactly the pattern Frequency Mode uses (`X-Soniq-Mod: freq`).
 *
 * FAIL-CLOSED — nothing here can charge the account unless BOTH are true:
 *   1. env SONIQ_AUDIO_LIVE === '1'      (master kill-switch, default OFF)
 *   2. the active provider's API key is set (e.g. SUNO_API_KEY)
 * With either missing, submit() returns a clean 503 and the UI shows
 * "coming soon" — zero paid calls. Honors [[feedback_no_paid_test_runs]].
 *
 * Async model: Suno renders take 20s–2min, which blows Vercel's 60s ceiling,
 * so we DON'T block. submit() returns a taskId fast; the browser polls
 * status() (a fast GET) every ~10s. No Queue / Worker needed for the MVP —
 * the provider hosts the mp3 and we hand back its audioUrl.
 *
 * Provider contract (verified, docs.sunoapi.org 2026-06; mirrors render-spike.mjs):
 *   submit: POST {base}/api/v1/generate
 *           { customMode, instrumental, callBackUrl, model, prompt(=lyrics),
 *             style(=sunoPrompt), title } -> { code:200, data:{ taskId } }
 *   status: GET  {base}/api/v1/generate/record-info?taskId=...
 *           -> data.status, data.response.sunoData[].audioUrl (2 songs/task)
 *
 * Request shape (POST /api/track with header X-Soniq-Mod: render):
 *   { action:'submit', lyrics, style, title, instrumental?, model? } -> { taskId }
 *   { action:'status', taskId }                                       -> { state, done, songs[] }
 */

const { createClient } = require('@supabase/supabase-js');

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// ── master gate (read inside the handler so it's always live, never stale) ──
function audioLive() { return process.env.SONIQ_AUDIO_LIVE === '1'; }
function providerName() { return (process.env.SONIQ_AUDIO_PROVIDER || 'suno').toLowerCase(); }

// Monthly render allowance per plan. Renders are EXPENSIVE (~$0.10–0.40 each,
// returns 2 songs) so these are deliberately tighter than the song-writing
// quota in stream.js. Free = paid feature, 0 renders. Easy to tune.
const RENDER_LIMITS = {
  free:                0,
  founding_t2:         5,   founding_t2_annual:  5,
  founding_t1:        10,   founding_t1_annual: 10,
  pro:                15,   pro_annual:         15,
  studio:             40,   studio_annual:      40,
  founding:           40,   // legacy
};

const ADMIN_EMAILS = new Set(['thealvindean@gmail.com', 'lamusicproducers8@gmail.com', 'amdesousa.exo@gmail.com']);

// ── tiny helpers (self-contained — this module is require()'d, not a function) ─
function getSupabase(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { global: { headers: token ? { Authorization: `Bearer ${token}` } : {} } });
}

function getThisMonth() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

async function redisGet(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(key)}`, { headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` } });
    const d = await r.json();
    return d.result;
  } catch (e) { console.error('Render redisGet error:', e.message); return null; }
}

async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  try {
    await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${UPSTASH_TOKEN}` },
      body: JSON.stringify(commands),
    });
  } catch (e) { console.error('Render redisPipeline error:', e.message); }
}

// ── provider abstraction ────────────────────────────────────────────────────
// Each provider: { key, configured(), submit(payload)->{taskId}, status(taskId)->{state,done,failed,songs} }
// Swap Suno↔ElevenLabs↔ACE-Step by adding an entry and flipping SONIQ_AUDIO_PROVIDER.
const SUNO = {
  base: process.env.SUNO_API_BASE || 'https://api.sunoapi.org',
  get key() { return process.env.SUNO_API_KEY || ''; },
  configured() { return !!this.key; },
  H() { return { Authorization: `Bearer ${this.key}`, 'Content-Type': 'application/json' }; },

  async submit({ lyrics, style, title, instrumental, model }) {
    const body = {
      customMode:   true,
      instrumental: !!instrumental,
      callBackUrl:  process.env.SUNO_CALLBACK_URL || 'https://www.mysoniq.com/api/track', // we poll; field is required
      model:        model || process.env.SUNO_MODEL || 'V4_5',
      prompt:       instrumental ? '' : (lyrics || ''),
      style:        style || '',
      title:        (title || 'SONIQ Song').slice(0, 80),
    };
    const r = await fetch(`${this.base}/api/v1/generate`, { method: 'POST', headers: this.H(), body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.code !== 200 || !j?.data?.taskId) {
      const msg = j.msg || j.message || `provider ${r.status}`;
      const err = new Error(msg); err.providerStatus = r.status; throw err;
    }
    return { taskId: j.data.taskId };
  },

  async status(taskId) {
    const r = await fetch(`${this.base}/api/v1/generate/record-info?taskId=${encodeURIComponent(taskId)}`, { headers: this.H() });
    const j = await r.json().catch(() => ({}));
    const state = j?.data?.status || 'UNKNOWN';
    const FAIL = new Set(['CREATE_TASK_FAILED', 'GENERATE_AUDIO_FAILED', 'CALLBACK_EXCEPTION', 'SENSITIVE_WORD_ERROR']);
    const raw = j?.data?.response?.sunoData || [];
    const songs = raw.filter(s => s && s.audioUrl).map(s => ({
      id:         s.id || null,
      audioUrl:   s.audioUrl,
      imageUrl:   s.imageUrl || s.image_url || null,
      title:      s.title || null,
      duration:   s.duration || null,
    }));
    return {
      state,
      failed: FAIL.has(state),
      done:   state === 'SUCCESS' && songs.length > 0,
      songs,
      errorMessage: j?.data?.errorMessage || '',
    };
  },
};

const PROVIDERS = { suno: SUNO };
function activeProvider() { return PROVIDERS[providerName()] || SUNO; }

// ── HTTP handler (called by track.js after it sets CORS) ─────────────────────
module.exports = async function renderHandler(req, res) {
  // track.js already set permissive CORS + handled OPTIONS, but be defensive.
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  // ── master kill-switch (fail-closed) ──
  if (!audioLive()) {
    return res.status(503).json({
      error: 'audio_render_disabled',
      message: 'Audio rendering is coming soon. Your lyrics + song prompt are ready to paste into Suno now.',
    });
  }
  const provider = activeProvider();
  if (!provider.configured()) {
    return res.status(503).json({
      error: 'audio_render_unconfigured',
      message: 'Audio rendering is being set up. Check back shortly.',
    });
  }

  // ── auth ──
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'auth_required', message: 'Sign in to produce songs' });
  const supabase = getSupabase(token);
  if (!supabase) return res.status(503).json({ error: 'db_unavailable' });
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'auth_required', message: 'Sign in to produce songs' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return res.status(400).json({ error: 'bad_json' }); }
  const action = body.action;

  // ── plan + render quota ──
  let plan = 'free';
  try {
    const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single();
    if (profile?.plan) plan = profile.plan;
  } catch (e) { console.error('Render profile fetch error:', e.message); }
  const isAdmin = ADMIN_EMAILS.has(user.email);
  const limit = isAdmin ? Infinity : (RENDER_LIMITS[plan] ?? 0);
  const quotaKey = `soniq:renderlimit:monthly:${user.id}:${getThisMonth()}`;

  // ─────────────────────────────────────────────────────────────
  // ACTION: submit — kick off a render (consumes 1 from the monthly quota)
  // ─────────────────────────────────────────────────────────────
  if (action === 'submit') {
    if (isFinite(limit)) {
      if (limit <= 0) {
        return res.status(402).json({
          error: 'render_not_in_plan',
          message: 'Producing finished audio is a paid feature. Upgrade to render your song to mp3.',
          plan,
        });
      }
      const used = parseInt(await redisGet(quotaKey) || '0', 10);
      if (used >= limit) {
        return res.status(429).json({
          error: 'render_limit_reached',
          message: `You've used all ${limit} of this month's renders. They reset next month, or upgrade for more.`,
          limit, plan,
        });
      }
    }

    const lyrics = typeof body.lyrics === 'string' ? body.lyrics.slice(0, 5000) : '';
    const style  = typeof body.style  === 'string' ? body.style.replace(/[^\x20-\x7E]/g, ' ').trim().slice(0, 1000) : '';
    const title  = typeof body.title  === 'string' ? body.title.slice(0, 80) : 'SONIQ Song';
    const instrumental = !!body.instrumental;
    // Accept any sane Suno model id (e.g. V4_5, V4_5ALL, V5, V3_5); else let the
    // provider apply its default. Pattern-guarded so we never forward junk.
    const model  = (typeof body.model === 'string' && /^V[0-9][0-9A-Z_]{0,9}$/.test(body.model)) ? body.model : undefined;

    if (!instrumental && lyrics.trim().length < 20) {
      return res.status(400).json({ error: 'lyrics_required', message: 'Generate a song first, then produce it.' });
    }
    if (!style) {
      return res.status(400).json({ error: 'style_required', message: 'A song prompt is required to render.' });
    }

    let taskId;
    try {
      ({ taskId } = await provider.submit({ lyrics, style, title, instrumental, model }));
    } catch (e) {
      console.error('Render submit error:', e.message);
      return res.status(502).json({ error: 'provider_error', message: 'The render service rejected the request. Try again in a moment.', detail: e.message });
    }

    // Consume quota only on a successful submit. Expire 60 days out (covers
    // month rollover slack); the key is month-scoped so it self-cleans.
    if (isFinite(limit)) {
      await redisPipeline([['INCR', quotaKey], ['EXPIRE', quotaKey, 60 * 24 * 3600]]);
    }
    // Analytics
    const today = new Date().toISOString().slice(0, 10);
    await redisPipeline([
      ['INCR', 'soniq:total_renders'],
      ['HINCRBY', `soniq:events:daily:${today}`, 'render_submitted', '1'],
    ]);

    const usedNow = isFinite(limit) ? (parseInt(await redisGet(quotaKey) || '0', 10)) : null;
    return res.status(200).json({
      ok: true, taskId, provider: providerName(),
      remaining: isFinite(limit) ? Math.max(0, limit - (usedNow ?? 0)) : null,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // ACTION: status — poll a render (free; does not touch quota)
  // ─────────────────────────────────────────────────────────────
  if (action === 'status') {
    const taskId = typeof body.taskId === 'string' ? body.taskId.trim() : '';
    if (!taskId) return res.status(400).json({ error: 'taskId_required' });
    try {
      const st = await provider.status(taskId);
      if (st.done) {
        await redisPipeline([['INCR', 'soniq:total_renders_done']]);
      }
      return res.status(200).json({ ok: true, ...st });
    } catch (e) {
      console.error('Render status error:', e.message);
      return res.status(502).json({ error: 'provider_error', message: 'Could not check render status. Retrying…', detail: e.message });
    }
  }

  return res.status(400).json({ error: 'unknown_action', received: action });
};
