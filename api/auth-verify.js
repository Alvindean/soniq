/**
 * SONIQ — Auth token verification
 * GET /api/auth-verify
 * Requires: Authorization: Bearer <supabase_jwt>
 * Returns: { ok: true, user: { id, email, plan } }
 */
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://soniq.vercel.app', 'http://localhost:3000', 'http://localhost:5000'];
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = allowed.includes(origin) || isPreview ? origin : 'https://soniq.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'unauthorized' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return res.status(401).json({ error: 'invalid token' });

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, artist_name, display_name')
    .eq('id', user.id)
    .single();

  return res.status(200).json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      plan: profile?.plan || 'free',
      display_name: profile?.display_name || null,
      artist_name: profile?.artist_name || null,
    }
  });
};
