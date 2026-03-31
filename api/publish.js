/**
 * SONIQ — Publishing registration endpoint
 * POST /api/publish  → register a song for publishing admin
 *
 * Redis schema:
 *   soniq:publishing:songs        LIST  last 1000 JSON registration records
 *   soniq:publishing:total        STRING  (INCR on each registration)
 *   soniq:publishing:tiers:<tier> STRING  (INCR — admin / copub / sync)
 *   soniq:publishing:pros:<pro>   ZSET    pro_name → count
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Simple in-memory rate limit: max 10 registrations per IP per hour
const pubRateMap = new Map();
const PUB_LIMIT  = 10;
const PUB_WINDOW = 60 * 60 * 1000;

function checkPubRate(ip) {
  const now = Date.now();
  const entry = pubRateMap.get(ip);
  if (!entry || now - entry.start > PUB_WINDOW) {
    pubRateMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= PUB_LIMIT) return false;
  entry.count++;
  return true;
}

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

// Validate ISRC format: CC-XXX-YY-NNNNN
function isValidISRC(isrc) {
  return /^[A-Z]{2}-[A-Z0-9]{3}-\d{2}-\d{5}$/.test(isrc || '');
}

const ALLOWED_TIERS = new Set(['admin', 'copub', 'sync']);
const ALLOWED_PROS  = new Set(['bmi', 'ascap', 'sesac', 'socan', 'prs', 'none']);

module.exports = async function handler(req, res) {
  const origin  = req.headers.origin || '';
  const allowed = ['https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://soniq.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const ip = req.headers['x-real-ip'] ||
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket?.remoteAddress || 'unknown';

  if (!checkPubRate(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'invalid json' }); }

  const safeStr = (v, max = 200) => v ? String(v).replace(/[<>"']/g, '').slice(0, max).trim() : null;

  const title       = safeStr(body?.title, 200);
  const isrc        = safeStr(body?.isrc, 20);
  const writer_name = safeStr(body?.writer_name, 200);
  const pro         = safeStr(body?.pro, 20);
  const ipi         = safeStr(body?.ipi, 50);
  const tier        = safeStr(body?.tier, 20);
  const genre       = safeStr(body?.genre, 50);
  const topic       = safeStr(body?.topic, 200);
  const song_id     = safeStr(body?.song_id, 40);

  // Validate required fields
  if (!writer_name) return res.status(400).json({ error: 'writer_name required' });
  if (!pro || !ALLOWED_PROS.has(pro)) return res.status(400).json({ error: 'invalid pro' });
  if (!tier || !ALLOWED_TIERS.has(tier)) return res.status(400).json({ error: 'invalid tier' });
  if (isrc && !isValidISRC(isrc)) return res.status(400).json({ error: 'invalid isrc format' });

  const soniq_share = tier === 'admin' ? 15 : tier === 'copub' ? 25 : 35;
  const writer_share = 100 - soniq_share;

  const record = JSON.stringify({
    title: title || 'Untitled',
    isrc:  isrc  || null,
    writer_name,
    pro,
    ipi:   ipi || null,
    tier,
    soniq_share,
    writer_share,
    // Publisher metadata — Nu Wav Media / Alvin Dean Warren
    publisher_name: 'Nu Wav Media',
    publisher_owner: 'Alvin Dean Warren',
    publisher_dba: 'Alvo',
    copyright_notice: `© ${new Date().getFullYear()} ${writer_name} / Nu Wav Media (Alvin Dean Warren). All rights reserved.`,
    genre: genre || null,
    topic: topic || null,
    song_id: song_id || null,
    status: 'pending',  // pending → registered → active
    ts: Date.now()
  });

  const commands = [
    ['INCR', 'soniq:publishing:total'],
    ['INCR', `soniq:publishing:tiers:${tier}`],
    ['LPUSH', 'soniq:publishing:songs', record],
    ['LTRIM', 'soniq:publishing:songs', 0, 999],
  ];

  if (pro !== 'none') {
    commands.push(['ZINCRBY', 'soniq:publishing:pros', 1, pro]);
  }
  if (genre) {
    commands.push(['ZINCRBY', 'soniq:publishing:genres', 1, genre]);
  }

  // Fire-and-forget
  redisPipeline(commands);

  return res.status(200).json({
    ok: true,
    isrc: isrc || null,
    tier,
    soniq_share,
    writer_share,
    status: 'pending'
  });
};
