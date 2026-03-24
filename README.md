# SONIQ — AI Song Creation Studio

Full-stack deployment: Vercel (serverless) + Supabase (auth + database).

## Project Structure

```
soniq-vercel/
├── api/
│   ├── generate.js        ← AI proxy: Anthropic primary, OpenRouter fallback
│   ├── stream.js          ← Streaming SSE proxy (same provider fallback logic)
│   ├── auth.js            ← Signup / login / session endpoints
│   └── songs.js           ← Cloud library CRUD
├── public/
│   └── index.html         ← Full SONIQ app
├── supabase-schema.sql    ← Run once in Supabase SQL editor
├── vercel.json
└── package.json
```

---

## Deploy in 4 Steps (~20 minutes)

### Step 1 — Supabase setup

1. Create free account at supabase.com
2. New Project → give it a name and password
3. SQL Editor → New Query → paste supabase-schema.sql → Run
4. Settings → API → copy these 3 values:
   - Project URL        → SUPABASE_URL
   - anon public        → SUPABASE_ANON_KEY  
   - service_role       → SUPABASE_SERVICE_ROLE_KEY (keep secret!)

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "SONIQ v1.0"
git remote add origin https://github.com/YOU/soniq.git
git push -u origin main
```

### Step 3 — Deploy to Vercel

1. vercel.com → Add New Project → import your repo
2. Framework: Other
3. Click Deploy (fails until env vars are set — that's OK)

### Step 4 — Environment variables

Vercel → your project → Settings → Environment Variables.

**AI provider** — add at least one (Anthropic is tried first; OpenRouter is the fallback):

| Variable              | Where to find it |
|-----------------------|-----------------|
| ANTHROPIC_API_KEY     | console.anthropic.com → API Keys (`sk-ant-...`) |
| OPENROUTER_API_KEY    | openrouter.ai/keys (`sk-or-...`) — optional fallback |

**Supabase + app** — add all four:

| Variable                   | Where to find it |
|----------------------------|-----------------|
| SUPABASE_URL               | Supabase → Settings → API → Project URL |
| SUPABASE_ANON_KEY          | Supabase → Settings → API → anon public |
| SUPABASE_SERVICE_ROLE_KEY  | Supabase → Settings → API → service_role |
| APP_URL                    | Your Vercel URL e.g. https://soniq.vercel.app |

After saving → Deployments → latest → Redeploy. Done.

---

## Local Development

```bash
npm install
```

Create .env.local (never commit):
```
# AI provider — add at least one; Anthropic is tried first, OpenRouter is the fallback
ANTHROPIC_API_KEY=sk-ant-...
OPENROUTER_API_KEY=sk-or-...

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
APP_URL=http://localhost:3000
```

```bash
npx vercel dev
# → open http://localhost:3000
```

---

## Usage Limits

| Plan                | Songs/month | Library       |
|---------------------|-------------|---------------|
| Not signed in       | 3/hour      | localStorage  |
| Free (signed in)    | 5/month     | Cloud sync    |
| Pro ($9/mo)         | Unlimited   | Cloud sync    |

Manually upgrade a user in Supabase:
```sql
UPDATE user_profiles SET plan = 'pro' WHERE email = 'user@example.com';
```

---

## How the Security Works

```
Browser → POST /api/generate (Authorization: Bearer <jwt>)
        → Vercel Function verifies JWT with Supabase
        → Checks + increments usage counter
        → Tries Anthropic first (ANTHROPIC_API_KEY)
        → Falls back to OpenRouter (OPENROUTER_API_KEY) if Anthropic fails
        → Returns result
```

Your API keys never touch the browser. Ever.

## AI Provider Fallback

SONIQ uses a two-provider fallback chain:

1. **Anthropic** (`ANTHROPIC_API_KEY`) — primary, uses `claude-sonnet-4-20250514`
2. **OpenRouter** (`OPENROUTER_API_KEY`) — automatic fallback if Anthropic is unavailable

You can set one or both. If only OpenRouter is configured, it is used directly without fallback.

---

## Next: Add Stripe

1. Create products in Stripe: Pro $9/mo, Studio $19/mo
2. Add api/stripe-webhook.js — on checkout.session.completed, update user_profiles.plan = 'pro'
3. Add Upgrade button → Stripe Checkout link

Stripe quickstart: stripe.com/docs/billing/quickstart
