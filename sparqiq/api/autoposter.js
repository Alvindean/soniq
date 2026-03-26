/**
 * SparqIQ — Social Media Autoposter (Blotato)
 * Vercel Cron: runs daily at 9:00 AM UTC
 * Reads from /content/social-queue.json
 * Posts to X, LinkedIn, Reddit via Blotato API
 *
 * Required env vars:
 *   BLOTATO_API_KEY          — Your Blotato API key (Settings → API Keys)
 *   BLOTATO_TWITTER_ID       — Account ID from GET /v2/users/me/accounts
 *   BLOTATO_LINKEDIN_ID      — Account ID from GET /v2/users/me/accounts
 *   BLOTATO_REDDIT_ID        — Account ID from GET /v2/users/me/accounts
 *   LAUNCH_DATE              — ISO date string e.g. "2026-04-01"
 *   AUTOPOSTER_SECRET        — Random string for manual trigger auth
 *
 * Manual trigger:
 *   GET /api/autoposter?secret=YOUR_SECRET
 *   GET /api/autoposter?secret=YOUR_SECRET&day=5   (force specific day)
 *
 * To find your account IDs:
 *   GET /api/autoposter/accounts?secret=YOUR_SECRET
 */

const path = require('path');
const fs = require('fs');

const BLOTATO_BASE = 'https://backend.blotato.com/v2';

// ── Load content queue ────────────────────────────────────────
function loadQueue() {
  const queuePath = path.join(process.cwd(), 'content', 'social-queue.json');
  return JSON.parse(fs.readFileSync(queuePath, 'utf8'));
}

// ── Day offset from launch date ───────────────────────────────
function getDayOffset() {
  const launchDate = process.env.LAUNCH_DATE;
  if (!launchDate) throw new Error('LAUNCH_DATE env var not set. Format: 2026-04-01');
  const diffMs = Date.now() - new Date(launchDate).getTime();
  return Math.floor(diffMs / 86400000) + 1; // Day 1 = launch day
}

// ── Blotato post ──────────────────────────────────────────────
async function blotatoPost({ accountId, platform, text, mediaUrls = [], scheduleISO = null }) {
  const apiKey = process.env.BLOTATO_API_KEY;
  if (!apiKey) throw new Error('BLOTATO_API_KEY not set');
  if (!accountId) {
    console.log(`No account ID for ${platform} — skipping`);
    return { skipped: true, reason: `BLOTATO_${platform.toUpperCase()}_ID not set` };
  }

  const body = {
    post: {
      accountId: String(accountId),
      content: { text, mediaUrls, platform },
      target: { targetType: platform }
    }
  };

  // Add scheduling at root level (not nested in post)
  if (scheduleISO) body.scheduledTime = scheduleISO;

  const res = await fetch(`${BLOTATO_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Blotato ${platform} failed (${res.status}): ${JSON.stringify(data).slice(0, 200)}`);
  return { posted: true, id: data.id || data.postId || res.status };
}

// ── Format Twitter thread into single post ────────────────────
function formatThread(tweets) {
  if (!Array.isArray(tweets) || tweets.length === 1) return tweets?.[0] || '';
  // Join thread tweets with divider so it reads naturally as one post
  return tweets.join('\n\n🧵\n\n');
}

// ── Main handler ──────────────────────────────────────────────
module.exports = async function handler(req, res) {
  const secret = req.query?.secret;

  // Auth check
  if (process.env.AUTOPOSTER_SECRET && secret !== process.env.AUTOPOSTER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized — provide ?secret=YOUR_SECRET' });
  }

  // Helper route: list connected accounts
  if (req.url?.includes('/accounts')) {
    const apiKey = process.env.BLOTATO_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'BLOTATO_API_KEY not set' });
    const r = await fetch(`${BLOTATO_BASE}/users/me/accounts`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    const accounts = await r.json();
    return res.status(200).json(accounts);
  }

  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).end();

  try {
    const queue = loadQueue();
    const day = parseInt(req.query?.day) || getDayOffset();

    if (day < 1 || day > queue.meta.total_days) {
      return res.status(200).json({
        message: `Day ${day} is outside the ${queue.meta.total_days}-day queue.`,
        campaignComplete: day > queue.meta.total_days
      });
    }

    const entry = queue.queue.find(q => q.day === day);
    if (!entry) return res.status(200).json({ message: `No content scheduled for day ${day}` });

    console.log(`Autoposter: Day ${day} — ${entry.theme}`);

    const {
      BLOTATO_TWITTER_ID,
      BLOTATO_LINKEDIN_ID,
      BLOTATO_REDDIT_ID
    } = process.env;

    const posts = [];

    // Twitter / X
    if (entry.platforms?.twitter) {
      const t = entry.platforms.twitter;
      const text = t.type === 'thread' ? formatThread(t.tweets) : (t.text || '');
      posts.push(
        blotatoPost({
          accountId: BLOTATO_TWITTER_ID,
          platform: 'twitter',
          text,
          mediaUrls: t.mediaUrl ? [t.mediaUrl] : []
        }).then(r => ({ platform: 'twitter', ...r }))
          .catch(e => ({ platform: 'twitter', error: e.message }))
      );
    }

    // LinkedIn
    if (entry.platforms?.linkedin) {
      const l = entry.platforms.linkedin;
      posts.push(
        blotatoPost({
          accountId: BLOTATO_LINKEDIN_ID,
          platform: 'linkedin',
          text: l.content,
          mediaUrls: l.mediaUrl ? [l.mediaUrl] : []
        }).then(r => ({ platform: 'linkedin', ...r }))
          .catch(e => ({ platform: 'linkedin', error: e.message }))
      );
    }

    // Reddit
    if (entry.platforms?.reddit) {
      const rd = entry.platforms.reddit;
      const text = `**${rd.title}**\n\n${rd.content}`;
      posts.push(
        blotatoPost({
          accountId: BLOTATO_REDDIT_ID,
          platform: 'reddit',
          text,
          mediaUrls: []
        }).then(r => ({ platform: 'reddit', ...r }))
          .catch(e => ({ platform: 'reddit', error: e.message }))
      );
    }

    const results = await Promise.all(posts);
    const summary = Object.fromEntries(results.map(r => [r.platform, r]));

    console.log('Autoposter results:', JSON.stringify(summary));
    return res.status(200).json({ success: true, day, theme: entry.theme, results: summary });

  } catch (err) {
    console.error('Autoposter error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
