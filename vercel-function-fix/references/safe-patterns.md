# Bundler-Safe Code Patterns for Vercel Serverless Functions

This reference contains proven code patterns that survive Vercel's ncc bundler
without producing broken output. Use these as templates when rewriting broken functions.

## Table of Contents
1. [Complete function template](#template)
2. [Import patterns](#imports)
3. [Auth patterns](#auth)
4. [Database query patterns](#database)
5. [Redis/Upstash patterns](#redis)
6. [CORS patterns](#cors)
7. [Error handling patterns](#errors)
8. [CSV export pattern](#csv)

---

## 1. Complete Function Template {#template}

This is the gold-standard template. Every serverless function should follow this structure:

```javascript
/**
 * Description of what this endpoint does
 * METHOD /api/endpoint-name
 */

var { createClient } = require('@supabase/supabase-js');

// Module-scope constants (safe — no function calls, no dynamic code)
var UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
var UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Simple arrays and objects are safe at module scope
var ALLOWED_VALUES = ['value1', 'value2', 'value3'];

// --- Helper functions (defined at module scope, called inside handler) ---

function helperFunction(input) {
  // Pure computation — no side effects, no dynamic requires
  return input;
}

// --- Handler ---

module.exports = async function handler(req, res) {
  try {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // Auth check
    // ...

    // Business logic
    // ...

    // Response
    return res.status(200).json({ ok: true, data: result });

  } catch (e) {
    console.error('[endpoint] error:', e.message);
    return res.status(500).json({ error: 'Internal error', message: e.message });
  }
};
```

---

## 2. Import Patterns {#imports}

### Safe imports

```javascript
// NPM packages — always safe at module scope
var { createClient } = require('@supabase/supabase-js');
var stripe = require('stripe');

// Reading env vars — safe at module scope
var API_KEY = process.env.API_KEY;
var DB_URL = process.env.DATABASE_URL;
```

### Dangerous imports

```javascript
// DANGEROUS — crypto at module scope crashes the bundler
var crypto = require('crypto');
var { timingSafeEqual } = require('crypto');

// DANGEROUS — dynamic requires
var mod = require(process.env.MODULE_NAME);
var lib = require('./lib/' + name + '.js');
```

### If you absolutely need a Node.js built-in

```javascript
// Require inside the handler with 'node:' prefix
module.exports = async function handler(req, res) {
  var crypto = require('node:crypto');
  var hash = crypto.createHash('sha256').update(data).digest('hex');
  // ...
};
```

---

## 3. Auth Patterns {#auth}

### API key authentication (constant-time comparison)

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

// Inside handler:
var adminKey = req.headers['x-admin-key'] || '';
var expected = process.env.ADMIN_PASSWORD || '';
if (!adminKey || !safeEqual(adminKey, expected)) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

### JWT token decode (no crypto dependency)

```javascript
function decodeJwtPayload(token) {
  try {
    var parts = token.split('.');
    if (parts.length !== 3) return null;
    var base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    var json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

// Inside handler:
var authHeader = req.headers['authorization'] || '';
var match = authHeader.match(/^Bearer\s+(.+)$/i);
if (match) {
  var payload = decodeJwtPayload(match[1]);
  var email = (payload && payload.email) ? payload.email : '';
}
```

### Supabase token verification

```javascript
function getSupabaseClient() {
  var url = process.env.SUPABASE_URL;
  var key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

// Inside handler:
var supabase = getSupabaseClient();
if (supabase) {
  var result = await supabase.auth.getUser(token);
  if (result.data && result.data.user) {
    var userEmail = result.data.user.email;
  }
}
```

---

## 4. Database Query Patterns {#database}

### Safe concurrent queries

```javascript
// Fire multiple queries concurrently with individual error handling
var profilesPromise = supabase
  .from('profiles')
  .select('id, email, name')
  .order('created_at', { ascending: false })
  .limit(500)
  .then(function(r) { return r; })
  .catch(function(e) {
    console.error('profiles query failed:', e.message);
    return { data: null };
  });

var countPromise = supabase
  .from('profiles')
  .select('id', { count: 'exact', head: true })
  .then(function(r) { return r; })
  .catch(function(e) {
    console.error('count query failed:', e.message);
    return { count: 0 };
  });

// Collect results with index access (not destructuring)
var allResults = await Promise.all([profilesPromise, countPromise]);
var profiles = allResults[0];
var userCount = allResults[1];

// Access data safely
var users = (profiles && profiles.data) ? profiles.data : [];
var total = (userCount && userCount.count) ? userCount.count : 0;
```

---

## 5. Redis/Upstash Patterns {#redis}

### Pipeline with explicit error handling

```javascript
function redisPipeline(commands) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return Promise.resolve([]);
  return fetch(UPSTASH_URL + '/pipeline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + UPSTASH_TOKEN
    },
    body: JSON.stringify(commands)
  }).then(function(r) {
    if (!r.ok) return [];
    return r.json();
  }).then(function(d) {
    return Array.isArray(d) ? d.map(function(x) { return x.result; }) : [];
  }).catch(function() {
    return [];
  });
}
```

### Parsing sorted sets and hashes

```javascript
function parseZSet(arr) {
  if (!Array.isArray(arr)) return [];
  var out = [];
  for (var i = 0; i < arr.length; i += 2) {
    out.push({ name: arr[i], count: parseInt(arr[i + 1]) || 0 });
  }
  return out;
}

function parseHash(arr) {
  if (!Array.isArray(arr)) return {};
  var obj = {};
  for (var i = 0; i < arr.length; i += 2) {
    obj[arr[i]] = parseInt(arr[i + 1]) || 0;
  }
  return obj;
}
```

---

## 6. CORS Patterns {#cors}

### Simple wildcard CORS

```javascript
// Inside handler, before any logic:
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
if (req.method === 'OPTIONS') return res.status(200).end();
```

### Domain-restricted CORS

```javascript
var ALLOWED_ORIGINS = ['https://yourdomain.com', 'https://www.yourdomain.com'];

function setCors(req, res) {
  var origin = req.headers.origin || '';
  var isAllowed = ALLOWED_ORIGINS.indexOf(origin) >= 0;
  var isVercel = /^https:\/\/[^/]+\.vercel\.app$/.test(origin);
  var allowed = (isAllowed || isVercel) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
```

---

## 7. Error Handling Patterns {#errors}

### Top-level try/catch in handler

```javascript
module.exports = async function handler(req, res) {
  try {
    // All your logic here
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[endpoint-name] FATAL:', e.message);
    return res.status(500).json({
      error: 'Internal error',
      message: e.message || 'Unknown error'
    });
  }
};
```

### Timing-safe auth delay

```javascript
// Prevent timing attacks by always taking ~200ms
if (!authenticated) {
  await new Promise(function(r) { setTimeout(r, 200); });
  return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## 8. CSV Export Pattern {#csv}

```javascript
var CSV_HEADERS = ['id', 'email', 'name', 'plan', 'created_at'];

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  var str = String(value);
  if (str.indexOf(',') >= 0 || str.indexOf('"') >= 0 || str.indexOf('\n') >= 0) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function toCSV(rows) {
  var header = CSV_HEADERS.join(',');
  var lines = rows.map(function(row) {
    return CSV_HEADERS.map(function(col) { return escapeCSV(row[col]); }).join(',');
  });
  return [header].concat(lines).join('\r\n');
}

// Inside handler:
if (req.query && req.query.format === 'csv') {
  var csv = toCSV(users);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
  return res.status(200).send(csv);
}
```
