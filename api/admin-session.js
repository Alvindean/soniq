/**
 * SONIQ — Admin session endpoint
 * POST /api/admin-session
 * Body: { password }
 *
 * Validates the admin password against ADMIN_PASSWORD env var.
 * Returns a session token stored client-side to bypass auth.
 * Uses timing-safe comparison to prevent timing attacks.
 */

const { timingSafeEqual, createHmac, randomBytes } = require('crypto');

const ALLOWED_ORIGINS = [
  'https://www.mysoniq.com',
  'https://mysoniq.com',
  'https://soniq.vercel.app',
  'https://project-47rl2-git-main-alvin-deans-projects.vercel.app',
];

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const cors = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || '';

  if (!ADMIN_PASSWORD) return res.status(503).json({ error: 'Not configured' });

  const { password } = req.body || {};
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password required' });
  }

  // Timing-safe comparison
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  const paddedA = Buffer.alloc(Math.max(a.length, b.length));
  const paddedB = Buffer.alloc(Math.max(a.length, b.length));
  a.copy(paddedA);
  b.copy(paddedB);

  const match = timingSafeEqual(paddedA, paddedB) && a.length === b.length;

  if (!match) {
    // Small delay to further discourage brute force
    await new Promise(r => setTimeout(r, 200));
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate a deterministic token from secret so we can verify it later
  // without storing anything server-side (stateless validation)
  const token = createHmac('sha256', ADMIN_TOKEN_SECRET)
    .update('soniq_admin_session_v1')
    .digest('hex');

  return res.status(200).json({ ok: true, token });
};
