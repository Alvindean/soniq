/**
 * SONIQ — Health check / diagnostic endpoint
 * GET /api/health  → checks all dependencies and reports status
 *
 * No auth required — does not expose sensitive data.
 */

const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  const checks = {
    timestamp: new Date().toISOString(),
    node_version: process.version,
    env: {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    },
    supabase: 'skipped',
    redis: 'skipped',
    crypto: 'skipped',
  };

  // Test crypto
  try {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update('test').digest('hex');
    checks.crypto = hash ? 'ok' : 'failed';
  } catch (e) {
    checks.crypto = 'error: ' + e.message;
  }

  // Test Supabase
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
      const { count, error } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true });
      checks.supabase = error ? 'error: ' + error.message : 'ok (profiles: ' + count + ')';
    } catch (e) {
      checks.supabase = 'error: ' + e.message;
    }
  } else {
    checks.supabase = 'missing env vars';
  }

  // Test Redis
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    try {
      const r = await fetch(`${redisUrl}/GET/soniq:total_songs`, {
        headers: { Authorization: `Bearer ${redisToken}` }
      });
      const d = await r.json();
      checks.redis = r.ok ? 'ok (total_songs: ' + d.result + ')' : 'error: HTTP ' + r.status;
    } catch (e) {
      checks.redis = 'error: ' + e.message;
    }
  } else {
    checks.redis = 'missing env vars';
  }

  const allOk = checks.supabase.startsWith('ok') && checks.crypto === 'ok';
  return res.status(allOk ? 200 : 503).json(checks);
};
