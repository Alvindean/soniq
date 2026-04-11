# SONIQ Endpoint Monitor — Status Report

**Domain:** www.mysoniq.com
**Deployment:** dpl_CPwWgA76U4ax8PsgCoMZV8bWiLzd (production, main branch)
**Run time (UTC):** 2026-04-10T01:36:00Z – 2026-04-10T01:40:00Z
**Local date:** 2026-04-09
**Overall status:** HEALTHY — no CRITICAL issues. 2 informational WARNINGs on endpoints that require query parameters.

## Status Table

| # | Endpoint | Method | Expected | Received | Response Time | Status | Notes |
|---|----------|--------|----------|----------|---------------|--------|-------|
| 1 | /api/health | GET | 200 | **200** | <1s | OK | Supabase + Redis + crypto all report "ok". Note: `SUPABASE_SERVICE_KEY=false` in env report (informational, not a monitor failure). |
| 2 | /api/analytics | GET | 401 | **401** | <1s | OK | Verified via Vercel runtime logs (19 consecutive 401 responses during check window). Vercel MCP connector had trouble relaying the 401 JSON response, but the function itself is healthy. |
| 3 | /api/founding | GET | 200 | **200** | <1s | OK | Returned founding-tier data (tier1 active, 500 spots). |
| 4 | /api/generate | GET | 401 or 405 | **405** | <1s | OK | POST-only endpoint, returned 405 as expected. |
| 5 | /api/stripe | GET | 405 | **405** | <1s | OK | POST-only, 405 as expected. |
| 6 | /api/stream | GET | 401 or 405 | **405** | <1s | OK | POST-only, 405 as expected. |
| 7 | /api/community | GET | 200 or 405 | **400** | <1s | WARNING | Returned `{"error":"unknown_action","received":""}`. Function loaded successfully; it requires an `action` query param. Not a crash, but the check's expectation should be updated or the call should include `?action=<something>`. |
| 8 | /api/admin | GET | 401 | **401** | <1s | OK | Verified via Vercel runtime logs (19 consecutive 401 responses during check window). Same MCP relay quirk as /api/analytics; function is healthy. |
| 9 | /api/publish | GET | 405 | **405** | <1s | OK | POST-only, 405 as expected. |
| 10 | /api/track | GET | 405 | **405** | <1s | OK | POST-only, 405 as expected. |
| 11 | /api/aff | GET | 302 or 200 | **400** | <1s | WARNING | Returned `{"error":"Unknown partner"}`. Function loaded successfully; redirect only fires when a valid `?p=<partner>` param is present. Monitor should call with a known partner slug (e.g. `/api/aff?p=test`) to get the 302. |

## Severity Summary

| Level | Count | Endpoints |
|-------|-------|-----------|
| CRITICAL | 0 | — |
| WARNING | 2 | /api/community, /api/aff |
| OK | 9 | /api/health, /api/analytics, /api/founding, /api/generate, /api/stripe, /api/stream, /api/admin, /api/publish, /api/track |

## Critical Findings

None. No FUNCTION_INVOCATION_FAILED, no 5xx errors, no timeouts, no unreachable endpoints. Vercel runtime log search for `level in (error, fatal)` in the last 60 minutes returned **zero** matches for the production deployment.

## Warning Findings

### /api/community → 400 (expected 200 or 405)
Body: `{"error":"unknown_action","received":""}`
Root cause: the handler dispatches on an `action` query parameter (or POST body field). A bare `GET /api/community` has no action, so it short-circuits to 400. **Not a bug** — the function is loading and executing correctly. Recommend updating the monitor to either call with a valid action (e.g. `?action=list`) or accept 400 for this endpoint.

### /api/aff → 400 (expected 302 or 200)
Body: `{"error":"Unknown partner"}`
Root cause: the affiliate redirect handler requires a partner slug in the query string (typically `?p=<partner>`). Without one, it returns 400. **Not a bug.** Recommend updating the monitor to call `/api/aff?p=test` (or a known-good partner) to exercise the 302 path.

## Health Endpoint Snapshot

```json
{
  "timestamp": "2026-04-10T01:36:00.847Z",
  "node_version": "v22.22.0",
  "env": {
    "SUPABASE_URL": true,
    "SUPABASE_SERVICE_KEY": false,
    "SUPABASE_ANON_KEY": true,
    "UPSTASH_REDIS_REST_URL": true,
    "UPSTASH_REDIS_REST_TOKEN": true,
    "ADMIN_PASSWORD": true
  },
  "supabase": "ok (profiles: 0)",
  "redis": "ok (total_songs: 3)",
  "crypto": "ok"
}
```

Note: `SUPABASE_SERVICE_KEY` reports `false` (not present in the deployment's environment variables). This is **not a monitor failure** and the task rules do not flag it as CRITICAL or WARNING, but it's worth flagging for review — any server-side operation that needs service-role Supabase access would fail.

## Action Taken

- No alert email drafted (task rule: alert only on CRITICAL).
- Status report saved to `C:\Users\alvin\soniq\monitoring\status-report-2026-04-09.md`.

## Recommendations (non-blocking)

1. Update monitor expectations for `/api/community` and `/api/aff` to match the real handler contracts (they require query params), OR call them with sample params so they exercise the real happy-path code.
2. Investigate whether `SUPABASE_SERVICE_KEY` should be set in the production Vercel env — its absence from `/api/health` report is a latent risk, not a current outage.
3. Consider adding a synthetic 200-path check for `/api/community?action=list` and `/api/aff?p=<known-partner>` so the monitor has real green/red signals on those routes.
