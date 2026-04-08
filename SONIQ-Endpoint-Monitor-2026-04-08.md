# SONIQ API Endpoint Monitor Report

**Domain:** www.mysoniq.com
**Timestamp:** 2026-04-08 01:07 UTC
**Monitor Run:** Scheduled automated check

---

## Status Summary

| # | Endpoint | Expected | Received | Response Time | Status |
|---|----------|----------|----------|---------------|--------|
| 1 | /api/health | 200 | **200** | ~1s | OK |
| 2 | /api/analytics | 401 | **502** | N/A | **CRITICAL** |
| 3 | /api/founding | 200 | **200** | ~2s | OK |
| 4 | /api/generate | 401/405 | **405** | ~3s | OK |
| 5 | /api/stripe | 405 | **405** | ~4s | OK |
| 6 | /api/stream | 401/405 | **405** | ~5s | OK |
| 7 | /api/community | 200/405 | **400** | ~7s | **WARNING** |
| 8 | /api/admin | 401 | **TIMEOUT** | >30s (x2) | **CRITICAL** |
| 9 | /api/publish | 405 | **401** | ~1s | **WARNING** |
| 10 | /api/track | 405 | **405** | ~2s | OK |
| 11 | /api/aff | 302/200 | **400** | ~2s | **WARNING** |

---

## Overall Verdict: 2 CRITICAL / 3 WARNING / 6 OK

---

## CRITICAL Issues

### 1. /api/analytics — 502 (FUNCTION_INVOCATION_FAILED)
- **Expected:** 401 (auth required, function loads)
- **Received:** 502 Bad Gateway
- **Severity:** CRITICAL — The serverless function crashed on invocation. This means the analytics endpoint is completely non-functional.
- **Action Required:** Investigate Vercel function logs for /api/analytics. Likely causes: unhandled exception, missing environment variable, dependency failure, or timeout.

### 2. /api/admin — TIMEOUT (Unreachable)
- **Expected:** 401 (auth required)
- **Received:** No response after two attempts (connector timeout >30s each)
- **Severity:** CRITICAL — The admin endpoint is completely unreachable. The function either hangs indefinitely or crashes before returning a response.
- **Action Required:** Check Vercel function logs for /api/admin. Possible causes: infinite loop, database connection hang, missing await, or function exceeding max duration.

---

## WARNING Issues

### 3. /api/community — 400 Bad Request
- **Expected:** 200 or 405
- **Received:** 400 with body `{"error":"unknown_action","received":""}`
- **Assessment:** The function loads and responds, but requires an `action` parameter on GET. This may be by design (the endpoint expects a query parameter), but it doesn't match the expected behavior of returning 200 on a bare GET.
- **Recommendation:** Verify whether bare GET should return a default response or if the spec needs updating.

### 4. /api/publish — 401 Unauthorized
- **Expected:** 405 (POST required)
- **Received:** 401 Unauthorized
- **Assessment:** The function accepts GET requests (headers show `Allow: GET, POST, OPTIONS`) but requires auth. This is a minor spec mismatch — the function works, it just checks auth before method.
- **Recommendation:** Low priority. Consider adding method check before auth check if 405 is the intended GET behavior.

### 5. /api/aff — 400 Bad Request
- **Expected:** 302 redirect or 200
- **Received:** 400 with body `{"error":"Unknown partner"}`
- **Assessment:** The function loads and responds. It requires a partner parameter (likely a query string like `?ref=xyz`). Without it, returns 400. This is reasonable behavior for a bare GET without params.
- **Recommendation:** Update monitoring spec to include a test partner param, or accept 400 as valid for parameterless requests.

---

## Healthy Endpoints

- **/api/health** — 200 OK. Supabase: ok. Redis: ok (3 songs cached). Crypto: ok. Note: `SUPABASE_SERVICE_KEY` shows `false` in env check — verify this is intentional.
- **/api/founding** — 200 OK. Returning founding tier pricing data correctly. Tier 1 active (500 spots, $5/mo).
- **/api/generate** — 405. POST-only endpoint correctly rejecting GET.
- **/api/stripe** — 405. POST-only endpoint correctly rejecting GET.
- **/api/stream** — 405. POST-only endpoint correctly rejecting GET.
- **/api/track** — 405. POST-only endpoint correctly rejecting GET.

---

## Health Check Detail (from /api/health response)

| Service | Status |
|---------|--------|
| Supabase | OK (profiles: 0) |
| Redis | OK (total_songs: 3) |
| Crypto | OK |
| SUPABASE_URL | Present |
| SUPABASE_SERVICE_KEY | **NOT PRESENT** |
| SUPABASE_ANON_KEY | Present |
| UPSTASH_REDIS_REST_URL | Present |
| UPSTASH_REDIS_REST_TOKEN | Present |
| ADMIN_PASSWORD | Present |

**Note:** SUPABASE_SERVICE_KEY is reported as `false`. If this key is required for admin or analytics functions, its absence could be the root cause of the /api/analytics 502 and /api/admin timeout.

---

*Report generated automatically by SONIQ Endpoint Monitor — 2026-04-08*
