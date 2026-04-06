/**
 * SONIQ — Extended admin analytics API
 *
 * Auth (either method accepted):
 *   1. Header:  x-admin-key: <ADMIN_PASSWORD>
 *   2. Header:  Authorization: Bearer <supabase-jwt>  (email must be in ADMIN_EMAILS)
 *
 * Query params:
 *   ?format=csv  →  returns users table as CSV download
 */

const { timingSafeEqual, createHash } = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const ADMIN_EMAILS = new Set([
  'thealvindean@gmail.com',
  'alvin@nuwavmedia.com',
  'lamusicproducers8@gmail.com',
  'rainfiremusic@gmail.com'
]);

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

// Timing-safe string comparison — hashes both values to normalise length
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Decode a JWT payload without verifying the signature.
 * Full signature verification is handled by Supabase on the server side;
 * we only need the email claim to check the allow-list.
 */
function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    // Base64url → Base64 → Buffer
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Verify a Supabase Bearer token by asking Supabase to return the user.
 * This validates the signature server-side and checks expiry.
 * Returns the user object on success, null on failure.
 */
async function verifySupabaseToken(token) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Supabase client (singleton)
// ---------------------------------------------------------------------------

let _supabase = null;
function getSupabaseClient() {
  if (_supabase) return _supabase;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase env vars not configured');
  _supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return _supabase;
}

// ---------------------------------------------------------------------------
// Redis helpers (mirrors admin.js)
// ---------------------------------------------------------------------------

