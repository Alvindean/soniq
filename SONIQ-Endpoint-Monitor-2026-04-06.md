# SONIQ API Endpoint Monitor Report
**Date:** Monday, April 6, 2026 — 19:07 UTC
**Domain:** www.mysoniq.com
**Run Type:** Scheduled automated check

---

## Summary

- **Total Endpoints Checked:** 11
- **OK:** 6
- **WARNING:** 3
- **CRITICAL:** 2

---

## Status Table

| # | Endpoint | Response Code | Expected Code | Status | Notes |
|---|----------|--------------|---------------|--------|-------|
| 1 | /api/health | 200 OK | 200 | OK | Supabase: ok, Redis: ok (3 songs), Crypto: ok. SUPABASE_SERVICE_KEY env is false. |
| 2 | /api/analytics | NO RESPONSE (3x timeout) | 401 | CRITICAL | Function unresponsive — 3 consecutive attempts all timed out. Likely FUNCTION_INVOCATION_FAILED. |
| 3 | /api/founding | 200 OK | 200 | OK | Tier 1 active (500 spots, $5/mo). Tier 2 inactive. Data consistent. |
| 4 | /api/generate | 405 Method Not Allowed | 401 or 405 | OK | Correctly rejects GET. POST + auth required. |
| 5 | /api/stripe | 405 Method Not Allowed | 405 | OK | Correctly rejects GET. POST required. |
| 6 | /api/stream | 405 Method Not Allowed | 401 or 405 | OK | Correctly rejects GET. POST + auth required. |
| 7 | /api/community | 400 Bad Request | 200 or 405 | WARNING | Function loads but returns {"error":"unknown_action","received":""}. Expects an action query param — not a crash, but unexpected for a bare GET. |
| 8 | /api/admin | NO RESPONSE (3x timeout) | 401 | CRITICAL | Function unresponsive — 3 consecutive attempts all timed out. Likely FUNCTION_INVOCATION_FAILED. |
| 9 | /api/publish | 401 Unauthorized | 405 | WARNING | Function loads and responds, but returns 401 instead of 405. Checks auth before method — minor behavioral difference, not a crash. |
| 10 | /api/track | 405 Method Not Allowed | 405 | OK | Correctly rejects GET. POST required. |
| 11 | /api/aff | 400 Bad Request | 302 or 200 | WARNING | Function loads but returns {"error":"Unknown partner"}. Expects a partner query param. Not a crash, but no redirect behavior on bare GET. |

---

## Critical Issues Detail

### /api/analytics — CRITICAL
- **Symptom:** 3 consecutive requests returned no response (connector timeout)
- **Expected behavior:** Should return 401 (auth required) on unauthenticated GET
- **Likely cause:** Serverless function crash (FUNCTION_INVOCATION_FAILED) or cold-start timeout
- **Impact:** Analytics dashboard and any client-facing analytics features are non-functional
- **Action:** Check Vercel function logs for /api/analytics. Redeploy if needed.

### /api/admin — CRITICAL
- **Symptom:** 3 consecutive requests returned no response (connector timeout)
- **Expected behavior:** Should return 401 (auth required) on unauthenticated GET
- **Likely cause:** Serverless function crash (FUNCTION_INVOCATION_FAILED) or cold-start timeout
- **Impact:** Admin panel and all admin operations are non-functional
- **Action:** Check Vercel function logs for /api/admin. Redeploy if needed.

---

## Warnings Detail

### /api/community — WARNING
Returns 400 with `{"error":"unknown_action"}` instead of 200 or 405. The function loads fine but requires an `action` parameter. Consider adding a default response for bare GET requests.

### /api/publish — WARNING
Returns 401 instead of expected 405. The function checks authentication before validating the HTTP method. Not a crash — just a behavioral discrepancy. Low priority.

### /api/aff — WARNING
Returns 400 with `{"error":"Unknown partner"}` instead of 302/200. The function loads but requires a partner identifier. Consider adding a default redirect or friendly response for bare hits.

---

## Health Check Details
The /api/health endpoint reports:
- **Node version:** v22.22.0
- **Supabase:** Connected (profiles: 0)
- **Redis:** Connected (total_songs: 3)
- **Crypto:** OK
- **Env flags:** SUPABASE_URL ✓, SUPABASE_SERVICE_KEY ✗, SUPABASE_ANON_KEY ✓, UPSTASH_REDIS_REST_URL ✓, UPSTASH_REDIS_REST_TOKEN ✓, ADMIN_PASSWORD ✓

> Note: SUPABASE_SERVICE_KEY shows as `false`. If this key is required by /api/analytics or /api/admin, its absence could be the root cause of both CRITICAL failures.

---

*Report generated automatically by SONIQ Endpoint Monitor scheduled task.*
