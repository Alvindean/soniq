/**
 * SONIQ — Admin session endpoint
 * POST /api/admin-session
 * Body: { password }
 *
 * Validates password against ADMIN_PASSWORD env var using timing-safe comparison.
 * Returns a deterministic HMAC token on success so the client can cache it.
 */

const { timingSafeEqual, createHmac } = require('crypto');

// ─── CORS helper (same pattern as founding.js) ────────────────────────────────

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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// ─── Handler ──────────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  setCors(req, res);

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'not configured' });
  }

  const { password } = req.body || {};
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'password required' });
  }

  // Timing-safe comparison — pad both buffers to the same length
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  const len = Math.max(a.length, b.length);
  const paddedA = Buffer.alloc(len);
  const paddedB = Buffer.alloc(len);
  a.copy(paddedA);
  b.copy(paddedB);

  const match = timingSafeEqual(paddedA, paddedB) && a.length === b.length;

  if (!match) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  // Generate deterministic HMAC token — FAIL CLOSED if env missing
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret || secret.length < 16) {
    return res.status(500).json({ error: 'server misconfigured' });
  }
  const token = createHmac('sha256', secret)
    .update(ADMIN_PASSWORD)
    .digest('hex');

  return res.status(200).json({ ok: true, token });
};
