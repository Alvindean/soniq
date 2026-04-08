---
name: vercel-function-fix
description: >
  Diagnose and fix Vercel serverless functions that return 500 errors, FUNCTION_INVOCATION_FAILED,
  or crash silently. Use this skill IMMEDIATELY whenever someone reports a broken API endpoint on Vercel,
  sees "FUNCTION_INVOCATION_FAILED" in logs, gets HTTP 500 from a /api/ route, says "my serverless function
  isn't working", "API returning 500", "function crashing on Vercel", "endpoint broken after deploy",
  "works locally but not on Vercel", or any time a Vercel-deployed Node.js function fails at runtime.
  Also use when someone says "audit my Vercel functions", "check my API endpoints", or "why is my
  function timing out". This skill encodes a battle-tested 4-phase protocol (Triage → Diagnose →
  Fix → Verify) that resolves the most common Vercel serverless function failures, especially the
  silent FUNCTION_INVOCATION_FAILED crashes caused by bundler incompatibilities.
---

# Vercel Function Fix — Serverless Audit & Repair Protocol

This skill walks through a systematic protocol to diagnose and fix broken Vercel serverless functions.
It was built from real production debugging where standard approaches (adding try/catch, wrapping
requires) kept failing — because the root causes live in how Vercel's bundler transforms your code
before it ever runs.

## Why functions crash silently on Vercel

Vercel compiles Node.js serverless functions using ncc (a webpack-based bundler) that transforms
your source code before deployment. When this bundler encounters certain patterns, it can produce
output that crashes during module initialization — **before your handler function ever executes**.
This means:

- Your try/catch blocks never run (the crash happens before them)
- Your console.error calls never fire (your code never executes)
- Vercel logs show `FUNCTION_INVOCATION_FAILED` with no useful stack trace
- The function appears to "not exist" even though the build succeeded

The most common triggers are specific Node.js built-in imports and certain JavaScript syntax
patterns that the bundler mishandles during its ESM-to-CJS transpilation.

---

## Phase 1: TRIAGE (5 minutes)

Goal: Determine if the function crashes at initialization or during execution.

### Step 0: List deployments and check state

Use `list_deployments(projectId, teamId)` to find the latest deployment ID. You'll need this for build logs in Step 2. Note the deployment state (READY/BUILDING/ERROR) — if it's not READY, wait.

### Step 1: Check runtime logs

Use the Vercel MCP or dashboard to pull recent runtime logs for the failing endpoint:

```
get_runtime_logs(projectId, teamId, environment="production", query="<endpoint-name>")
```

What to look for:
- **No log entries at all** → FUNCTION_INVOCATION_FAILED (module init crash)
- **Error log entries with stack traces** → Runtime error (your code ran but threw)
- **Timeout entries** → Function exceeded maxDuration

Check if the function is configured for Edge Runtime in vercel.json (`"runtime": "edge"`). Edge functions can't use Node.js built-ins like `crypto`, `Buffer`, `fs`, etc. even inside the handler. If you see Edge Runtime, the fix patterns in Phase 3 need adjustment — you must use Web APIs only (e.g., `crypto.subtle` instead of `require('node:crypto')`).

### Step 2: Check build logs

Pull the build logs for the latest deployment:

```
get_deployment_build_logs(deploymentId, teamId)
```

What to look for:
- Build errors (rare — usually the deploy fails entirely)
- Warning about ESM-to-CJS compilation: `"Node.js functions are compiled from ESM to CommonJS"`
- Node.js version warnings (e.g., engines field vs project setting mismatch)

### Step 3: Hit the endpoint directly

Use `web_fetch_vercel_url` to call the endpoint and read the raw response:

```
web_fetch_vercel_url("https://your-domain.com/api/your-endpoint")
```

The response tells you exactly what's happening:

| Response | Meaning |
|----------|---------|
| `FUNCTION_INVOCATION_FAILED` (text/plain) | Module initialization crash — bundler issue |
| HTTP 500 with JSON error body | Your handler ran but threw an error |
| HTTP 401/403 | Function works, auth is blocking |
| HTTP 200 | Function works — issue is elsewhere |

**If the fetch times out or fails:** Use `get_deployment(deploymentId, teamId)` to confirm the deployment is in READY state. If READY, retry after 30 seconds. If the endpoint consistently fails to respond, check if the function has a `maxDuration` set in vercel.json — it may be timing out during execution.

### Step 4: Deploy a health probe (if needed)

If you can't tell what's wrong from logs alone, create a minimal health endpoint that tests
the same dependencies as the broken function. This isolates whether the issue is in the
imports/dependencies or in the business logic.

