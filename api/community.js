/**
 * SONIQ — Community feed API endpoint
 * GET  /api/community?action=feed|post|leaderboard
 * POST /api/community?action=share|react|comment|unreact
 *
 * GET actions are open to guests (no auth required).
 * POST actions require a valid Bearer token.
 */

const { createClient } = require('@supabase/supabase-js');

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// ─────────────────────────────────────────────────────────────
// Supabase client factory
// ─────────────────────────────────────────────────────────────
function getSupabase(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  });
}

// ─────────────────────────────────────────────────────────────
// Upstash Redis helpers
// ─────────────────────────────────────────────────────────────
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
    const d = await r.json();
    return Array.isArray(d) ? d.map(x => x.result) : [];
  } catch (e) {
    console.error('Redis pipeline error:', e.message);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Input sanitization helpers
// ─────────────────────────────────────────────────────────────
const VALID_REACTION_TYPES = new Set(['fire', 'love', 'cosign', 'insight', 'flip']);
const VALID_SORT_MODES     = new Set(['hot', 'new', 'top']);

/** Strip HTML tags and trim whitespace. */
function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/** Sanitize and cap a string field. Returns '' if not a string. */
function sanitize(value, maxLen) {
  return stripHtml(value).slice(0, maxLen);
}

// ─────────────────────────────────────────────────────────────
// Main handler
// ─────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────
  const origin  = req.headers.origin || '';
  const allowed = [
    'https://mysoniq.com',
    'https://www.mysoniq.com',
    'http://localhost:3000',
    'http://localhost:5000'
  ];
  const isVercel = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const corsOrigin = allowed.includes(origin) || isVercel ? origin : 'https://mysoniq.com';

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const method = req.method;
  if (method !== 'GET' && method !== 'POST') return res.status(405).end();

  // ── Auth (optional for GET, required for POST) ────────────
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  const supabase = getSupabase(token || null);

  if (!supabase) return res.status(503).json({ error: 'db_unavailable' });

  let user = null;
  if (token) {
    const { data: { user: u }, error: authErr } = await supabase.auth.getUser();
    if (!authErr && u) user = u;
  }

  const action = (req.query.action || '').toLowerCase();

  // ══════════════════════════════════════════════════════════
  // GET routes (no auth required)
  // ══════════════════════════════════════════════════════════
  if (method === 'GET') {

    // ── action=feed ────────────────────────────────────────
    if (action === 'feed') {
      try {
        const sortRaw   = req.query.sort  || 'hot';
        const sort      = VALID_SORT_MODES.has(sortRaw) ? sortRaw : 'hot';
        const genre     = sanitize(req.query.genre || '', 50) || null;
        const VALID_FEED_POST_TYPES = new Set(['song','thought','question','collab','tip','snippet']);
        const postTypeRaw = sanitize(req.query.post_type || '', 20) || null;
        const postType  = postTypeRaw && VALID_FEED_POST_TYPES.has(postTypeRaw) ? postTypeRaw : null;
        const limit     = Math.min(Math.max(parseInt(req.query.limit)  || 20, 1), 50);
        const offset    = Math.max(parseInt(req.query.offset) || 0, 0);

        const orderColumn =
          sort === 'hot' ? 'hot_score'      :
          sort === 'new' ? 'created_at'     :
          /* top */        'reaction_count';

        let query = supabase
          .from('community_posts')
          .select(`
            *,
            profiles!community_posts_user_id_fkey (
              display_name,
              artist_name,
              xp,
              level,
              plan
            )
          `, { count: 'exact' })
          .eq('is_published', true)
          .order(orderColumn, { ascending: false })
          .range(offset, offset + limit - 1);

        if (genre) query = query.eq('genre', genre);
        // post_type filter: 'song' = song shares (null song_id excluded), others = forum posts by topic
        if (postType === 'song') {
          query = query.not('song_id', 'is', null);
        } else if (postType) {
          query = query.eq('topic', postType);
        }

        const { data: posts, error: feedErr, count } = await query;

        if (feedErr) {
          console.error('Feed query error:', feedErr.message);
          return res.status(500).json({ error: 'feed_query_failed', detail: feedErr.message });
        }

        return res.status(200).json({
          posts:    posts || [],
          total:    count  || 0,
          has_more: offset + limit < (count || 0)
        });
      } catch (e) {
        console.error('GET feed error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    // ── action=post (single post with comments) ────────────
    if (action === 'post') {
      try {
        const id = sanitize(req.query.id || '', 36);
        if (!id) return res.status(400).json({ error: 'id_required' });

        const { data: post, error: postErr } = await supabase
          .from('community_posts')
          .select(`
            *,
            profiles!community_posts_user_id_fkey (
              display_name,
              artist_name,
              xp,
              level,
              plan
            )
          `)
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (postErr || !post) {
          return res.status(404).json({ error: 'post_not_found' });
        }

        const { data: comments, error: commentsErr } = await supabase
          .from('community_comments')
          .select(`
            id,
            post_id,
            user_id,
            parent_id,
            text,
            created_at,
            profiles!community_comments_user_id_fkey (
              display_name,
              artist_name,
              xp,
              level
            )
          `)
          .eq('post_id', id)
          .order('created_at', { ascending: true });

        if (commentsErr) {
          console.error('Comments query error:', commentsErr.message);
        }

        return res.status(200).json({
          post:     { ...post, comments: comments || [] }
        });
      } catch (e) {
        console.error('GET post error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    // ── action=leaderboard ─────────────────────────────────
    if (action === 'leaderboard') {
      try {
        const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

        // Weekly leaderboard: rank by posts + reactions gained this week
        // Pull recent community posts (this week) and group by user_id
        const { data: weeklyPosts } = await supabase
          .from('community_posts')
          .select('user_id, reaction_count')
          .eq('is_published', true)
          .gte('created_at', weekAgo);

        // Aggregate weekly score per user: posts * 10 + reactions * 3
        const weeklyScores = {};
        (weeklyPosts || []).forEach(p => {
          if (!p.user_id) return;
          weeklyScores[p.user_id] = (weeklyScores[p.user_id] || 0) + 10 + (p.reaction_count || 0) * 3;
        });

        // Also count weekly reactions given
        const { data: weeklyReacts } = await supabase
          .from('community_reactions')
          .select('user_id')
          .gte('created_at', weekAgo);
        (weeklyReacts || []).forEach(r => {
          if (r.user_id) weeklyScores[r.user_id] = (weeklyScores[r.user_id] || 0) + 3;
        });

        // Get top user IDs by weekly score
        const topIds = Object.entries(weeklyScores)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([id]) => id);

        // Fallback: if no weekly activity, return all-time top XP
        if (!topIds.length) {
          const { data: users } = await supabase
            .from('profiles')
            .select('display_name, artist_name, xp, level, plan, song_count')
            .order('xp', { ascending: false })
            .limit(10);
          return res.status(200).json({ users: users || [], mode: 'all_time' });
        }

        // Fetch profiles for top weekly users
        const { data: profiles, error: lbErr } = await supabase
          .from('profiles')
          .select('id, display_name, artist_name, xp, level, plan, song_count')
          .in('id', topIds);

        if (lbErr) return res.status(500).json({ error: 'leaderboard_query_failed' });

        // Re-sort by weekly score and attach weekly_score
        const sorted = (profiles || [])
          .map(p => ({ ...p, weekly_score: weeklyScores[p.id] || 0 }))
          .sort((a, b) => b.weekly_score - a.weekly_score);

        return res.status(200).json({ users: sorted, mode: 'weekly' });
      } catch (e) {
        console.error('GET leaderboard error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    return res.status(400).json({ error: 'unknown_action', received: action });
  }

  // ══════════════════════════════════════════════════════════
  // POST routes (auth required)
  // ══════════════════════════════════════════════════════════
  if (method === 'POST') {
    if (!user) return res.status(401).json({ error: 'auth_required' });

    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    } catch {
      return res.status(400).json({ error: 'bad_json' });
    }

    // ── action=share ───────────────────────────────────────
    if (action === 'share') {
      try {
        const { song_id, title, genre, topic, lyrics_preview, style_prompt, audio_url, note } = body;

        if (!song_id) return res.status(400).json({ error: 'song_id_required' });
        if (!title)   return res.status(400).json({ error: 'title_required' });

        const row = {
          user_id:        user.id,
          song_id:        sanitize(String(song_id), 36),
          title:          sanitize(title,         200),
          genre:          sanitize(genre  || '',   50),
          topic:          sanitize(topic  || '',  200),
          lyrics_preview: sanitize(lyrics_preview || '', 150),
          style_prompt:   sanitize(style_prompt   || '', 600),
          audio_url:      sanitize(audio_url      || '', 500) || null,
          note:           sanitize(note           || '', 280) || null,
          is_published:   true,
          reaction_count: 0,
          comment_count:  0,
          hot_score:      0,
          created_at:     new Date().toISOString()
        };

        const { data: inserted, error: insertErr } = await supabase
          .from('community_posts')
          .insert(row)
          .select('id')
          .single();

        if (insertErr) {
          console.error('Share insert error:', insertErr.message);
          return res.status(500).json({ error: 'share_failed', detail: insertErr.message });
        }

        // Redis: track activity counters
        const redisTrack = [
          ['INCR', 'soniq:community:posts:total'],
          ['INCR', 'soniq:community:posts:song'],
        ];
        if (row.genre) redisTrack.push(['ZINCRBY', 'soniq:community:genres', '1', row.genre]);
        await redisPipeline(redisTrack);

        return res.status(200).json({ post_id: inserted.id });
      } catch (e) {
        console.error('POST share error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    // ── action=react ───────────────────────────────────────
    if (action === 'react') {
      try {
        const { post_id, reaction_type } = body;

        if (!post_id)       return res.status(400).json({ error: 'post_id_required' });
        if (!reaction_type) return res.status(400).json({ error: 'reaction_type_required' });
        if (!VALID_REACTION_TYPES.has(reaction_type)) {
          return res.status(400).json({
            error:   'invalid_reaction_type',
            allowed: [...VALID_REACTION_TYPES]
          });
        }

        const pid = sanitize(String(post_id), 36);

        // Upsert reaction — one per user per post, update type on re-react
        const { error: upsertErr } = await supabase
          .from('community_reactions')
          .upsert(
            { post_id: pid, user_id: user.id, reaction_type },
            { onConflict: 'post_id,user_id' }
          );

        if (upsertErr) {
          console.error('React upsert error:', upsertErr.message);
          return res.status(500).json({ error: 'react_failed', detail: upsertErr.message });
        }

        // Recalculate reaction_count and hot_score in Supabase via RPC.
        // hot_score = log10(reaction_count + 1) - (age_seconds / 45000)
        const { error: scoreErr } = await supabase.rpc('recalculate_post_scores', { target_post_id: pid });
        if (scoreErr) {
          // Non-fatal: fall back to a direct update
          console.error('recalculate_post_scores RPC error:', scoreErr.message);
          await supabase
            .from('community_posts')
            .update({
              hot_score: supabase.rpc('compute_hot_score', { target_post_id: pid })
            })
            .eq('id', pid)
            .catch(() => {});
        }

        // Fetch updated per-type reaction counts and the user's current reaction
        const { data: reactions, error: reactFetchErr } = await supabase
          .from('community_reactions')
          .select('reaction_type')
          .eq('post_id', pid);

        if (reactFetchErr) {
          console.error('React fetch error:', reactFetchErr.message);
        }

        const reaction_counts = { fire: 0, love: 0, cosign: 0, insight: 0, flip: 0 };
        (reactions || []).forEach(r => {
          if (reaction_counts[r.reaction_type] !== undefined) reaction_counts[r.reaction_type]++;
        });

        // Redis: track total reactions
        await redisPipeline([['INCR', 'soniq:community:reactions:total']]);

        return res.status(200).json({
          reaction_counts,
          user_reaction: reaction_type
        });
      } catch (e) {
        console.error('POST react error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    // ── action=comment ─────────────────────────────────────
    if (action === 'comment') {
      try {
        const { post_id, text, parent_id } = body;

        if (!post_id) return res.status(400).json({ error: 'post_id_required' });
        if (!text)    return res.status(400).json({ error: 'text_required' });

        const sanitizedText = sanitize(text, 500);
        if (!sanitizedText) return res.status(400).json({ error: 'text_required' });

        const pid = sanitize(String(post_id), 36);

        const row = {
          post_id:    pid,
          user_id:    user.id,
          parent_id:  parent_id ? sanitize(String(parent_id), 36) : null,
          text:       sanitizedText,
          created_at: new Date().toISOString()
        };

        const { data: inserted, error: insertErr } = await supabase
          .from('community_comments')
          .insert(row)
          .select('id')
          .single();

        if (insertErr) {
          console.error('Comment insert error:', insertErr.message);
          return res.status(500).json({ error: 'comment_failed', detail: insertErr.message });
        }

        // Increment comment_count on the parent post
        const { error: incErr } = await supabase.rpc('increment_post_comment_count', { target_post_id: pid });
        if (incErr) {
          // Non-fatal fallback
          console.error('increment_post_comment_count RPC error:', incErr.message);
          await supabase.rpc('increment_counter', {
            table_name:  'community_posts',
            column_name: 'comment_count',
            row_id:      pid
          }).catch(() => {});
        }

        // Redis: track total comments
        await redisPipeline([['INCR', 'soniq:community:comments:total']]);

        return res.status(200).json({ comment_id: inserted.id });
      } catch (e) {
        console.error('POST comment error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    // ── action=unreact ─────────────────────────────────────
    if (action === 'unreact') {
      try {
        const { post_id } = body;
        if (!post_id) return res.status(400).json({ error: 'post_id_required' });

        const pid = sanitize(String(post_id), 36);

        const { error: deleteErr } = await supabase
          .from('community_reactions')
          .delete()
          .eq('post_id', pid)
          .eq('user_id', user.id);

        if (deleteErr) {
          console.error('Unreact delete error:', deleteErr.message);
          return res.status(500).json({ error: 'unreact_failed', detail: deleteErr.message });
        }

        // Decrement reaction_count and recalculate hot_score
        const { error: scoreErr } = await supabase.rpc('recalculate_post_scores', { target_post_id: pid });
        if (scoreErr) {
          console.error('recalculate_post_scores RPC error (unreact):', scoreErr.message);
        }

        return res.status(200).json({ ok: true });
      } catch (e) {
        console.error('POST unreact error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    // ── action=post (forum short-form post) ───────────────
    if (action === 'post') {
      try {
        const VALID_POST_TYPES = new Set(['thought', 'question', 'collab', 'tip', 'snippet']);
        const { post_type, text, genre } = body;

        if (!text || !text.trim()) return res.status(400).json({ error: 'text_required' });
        const postType = VALID_POST_TYPES.has(post_type) ? post_type : 'thought';
        const content  = sanitize(text.trim(), 280);
        const titleFromContent = content.slice(0, 60) + (content.length > 60 ? '…' : '');

        const row = {
          user_id:        user.id,
          song_id:        null,
          title:          titleFromContent,
          genre:          sanitize(genre || '', 50) || null,
          topic:          postType,      // topic field stores post_type for forum posts
          note:           content,       // note field stores the full text body
          lyrics_preview: '',
          is_published:   true,
          reaction_count: 0,
          comment_count:  0,
          hot_score:      0,
          created_at:     new Date().toISOString()
        };

        const { data: inserted, error: insertErr } = await supabase
          .from('community_posts')
          .insert(row)
          .select('id')
          .single();

        if (insertErr) {
          console.error('Forum post insert error:', insertErr.message);
          return res.status(500).json({ error: 'post_failed', detail: insertErr.message });
        }

        // Redis: track activity counters
        const redisTrackPost = [
          ['INCR', 'soniq:community:posts:total'],
          ['INCR', `soniq:community:posts:${postType}`],
        ];
        if (row.genre) redisTrackPost.push(['ZINCRBY', 'soniq:community:genres', '1', row.genre]);
        await redisPipeline(redisTrackPost);

        return res.status(200).json({ post_id: inserted.id });
      } catch (e) {
        console.error('POST forum post error:', e.message);
        return res.status(500).json({ error: 'internal_error' });
      }
    }

    return res.status(400).json({ error: 'unknown_action', received: action });
  }
};
