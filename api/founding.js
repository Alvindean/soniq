/**
 * SONIQ — Founding member tier management
 * GET  /api/founding              → public tier status
 * GET  /api/founding?user_id=uuid → user's founding status
 * POST /api/founding              → claim a founding tier spot
 *
 * Redis keys:
 *   soniq:founding:tier1:count   STRING  spots claimed (max 500)
 *   soniq:founding:tier2:count   STRING  spots claimed (max 1500)
 *   soniq:founding:tier1:active  STRING  "1" if tier1 open
 *   soniq:founding:tier2:active  STRING  "1" if tier2 open
 *   soniq:founding:user:{uid}    STRING  JSON { tier, claimed_at, ... }
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const { createClient } = require('@supabase/supabase-js');

// ─── Tier definitions ────────────────────────────────────────────────────────

const TIERS = {
  1: { label: 'Early Founder',   spots_total: 500,  price_monthly: 5,  price_annual: 42,  badge_emoji: '🔥' },
  2: { label: 'Founding Member', spots_total: 1500, price_monthly: 9.99, price_annual: 84,  badge_emoji: '⭐' },
  3: { label: 'Regular Pro',     spots_total: null, price_monthly: 19, price_annual: 114, badge_emoji: null },
};

// ─── Redis helpers ────────────────────────────────────────────────────────────

async function redisCommand(...args) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const res = await fetch(`${UPSTASH_URL}/${args.map(encodeURIComponent).join('/')}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    const json = await res.json();
    return json.result ?? null;
  } catch (e) {
    console.error('Redis command error:', e.message);
    return null;
  }
}

async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
      body: JSON.stringify(commands),
    });
    const json = await res.json();
    return json;
  } catch (e) {
    console.error('Redis pipeline error:', e.message);
    return null;
  }
}

// ─── Supabase auth helper ────────────────────────────────────────────────────

function getSupabaseClient(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  });
}

// ─── CORS helper ─────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = new Set([
  'https://www.mysoniq.com',
  'https://mysoniq.com',
]);

function setCors(req, res) {
  const origin = req.headers.origin || '';
  const isVercel = /^https:\/\/[^/]+\.vercel\.app$/.test(origin);
  const allowed = ALLOWED_ORIGINS.has(origin) || isVercel ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// ─── GET handler ─────────────────────────────────────────────────────────────

async function handleGet(req, res) {
  const { user_id } = req.query || {};

  // User-specific founding status
  if (user_id) {
    // Validate user_id is a UUID to prevent garbage Redis key lookups
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user_id)) {
      return res.status(400).json({ error: 'invalid user_id' });
    }
    const raw = await redisCommand('GET', `soniq:founding:user:${user_id}`);
    if (!raw) {
      return res.status(200).json({ is_founder: false });
    }
    let record;
    try { record = JSON.parse(raw); } catch { return res.status(200).json({ is_founder: false }); }
    return res.status(200).json({
      is_founder:    true,
      tier:          record.tier,
      label:         record.label,
      badge_emoji:   TIERS[record.tier]?.badge_emoji ?? null,
      price_monthly: record.price_monthly,
      price_annual:  record.price_annual,
      claimed_at:    record.claimed_at,
    });
  }

  // Public tier status — fetch all relevant keys in one pipeline
  res.setHeader('Cache-Control', 'public, max-age=30');

  const pipeline = await redisPipeline([
    ['GET', 'soniq:founding:tier1:count'],
    ['GET', 'soniq:founding:tier2:count'],
    ['GET', 'soniq:founding:tier1:active'],
    ['GET', 'soniq:founding:tier2:active'],
  ]);

  // Fail-closed: if Redis unavailable, do NOT show founding tiers as active.
  // Sending users into a checkout flow that will immediately reject them is worse
  // than showing the regular price until Redis recovers.
  const fallback = {
    tier1: {
      spots_total:    500,
      spots_claimed:  0,
      spots_left:     500,
      price_monthly:  5,
      price_annual:   42,
      active:         false,
      label:          'Early Founder',
    },
    tier2: {
      spots_total:    1500,
      spots_claimed:  0,
      spots_left:     1500,
      price_monthly:  9.99,
      price_annual:   84,
      active:         false,
      label:          'Founding Member',
    },
    current_tier:           3,
    current_price_monthly:  19,
    current_price_annual:   114,
    regular_price_monthly:  19,
    regular_price_annual:   114,
  };

  if (!pipeline) {
    console.error('Redis unavailable — returning fail-closed tier status');
    return res.status(200).json(fallback);
  }

  const t1Count  = parseInt(pipeline[0]?.result ?? '0', 10) || 0;
  const t2Count  = parseInt(pipeline[1]?.result ?? '0', 10) || 0;
  const t1Active = pipeline[2]?.result === '1';
  const t2Active = pipeline[3]?.result === '1';

  const t1Left = Math.max(0, TIERS[1].spots_total - t1Count);
  const t2Left = Math.max(0, TIERS[2].spots_total - t2Count);

  // Determine current best tier
  let currentTier = 3; // default to regular
  if (t1Active && t1Left > 0) {
    currentTier = 1;
  } else if (t2Active && t2Left > 0) {
    currentTier = 2;
  }

  const current = TIERS[currentTier];

  return res.status(200).json({
    tier1: {
      spots_total:   TIERS[1].spots_total,
      spots_claimed: t1Count,
      spots_left:    t1Left,
      price_monthly: TIERS[1].price_monthly,
      price_annual:  TIERS[1].price_annual,
      active:        t1Active,
      label:         TIERS[1].label,
    },
    tier2: {
      spots_total:   TIERS[2].spots_total,
      spots_claimed: t2Count,
      spots_left:    t2Left,
      price_monthly: TIERS[2].price_monthly,
      price_annual:  TIERS[2].price_annual,
      active:        t2Active,
      label:         TIERS[2].label,
    },
    current_tier:          currentTier,
    current_price_monthly: current.price_monthly,
    current_price_annual:  current.price_annual,
    regular_price_monthly: TIERS[3].price_monthly,
    regular_price_annual:  TIERS[3].price_annual,
  });
}

// ─── POST handler ─────────────────────────────────────────────────────────────

async function handlePost(req, res) {
  // Require Bearer token
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'authentication required' });

  const supabase = getSupabaseClient(token);
  if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'invalid or expired token' });

  // Parse body
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'invalid json' }); }

  const { action, tier, user_id } = body || {};

  if (action !== 'claim') {
    return res.status(400).json({ error: 'invalid action — expected "claim"' });
  }
  if (tier !== 1 && tier !== 2) {
    return res.status(400).json({ error: 'tier must be 1 or 2' });
  }
  if (!user_id || typeof user_id !== 'string') {
    return res.status(400).json({ error: 'user_id required' });
  }

  // Ensure the authenticated user matches the requested user_id
  if (user.id !== user_id) {
    return res.status(403).json({ error: 'user_id does not match authenticated user' });
  }

  const tierInfo  = TIERS[tier];
  const countKey  = `soniq:founding:tier${tier}:count`;
  const activeKey = `soniq:founding:tier${tier}:active`;

  // Check if this user has already claimed any founding tier (prevent double-claim)
  const existingRecord = await redisCommand('GET', `soniq:founding:user:${user_id}`);
  if (existingRecord) {
    let existing;
    try { existing = JSON.parse(existingRecord); } catch { existing = {}; }
    return res.status(409).json({
      error:   'already_claimed',
      message: `You have already claimed a founding tier (Tier ${existing.tier || '?'})`,
    });
  }

  // Check tier is active before incrementing
  const activeFlag = await redisCommand('GET', activeKey);
  if (activeFlag !== '1') {
    const nextTier = tier < 2 ? tier + 1 : null;
    return res.status(409).json({
      error:     'tier_inactive',
      message:   `Tier ${tier} is not currently active`,
      ...(nextTier ? { next_tier: nextTier } : {}),
    });
  }

  // Atomically increment — check against max after
  const newCount = await redisCommand('INCR', countKey);
  if (newCount === null) {
    console.error('Redis INCR failed for', countKey);
    return res.status(503).json({ error: 'service temporarily unavailable' });
  }

  if (newCount > tierInfo.spots_total) {
    // Over limit — decrement to keep count accurate, then report full
    await redisCommand('DECR', countKey);

    // Auto-close this tier in Redis (best-effort)
    await redisCommand('SET', activeKey, '0');

    const nextTier = tier < 2 ? tier + 1 : null;
    return res.status(409).json({
      error: 'tier_full',
      ...(nextTier ? { next_tier: nextTier } : {}),
    });
  }

  // Spot secured — auto-close tier if this was the last spot
  if (newCount === tierInfo.spots_total) {
    await redisCommand('SET', activeKey, '0');
    // Activate next tier if applicable
    if (tier === 1) {
      await redisCommand('SET', 'soniq:founding:tier2:active', '1');
    }
  }

  // Persist user record using SET NX (only set if key does not exist) to prevent
  // a TOCTOU race where two concurrent requests both pass the existence check above.
  const userRecord = {
    tier,
    label:         tierInfo.label,
    price_monthly: tierInfo.price_monthly,
    price_annual:  tierInfo.price_annual,
    claimed_at:    new Date().toISOString(),
  };

  const setResult = await redisCommand('SET', `soniq:founding:user:${user_id}`, JSON.stringify(userRecord), 'NX');
  if (setResult === null) {
    // Another concurrent request already wrote the record — decrement and reject
    await redisCommand('DECR', countKey);
    let existing;
    try { existing = JSON.parse(await redisCommand('GET', `soniq:founding:user:${user_id}`) || '{}'); } catch { existing = {}; }
    return res.status(409).json({
      error:   'already_claimed',
      message: `You have already claimed a founding tier (Tier ${existing.tier || '?'})`,
    });
  }

  return res.status(200).json({
    ok:            true,
    tier,
    label:         tierInfo.label,
    price_monthly: tierInfo.price_monthly,
    price_annual:  tierInfo.price_annual,
    badge_emoji:   tierInfo.badge_emoji,
  });
}

// ─── Main handler ─────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET')  return await handleGet(req, res);
    if (req.method === 'POST') return await handlePost(req, res);
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('founding handler error:', err.message, err.stack);
    return res.status(500).json({ error: 'internal server error' });
  }
};