```javascript
// api/health.js — diagnostic probe
const { createClient } = require('@supabase/supabase-js');

module.exports = function handler(req, res) {
  var checks = {};

  // Test each dependency the broken function uses
  checks.supabase_import = 'ok';

  try {
    var crypto = require('node:crypto');
    checks.crypto = 'ok';
  } catch (e) {
    checks.crypto = 'error: ' + e.message;
  }

  // Test env vars (boolean only — never leak values)
  checks.env = {
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
    SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY
  };

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    node_version: process.version,
    checks: checks
  });
};
```

If health.js returns 200 but the broken function returns FUNCTION_INVOCATION_FAILED,
the problem is in the broken function's code specifically — not in shared dependencies.

---

## Phase 2: DIAGNOSE (10 minutes)

Goal: Identify the exact cause of the crash.

### The Comparison Method

Find a **working** function in the same project and diff it against the broken one.
The differences between a working and broken function in the same project are almost
always the root cause.

Compare these specific things:

1. **Module-scope imports** — What does each file `require()` at the top level?
2. **Module-scope code** — What runs during initialization (outside any function)?
3. **Export pattern** — `module.exports = function` vs `export default function`?
4. **JavaScript syntax features** — Arrow functions, optional chaining, nullish coalescing?

### The Top Crash Causes (in order of frequency)

Read `references/crash-causes.md` for the full catalog. The short version:

**Cause 1: `require('crypto')` at module scope**
The Node.js `crypto` module, when required at module scope, crashes Vercel's ncc bundler.
The bundler tries to polyfill it and produces broken output. This is the #1 silent killer.

**Cause 2: ESM/CJS mismatch**
Using `export default` when other functions use `module.exports`, or mixing the two.
Vercel transpiles ESM to CJS, and inconsistencies cause initialization failures.

**Cause 3: Bundler-hostile syntax patterns**
Certain combinations of modern JavaScript syntax (arrow functions in specific positions,
optional chaining in catch blocks, spread operators in certain contexts) can produce
broken transpiler output. Not always reproducible — depends on the bundler version.

**Cause 4: Missing environment variables**
Not a crash per se, but a common secondary issue. The function loads but returns
errors because a required env var (like a service key) isn't set in Vercel's dashboard.

---

## Phase 3: FIX (15 minutes)

Goal: Rewrite the function using proven bundler-safe patterns.

### The Nuclear Rewrite Protocol

When a function has FUNCTION_INVOCATION_FAILED and you can't isolate the exact line,
the fastest fix is a full rewrite following the "Vanilla JS" pattern. This isn't about
code quality preferences — it's about producing code that Vercel's bundler will
transpile correctly every time.

Read `references/safe-patterns.md` for the complete pattern library. Key rules:

**Rule 1: No `crypto` at module scope**
```javascript
// BAD — crashes Vercel bundler
const crypto = require('crypto');

// BAD — try/catch doesn't help (bundler processes before runtime)
let crypto;
try { crypto = require('crypto'); } catch(e) {}

// GOOD — require inside handler (if you actually need it)
module.exports = async function handler(req, res) {
  var crypto = require('node:crypto');
  // ...
};

// BEST — replace with pure JS if possible
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  var result = 0;
  for (var i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
```

**Security note:** This XOR comparison provides basic constant-time comparison for non-critical use (like admin panel auth). For password hashing or cryptographic token comparison, use a proper library like `tweetnacl` or accept the `require('node:crypto')` inside the handler approach (Option B).

**Rule 2: Use `function()` over `=>`**
```javascript
// Potentially problematic (bundler transpilation edge cases)
const handler = async (req, res) => { ... };
promise.then(r => r.json()).catch(e => null);

// Safe
module.exports = async function handler(req, res) { ... };
promise.then(function(r) { return r.json(); }).catch(function(e) { return null; });
```

**Rule 3: Avoid optional chaining and nullish coalescing**
```javascript
// Can break in bundled output
const email = payload?.user?.email ?? '';

// Safe
var email = (payload && payload.user && payload.user.email) ? payload.user.email : '';
```

**Rule 4: Use index access instead of destructuring Promise.all**
```javascript
// Can break
const [users, posts, stats] = await Promise.all([...]);

// Safe
var results = await Promise.all([...]);
var users = results[0];
var posts = results[1];
var stats = results[2];
```

**Rule 5: Consistent CJS exports**
```javascript
// The one true pattern for Vercel serverless functions
module.exports = async function handler(req, res) {
  // your code
};
```

### The Incremental Rebuild

If you want to isolate which specific pattern caused the crash (useful for learning),
instead of rewriting everything at once:

1. Replace the function with a minimal stub that returns `{ test: true }`
2. Deploy and verify it returns 200
3. Add back one section at a time (auth, then data fetching, then response formatting)
4. Deploy after each addition
5. When it breaks, you've found the culprit

### TypeScript Functions

