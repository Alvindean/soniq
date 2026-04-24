/**
 * SONIQ — Song tracking & analytics endpoint
 * POST /api/track
 *
 * Actions:
 *   save    — persist song metadata to Supabase songs table
 *   like    — toggle like on a song (increments/decrements like_count)
 *   play    — increment play_count for a song
 *   publish — record a publish/lease event tied to a song
 *
 * All writes also fan out to Redis for real-time analytics.
 */

const { createClient } = require('@supabase/supabase-js');

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

function getSupabase(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  });
}

async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  try {
    await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${UPSTASH_TOKEN}` },
      body: JSON.stringify(commands)
    });
  } catch (e) {
    console.error('Redis pipeline error:', e.message);
  }
}

async function redisCmd(...args) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/${args.map(encodeURIComponent).join('/')}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    const d = await r.json();
    return d.result ?? null;
  } catch (e) {
    console.error('Redis cmd error:', e.message);
    return null;
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

  // Auth
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'auth_required' });

  const supabase = getSupabase(token);
  if (!supabase) return res.status(503).json({ error: 'db_unavailable' });

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'auth_required' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return res.status(400).json({ error: 'bad_json' }); }

  const { action, song } = body;

  // ─────────────────────────────────────────────────────────────
  // ACTION: save — insert or upsert song into songs table
  // ─────────────────────────────────────────────────────────────
  if (action === 'save') {
    if (!song) return res.status(400).json({ error: 'song_required' });

    const row = {
      id:              song.id   || undefined,   // client-generated nanoid/timestamp id
      user_id:         user.id,
      title:           (song.title  || 'Untitled').slice(0, 200),
      genre:           (song.genre  || '').slice(0, 50),
      topic:           (song.topic  || '').slice(0, 200),
      mood:            (song.mood   || '').slice(0, 100),
      lyrics:          (song.lyrics || '').slice(0, 12000),
      style_prompt:    (song.style  || '').slice(0, 600),
      visual_prompt:   (song.visualPrompt || '').slice(0, 400),
      video_prompt:    (song.videoPrompt  || '').slice(0, 600),
      production_brief:(song.brief || '').slice(0, 4000),
      chord_data:      (song.chords || '').slice(0, 2000),
      theory_analysis: (song.theoryAnalysis || '').slice(0, 2000),
      director_notes:  (song.notes || '').slice(0, 1000),
      countermelody:   (song.countermelody || '').slice(0, 500),
      verdict:         (song.verdict || '').slice(0, 400),
      quality_score:   typeof song.score === 'number' ? Math.min(100, Math.max(0, song.score)) : null,
      generation_params: (song.params || song.sunoSettings)
        ? JSON.stringify(Object.assign({}, song.params || {}, song.sunoSettings ? { sunoSettings: song.sunoSettings } : {}))
        : null,
      like_count:      0,
      play_count:      0,
      created_at:      new Date().toISOString(),
    };

    // Strip undefined
    Object.keys(row).forEach(k => row[k] === undefined && delete row[k]);

    const { data: saved, error: saveErr } = await supabase
      .from('songs')
      .upsert(row, { onConflict: 'id' })
      .select('id')
      .single();

    if (saveErr) {
      // Table may not exist yet — return soft error so client doesn't break
      console.error('Song save error:', saveErr.message);
      return res.status(200).json({ ok: false, warning: 'songs_table_unavailable', detail: saveErr.message });
    }

    // Redis: fan out analytics
    const today = new Date().toISOString().slice(0, 10);
    await redisPipeline([
      ['INCR', 'soniq:total_songs'],
      ['ZINCRBY', 'soniq:genres:top', '1', song.genre || 'unknown'],
      ['ZINCRBY', 'soniq:topics:top', '1', (song.topic || '').slice(0, 50)],
      ['HINCRBY', `soniq:events:daily:${today}`, 'song_saved', '1'],
      ['LPUSH', 'soniq:recent', JSON.stringify({ type: 'song_saved', genre: song.genre, topic: (song.topic || '').slice(0, 50), ts: Date.now() })],
      ['LTRIM', 'soniq:recent', '0', '49']
    ]);

    return res.status(200).json({ ok: true, id: saved?.id || row.id });
  }

  // ─────────────────────────────────────────────────────────────
  // ACTION: like — toggle like (idempotent per user per song)
  // On new like: also update Suno-settings learning aggregates
  // (Redis hashes per genre×mood, both user-scoped and global) so
  // future generations can bias toward what this user — and the
  // community — actually keeps.
  // ─────────────────────────────────────────────────────────────
  if (action === 'like') {
    const { songId } = body;
    if (!songId) return res.status(400).json({ error: 'songId_required' });

    // Check if already liked (Redis set per user)
    const likeKey = `soniq:likes:${user.id}`;
    const alreadyLiked = await redisCmd('SISMEMBER', likeKey, songId);

    let delta;
    if (alreadyLiked) {
      // Unlike
      await redisPipeline([
        ['SREM', likeKey, songId],
        ['HINCRBY', `soniq:song:${songId}`, 'like_count', '-1'],
      ]);
      delta = -1;
    } else {
      // Like
      await redisPipeline([
        ['SADD', likeKey, songId],
        ['EXPIRE', likeKey, 365 * 24 * 3600],
        ['HINCRBY', `soniq:song:${songId}`, 'like_count', '1'],
      ]);
      delta = 1;

      // ── Suno Settings learning feedback ──
      // Accepts song metadata directly in the like payload (client passes from
      // currentSong state) so we don't need a Supabase read on every like.
      // Falls back to fetching from songs table if payload is sparse.
      try {
        let sunoSettings = body.sunoSettings;
        let genre = body.genre;
        let mood  = body.mood;
        if ((!sunoSettings || !genre) && supabase && songId) {
          const { data: songRow } = await supabase
            .from('songs')
            .select('genre,mood,generation_params')
            .eq('id', songId)
            .eq('user_id', user.id)
            .maybeSingle();
          if (songRow) {
            genre = genre || songRow.genre;
            mood  = mood  || songRow.mood;
            if (!sunoSettings && songRow.generation_params) {
              try {
                const gp = typeof songRow.generation_params === 'string'
                  ? JSON.parse(songRow.generation_params)
                  : songRow.generation_params;
                if (gp && gp.sunoSettings) sunoSettings = gp.sunoSettings;
              } catch {}
            }
          }
        }
        if (genre && sunoSettings && typeof sunoSettings.weirdness === 'number' && typeof sunoSettings.styleInfluence === 'number') {
          const mkey = ((mood || '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20)) || 'any';
          const userKey   = `soniq:sunolearn:u:${user.id}:g:${genre}:m:${mkey}`;
          const globalKey = `soniq:sunolearn:g:${genre}:m:${mkey}`;
          const TTL = 180 * 24 * 3600; // 6-month rolling window
          const w = Math.max(0, Math.min(100, Math.round(sunoSettings.weirdness)));
          const s = Math.max(0, Math.min(100, Math.round(sunoSettings.styleInfluence)));
          await redisPipeline([
            ['HINCRBY', userKey, 'w_sum', String(w)],
            ['HINCRBY', userKey, 's_sum', String(s)],
            ['HINCRBY', userKey, 'count', '1'],
            ['EXPIRE', userKey, String(TTL)],
            ['HINCRBY', globalKey, 'w_sum', String(w)],
            ['HINCRBY', globalKey, 's_sum', String(s)],
            ['HINCRBY', globalKey, 'count', '1'],
            ['EXPIRE', globalKey, String(TTL)]
          ]);
        }
      } catch (e) {
        console.error('Suno learning update failed:', e.message);
      }
    }

    // Also update Supabase if song row exists
    if (supabase) {
      supabase.rpc('increment_song_counter', { song_id: songId, column_name: 'like_count', delta })
        .then(() => {}).catch(() => {}); // fire-and-forget
    }

    return res.status(200).json({ ok: true, liked: !alreadyLiked, delta });
  }

  // ─────────────────────────────────────────────────────────────
  // ACTION: play — increment play count (fire-and-forget)
  // ─────────────────────────────────────────────────────────────
  if (action === 'play') {
    const { songId, genre } = body;
    if (!songId) return res.status(400).json({ error: 'songId_required' });

    const today = new Date().toISOString().slice(0, 10);
    await redisPipeline([
      ['HINCRBY', `soniq:song:${songId}`, 'play_count', '1'],
      ['INCR', 'soniq:total_plays'],
      ['HINCRBY', `soniq:events:daily:${today}`, 'play', '1'],
    ]);

    // Supabase update — fire-and-forget
    supabase.rpc('increment_song_counter', { song_id: songId, column_name: 'play_count', delta: 1 })
      .then(() => {}).catch(() => {});

    return res.status(200).json({ ok: true });
  }

  // ─────────────────────────────────────────────────────────────
  // ACTION: publish — record that a song was published/leased
  // ─────────────────────────────────────────────────────────────
  if (action === 'publish') {
    const { songId, tier, genre, title } = body;
    const today = new Date().toISOString().slice(0, 10);
    await redisPipeline([
      ['INCR', 'soniq:total_published'],
      ['ZINCRBY', 'soniq:publish:tiers', '1', tier || 'unknown'],
      ['HINCRBY', `soniq:events:daily:${today}`, 'published', '1'],
      ['LPUSH', 'soniq:recent', JSON.stringify({ type: 'published', tier, genre, title: (title || '').slice(0, 60), ts: Date.now() })],
      ['LTRIM', 'soniq:recent', '0', '49'],
    ]);

    // Link song to publish registration
    if (songId && supabase) {
      supabase.from('songs').update({ published_at: new Date().toISOString(), publish_tier: tier || null })
        .eq('id', songId).eq('user_id', user.id)
        .then(() => {}).catch(() => {});
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: 'unknown_action', received: action });
};
