/**
 * SONIQ — Admin analytics API (v2 — rebuilt for Vercel compatibility)
 *
 * Auth: x-admin-key header OR Authorization: Bearer <supabase-jwt>
 * Query: ?format=csv for user CSV export
 */

const { createClient } = require('@supabase/supabase-js');

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const ADMIN_EMAILS = [
  'thealvindean@gmail.com',
  'alvin@nuwavmedia.com',
  'lamusicproducers8@gmail.com',
  'rainfiremusic@gmail.com',
  'eric@warkershall.com'
];

// --- Auth helpers ---

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  var result = 0;
  for (var i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function decodeJwtPayload(token) {
  try {
    var parts = token.split('.');
    if (parts.length !== 3) return null;
    var base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    var json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

// --- Supabase ---

function getSupabaseClient() {
  var url = process.env.SUPABASE_URL;
  var key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

// --- Redis helpers ---

function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return Promise.resolve([]);
  return fetch(UPSTASH_URL + '/pipeline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + UPSTASH_TOKEN
    },
    body: JSON.stringify(commands)
  }).then(function(r) {
    if (!r.ok) return [];
    return r.json();
  }).then(function(d) {
    return Array.isArray(d) ? d.map(function(x) { return x.result; }) : [];
  }).catch(function() {
    return [];
  });
}

function parseZSet(arr) {
  if (!Array.isArray(arr)) return [];
  var out = [];
  for (var i = 0; i < arr.length; i += 2) {
    out.push({ name: arr[i], count: parseInt(arr[i + 1]) || 0 });
  }
  return out;
}

function parseHash(arr) {
  if (!Array.isArray(arr)) return {};
  var obj = {};
  for (var i = 0; i < arr.length; i += 2) {
    obj[arr[i]] = parseInt(arr[i + 1]) || 0;
  }
  return obj;
}

// --- CSV helpers ---

var CSV_HEADERS = [
  'id', 'email', 'display_name', 'artist_name', 'plan',
  'song_count', 'liked_count', 'xp', 'level', 'streak',
  'last_active', 'created_at'
];

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  var str = String(value);
  if (str.indexOf(',') >= 0 || str.indexOf('"') >= 0 || str.indexOf('\n') >= 0) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function usersToCSV(users) {
  var header = CSV_HEADERS.join(',');
  var rows = users.map(function(u) {
    return CSV_HEADERS.map(function(col) { return escapeCSV(u[col]); }).join(',');
  });
  return [header].concat(rows).join('\r\n');
}

// --- Handler ---

module.exports = async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'x-admin-key, Authorization, Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    // --- Authentication ---
    var adminPassword = process.env.ADMIN_PASSWORD;
    var authenticated = false;

    // Method 1: x-admin-key header
    if (adminPassword) {
      var provided = req.headers['x-admin-key'] || '';
      if (provided && safeEqual(provided, adminPassword)) {
        authenticated = true;
      }
    }

    // Method 2: Supabase Bearer token
    if (!authenticated) {
      var authHeader = req.headers['authorization'] || '';
      var match = authHeader.match(/^Bearer\s+(.+)$/i);
      if (match) {
        var token = match[1];
        var payload = decodeJwtPayload(token);
        var claimedEmail = (payload && payload.email) ? payload.email : '';

        if (ADMIN_EMAILS.indexOf(claimedEmail) >= 0) {
          try {
            var supabaseAuth = getSupabaseClient();
            if (supabaseAuth) {
              var result = await supabaseAuth.auth.getUser(token);
              if (result.data && result.data.user && ADMIN_EMAILS.indexOf(result.data.user.email) >= 0) {
                authenticated = true;
              }
            }
          } catch (e) {
            // auth failed
          }
        }
      }
    }

    if (!authenticated) {
      await new Promise(function(r) { setTimeout(r, 200); });
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // --- Data fetching ---
    var supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    // Build daily keys for last 14 days
    var days = [];
    for (var i = 0; i < 14; i++) {
      var d = new Date(Date.now() - i * 86400000);
      days.push(d.toISOString().slice(0, 10));
    }

    // Redis commands
    var redisCommands = [
      ['GET', 'soniq:total_songs'],
      ['GET', 'soniq:total_published'],
      ['ZREVRANGE', 'soniq:genres:top', '0', '19', 'WITHSCORES'],
      ['ZREVRANGE', 'soniq:topics:top', '0', '19', 'WITHSCORES'],
      ['LRANGE', 'soniq:recent', '0', '49'],
      ['GET', 'soniq:community:posts:total'],
      ['GET', 'soniq:community:posts:song'],
      ['GET', 'soniq:community:posts:thought'],
      ['GET', 'soniq:community:posts:question'],
      ['GET', 'soniq:community:posts:collab'],
      ['GET', 'soniq:community:posts:tip'],
      ['GET', 'soniq:community:posts:snippet'],
      ['GET', 'soniq:community:reactions:total'],
      ['GET', 'soniq:community:comments:total']
    ];
    for (var di = 0; di < days.length; di++) {
      redisCommands.push(['HGETALL', 'soniq:events:daily:' + days[di]]);
    }

    // Fire Redis + Supabase concurrently
    var redisPromise = redisPipeline(redisCommands);

    var profilesPromise = supabase
      .from('profiles')
      .select('id, email, display_name, artist_name, plan, created_at, song_count, liked_count, xp, level, streak, last_active, genres, founding_member, founding_tier')
      .order('created_at', { ascending: false })
      .limit(500)
      .then(function(r) { return r; })
      .catch(function(e) { console.error('[analytics] profiles error:', e.message); return { data: null }; });

    var totalUsersPromise = supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .then(function(r) { return r; })
      .catch(function(e) { console.error('[analytics] count error:', e.message); return { count: 0 }; });

    var commPostsPromise = supabase
      .from('community_posts')
      .select('id', { count: 'exact', head: true })
      .eq('is_published', true)
      .then(function(r) { return r; })
      .catch(function() { return { count: 0 }; });

    var commReactionsPromise = supabase
      .from('community_reactions')
      .select('id', { count: 'exact', head: true })
      .then(function(r) { return r; })
      .catch(function() { return { count: 0 }; });

    var allResults = await Promise.all([
      redisPromise,
      profilesPromise,
      totalUsersPromise,
      commPostsPromise,
      commReactionsPromise
    ]);

    var redisResults = allResults[0] || [];
    var profilesResult = allResults[1];
    var totalUsersResult = allResults[2];
    var commPostsResult = allResults[3];
    var commReactionsResult = allResults[4];

    // Destructure Redis
    var totalSongsRaw = redisResults[0];
    var totalPublishedRaw = redisResults[1];
    var topGenresRaw = redisResults[2];
    var topTopicsRaw = redisResults[3];
    var recentRaw = redisResults[4];
    var commPostsTotalRaw = redisResults[5];
    var commPostsSongRaw = redisResults[6];
    var commPostsThoughtRaw = redisResults[7];
    var commPostsQuestionRaw = redisResults[8];
    var commPostsCollabRaw = redisResults[9];
    var commPostsTipRaw = redisResults[10];
    var commPostsSnippetRaw = redisResults[11];
    var commReactionsTotalRaw = redisResults[12];
    var commCommentsTotalRaw = redisResults[13];
    var dailyResults = redisResults.slice(14);

    // Summary
    var total_songs = parseInt(totalSongsRaw) || 0;
    var total_published = parseInt(totalPublishedRaw) || 0;
    var total_users = (totalUsersResult && totalUsersResult.count) ? totalUsersResult.count : 0;
    var total_posts = (commPostsResult && commPostsResult.count) ? commPostsResult.count : (parseInt(commPostsTotalRaw) || 0);
    var total_reactions = (commReactionsResult && commReactionsResult.count) ? commReactionsResult.count : (parseInt(commReactionsTotalRaw) || 0);
    var total_comments = parseInt(commCommentsTotalRaw) || 0;

    var posts_by_type = {
      song: parseInt(commPostsSongRaw) || 0,
      thought: parseInt(commPostsThoughtRaw) || 0,
      question: parseInt(commPostsQuestionRaw) || 0,
      collab: parseInt(commPostsCollabRaw) || 0,
      tip: parseInt(commPostsTipRaw) || 0,
      snippet: parseInt(commPostsSnippetRaw) || 0
    };

    var summary = {
      total_users: total_users,
      total_songs: total_songs,
      total_published: total_published,
      total_posts: total_posts,
      total_reactions: total_reactions,
      total_comments: total_comments
    };

    // Top genres / topics
    var top_genres = parseZSet(topGenresRaw);
    var top_topics = parseZSet(topTopicsRaw);

    // Recent events
    var recent = [];
    if (Array.isArray(recentRaw)) {
      for (var ri = 0; ri < recentRaw.length; ri++) {
        try { recent.push(JSON.parse(recentRaw[ri])); } catch (e) { /* skip */ }
      }
    }

    // Daily events
    var daily_events = [];
    for (var dj = days.length - 1; dj >= 0; dj--) {
      var raw = dailyResults[dj];
      var obj = parseHash(raw);
      obj.date = days[dj];
      var total = 0;
      var keys = Object.keys(obj);
      for (var ki = 0; ki < keys.length; ki++) {
        if (keys[ki] !== 'date' && typeof obj[keys[ki]] === 'number') {
          total += obj[keys[ki]];
        }
      }
      obj.total = total;
      daily_events.push(obj);
    }

    // Users array
    var users = (profilesResult && profilesResult.data) ? profilesResult.data : [];

    // Songs by plan (from profiles data)
    var songs_by_plan = [];
    try {
      var planMap = {};
      for (var pi = 0; pi < users.length; pi++) {
        var plan = users[pi].plan || 'free';
        var sc = users[pi].song_count || 0;
        if (sc > 0) {
          planMap[plan] = (planMap[plan] || 0) + sc;
        }
      }
      var planKeys = Object.keys(planMap);
      for (var pk = 0; pk < planKeys.length; pk++) {
        songs_by_plan.push({ plan: planKeys[pk], count: planMap[planKeys[pk]] });
      }
    } catch (e) {
      // songs_by_plan fallback failed
    }

    // CSV export
    if (req.query && req.query.format === 'csv') {
      var today = new Date().toISOString().slice(0, 10);
      var csv = usersToCSV(users);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="soniq-users-' + today + '.csv"');
      return res.status(200).send(csv);
    }

    // JSON response
    return res.status(200).json({
      summary: summary,
      users: users,
      songs_by_plan: songs_by_plan,
      posts_by_type: posts_by_type,
      top_genres: top_genres,
      top_topics: top_topics,
      daily_events: daily_events,
      recent: recent
    });

  } catch (e) {
    console.error('[analytics] FATAL:', e.message);
    return res.status(500).json({
      error: 'Analytics error',
      message: e.message || 'Unknown error'
    });
  }
};
