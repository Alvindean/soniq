# SONIQ API Endpoint Monitor Report

**Date:** April 7, 2026  
**Domain:** www.mysoniq.com  
**Infrastructure:** Vercel (iad1 region)

---

## Overall Status: 🟡 ALL SYSTEMS OPERATIONAL — 3 WARNINGS, 0 CRITICALS

No CRITICAL failures detected. No alert emails sent. Three endpoints returned unexpected (but non-fatal) status codes — consistent across both checks today.

---

## Latest Check: 20:28 UTC

| Endpoint | Expected | Received | Status | Notes |
|---|---|---|---|---|
| `/api/health` | 200 | **200** | ✅ OK | Supabase OK, Redis OK (3 songs), Crypto OK |
| `/api/analytics` | 401 | **401** | ✅ OK | Slow on first 2 attempts (connector timeout), succeeded on try 3 |
| `/api/founding` | 200 | **200** | ✅ OK | Tier 1 active (500 spots @ $5/mo), Tier 2 inactive |
| `/api/generate` | 401/405 | **405** | ✅ OK | POST-only, correctly rejecting GET |
| `/api/stripe` | 405 | **405** | ✅ OK | POST-only, correctly rejecting GET |
| `/api/stream` | 401/405 | **405** | ✅ OK | POST-only, correctly rejecting GET |
| `/api/community` | 200/405 | **400** | ⚠️ WARNING | `{"error":"unknown_action","received":""}` — needs `action` param |
| `/api/admin` | 401 | **401** | ✅ OK | Auth guard working (timed out once, succeeded on retry) |
| `/api/publish` | 405 | **401** | ⚠️ WARNING | Auth check runs before method validation |
| `/api/track` | 405 | **405** | ✅ OK | POST-only, correctly rejecting GET |
| `/api/aff` | 302/200 | **400** | ⚠️ WARNING | `{"error":"Unknown partner"}` — needs partner slug param |

---

## Earlier Check: 02:46 UTC

| Endpoint | Expected | Received | Status | Change vs 20:28 |
|---|---|---|---|---|
| `/api/health` | 200 | **200** | ✅ OK | No change |
| `/api/analytics` | 401 | **401** | ✅ OK | No change (also had connector timeouts) |
| `/api/founding` | 200 | **200** | ✅ OK | No change |
| `/api/generate` | 401/405 | **405** | ✅ OK | No change |
| `/api/stripe` | 405 | **405** | ✅ OK | No change |
| `/api/stream` | 401/405 | **405** | ✅ OK | No change |
| `/api/community` | 200/405 | **400** | ⚠️ WARNING | No change |
| `/api/admin` | 401 | **401** | ✅ OK | No change (also had connector timeouts) |
| `/api/publish` | 405 | **401** | ⚠️ WARNING | No change |
| `/api/track` | 405 | **405** | ✅ OK | No change |
| `/api/aff` | 302/200 | **400** | ⚠️ WARNING | No change |

**Trend:** All endpoints stable across both checks. No regressions or improvements.

---

## Health Check Detail (`/api/health` — 20:28 UTC)

```json
{
  "timestamp": "2026-04-07T20:28:03.711Z",
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

> ⚠️ **Persistent note:** `SUPABASE_SERVICE_KEY` is still reporting `false` — flagged in both the 02:46 and 20:28 checks. If server-side admin operations depend on this key, it needs to be added to Vercel environment variables.

---

## Founding Tier Detail (`/api/founding`)

```json
{
  "tier1": { "spots_total": 500, "spots_claimed": 0, "spots_left": 500, "price_monthly": 5, "price_annual": 42, "active": true, "label": "Early Founder" },
  "tier2": { "spots_total": 1500, "spots_claimed": 0, "spots_left": 1500, "price_monthly": 9.99, "price_annual": 84, "active": false, "label": "Founding Member" },
  "current_tier": 1,
  "current_price_monthly": 5,
  "current_price_annual": 42,
  "regular_price_monthly": 19,
  "regular_price_annual": 114
}
```

---

## Warning Detail (Unchanged From Earlier Check)

### ⚠️ `/api/community` — 400 Instead of 200/405
- **Received:** `{"error":"unknown_action","received":""}`
- **Root cause:** Requires an `action` query parameter. Bare GET triggers validation error. Function is healthy.
- **Recommendation:** Update expected code to 400 for bare-GET monitoring, or add a default handler.

### ⚠️ `/api/publish` — 401 Instead of 405
- **Received:** `{"error":"unauthorized"}`
- **Root cause:** Auth check runs before method validation on this endpoint.
- **Recommendation:** Low priority. Update monitoring expected code to 401, or reorder guards in the function.

### ⚠️ `/api/aff` — 400 Instead of 302
- **Received:** `{"error":"Unknown partner"}`
- **Root cause:** Requires a partner/ref query parameter to execute redirect.
- **Recommendation:** For monitoring, test with `?ref=test` or update expected code to 400.

---

## Monitoring Reliability Note

The `/api/analytics` endpoint experienced connector timeouts on 2 of 3 fetch attempts during the 20:28 check (same pattern seen at 02:46). This is a **monitoring tool artifact** (Vercel MCP connector slowness), not a server issue — the endpoint itself responds correctly with 401 when the request gets through. This may indicate cold-start latency on the analytics function.

---

## CRITICAL Alert Status

**No CRITICAL failures detected across either check today.** No alert emails drafted or sent.

Criteria for CRITICAL (none triggered):
- `FUNCTION_INVOCATION_FAILED` — not seen on any endpoint
- Completely unreachable / server timeout — not seen
- Unexpected 500-level responses — not seen

---

*Report generated by SONIQ Endpoint Monitor scheduled task — April 7, 2026, 20:28 UTC*