async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return [];
  const r = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${UPSTASH_TOKEN}`
    },
    body: JSON.stringify(commands)
  });
  const d = await r.json();
  return Array.isArray(d) ? d.map(x => x.result) : [];
}

// Parse ZREVRANGE result [member, score, member, score, …] → [{name, count}]
function parseZSet(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push({ name: arr[i], count: parseInt(arr[i + 1]) || 0 });
  }
  return out;
}

// Parse HGETALL result [field, value, field, value, …] → plain object
function parseHash(arr) {
  if (!Array.isArray(arr)) return {};
  const obj = {};
  for (let i = 0; i < arr.length; i += 2) {
    obj[arr[i]] = parseInt(arr[i + 1]) || 0;
  }
  return obj;
}

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------

const CSV_HEADERS = [
  'id', 'email', 'display_name', 'artist_name', 'plan',
  'song_count', 'liked_count', 'xp', 'level', 'streak',
  'last_active', 'created_at'
];

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Wrap in quotes if the value contains a comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function usersToCSV(users) {
  const header = CSV_HEADERS.join(',');
  const rows = users.map(u =>
    CSV_HEADERS.map(col => escapeCSV(u[col])).join(',')
  );
  return [header, ...rows].join('\r\n');
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');

  if (req.method !== 'GET') return res.status(405).end();

  // ---- Authentication -------------------------------------------------------

  const adminPassword = process.env.ADMIN_PASSWORD;
  let authenticated = false;

  // Method 1: x-admin-key header
  if (adminPassword) {
    const provided = req.headers['x-admin-key'] || '';
    if (provided && safeEqual(provided, adminPassword)) {
      authenticated = true;
    }
  }

  // Method 2: Supabase Bearer token
  if (!authenticated) {
    const authHeader = req.headers['authorization'] || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match) {
      const token = match[1];

      // Fast pre-check: decode payload and verify email claim is in allow-list
      // before making a network round-trip to Supabase.
      const payload = decodeJwtPayload(token);
      const claimedEmail = payload?.email || '';

      if (ADMIN_EMAILS.has(claimedEmail)) {
        // Full server-side verification (signature + expiry)
        const user = await verifySupabaseToken(token);
        if (user && ADMIN_EMAILS.has(user.email)) {
          authenticated = true;
        }
      }
    }
  }

  if (!authenticated) {
    await new Promise(r => setTimeout(r, 200)); // blunt timing attacks
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ---- Data fetching --------------------------------------------------------

  try {
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (envErr) {
      return res.status(500).json({ error: 'Server config error: ' + envErr.message, hint: 'Check SUPABASE_URL and SUPABASE_SERVICE_KEY env vars in Vercel' });
    }

    // Build daily keys for the last 14 days
    const days = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(Date.now() - i * 86400000);
      days.push(d.toISOString().slice(0, 10));
    }

    // Fire Redis pipeline + Supabase queries concurrently
    const redisCommands = [
      ['GET',      'soniq:total_songs'],
      ['GET',      'soniq:total_published'],
      ['ZREVRANGE', 'soniq:genres:top',  '0', '19', 'WITHSCORES'],
      ['ZREVRANGE', 'soniq:topics:top',  '0', '19', 'WITHSCORES'],
      ['LRANGE',   'soniq:recent',       '0', '49'],
      // Community activity counters
      ['GET', 'soniq:community:posts:total'],
      ['GET', 'soniq:community:posts:song'],
      ['GET', 'soniq:community:posts:thought'],
      ['GET', 'soniq:community:posts:question'],
      ['GET', 'soniq:community:posts:collab'],
      ['GET', 'soniq:community:posts:tip'],
      ['GET', 'soniq:community:posts:snippet'],
      ['GET', 'soniq:community:reactions:total'],
      ['GET', 'soniq:community:comments:total'],
      ...days.map(d => ['HGETALL', `soniq:events:daily:${d}`])
    ];

    // Wrap each query in its own catch so one failure doesn't kill all analytics
    const safeFetch = (promise, fallback = { data: null, error: null, count: 0 }) =>
      promise.catch(err => { console.error('Analytics sub-query error:', err.message); return fallback; });

    const [redisResults, profilesResult, songsByPlanResult, totalUsersResult, commPostsResult, commReactionsResult] =
      await Promise.all([
        redisPipeline(redisCommands).catch(() => []),
        safeFetch(supabase
          .from('profiles')
          .select('id, email, display_name, artist_name, plan, created_at, song_count, liked_count, xp, level, streak, last_active, genres, founding_member, founding_tier')
          .order('created_at', { ascending: false })
          .limit(500)),
        safeFetch(supabase.rpc('songs_by_plan').catch(() => ({ data: null, error: null }))),
        safeFetch(supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })),
        safeFetch(supabase
          .from('community_posts')
          .select('id', { count: 'exact', head: true })
          .eq('is_published', true)),
        safeFetch(supabase
          .from('community_reactions')
          .select('id', { count: 'exact', head: true }))
      ]);

    // Destructure Redis results
    const [
      totalSongsRaw,
      totalPublishedRaw,
      topGenresRaw,
      topTopicsRaw,
      recentRaw,
      commPostsTotalRaw,
      commPostsSongRaw,
      commPostsThoughtRaw,
      commPostsQuestionRaw,
      commPostsCollabRaw,
      commPostsTipRaw,
      commPostsSnippetRaw,
      commReactionsTotalRaw,
      commCommentsTotalRaw,
      ...dailyResults
    ] = redisResults;

    // Summary
    const total_songs      = parseInt(totalSongsRaw)         || 0;
    const total_published  = parseInt(totalPublishedRaw)     || 0;
    const total_users      = totalUsersResult.count           ?? 0;
    // Community counts: prefer Supabase exact counts; Redis used for breakdown by post type
    const total_posts      = commPostsResult.count            ?? parseInt(commPostsTotalRaw) || 0;
    const total_reactions  = commReactionsResult.count        ?? parseInt(commReactionsTotalRaw) || 0;
    const total_comments   = parseInt(commCommentsTotalRaw)   || 0;

    const posts_by_type = {
      song:     parseInt(commPostsSongRaw)     || 0,
      thought:  parseInt(commPostsThoughtRaw)  || 0,
      question: parseInt(commPostsQuestionRaw) || 0,
      collab:   parseInt(commPostsCollabRaw)   || 0,
      tip:      parseInt(commPostsTipRaw)       || 0,
      snippet:  parseInt(commPostsSnippetRaw)  || 0,
    };

    const summary = { total_users, total_songs, total_published, total_posts, total_reactions, total_comments };

    // Top genres / topics
    const top_genres = parseZSet(topGenresRaw);
    const top_topics = parseZSet(topTopicsRaw);

    // Recent events
    const recent = (recentRaw || []).map(s => {
      try { return JSON.parse(s); } catch { return null; }
    }).filter(Boolean);

    // Daily events — chronological order (oldest first)
    const daily_events = days.map((date, i) => {
      const obj = { date, ...parseHash(dailyResults[i]) };
      obj.total = Object.entries(obj)
        .filter(([k, v]) => k !== 'date' && typeof v === 'number')
        .reduce((acc, [, v]) => acc + v, 0);
      return obj;
    }).reverse();

    // Users array
    if (profilesResult.error) {
      console.error('Supabase profiles error:', profilesResult.error.message);
    }
    const users = profilesResult.data || [];

    // Songs by plan — attempt RPC first, fall back to manual aggregation
    let songs_by_plan = [];
    if (songsByPlanResult?.data) {
      songs_by_plan = songsByPlanResult.data;
    } else {
      // Fallback: aggregate song_count from profiles (no FK join needed)
      try {
        const { data: profilePlans } = await supabase
          .from('profiles')
          .select('plan, song_count')
          .gt('song_count', 0);

        if (profilePlans) {
          const planMap = {};
          for (const row of profilePlans) {
            const plan = row.plan || 'free';
            planMap[plan] = (planMap[plan] || 0) + (row.song_count || 0);
          }
          songs_by_plan = Object.entries(planMap).map(([plan, count]) => ({ plan, count }));
        }
      } catch (fallbackErr) {
        console.error('songs_by_plan fallback error:', fallbackErr.message);
      }
    }

    // ---- CSV export ---------------------------------------------------------

    if (req.query?.format === 'csv') {
      const today = new Date().toISOString().slice(0, 10);
      const csv = usersToCSV(users);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="soniq-users-${today}.csv"`);
      return res.status(200).send(csv);
    }

    // ---- JSON response ------------------------------------------------------

    return res.status(200).json({
      summary,
      users,
      songs_by_plan,
      posts_by_type,
      top_genres,
      top_topics,
      daily_events,
      recent
    });

  } catch (e) {
    console.error('Analytics fetch error:', e.message);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
