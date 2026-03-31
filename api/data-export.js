/**
 * SONIQ — User data export endpoint (GDPR/CCPA Article 20)
 * GET /api/data-export
 * Requires: Authorization: Bearer <supabase_jwt>
 * Returns: JSON bundle of all user data
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

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'invalid token' });

  const [profile, songs, registrations, royalties, payouts] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('songs').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('publishing_registrations').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('royalty_events').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('payouts').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
  ]);

  res.setHeader('Content-Disposition', 'attachment; filename="soniq-data-export.json"');
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    exported_at: new Date().toISOString(),
    user: { id: user.id, email: user.email },
    profile: profile.data,
    songs: songs.data || [],
    publishing_registrations: registrations.data || [],
    royalty_events: royalties.data || [],
    payouts: payouts.data || [],
  });
};
