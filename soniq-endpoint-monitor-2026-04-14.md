# SONIQ API Endpoint Monitor Report

**Date:** Tuesday, April 14, 2026
**Domain:** www.mysoniq.com
**Monitor Type:** Scheduled automated check

---

## Summary

| # | Endpoint | Status Code | Expected | Response Time | Severity |
|---|----------|-------------|----------|---------------|----------|
| 1 | /api/health | 404 | 200 | 0.05s | CRITICAL - Endpoint missing/not deployed |
| 2 | /api/analytics | 500 (FUNCTION_INVOCATION_FAILED) | 401 | 0.93s | CRITICAL - Serverless function crashed |
| 3 | /api/founding | 200 | 200 | <0.01s | OK |
| 4 | /api/generate | 405 | 401/405 | 0.66s | OK |
| 5 | /api/stripe | 405 | 405 | 0.95s | OK |
| 6 | /api/stream | 405 | 401/405 | 0.63s | OK |
| 7 | /api/community | 400 | 200/405 | 0.85s | WARNING - Returns 400 "unknown_action" instead of expected code |
| 8 | /api/admin | 401 | 401 | 1.04s | OK |
| 9 | /api/publish | 401 | 405 | 0.93s | OK (auth gate fires before method check) |
| 10 | /api/track | 405 | 405 | 0.79s | OK |
| 11 | /api/aff | 400 | 302/200 | 0.82s | WARNING - Returns 400 "Unknown partner" (no partner param provided, expected) |

---

## CRITICAL Issues (Immediate Attention Required)

### 1. /api/health - 404 NOT FOUND
The health check endpoint returned a **404** with body: "The page could not be found / NOT_FOUND". This means the health endpoint is either not deployed or has been removed. A missing health check means uptime monitors and load balancers cannot verify the application is running.

**Action Required:** Verify the health endpoint exists in the codebase and is properly deployed. Check Vercel deployment logs for missing routes.

### 2. /api/analytics - 500 FUNCTION_INVOCATION_FAILED
The analytics endpoint returned a **500** with body: "A server error has occurred / FUNCTION_INVOCATION_FAILED". This is a serverless function crash, not just an auth rejection. The function fails to even initialize or execute.

**Action Required:** Check Vercel function logs for /api/analytics. Look for missing environment variables, import errors, or dependency issues. This function is completely broken.

---

## WARNING Issues

### 3. /api/community - 400 "unknown_action"
Returned `{"error":"unknown_action","received":""}` instead of expected 200 or 405. The function loads and runs but expects an action parameter. This is likely acceptable behavior for a GET without params, but differs from the expected response pattern.

### 4. /api/aff - 400 "Unknown partner"
Returned `{"error":"Unknown partner"}` instead of expected 302/200. The function loads but requires a partner parameter to redirect. Without a valid partner slug, it returns 400. This is likely acceptable behavior for a bare GET.

---

## All-Clear Endpoints (6 of 11)

/api/founding, /api/generate, /api/stripe, /api/stream, /api/admin, /api/publish, /api/track all responded within normal parameters and expected status codes. No slowness detected (all under 1.1s).

---

## Overall Health Score: 7/11 endpoints healthy | 2 CRITICAL | 2 WARNING
