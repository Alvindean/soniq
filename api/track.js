/**
 * SONIQ — Analytics event tracking endpoint
 * POST /api/track   → record an event
 * GET  /api/track?counter=1  → return global song count
 *
 * Events: song_generated, song_liked, song_disliked, song_saved,
 *         feel_lucky_used, genre_selected
 *
 * Redis schema:
 *   soniq:total_songs          STRING  (INCR on song_generated)
 *   soniq:events:daily:<date>  HASH    event_type → count
 *   soniq:genres:top           ZSET    genre → total count
 *   soniq:fusions:top          ZSET    fusion_key → total count
 *   soniq:topics:top           ZSET    topic → total count
 *   soniq:recent               LIST    last 100 JSON event objects
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const trackRateMap = new Map();
const TRACK_LIMIT = 30;
const TRACK_WINDOW = 60 * 60 * 1000;

function checkTrackRate(ip) {
  const now = Date.now();
  const entry = trackRateMap.get(ip);
  if (!entry || now - entry.start > TRACK_WINDOW) {
    trackRateMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= TRACK_LIMIT) return false;
  entry.count++;
  return true;
}

// Fire-and-forget Redis REST calls via pipeline
async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  try {
    await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${UPSTASH_TOKEN}`
      },
      body: JSON.stringify(commands)
    });
  } catch (e) {
    console.error('Redis pipeline error:', e.message);
  }
}

async function redisGet(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  const r = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
  });
  const d = await r.json();
  return d.result ?? null;
}

const ALLOWED_EVENTS = new Set([
  'song_generated', 'song_liked', 'song_disliked',
  'song_saved', 'feel_lucky_used', 'genre_selected'
]);

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://soniq.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET ?counter=1  — return global counter (for gamification display)
  if (req.method === 'GET') {
    if (req.query?.counter !== '1') return res.status(400).json({ error: 'bad request' });
    try {
      const val = await redisGet('soniq:total_songs');
      return res.status(200).json({ total: parseInt(val) || 0 });
    } catch (e) {
      return res.status(200).json({ total: 0 });
    }
  }

  if (req.method !== 'POST') return res.status(405).end();

  const ip = req.headers['x-real-ip'] ||
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket?.remoteAddress || 'unknown';
  if (!checkTrackRate(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'invalid json' }); }

  const { event, genre, genre2, topic, fusion_key, device_id, rap_style } = body || {};

  const safeStr = (v, max = 200) => v ? String(v).slice(0, max).trim() : null;

  if (!event || !ALLOWED_EVENTS.has(event)) {
    return res.status(400).json({ error: 'unknown event' });
  }

  function getISOWeek(date) {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    return `${d.getFullYear()}-W${String(weekNum).padStart(2,'0')}`;
  }
  const currentWeek = getISOWeek(new Date());

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const commands = [];

  // Always increment daily event counter
  commands.push(['HINCRBY', `soniq:events:daily:${today}`, event, 1]);

  const safeGenre      = safeStr(genre);
  const safeGenre2     = safeStr(genre2);
  const safeTopic      = safeStr(topic);
  const safeFusionKey  = safeStr(fusion_key);
  const safeRapStyle   = safeStr(rap_style);

  if (event === 'song_generated') {
    commands.push(['INCR', 'soniq:total_songs']);
    if (safeGenre)     commands.push(['ZINCRBY', 'soniq:genres:top', 1, safeGenre]);
    if (safeGenre2)    commands.push(['ZINCRBY', 'soniq:genres:top', 1, safeGenre2]);
    if (safeFusionKey) commands.push(['ZINCRBY', 'soniq:fusions:top', 1, safeFusionKey]);
    if (safeTopic)     commands.push(['ZINCRBY', 'soniq:topics:top', 1, safeTopic]);
    if (safeRapStyle) {
      commands.push(['ZINCRBY', 'soniq:rapstyles:top', 1, safeRapStyle]);
      commands.push(['ZINCRBY', `soniq:rapstyles:weekly:${currentWeek}`, 1, safeRapStyle]);
      commands.push(['EXPIRE', `soniq:rapstyles:weekly:${currentWeek}`, 28 * 24 * 3600]);
    }
  }

  if (event === 'feel_lucky_used') {
    if (safeGenre)     commands.push(['ZINCRBY', 'soniq:genres:top', 1, safeGenre]);
    if (safeFusionKey) commands.push(['ZINCRBY', 'soniq:fusions:top', 1, safeFusionKey]);
  }

  if (event === 'genre_selected' && safeGenre) {
    commands.push(['ZINCRBY', 'soniq:genres:top', 1, safeGenre]);
  }

  if (event === 'song_liked' || event === 'song_saved') {
    if (safeGenre)    commands.push(['ZINCRBY', 'soniq:genres:top', 2, safeGenre]); // weight liked/saved higher
    if (safeTopic)    commands.push(['ZINCRBY', 'soniq:topics:top', 2, safeTopic]);
    if (safeRapStyle) {
      commands.push(['ZINCRBY', 'soniq:rapstyles:top', 2, safeRapStyle]);
      commands.push(['ZINCRBY', `soniq:rapstyles:weekly:${currentWeek}`, 2, safeRapStyle]);
    }
  }

  // Append to recent events list (keep last 200)
  const recentEntry = JSON.stringify({
    event,
    genre: safeGenre, genre2: safeGenre2, topic: safeTopic,
    fusion_key: safeFusionKey, rap_style: safeRapStyle,
    device_id: device_id ? String(device_id).slice(0, 16) : null, // truncate for privacy
    ts: Date.now()
  });
  commands.push(['LPUSH', 'soniq:recent', recentEntry]);
  commands.push(['LTRIM', 'soniq:recent', 0, 199]);

  // Expire daily keys after 90 days
  commands.push(['EXPIRE', `soniq:events:daily:${today}`, 90 * 24 * 3600]);

  // Fire-and-forget — don't block the client
  redisPipeline(commands);

  return res.status(200).json({ ok: true });
};
