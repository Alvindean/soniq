/**
 * SONIQ — Account deletion endpoint (GDPR Article 17 / CCPA)
 * DELETE /api/account-delete
 * Requires: Authorization: Bearer <supabase_jwt>
 * Soft-deletes user data, then deletes auth account
 */
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://soniq.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'unauthorized' });

  // User-scoped client to verify identity
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'invalid token' });

  // Service-role client to delete the auth user
  const adminClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Cascade delete: songs, registrations (with ON DELETE CASCADE) handled by DB
  // Publishing registrations are set null on user_id (keep for royalty records)
  const { error: deleteErr } = await adminClient.auth.admin.deleteUser(user.id);
  if (deleteErr) {
    console.error('account delete error:', deleteErr.message);
    return res.status(500).json({ error: 'deletion failed' });
  }

  return res.status(200).json({ ok: true, message: 'Account deleted. We\'re sorry to see you go.' });
};
