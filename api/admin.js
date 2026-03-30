/**
 * SONIQ — Admin analytics API
 * GET /api/admin?key=<ADMIN_PASSWORD>
 *
 * Returns JSON with:
 *   total_songs, top_genres, top_fusions, top_topics,
 *   daily_events (last 7 days), recent (last 20 events)
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Timing-safe string comparison to prevent timing attacks
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) {
    // Still do a comparison to consume similar time
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ (b.charCodeAt(i % b.length) || 0);
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function redisCmd(command) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  const r = await fetch(`${UPSTASH_URL}/${command.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
  });
  const d = await r.json();
  return d.result ?? null;
}

async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return [];
  const r = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${UPSTASH_TOKEN}`
    },
    body: JSON.stringify(commands)
  });
  const d = await r.json();
  return Array.isArray(d) ? d.map(x => x.result) : [];
}

// Parse ZREVRANGE result [member, score, member, score, ...] into [{name, count}]
function parseZSet(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push({ name: arr[i], count: parseInt(arr[i + 1]) || 0 });
  }
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  if (req.method !== 'GET') return res.status(405).end();

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return res.status(503).json({ error: 'ADMIN_PASSWORD not configured' });

  const provided = req.headers['x-admin-key'] || req.query?.key || '';
  if (!safeEqual(provided, adminPassword)) {
    // Add a small fixed delay to further blunt timing attacks
    await new Promise(r => setTimeout(r, 200));
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(503).json({ error: 'Redis not configured' });
  }

  try {
    function getISOWeek(date) {
      const d = new Date(date);
      d.setHours(0,0,0,0);
      d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
      const week1 = new Date(d.getFullYear(), 0, 4);
      const weekNum = 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
      return `${d.getFullYear()}-W${String(weekNum).padStart(2,'0')}`;
    }
    const currentWeek = getISOWeek(new Date());

    // Build daily keys for last 7 days
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000);
      days.push(d.toISOString().slice(0, 10));
    }

    const commands = [
      ['GET', 'soniq:total_songs'],
      ['ZREVRANGE', 'soniq:genres:top', '0', '19', 'WITHSCORES'],
      ['ZREVRANGE', 'soniq:fusions:top', '0', '19', 'WITHSCORES'],
      ['ZREVRANGE', 'soniq:topics:top', '0', '19', 'WITHSCORES'],
      ['LRANGE', 'soniq:recent', '0', '19'],
      ['ZREVRANGE', 'soniq:rapstyles:top', '0', '19', 'WITHSCORES'],
      ['ZREVRANGE', `soniq:rapstyles:weekly:${currentWeek}`, '0', '19', 'WITHSCORES'],
      ...days.map(d => ['HGETALL', `soniq:events:daily:${d}`])
    ];

    const results = await redisPipeline(commands);

    const [
      totalSongs,
      topGenres,
      topFusions,
      topTopics,
      recentRaw,
      topRapStyles,
      weeklyRapStyles,
      ...dailyResults
    ] = results;

    const total_songs     = parseInt(totalSongs) || 0;
    const top_genres      = parseZSet(topGenres);
    const top_fusions     = parseZSet(topFusions);
    const top_topics      = parseZSet(topTopics);
    const recentRawArr    = recentRaw || [];
    const top_rapstyles   = parseZSet(topRapStyles);
    const weeklyRapstyles = parseZSet(weeklyRapStyles);

    // Parse recent events
    const recent = recentRawArr.map(s => {
      try { return JSON.parse(s); } catch { return null; }
    }).filter(Boolean);

    // Compute trending rap styles: weekly share > 1.5x all-time share AND weekly score >= 3
    const totalAllTime = top_rapstyles.reduce((s, x) => s + x.count, 0) || 1;
    const totalWeekly  = weeklyRapstyles.reduce((s, x) => s + x.count, 0) || 1;
    const weeklyMap    = new Map(weeklyRapstyles.map(x => [x.name, x.count]));
    const trending_rapstyles = top_rapstyles.filter(x => {
      const weeklyCount = weeklyMap.get(x.name) || 0;
      if (weeklyCount < 3) return false;
      const allTimeShare = x.count / totalAllTime;
      const weeklyShare  = weeklyCount / totalWeekly;
      return weeklyShare > 1.5 * allTimeShare;
    }).map(x => ({ name: x.name, count: weeklyMap.get(x.name) || 0 }));

    // Build daily_events: [{date, song_generated, song_liked, ...}]
    const daily_events = days.map((date, i) => {
      const hash = dailyResults[i];
      if (!hash || !Array.isArray(hash)) return { date, total: 0 };
      // HGETALL returns [field, value, field, value, ...]
      const obj = { date };
      for (let j = 0; j < hash.length; j += 2) {
        obj[hash[j]] = parseInt(hash[j + 1]) || 0;
      }
      obj.total = Object.values(obj).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0);
      return obj;
    }).reverse(); // chronological order

    return res.status(200).json({
      total_songs,
      top_genres,
      top_fusions,
      top_topics,
      top_rapstyles,
      trending_rapstyles,
      daily_events,
      recent
    });
  } catch (e) {
    console.error('Admin fetch error:', e.message);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