All patterns above apply to TypeScript functions too. The key difference: use `import` instead of `require`, but avoid top-level `await` and dynamic `import()` at module scope. The bundler-hostile patterns (optional chaining, nullish coalescing, arrow functions in chains) are equally problematic in TypeScript because Vercel transpiles TS through the same bundler pipeline.

---

## Phase 4: VERIFY (5 minutes)

Goal: Confirm the fix works in production.

### Step 1: Deploy and wait

After pushing the fix, wait for the Vercel deployment to reach READY state:

```
list_deployments(projectId, teamId)
```

Check that the latest deployment shows `state: "READY"` and `target: "production"`.

### Step 2: Hit the production endpoint

```
web_fetch_vercel_url("https://your-domain.com/api/your-endpoint")
```

Expected: anything other than `FUNCTION_INVOCATION_FAILED`. Even a 401 (Unauthorized)
is a win — it means the function loaded and executed your auth check.

### Step 3: Check runtime logs are clean

```
get_runtime_logs(projectId, teamId, environment="production", statusCode="500", limit=5)
```

After the new deployment, there should be no new 500 entries for your endpoint.

### Step 4: Check for secondary issues

Common things that surface after fixing the primary crash:

- **Missing env vars** — Function runs but returns empty data (check health endpoint)
- **RLS restrictions** — Using anon key instead of service key returns 0 rows
- **CORS errors** — Frontend can't reach the endpoint (check Access-Control headers)
- **Auth flow broken** — Token validation fails (check JWT parsing, admin email list)

### Emergency Rollback

If your fix makes things worse, roll back to the previous working deployment:

1. In Vercel Dashboard, go to Deployments, find the last known-good deployment, click the three-dot menu → 'Promote to Production'.
2. Or use git: `git revert HEAD && git push` to undo the last commit.
3. Verify the rollback worked by hitting the endpoint again.
4. Then debug your fix in a preview deployment before pushing to production again.

---

## Quick Reference: The 60-Second Checklist

When you're in a rush, run through this in order:

- [ ] **Check deployment state** — Is the latest deployment in READY state? If BUILDING/ERROR, wait or investigate.
- [ ] **Is `require('crypto')` at module scope?** → Remove it or move inside handler
- [ ] **Is the export `module.exports = function`?** → Not `export default`
- [ ] **Are there arrow functions in `.then()` chains?** → Replace with `function()`
- [ ] **Is there `?.` or `??` syntax?** → Replace with explicit checks
- [ ] **Is there destructuring of `await Promise.all()`?** → Use index access
- [ ] **Are env vars set in Vercel dashboard?** → Check with health endpoint
- [ ] **Does a similar working function exist in the project?** → Diff against it

---

## Phase 5: MONITOR (Automated)

Goal: Catch regressions before users do.

After fixing a function, set up automated monitoring so you never get surprised by
a silent crash again. Use the `schedule` skill to create a recurring health check.

### Setting up the monitor

Use `create_scheduled_task` with a prompt that:
1. Pulls runtime error logs from Vercel for the last N hours
2. Hits each critical endpoint directly via `web_fetch_vercel_url`
3. Checks the health endpoint for env var status
4. Verifies the latest deployment is in READY state
5. Reports a status table and flags any CRITICAL/WARNING issues

### Recommended schedule

| Frequency | When to use |
|-----------|-------------|
| Every 6 hours | Production apps with moderate traffic |
| Every hour | High-traffic or revenue-critical endpoints |
| Every 15 min | During active deploys or after a fix |
| Daily at 8am | Stable apps, just want a morning check |

### What the monitor checks

| Check | OK | WARNING | CRITICAL |
|-------|-----|---------|----------|
| Endpoint response | 200 or 401 | Slow (>5s) | FUNCTION_INVOCATION_FAILED |
| Runtime errors | 0 in period | 1-10 errors | >10 errors |
| Deployment state | READY | BUILDING | ERROR or CANCELED |
| SUPABASE_SERVICE_KEY | true | — | false |
| Redis connectivity | "ok" | — | "error" |

### Example scheduled task prompt

```
Use the Vercel MCP to check these endpoints:
- https://your-domain.com/api/health (expect 200)
- https://your-domain.com/api/your-endpoint (expect 401 without auth)

Pull error logs for the last 6 hours. If any endpoint returns
FUNCTION_INVOCATION_FAILED, flag it as CRITICAL. Generate a status
table and list any action items.

Project ID: prj_xxx
Team ID: team_xxx
```

### Responding to alerts

When the monitor reports a CRITICAL issue:
1. Don't panic — the fix protocol in Phases 1-3 still applies
2. Check if a recent deployment caused the regression (compare deployment timestamps to when errors started)
3. If the previous deployment worked, consider rolling back via Vercel dashboard while you diagnose
4. Run the full Triage → Diagnose → Fix → Verify cycle
5. After fixing, keep the monitor at a higher frequency (every hour) for 24 hours to confirm stability
