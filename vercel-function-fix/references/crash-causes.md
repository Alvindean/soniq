# Vercel Serverless Function Crash Causes — Full Catalog

## Table of Contents
1. [Module-scope `require('crypto')`](#1-crypto)
2. [ESM/CJS export mismatch](#2-esm-cjs)
3. [Arrow function transpilation failures](#3-arrows)
4. [Optional chaining / nullish coalescing in bundled output](#4-modern-syntax)
5. [Destructuring of async results](#5-destructuring)
6. [new Set() / new Map() at module scope](#6-collections)
7. [Missing or wrong Node.js version](#7-node-version)
8. [Package resolution failures](#8-packages)
9. [Environment variable issues](#9-env-vars)
10. [Function size / memory limits](#10-limits)

---

## 1. Module-scope `require('crypto')` {#1-crypto}

**Severity:** Critical — causes FUNCTION_INVOCATION_FAILED
**Detection:** No runtime logs at all; build succeeds
**Frequency:** Very common

### What happens

Vercel's ncc bundler attempts to polyfill or bundle the Node.js `crypto` module when it
encounters `require('crypto')` at the top level of a file. This produces broken output
that crashes during module initialization — before any of your code runs.

### Why try/catch doesn't work

```javascript
// This does NOT fix the problem:
let crypto;
try {
  crypto = require('crypto');
} catch (e) {
  crypto = null;
}
```

The bundler processes `require()` calls during compilation, not at runtime. The try/catch
exists in the source but the bundler has already decided to bundle/polyfill crypto before
the try/catch can execute.

### Fixes

**Option A: Remove crypto entirely**
Replace `crypto.timingSafeEqual` with a pure JS XOR comparison:
```javascript
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

Replace `crypto.createHash('sha256')` with a library or skip hashing if not security-critical.

**Option B: Use `require('node:crypto')` inside the handler**
The `node:` prefix tells the bundler this is a built-in and should not be polyfilled.
But it MUST be inside the handler function, not at module scope:
```javascript
module.exports = async function handler(req, res) {
  var crypto = require('node:crypto');
  // use crypto here
};
```

**Option C: Mark as external in vercel.json**
```json
{
  "functions": {
    "api/your-function.js": {
      "includeFiles": "node_modules/**"
    }
  }
}
```
This is less reliable and may cause other issues. Options A or B are preferred.

### Other problematic built-ins

The same issue can occur with other Node.js built-ins, though less frequently:
- `require('dgram')` — UDP sockets
- `require('net')` — TCP
- `require('tls')` — TLS/SSL
- `require('child_process')` — if used at module scope

---

## 2. ESM/CJS Export Mismatch {#2-esm-cjs}

**Severity:** Critical — causes FUNCTION_INVOCATION_FAILED
**Detection:** Build warning "compiled from ESM to CommonJS"
**Frequency:** Common

### What happens

Vercel detects ESM syntax (`export default`, `import`) and compiles it to CJS. If the
compilation produces incorrect output (which happens with certain patterns), the function
fails to export its handler, and Vercel can't find it.

### Fixes

Use CJS consistently across all functions in the project:
```javascript
// All functions should use this pattern:
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  // ...
};
```

Never mix `export default` with `module.exports` in the same project. If one function
uses `export default`, the bundler may apply different settings to all functions.

---

## 3. Arrow Function Transpilation Failures {#3-arrows}

**Severity:** Medium — sometimes causes FUNCTION_INVOCATION_FAILED
**Detection:** Inconsistent failures across deploys
**Frequency:** Occasional

### What happens

Arrow functions combined with async/await and certain patterns can produce incorrect
transpiled output. The issue is inconsistent — it depends on the exact combination
of syntax and the bundler version.

### Risk patterns

```javascript
// Higher risk (multiple arrows in chain with async)
const getData = async () => {
  const results = await Promise.all(
    items.map(async (item) => await fetch(item.url).then(r => r.json()))
  );
};

// Lower risk (simple arrow in non-async context)
const add = (a, b) => a + b;
```

### Fix

Replace arrow functions with `function()` declarations, especially in:
- Promise `.then()` and `.catch()` chains
- `Array.map()`, `.filter()`, `.reduce()` callbacks
- Async function definitions

---

## 4. Optional Chaining / Nullish Coalescing {#4-modern-syntax}

**Severity:** Medium
**Detection:** May produce runtime errors or incorrect behavior after transpilation
**Frequency:** Occasional

### What happens

`?.` and `??` are transpiled to longer conditional expressions. In some cases, the
transpiled output has subtle bugs — especially when chained deeply or used inside
template literals.

### Risk patterns

```javascript
// Deep chains with mixed access
const val = obj?.deeply?.nested?.array?.[0]?.name ?? 'default';

// Inside template literals
const msg = `Hello ${user?.profile?.name ?? 'Guest'}`;
```

### Fix

Replace with explicit null checks:
```javascript
var val = 'default';
if (obj && obj.deeply && obj.deeply.nested && obj.deeply.nested.array
    && obj.deeply.nested.array[0]) {
  val = obj.deeply.nested.array[0].name || 'default';
}
```

---

## 5. Destructuring of Async Results {#5-destructuring}

**Severity:** Low-Medium
**Detection:** Runtime errors
**Frequency:** Occasional

### What happens

Destructuring the result of `await Promise.all()` can produce incorrect variable
assignments in transpiled output, especially with many variables.

### Fix

```javascript
// Instead of:
const [a, b, c, d, e, f] = await Promise.all([...]);

// Use:
var results = await Promise.all([...]);
var a = results[0];
var b = results[1];
// etc.
```

---

## 6. Collections at Module Scope {#6-collections}

**Severity:** Low
**Detection:** Usually works, but can cause issues with specific bundler versions
**Frequency:** Rare

### What happens

`new Set()` and `new Map()` at module scope are usually fine, but in some edge cases
the bundler's dead-code elimination or tree-shaking can interfere.

### Fix (if suspected)

Replace with plain arrays and objects:
```javascript
// Instead of:
const ADMIN_EMAILS = new Set(['a@b.com', 'c@d.com']);
if (ADMIN_EMAILS.has(email)) { ... }

// Use:
var ADMIN_EMAILS = ['a@b.com', 'c@d.com'];
if (ADMIN_EMAILS.indexOf(email) >= 0) { ... }
```

---

## 7. Missing or Wrong Node.js Version {#7-node-version}

**Severity:** Medium
**Detection:** Build warning about engines field
**Frequency:** Common (but rarely causes crashes)

### What happens

If `package.json` has `"engines": { "node": "22.x" }` but the Vercel project setting
is "24.x", the engines field wins. This usually isn't a problem, but can cause issues
if the function uses APIs only available in the newer version.

### Fix

Make `package.json` engines and Vercel project settings match.

---

## 8. Package Resolution Failures {#8-packages}

**Severity:** Critical
**Detection:** Build failure or FUNCTION_INVOCATION_FAILED
**Frequency:** Occasional

### What happens

The bundler can't resolve a dependency. This can happen when:
- A package uses native bindings (e.g., `bcrypt` — use `bcryptjs` instead)
- A package has `postinstall` scripts that fail in Vercel's build environment
- Peer dependency conflicts

### Fix

Check the build logs for resolution errors. Replace problematic packages with
pure-JS alternatives.

---

## 9. Environment Variable Issues {#9-env-vars}

**Severity:** Medium — function runs but returns wrong data
**Detection:** Function returns 200 with empty/wrong data, or 500 with error message
**Frequency:** Very common

### What happens

The function loads and executes, but a required env var isn't set in the Vercel
dashboard. Common symptoms:
- Database queries return 0 rows (using anon key instead of service key)
- API calls fail with auth errors
- Function returns "configuration error" messages

### Detection

Deploy a health endpoint that checks `!!process.env.VAR_NAME` for each required
variable. Never log the actual values.

### Fix

Add the missing env vars in Vercel Dashboard → Settings → Environment Variables.
Remember to set them for the correct environment (Production, Preview, Development).

---

## 10. Function Size / Memory Limits {#10-limits}

**Severity:** Medium
**Detection:** Timeout or FUNCTION_INVOCATION_FAILED on cold starts
**Frequency:** Rare for most functions

### What happens

Very large bundled functions (>50MB) can exceed memory limits during initialization,
especially on the free tier (1024MB default). Cold starts for large functions can
also hit timeout limits.

### Fix

- Set `maxDuration` in vercel.json for complex functions
- Split large functions into smaller endpoints
- Lazy-load heavy dependencies inside the handler instead of at module scope
