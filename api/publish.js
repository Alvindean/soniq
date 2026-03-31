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

const { createClient } = require('@supabase/supabase-js');

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

function getSupabaseClient(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  });
}

// Validate ISRC format: CC-XXX-YY-NNNNN
function isValidISRC(isrc) {
  return /^[A-Z]{2}-[A-Z0-9]{3}-\d{2}-\d{5}$/.test(isrc || '');
}

const ALLOWED_TIERS = new Set(['admin', 'copub', 'sync']);
const ALLOWED_PROS  = new Set(['bmi', 'ascap', 'sesac', 'socan', 'prs', 'none']);

module.exports = async function handler(req, res) {
  const origin  = req.headers.origin || '';
  const allowed = ['https://www.mysoniq.com', 'https://mysoniq.com', 'https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET /api/publish — list user's registrations (merged from publish-list.js)
  if (req.method === 'GET') {
    const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ error: 'unauthorized' });
    const supabase = getSupabaseClient(token);
    if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return res.status(401).json({ error: 'invalid token' });
    const { data, error } = await supabase
      .from('publishing_registrations')
      .select('id, title, isrc, tier, soniq_share, writer_share, pro, status, created_at, registered_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'fetch failed' });
    return res.status(200).json({ registrations: data || [] });
  }

  if (req.method !== 'POST') return res.status(405).end();

  const ip = req.headers['x-real-ip'] ||
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket?.remoteAddress || 'unknown';

  if (!checkPubRate(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  // Require authentication
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'authentication required' });

  const supabase = getSupabaseClient(token);
  if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'invalid or expired token' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'invalid json' }); }

  const safeStr = (v, max = 200) => v ? String(v).replace(/[<>"]/g, '').slice(0, max).trim() : null;

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
    // Publisher metadata — Nu Wav Media LLC / Alvin Dean Warren
    publisher_name: 'Nu Wav Media LLC',
    publisher_owner: 'Alvin Dean Warren',
    publisher_dba: 'Alvo',
    copyright_notice: `© ${new Date().getFullYear()} ${writer_name} / Nu Wav Media LLC (Alvin Dean Warren). All rights reserved.`,
    genre: genre || null,
    topic: topic || null,
    song_id: null,
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

  // Store durable E-SIGN consent record in Supabase
  try {
    await supabase.from('publishing_registrations').insert({
      user_id: user.id,
      song_id: null,  // songs not yet synced to DB — set null to avoid FK violation
      title: title || 'Untitled',
      isrc: isrc || null,
      writer_name,
      pro,
      ipi: ipi || null,
      tier,
      soniq_share,
      writer_share,
      publisher_name: 'Nu Wav Media LLC',
      publisher_owner: 'Alvin Dean Warren',
      genre: genre || null,
      topic: topic || null,
      status: 'pending',
      consent_ip: ip,
      consent_timestamp: new Date().toISOString(),
      terms_version: 'v1.0'
    });
  } catch (dbErr) {
    console.error('Supabase insert error:', dbErr.message);
    // Don't fail the request — Redis record is the fallback
  }

  return res.status(200).json({
    ok: true,
    isrc: isrc || null,
    tier,
    soniq_share,
    writer_share,
    status: 'pending'
  });
};
