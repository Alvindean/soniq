function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function parseZRevRange(result) {
  if (!Array.isArray(result) || result.length === 0) return [];
  const items = [];
  for (let i = 0; i < result.length; i += 2) {
    const name = result[i];
    const count = parseInt(result[i + 1], 10);
    if (name !== undefined && !isNaN(count)) {
      items.push({ name, count });
    }
  }
  return items;
}

async function redisZRevRange(baseUrl, token, key, start, stop) {
  const url = `${baseUrl}/zrevrange/${encodeURIComponent(key)}/${start}/${stop}/withscores`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Redis request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.result;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  res.setHeader('Cache-Control', 'public, max-age=300');

  const week = getISOWeek(new Date());
  const emptyResponse = { trending: [], top: [], week };

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(200).json(emptyResponse);
  }

  try {
    const allTimeKey = 'soniq:rapstyles:top';
    const weeklyKey = `soniq:rapstyles:weekly:${week}`;

    const [allTimeRaw, weeklyRaw] = await Promise.all([
      redisZRevRange(redisUrl, redisToken, allTimeKey, 0, 29),
      redisZRevRange(redisUrl, redisToken, weeklyKey, 0, 29),
    ]);

    const top = parseZRevRange(allTimeRaw);
    const weeklyItems = parseZRevRange(weeklyRaw);

    const allTimeTotal = top.reduce((sum, item) => sum + item.count, 0);
    const weeklyTotal = weeklyItems.reduce((sum, item) => sum + item.count, 0);

    const allTimeShareMap = new Map();
    if (allTimeTotal > 0) {
      for (const item of top) {
        allTimeShareMap.set(item.name, item.count / allTimeTotal);
      }
    }

    const trending = [];
    if (weeklyTotal > 0) {
      for (const item of weeklyItems) {
        if (item.count < 3) continue;
        const weeklyShare = item.count / weeklyTotal;
        const allTimeShare = allTimeShareMap.get(item.name) || 0;
        if (allTimeShare === 0 || weeklyShare > 1.5 * allTimeShare) {
          trending.push(item.name);
        }
      }
    }

    return res.status(200).json({ trending, top, week });
  } catch (err) {
    console.error('[rapstats] Redis error:', err);
    return res.status(200).json(emptyResponse);
  }
};
