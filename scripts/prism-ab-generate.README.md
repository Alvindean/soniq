# PRISM A/B — Live Generate (craft directives ON vs OFF)

> ## ⚠️ USER RUNS THIS — SPENDS CREDITS
> Each of the two requests below hits `POST /api/stream` and triggers a **real model
> generation** (Anthropic, OpenRouter fallback) billed to the SONIQ account.
> The agent will **never** run these. Run them yourself, authenticated as
> **Studio / admin**, only when you want to *hear* the difference.

The FREE, no-network proof that the craft layer actually injects lives in
`scripts/prism-ab-prompt-diff.js` (`node scripts/prism-ab-prompt-diff.js`). Run
that first. The commands below are the **paid** companion: same concept, generated
twice — every craft directive `on` vs every craft directive `off` — so you can
A/B the *audio output*, not just the prompt text.

---

## What "same concept" means here

`/api/stream` with `action: "generate"` builds via `brain.buildSongPrompt(params)`.
The eight craft directives are top-level params on `params`, each `'auto' | 'on' | 'off'`:

```
melodicUnity  antiDrop  tresillo  melodicCliche
bassOstinato  chorusIntro  oneNoteMelody  popDrop
```

Hold **everything else identical** (genre, topic, structure, mood, vocal, tier,
length) and flip only those eight. That isolates the craft layer.

Fixed concept (matches the free diff script):

| field      | value                                                                          |
|------------|--------------------------------------------------------------------------------|
| genre      | `pop`                                                                           |
| topic      | `the quiet kind of heartbreak, told from the angle of the room after they left`|
| structure  | `standard`                                                                      |
| mood       | `Emotional`                                                                     |
| vocal      | `any`                                                                           |
| lyricTier  | `street`                                                                        |
| length     | `medium`                                                                        |

---

## Auth

Send your Studio/admin session token as a Bearer header. (Admin can also use the
`X-Admin-Token` header — `/api/stream` accepts either; see `api/stream.js` CORS line.)

```
Authorization: Bearer <YOUR_STUDIO_OR_ADMIN_TOKEN>
```

Set the base URL once:

```bash
BASE="https://mysoniq.com"          # or http://localhost:3000 for local
TOKEN="PASTE_YOUR_STUDIO_OR_ADMIN_TOKEN_HERE"
```

---

## A — directives ON  (💸 spends credits)

```bash
curl -N "$BASE/api/stream" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "action": "generate",
    "params": {
      "genre": "pop",
      "topic": "the quiet kind of heartbreak, told from the angle of the room after they left",
      "structure": "standard",
      "mood": "Emotional",
      "vocal": "any",
      "lyricTier": "street",
      "length": "medium",
      "melodicUnity": "on",
      "antiDrop": "on",
      "tresillo": "on",
      "melodicCliche": "on",
      "bassOstinato": "on",
      "chorusIntro": "on",
      "oneNoteMelody": "on",
      "popDrop": "on"
    }
  }'
```

## B — directives OFF  (💸 spends credits)

```bash
curl -N "$BASE/api/stream" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "action": "generate",
    "params": {
      "genre": "pop",
      "topic": "the quiet kind of heartbreak, told from the angle of the room after they left",
      "structure": "standard",
      "mood": "Emotional",
      "vocal": "any",
      "lyricTier": "street",
      "length": "medium",
      "melodicUnity": "off",
      "antiDrop": "off",
      "tresillo": "off",
      "melodicCliche": "off",
      "bassOstinato": "off",
      "chorusIntro": "off",
      "oneNoteMelody": "off",
      "popDrop": "off"
    }
  }'
```

---

## Browser `fetch` (run in the SONIQ tab's devtools while logged in as Studio/admin)

The cookie/session is already attached in-tab; the SSE body streams `data: {"text":"..."}`
events ending with `data: {"done":true}`.

```js
// 💸 SPENDS CREDITS. Flip ALL_ON between true/false and run twice.
async function prismAB(ALL_ON) {
  const mode = ALL_ON ? 'on' : 'off';
  const directives = ['melodicUnity','antiDrop','tresillo','melodicCliche',
                      'bassOstinato','chorusIntro','oneNoteMelody','popDrop'];
  const params = {
    genre: 'pop',
    topic: 'the quiet kind of heartbreak, told from the angle of the room after they left',
    structure: 'standard', mood: 'Emotional', vocal: 'any',
    lyricTier: 'street', length: 'medium'
  };
  directives.forEach(d => params[d] = mode);

  const res = await fetch('/api/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // session cookie auto-attached in-tab
    body: JSON.stringify({ action: 'generate', params })
  });

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let out = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    for (const line of dec.decode(value).split('\n')) {
      if (!line.startsWith('data:')) continue;
      try {
        const ev = JSON.parse(line.slice(5).trim());
        if (ev.text) out += ev.text;
        if (ev.done) console.log('=== ' + mode.toUpperCase() + ' DONE ===\n' + out);
        if (ev.error) console.error('stream error:', ev.error);
      } catch (_) {}
    }
  }
  return out;
}

// await prismAB(true);   // 💸 ON  build
// await prismAB(false);  // 💸 OFF build
```

---

## How to read the difference

The OFF build is the brain's genre default (auto gates suppressed). The ON build
forces every craft block past its gate. Listen for:

- **PRINCE METHOD / MELODIC SHAPE** — tighter melodic-unity earworm, recurring motif.
- **ANTI-DROP** — chorus that *strips* instead of swelling; the hook sits in negative space.
- **TRESILLO** — a 3-3-2 syncopated pulse instead of straight 4-on-the-floor.
- **OSTINATO** — a repeating melodic bass riff that is its own hook (Billie Jean principle).
- **CHORUS-IN-INTRO** — the hook melody teased in the intro before its full payoff.
- **ONE-NOTE MELODY** — a near-monotone, static-pitch topline section.
- **POP DROP** — an instrumental lead-melody answer-hook after the chorus.

To confirm *which* blocks reached the prompt (no credits), run the free diff first —
it prints exactly which of these eight injected for this concept.
