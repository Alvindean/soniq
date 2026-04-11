# SONIQ Endpoint Monitor Report
**Domain:** www.mysoniq.com
**Scan Time:** 2026-04-10 ~13:08 UTC
**Overall Status:** 🔴 CRITICAL — 3 endpoints down

---

## Summary

| Metric | Count |
|--------|-------|
| Endpoints checked | 11 |
| OK | 7 |
| WARNING | 1 |
| CRITICAL | 3 |

---

## Full Status Table

| # | Endpoint | Expected | Received | Body/Detail | Status |
|---|----------|----------|----------|-------------|--------|
| 1 | /api/health | 200 | 200 | JSON health data (supabase ok, redis ok) | ✅ OK |
| 2 | /api/analytics | 401 | 401 | `{"error":"Unauthorized"}` | ✅ OK |
| 3 | /api/founding | 200 | 200 | Tier data with pricing returned | ✅ OK |
| 4 | /api/generate | 401/405 | 405 | `{"error":"Method not allowed"}` | ✅ OK |
| 5 | /api/stripe | 405 | CRASH | Browser error page — FUNCTION_INVOCATION_FAILED | 🔴 CRITICAL |
| 6 | /api/stream | 401/405 | CRASH | Browser error page — FUNCTION_INVOCATION_FAILED | 🔴 CRITICAL |
| 7 | /api/community | 200/405 | 200 | `{"error":"unknown_action","received":""}` | ✅ OK |
| 8 | /api/admin | 401 | 401 | `{"error":"Unauthorized"}` | ✅ OK |
| 9 | /api/publish | 405 | 200 | `{"error":"unauthorized"}` — expected 405, got auth check | ⚠️ WARNING |
| 10 | /api/track | 405 | CRASH | Browser error page — FUNCTION_INVOCATION_FAILED | 🔴 CRITICAL |
| 11 | /api/aff | 302/200 | 200 | `{"error":"Unknown partner"}` | ✅ OK |

---

## CRITICAL Issues (Immediate Attention Required)

### 1. /api/stripe — FUNCTION_INVOCATION_FAILED
- **Expected:** 405 (POST required)
- **Received:** Browser error page (function crashed before returning any response)
- **Impact:** Stripe payment processing is non-functional. Users cannot complete purchases.

### 2. /api/stream — FUNCTION_INVOCATION_FAILED
- **Expected:** 401 or 405 (POST + auth required)
- **Received:** Browser error page (function crashed before returning any response)
- **Impact:** Music streaming/generation endpoint is down. Core product functionality affected.

### 3. /api/track — FUNCTION_INVOCATION_FAILED
- **Expected:** 405 (POST required)
- **Received:** Browser error page (function crashed before returning any response)
- **Impact:** Track management/analytics endpoint is non-functional.

---

## Warnings

### /api/publish — Unexpected Response Behavior
- **Expected:** 405 (Method Not Allowed for GET)
- **Received:** 200 with `{"error":"unauthorized"}`
- **Note:** Function loads successfully but returns auth error instead of method-not-allowed. Minor behavioral inconsistency.

### /api/health — Missing Environment Variable
- **SUPABASE_SERVICE_KEY** reports `false` in the health check
- All other env vars report `true`
- This may be intentional (using anon key only) or a misconfiguration

---

## Recommended Actions

1. **Immediate:** Check Vercel function logs for `/api/stripe`, `/api/stream`, `/api/track`
2. **Immediate:** Verify all environment variables are set — `SUPABASE_SERVICE_KEY` shows `false`
3. **Investigate:** Determine if a recent deployment caused the 3 function crashes
4. **Consider:** Rolling back to last known good deployment if these are regressions
5. **Low priority:** Align `/api/publish` GET behavior to return 405 instead of 200

---

*Report generated automatically by SONIQ Endpoint Monitor — 2026-04-10*
