# Soniq — Supabase Setup

## Overview

This directory contains the SQL files needed to initialize the Soniq database in Supabase.

## Files

- `schema.sql` — Creates all tables, indexes, triggers, and functions
- `rls.sql` — Enables Row Level Security and defines per-user access policies

## Environment Variables

Set these in your Vercel project settings and local `.env` file:

| Variable | Where to find it |
|---|---|
| `SUPABASE_URL` | Supabase dashboard → Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → `service_role` `secret` key — **never expose this client-side** |

## Running the SQL Files

### Option A — Supabase SQL Editor (recommended for first-time setup)

1. Open your Supabase project at [app.supabase.com](https://app.supabase.com)
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Paste the contents of `schema.sql` and click **Run**
5. Open another new query, paste `rls.sql`, and click **Run**

### Option B — Supabase CLI

```bash
# Install CLI if needed
npm install -g supabase

# Link to your project (find your project ref in the Supabase dashboard URL)
supabase link --project-ref <your-project-ref>

# Push the SQL files
supabase db execute --file supabase/schema.sql
supabase db execute --file supabase/rls.sql
```

### Option C — psql direct connection

```bash
psql "postgresql://postgres:<db-password>@db.<project-ref>.supabase.co:5432/postgres" \
  -f supabase/schema.sql \
  -f supabase/rls.sql
```

The database password is found in Supabase dashboard → Project Settings → Database → Database password.

## Re-running / Idempotency

All `CREATE TABLE`, `CREATE INDEX`, and `CREATE POLICY` statements use `IF NOT EXISTS` or `CREATE OR REPLACE` where supported, so the files are safe to re-run. If you need to reset cleanly, drop the `public` tables first or use Supabase's **Reset database** option (destructive).

## Notes

- `schema.sql` must be run before `rls.sql`
- The `handle_new_user` trigger auto-creates a row in `public.profiles` for every new Supabase Auth signup
- The service role key is used only in server-side API routes (`/api/account-delete.js`) and must never be shipped to the browser
