/**
 * SONIQ — Health check endpoint
 *
 * GET /api/health
 *
 * Public endpoint (no auth) — used by uptime monitors and CI smoke tests.
 * Returns 200 if the service is reachable. Includes per-dependency liveness
 * checks (Redis + Supabase) so monitors can tell the difference between
 * "function up but DB down" vs "everything healthy".
 *
 * Response shape:
 *   {
 *     status: 'ok' | 'degraded' | 'down',
 *     service: 'soniq',
 *     timestamp: '2026-04-26T...',
 *     uptime_seconds: number,
 *     region: string,
 *     checks: {
 *       redis:    { status, latency_ms },
 *       supabase: { status, latency_ms }
 *     }
 *   }
 *
 * HTTP status semantics (so monitors can use the code as a simple signal):
 *   200 → service is operational (status: ok or degraded)
 *   503 → service is down (all dependency checks failed)
 */

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_KEY  = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;

// Hard timeout per dependency check — a hung Redis/Supabase shouldn't block
// the health endpoint past this. Keep it well under the function maxDuration.
const CHECK_TIMEOUT_MS = 2000;

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(label + ' timeout after ' + ms + 'ms')), ms))
  ]);
}

async function checkRedis() {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return { status: 'skip', reason: 'env vars not configured', latency_ms: 0 };
  }
  const start = Date.now();
  try {
    const r = await withTimeout(
      fetch(`${UPSTASH_URL}/PING`, { headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` } }),
      CHECK_TIMEOUT_MS,
      'redis'
    );
    if (!r.ok) return { status: 'fail', reason: 'HTTP ' + r.status, latency_ms: Date.now() - start };
    const data = await r.json();
    if (data?.result !== 'PONG') return { status: 'fail', reason: 'unexpected response', latency_ms: Date.now() - start };
    return { status: 'ok', latency_ms: Date.now() - start };
  } catch (e) {
    return { status: 'fail', reason: e.message, latency_ms: Date.now() - start };
  }
}

async function checkSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { status: 'skip', reason: 'env vars not configured', latency_ms: 0 };
  }
  const start = Date.now();
  try {
    // Use the auth health endpoint — fast, no table read, no quota burn.
    const r = await withTimeout(
      fetch(`${SUPABASE_URL}/auth/v1/health`, { headers: { apikey: SUPABASE_KEY } }),
      CHECK_TIMEOUT_MS,
      'supabase'
    );
    if (!r.ok) return { status: 'fail', reason: 'HTTP ' + r.status, latency_ms: Date.now() - start };
    return { status: 'ok', latency_ms: Date.now() - start };
  } catch (e) {
    return { status: 'fail', reason: e.message, latency_ms: Date.now() - start };
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'method_not_allowed', allowed: ['GET', 'HEAD'] });
  }

  // HEAD requests want just the status code — skip the dependency checks
  // so head-only monitors aren't burning latency on every poll.
  if (req.method === 'HEAD') return res.status(200).end();

  const [redis, supabase] = await Promise.all([checkRedis(), checkSupabase()]);

  // status = ok if all enabled checks pass; degraded if at least one passes
  // but another fails; down if every enabled check failed.
  const checks = [redis, supabase];
  const enabled = checks.filter(c => c.status !== 'skip');
  const passing = enabled.filter(c => c.status === 'ok');
  let status;
  if (enabled.length === 0)               status = 'ok';        // no deps to check, function itself is up
  else if (passing.length === enabled.length) status = 'ok';
  else if (passing.length === 0)          status = 'down';
  else                                    status = 'degraded';

  const httpCode = status === 'down' ? 503 : 200;

  res.status(httpCode).json({
    status,
    service: 'soniq',
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.round(process.uptime()),
    region: process.env.VERCEL_REGION || 'unknown',
    checks: { redis, supabase }
  });
};
