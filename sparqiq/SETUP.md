# SparqIQ — Setup & Launch Guide

## 1. Deploy to Vercel

```bash
cd sparqiq
npm i -g vercel
vercel --prod
```

## 2. Environment Variables (Vercel → Settings → Environment Variables)

### Required (at least one AI key)
| Variable | Value | Required |
|---|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes (or OpenRouter) |
| `OPENROUTER_API_KEY` | Your OpenRouter API key | Fallback |

### Autoposter (Blotato — $29/mo, handles all platforms)
| Variable | Value |
|---|---|
| `BLOTATO_API_KEY` | Your Blotato API key (Settings → API Keys) |
| `BLOTATO_TWITTER_ID` | Account ID — see step 4 below |
| `BLOTATO_LINKEDIN_ID` | Account ID — see step 4 below |
| `BLOTATO_REDDIT_ID` | Account ID — see step 4 below |
| `LAUNCH_DATE` | ISO date e.g. `2026-04-01` |
| `AUTOPOSTER_SECRET` | Random string for manual trigger auth |

## 3. After Deploy — SEO Setup

1. **Google Search Console**
   - Add property: `https://sparqiq.com`
   - Submit sitemap: `https://sparqiq.com/sitemap.xml`

2. **IndexNow** (instant indexing for Bing/Yandex)
   ```
   POST https://api.indexnow.org/indexnow
   Body: { "host": "sparqiq.com", "key": "YOUR_KEY", "urlList": ["https://sparqiq.com/", "https://sparqiq.com/blog/..."] }
   ```

3. **Google Analytics / Plausible**
   - Add tracking snippet to all HTML files

## 4. Autoposter Setup (Blotato)

### Step 1 — Sign up
Go to blotato.com → Start free trial → Settings → API Keys → copy your key

### Step 2 — Connect social accounts
Inside Blotato: Settings → Social Accounts → connect X, LinkedIn, Reddit

### Step 3 — Add API key to Vercel
Add `BLOTATO_API_KEY` to Vercel environment variables

### Step 4 — Find your account IDs
After deploying, visit:
```
GET https://sparqiq.com/api/autoposter/accounts?secret=YOUR_AUTOPOSTER_SECRET
```
This returns all connected accounts. Copy the `id` for each platform and add:
- `BLOTATO_TWITTER_ID`
- `BLOTATO_LINKEDIN_ID`
- `BLOTATO_REDDIT_ID`

### Step 5 — Set launch date
Add `LAUNCH_DATE=2026-04-01` (or your actual launch date) to Vercel env vars

### Step 6 — Test day 1
```
GET https://sparqiq.com/api/autoposter?secret=YOUR_SECRET&day=1
```
Check the response — should show `"posted": true` for each platform

## 5. Social Content Queue

The autoposter reads from `content/social-queue.json`.
Posts are selected by calculating days since `LAUNCH_DATE`.

**Manual trigger (for testing):**
```
GET https://sparqiq.com/api/autoposter?secret=YOUR_AUTOPOSTER_SECRET&day=1
```

**Vercel Cron** runs automatically every day at 9:00 AM UTC.
No action needed after setup.

## 6. Buffer (Backup / Manual Option)

If you prefer manual scheduling:
1. Sign up at buffer.com (free tier: 3 channels, 10 posts)
2. Connect X, LinkedIn, Reddit
3. Copy posts from `content/social-queue.json` into Buffer
4. Schedule at: 9 AM your timezone

## 7. Image Generation

Run image generation for all placeholder images in `/public/blog/images/`:
- `sparqiq-og.jpg` (1200×630) — main OG image
- `sparqiq-blog-og.jpg` (1200×630) — blog hub OG
- `ai-business-idea-generator-hero.jpg` (1200×630)
- `ai-business-idea-generator-thumb.jpg` (800×450)
- `cross-niche-business-ideas-2026-hero.jpg` (1200×630)
- `cross-niche-business-ideas-2026-thumb.jpg` (800×450)
- `how-to-validate-business-idea-hero.jpg` (1200×630)
- `how-to-validate-business-idea-thumb.jpg` (800×450)
- `ai-market-research-tools-hero.jpg` (1200×630)
- `ai-competitor-analysis-hero.jpg` (1200×630)

Style: dark background, electric purple/cyan accents, clean modern UI screenshots or abstract illustrations.
