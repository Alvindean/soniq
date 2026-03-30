/**
 * SONIQ — Lightweight health check endpoint
 * GET /api/ping → { status, redis, timestamp, uptime }
 */

async function checkRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return 'unavailable';
  try {
    const r = await fetch(`${url}/ping`, { headers: { Authorization: `Bearer ${token}` } });
    return r.ok ? 'ok' : 'error';
  } catch { return 'error'; }
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://soniq.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();
  const redis = await checkRedis();
  return res.status(200).json({ status: 'ok', redis, timestamp: new Date().toISOString(), uptime: process.uptime() });
};
