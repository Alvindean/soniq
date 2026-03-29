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
  res.setHeader('Access-Control-Allow-Origin', '*');
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

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'invalid json' }); }

  const { event, genre, genre2, topic, fusion_key, device_id, rap_style } = body || {};

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

  if (event === 'song_generated') {
    commands.push(['INCR', 'soniq:total_songs']);
    if (genre)      commands.push(['ZINCRBY', 'soniq:genres:top', 1, genre]);
    if (genre2)     commands.push(['ZINCRBY', 'soniq:genres:top', 1, genre2]);
    if (fusion_key) commands.push(['ZINCRBY', 'soniq:fusions:top', 1, fusion_key]);
    if (topic)      commands.push(['ZINCRBY', 'soniq:topics:top', 1, topic]);
    if (rap_style) {
      commands.push(['ZINCRBY', 'soniq:rapstyles:top', 1, rap_style]);
      commands.push(['ZINCRBY', `soniq:rapstyles:weekly:${currentWeek}`, 1, rap_style]);
      commands.push(['EXPIRE', `soniq:rapstyles:weekly:${currentWeek}`, 28 * 24 * 3600]);
    }
  }

  if (event === 'feel_lucky_used') {
    if (genre)      commands.push(['ZINCRBY', 'soniq:genres:top', 1, genre]);
    if (fusion_key) commands.push(['ZINCRBY', 'soniq:fusions:top', 1, fusion_key]);
  }

  if (event === 'genre_selected' && genre) {
    commands.push(['ZINCRBY', 'soniq:genres:top', 1, genre]);
  }

  if (event === 'song_liked' || event === 'song_saved') {
    if (genre) commands.push(['ZINCRBY', 'soniq:genres:top', 2, genre]); // weight liked/saved higher
    if (topic) commands.push(['ZINCRBY', 'soniq:topics:top', 2, topic]);
    if (rap_style) {
      commands.push(['ZINCRBY', 'soniq:rapstyles:top', 2, rap_style]);
      commands.push(['ZINCRBY', `soniq:rapstyles:weekly:${currentWeek}`, 2, rap_style]);
    }
  }

  // Append to recent events list (keep last 200)
  const recentEntry = JSON.stringify({
    event, genre, genre2, topic, fusion_key, rap_style,
    device_id: device_id ? device_id.slice(0, 16) : null, // truncate for privacy
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
