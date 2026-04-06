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

let timingSafeEqual, createHash;
try {
  const crypto = require('crypto');
  timingSafeEqual = crypto.timingSafeEqual;
  createHash = crypto.createHash;
} catch (e) {
  console.error('[analytics] crypto import failed:', e.message);
}

let createClient;
try {
  const supa = require('@supabase/supabase-js');
  createClient = supa.createClient;
} catch (e) {
  console.error('[analytics] @supabase/supabase-js import failed:', e.message);
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';

const ADMIN_EMAILS = new Set([
  'thealvindean@gmail.com',
  'alvin@nuwavmedia.com',
  'lamusicproducers8@gmail.com',
  'rainfiremusic@gmail.com'
]);

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

function safeEqual(a, b) {
  if (!createHash || !timingSafeEqual) return a === b;
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  try {
    const ha = createHash('sha256').update(a).digest();
    const hb = createHash('sha256').update(b).digest();
    return timingSafeEqual(ha, hb);
  } catch {
    return false;
  }
}

function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

async function verifySupabaseToken(token) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return null;
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
  if (!createClient) {
    console.error('[analytics] createClient not available');
    return null;
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error('[analytics] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY/SUPABASE_ANON_KEY');
    return null;
  }
  _supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return _supabase;
}

// ---------------------------------------------------------------------------
// Redis helpers
// ---------------------------------------------------------------------------

async function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return [];
  try {
    const r = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${UPSTASH_TOKEN}`
      },
      body: JSON.stringify(commands)
    });
    if (!r.ok) {
      console.error('[analytics] Redis pipeline HTTP', r.status);
      return [];
    }
    const d = await r.json();
    return Array.isArray(d) ? d.map(x => x.result) : [];
  } catch (e) {
    console.error('[analytics] Redis pipeline error:', e.message);
    return [];
  }
}

function parseZSet(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push({ name: arr[i], count: parseInt(arr[i + 1]) || 0 });
  }
  return out;
}

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
// Handler — entire function wrapped in try/catch for safety
// ---------------------------------------------------------------------------

module.exports = async function handler(req, res) {
  // Top-level try/catch — nothing escapes
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'x-admin-key, Authorization, Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    // ---- Authentication -----------------------------------------------------

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
        const payload = decodeJwtPayload(token);
        const claimedEmail = payload?.email || '';

        if (ADMIN_EMAILS.has(claimedEmail)) {
          try {
            const user = await verifySupabaseToken(token);
            if (user && ADMIN_EMAILS.has(user.email)) {
              authenticated = true;
            }
          } catch (authErr) {
            console.error('[analytics] Supabase auth error:', authErr.message);
          }
        }
      }
    }

    if (!authenticated) {
      await new Promise(r => setTimeout(r, 200));
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // ---- Data fetching ------------------------------------------------------

    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({
        error: 'Database not configured',
        hint: 'Check SUPABASE_URL and SUPABASE_SERVICE_KEY env vars'
      });
    }

    // Build daily keys for the last 14 days
    const days = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(Date.now() - i * 86400000);
      days.push(d.toISOString().slice(0, 10));
    }

    // Redis commands
    const redisCommands = [
      ['GET',      'soniq:total_songs'],
      ['GET',      'soniq:total_published'],
      ['ZREVRANGE', 'soniq:genres:top',  '0', '19', 'WITHSCORES'],
      ['ZREVRANGE', 'soniq:topics:top',  '0', '19', 'WITHSCORES'],
      ['LRANGE',   'soniq:recent',       '0', '49'],
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

    // Safe wrapper — one failure doesn't kill everything
    const safeFetch = (promise) =>
      promise.catch(err => {
        console.error('[analytics] sub-query error:', err.message);
        return { data: null, error: err, count: 0 };
      });

    // Fire everything concurrently
    const [redisResults, profilesResult, songsByPlanResult, totalUsersResult, commPostsResult, commReactionsResult] =
      await Promise.all([
        redisPipeline(redisCommands),
        safeFetch(supabase
          .from('profiles')
          .select('id, email, display_name, artist_name, plan, created_at, song_count, liked_count, xp, level, streak, last_active, genres, founding_member, founding_tier')
          .order('created_at', { ascending: false })
          .limit(500)),
        safeFetch(
          supabase.rpc('songs_by_plan').then(r => r).catch(() => ({ data: null, error: null }))
        ),
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

    // Destructure Redis results (all default to empty/zero if Redis unavailable)
    const rr = redisResults || [];
    const totalSongsRaw        = rr[0];
    const totalPublishedRaw    = rr[1];
    const topGenresRaw         = rr[2];
    const topTopicsRaw         = rr[3];
    const recentRaw            = rr[4];
    const commPostsTotalRaw    = rr[5];
    const commPostsSongRaw     = rr[6];
    const commPostsThoughtRaw  = rr[7];
    const commPostsQuestionRaw = rr[8];
    const commPostsCollabRaw   = rr[9];
    const commPostsTipRaw      = rr[10];
    const commPostsSnippetRaw  = rr[11];
    const commReactionsTotalRaw = rr[12];
    const commCommentsTotalRaw = rr[13];
    const dailyResults         = rr.slice(14);

    // Summary
    const total_songs      = parseInt(totalSongsRaw)         || 0;
    const total_published  = parseInt(totalPublishedRaw)     || 0;
    const total_users      = totalUsersResult?.count         ?? 0;
    const total_posts      = commPostsResult?.count          ?? parseInt(commPostsTotalRaw) || 0;
    const total_reactions  = commReactionsResult?.count       ?? parseInt(commReactionsTotalRaw) || 0;
    const total_comments   = parseInt(commCommentsTotalRaw)  || 0;

    const posts_by_type = {
      song:     parseInt(commPostsSongRaw)     || 0,
      thought:  parseInt(commPostsThoughtRaw)  || 0,
      question: parseInt(commPostsQuestionRaw) || 0,
      collab:   parseInt(commPostsCollabRaw)   || 0,
      tip:      parseInt(commPostsTipRaw)      || 0,
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
      const raw = dailyResults[i];
      const obj = { date, ...parseHash(raw) };
      obj.total = Object.entries(obj)
        .filter(([k, v]) => k !== 'date' && typeof v === 'number')
        .reduce((acc, [, v]) => acc + v, 0);
      return obj;
    }).reverse();

    // Users array
    if (profilesResult?.error) {
      console.error('[analytics] profiles error:', profilesResult.error.message || profilesResult.error);
    }
    const users = profilesResult?.data || [];

    // Songs by plan
    let songs_by_plan = [];
    if (songsByPlanResult?.data) {
      songs_by_plan = songsByPlanResult.data;
    } else {
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
        console.error('[analytics] songs_by_plan fallback error:', fallbackErr.message);
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
    // Catch-all — this should NEVER let FUNCTION_INVOCATION_FAILED happen
    console.error('[analytics] FATAL:', e.message, e.stack);
    return res.status(500).json({
      error: 'Analytics error',
      message: e.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
    });
  }
};
