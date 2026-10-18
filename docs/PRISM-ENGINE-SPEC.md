# PRISM — Reconciled Build Spec

> Concept-first song engine for Soniq. The deliberate inverse of **Lucky**.
> Designed 2026-06-01 by a 5-specialist team reading the live `_brain.js` / `stream.js` / `analytics.js`.

## 1. What Prism is

Prism is the deliberate inverse of Lucky. Where `buildLuckyPrompt` (`_brain.js:6798`) rolls a *finished* random song prompt and streams it, Prism rolls four independent **dials** — SUBJECT × METAPHOR × PERSPECTIVE-FLIP × GENRE/fusion — scores the combination for coherence, and emits a structured **Concept Brief** describing *what the song should be about*. That brief is then mapped onto `buildSongPrompt` (`_brain.js:5957`) to produce the actual song. Lucky is terminal (roll → full prompt → LLM); Prism is a pre-stage (roll 4 dials → brief → `buildSongPrompt` → full prompt → LLM).

---

## 2. The four dials

### Dial 1 — SUBJECT
- **Data source:** live ZSET `soniq:topics:top` (incremented at save-time in `track.js:135`), widened from the canonical top-20 slice (`analytics.js:266`) to `ZREVRANGE soniq:topics:top 0 99 WITHSCORES`. Cold-start fallback: `LUCKY_TOPICS` (`_brain.js:3574`, 12 items) + a net-new `SUBJECT_SEED`.
- **How it rolls:** `parseZSet` (`analytics.js:124`) → read-side clean (drop `''` and `name.length<6`, lowercase-key de-dup, collapse near-dupes keeping highest-count surface) → rank by count → **score-weighted pick** over the cleaned top-30. Hybrid-backfill from seed if the cleaned pool < 20.
- **Reuse:** `parseZSet` (analytics.js:124), `redisPipeline`, `sanitizeInput(rawTopic,100)` (`_brain.js:5977`/`6813`), `LUCKY_TOPICS` (3574), and the `params.topic` sink — the surface string flows in exactly where `LUCKY_TOPICS` feeds today.
- **Net-new:** `SUBJECT_SEED` const (~50 items, Lucky register); `normalizeSubject(name)` read-side canonicalizer (the ZSET is stored raw, no normalization exists); `buildSubjectPool(redisPipeline)` (widened fetch + clean + hybrid merge); a weighted-pick helper (Lucky's `pickRandom` at 6813 is uniform-only); the `{id,surface,score,source}` token shape.
- **Hard rule (resolves the fan-out warning at analytics.js:364):** Prism is a **reader** of `soniq:topics:top` — it must NOT add its own topic `ZINCRBY`. Per-dial telemetry, if wanted, lives on a separate key `soniq:prism:subjects`.

### Dial 2 — METAPHOR
- **Data source:** `GENRE_METAPHOR_PALETTE` (`_brain.js:1759`, 12 genres × ~7 families × 4 `images`); `CROSS_STYLE_METAPHOR_BORROWS` (`1950`, ~16 directional pairs) as a fusion-only `borrowBank`.
- **How it rolls:** flatten palette `images` into ~250–300 tokens carrying `{token, family, sentiment, genres[]}`; dedup; weight by cross-genre frequency (capped so universals don't dominate); sort desc, truncate to top ~100 = the rollable bank. Roll = weighted pick, **biased 3× toward tokens whose `genres[]` includes the Stage-4 genre key**. If Stage-4 produced a fusion with a matching borrow key, merge `borrowBank` images.
- **Reuse:** Fisher-Yates sampler + `fwdKey/revKey` borrow resolution from `buildMetaphorPaletteNote` (`2060`, lines 2067–2088); `_normalizeGenreKey` (`4978`); the `sentiment` field for the carry-the-feeling rule; the inline `arr[Math.floor(Math.random()*arr.length)]` idiom.
- **Net-new:** `buildMetaphorBank()` (flatten/weight/truncate, cache once); `rollMetaphorDial({genreKey,fusionKey})`; `borrowBank` assembly carrying `lineage`/`nod_patterns`.
- **Conflict resolved — do NOT re-splice the balance note.** `buildSongPrompt` already splices both `buildMetaphorBalanceNote()` and `buildMetaphorPaletteNote(genre)` at line **6384** on every song. *Why:* double-injection wastes prompt budget and risks contradiction. Prism instead passes its rolled image as a **`seedLine`** (an existing param, `5964`) and never attaches the `extendedMetaphor` pill — the over-extension limiter already fires downstream. (This honors the SONIQ rule: metaphor = touchpoint, not throughline.)

### Dial 3 — PERSPECTIVE-FLIP
- **Data source:** `perspectiveRotation.short` (`_brain.js:1350–1357`) enumerates the 5 axes verbatim; `perspectiveRotation.genres` (`1365`) is the per-axis legality list; `unreliableNarrator` (`1368`) is the VOICE sub-mode.
- **5-axis enum (stable IDs):** WHO (multiple characters/same event), WHEN (same person/different times), EYES (same scene/different eyes), GENRE (same truth/different genre — **legal only when Stage-4 rolled a fusion**), VOICE (narrator vs subject, incl. unreliable).
- **How it rolls:** weighted bag favoring WHO/EYES/VOICE (most genre-portable), WHEN mid, GENRE lowest+gated. Gate: drop GENRE if single-genre; re-roll (max 3, fallback WHO) if `perspectiveRotation.genres` lacks the rolled genre; bias EYES/WHEN if the subject is a non-agent abstraction. Then FLIP-RESOLVE computes the inverted vantage string from subject+axis.
- **Reuse:** the 5 axes (don't re-author); `perspectiveRotation.genres`/`unreliableNarrator.genres` legality arrays; **`dualPerspective` param (`5965`/`6265`)** — set `true` for WHO/EYES/VOICE so the existing `dualPerspNote` forces Verse-2 into the opposite POV. Map axes to `VERSE2_ARCHETYPES` ("The Other Side" 4140, "Antagonist Voice" 4144, "Time Jump" 4143) and to `story_reveal_twist`/`story_conversation` structures (3116/3120).
- **Net-new:** `rollFlipAxis(genre, subject)` weighted roller + `isFlipLegal(axisId,genre)`; a subject-agency tag (agent vs abstraction) keyed off the Stage-1 pool; the **FLIP-RESOLVE generator** (subject+axis → concrete inverted-narrator string) — the heart of the dial; the param bridge that programmatically sets `dualPerspective`.

### Dial 4 — GENRE / fusion
- **Data source:** `FUSION_DATA` (`_brain.js:3164`, ~90 curated keys, each `{name,tip,q:{overall,compat,structural,commercial}}`); `GENRE_LABELS` (`3339`); `GENRE_BIBLE` (`11`) for `.dna`/`.artists`/`.outliers`.
- **How it rolls:** ~35% single / ~65% fusion. **Single:** weighted pick from a net-new `SINGLE_GENRE_WEIGHTS` (~12 pillar genres). **Fusion:** `pickRandom(Object.keys(FUSION_DATA))` upgraded to **quality-weighted** by `fd.q.overall`; optional `spice` param inverts toward `compat 72–82` for productive-tension pairs.
- **Coherence is free (resolves the "garbage combo" concern):** `FUSION_DATA` is a hand-curated whitelist — incoherent pairs (Metal+Reggaeton) simply aren't keys and can never roll. Prism rolls **only** over `Object.keys(FUSION_DATA)`, never free-combines.
- **Reuse:** Lucky's `keys=Object.keys(FUSION_DATA); key=pickRandom(keys); [g1,g2]=key.split('+'); fd=FUSION_DATA[key]` (6799–6810) incl. client g1/g2 fwd/rev lookup; `_normalizeGenreKey` (4978) before any bible/palette lookup; `buildCrossoverNote` (6731) for the mesh note; the borrow lookup from `buildMetaphorPaletteNote:2082`.
- **Net-new:** `rollGenreDial({spice})` (35/65 gate + quality-weighted pick); `pickWeighted(keys,weightFn)` primitive; `SINGLE_GENRE_WEIGHTS` map; the genre→metaphor constraint resolver (decides whether a borrow image anchors the Stage-2 roll).

---

## 3. Combination logic

**Roll order (dependency-driven):** GENRE first (it gates two other dials) → SUBJECT (independent, can run parallel) → PERSPECTIVE (needs genre for legality + subject for agency) → METAPHOR (needs genre key for the 3× bias + fusion key for borrows).

**Candidate-and-score:** Roll **N=5 candidate quads**, score each, keep the top one. *Why 5 and not 1:* a single roll can produce a legal-but-flat combo; 5 is cheap (pure in-memory, no LLM) and lets coherence scoring earn its keep without the latency of a large pool.

**COHERENCE SCORE (0–100), reject below 55, pick max:**
- **Genre↔Metaphor fit (0–30):** +30 if rolled metaphor's `genres[]` includes the genre key; +20 if it's a fusion with a matching `CROSS_STYLE_METAPHOR_BORROWS` entry and the metaphor came from `borrowBank`; +10 if it's a cross-genre universal (intentional friction); +0 if the metaphor's domain has no relation to genre.
- **Subject↔Perspective fit (0–25):** +25 if axis legality passes and (agent subject → WHO/VOICE available, abstraction → EYES/WHEN). −25 hard penalty if WHO/VOICE rolled on an abstraction with no second agent (the "metaphor that fights the subject" analog for POV).
- **Genre↔Perspective legality (0–20):** `perspectiveRotation.genres`/`unreliableNarrator.genres` contains the genre → +20; GENRE axis on a non-fusion → score 0 (already gated, belt-and-suspenders).
- **Fusion quality (0–15):** scaled `fd.q.overall/100 × 15` (single genre = flat 12).
- **Metaphor over-extension risk (0–10):** +10 if the rolled image is a single concrete touchpoint; reduced if its family is one of the camera/extended-metaphor-prone domains.

Top-scoring quad becomes the brief. Ties broken by SUBJECT score (popularity).

---

## 4. The Concept Brief schema

`buildPrismConcept(params)` returns this object (**no `prompt`/`system`** — that's what makes it the inverse of Lucky):

```json
{
  "version": "prism-1",
  "subject":   { "id":"subj_3am_drive", "surface":"driving nowhere at 3am",
                 "score":93, "source":"hybrid", "agency":"agent" },
  "metaphor":  { "token":"taillights getting smaller", "sentiment":"leaving without leaving for good",
                 "family":"Open road / departure", "genres":["country"],
                 "directive":"TOUCHPOINT not THROUGHLINE", "borrow":null },
  "flip":      { "axis":"VOICE",
                 "defaultPOV":"the driver narrating their own restlessness",
                 "flippedPOV":"the road / the town watching them leave (unreliableNarrator sub-mode)",
                 "reconciliation":"bridge reveals the leaving was never about the road",
                 "generatorParams":{ "dualPerspective":true, "verse2Archetype":"Antagonist Voice",
                                     "narrativeReveal":true, "structure":"story_reveal_twist" } },
  "genre":     { "mode":"single", "primary":"hiphop", "secondary":null,
                 "fusionName":null, "label":"Rap / Hip-Hop",
                 "quality":{ "overall":null }, "blend":{}, "treatment":"<fd.tip or GENRE_BIBLE.dna lens>",
                 "metaphorBridge":null },
  "coherenceScore": 78,
  "conceptLine": "A late-night drive told by the town that watched you go, in raw hip-hop — the taillights shrink but the bridge admits leaving was never about the road.",
  "meta": { "rolledCandidates":5, "spice":"low" }
}
```

**Handoff** — a thin `buildPrismSongPrompt(brief)` (kept in the brain so stream.js stays thin) maps brief → `buildSongPrompt`:

| Brief field | → `buildSongPrompt` param | Notes |
|---|---|---|
| `genre.primary` | `genre` | normalized bible key |
| `genre.secondary`/`genre.fusionName` | `blend` `{genre2, ratio}` | reuse Lucky's blend path |
| `conceptLine` | `topic` | the assembled what-it's-about line |
| `metaphor.token` | `seedLine` | existing param (5964); the entry image |
| `flip.generatorParams.dualPerspective` | `dualPerspective` | existing (5965) |
| `flip.generatorParams.structure` | `structure` | existing |
| (optional) `LUCKY_MOODS`/`LUCKY_VOCALS` roll | `mood`/`vocal` | reuse 3576/3580 |

No new `buildSongPrompt` param is required — `seedLine` + `dualPerspective` + `topic` + `blend` carry all four dials.

---

## 5. Integration plan

| Item | Status | Detail |
|---|---|---|
| `buildPrismConcept(params)` export | **NET-NEW** | add to `module.exports`; rolls 4 dials, scores N=5, returns brief (no megaprompt) |
| `buildPrismSongPrompt(brief)` export | **NET-NEW** | maps brief → `buildSongPrompt`, returns `{system,prompt,meta}` |
| `buildSubjectPool`, `buildMetaphorBank`, `rollMetaphorDial`, `rollFlipAxis`, `rollGenreDial`, `pickWeighted`, `normalizeSubject`, `SUBJECT_SEED`, `SINGLE_GENRE_WEIGHTS` | **NET-NEW** | per §2 |
| `buildSongPrompt`, `buildMetaphorPaletteNote`, `buildMetaphorBalanceNote`, `buildCrossoverNote`, `FUSION_DATA`, `GENRE_METAPHOR_PALETTE`, `perspectiveRotation`, `_normalizeGenreKey`, `pickRandom`, `LUCKY_*` | **REUSE** | unchanged |
| stream.js `prism` action branch | **NET-NEW** | `else if (body.action==='prism')` — reuse Lucky's whitelist/sanitize block (866–932), call `brain.buildPrismConcept(lp)` then `brain.buildPrismSongPrompt(brief)` → `{system,prompt,meta}` |
| stream.js meta/header plumbing (935–962) | **REUSE** | unchanged; extend `metaObj` with `brief:{subject,metaphor,flip,genre,conceptLine,coherenceScore}` for chip rendering |
| Analytics counter | **NET-NEW** | fire-and-forget `redisIncrExpire('soniq:analytics:prism:'+getThisMonth(), 32*24*3600)` (reuse `redisIncrExpire` at stream.js:39) on success |
| UI entry point | **NET-NEW** | a "Prism / Concept Roll" button posting `{action:'prism', params:{...overridable dials}}`; reveal UI reads the 4-dial brief from `X-Soniq-Meta` and renders SUBJECT / METAPHOR / FLIP / GENRE chips |

**Request:** `POST /api/stream { action:'prism', params:{ g1?, g2?, subject?, metaphor?, flipAxis?, spice?, lockSubject?, …same overridable knobs as Lucky } }` — every dial optional.
**Response:** identical SSE song stream to Lucky + `X-Soniq-Meta` base64 carrying the brief.

---

## 6. Worked example (all four dials, end to end)

**Roll (N=5, top quad shown):**
- GENRE first → 65% bucket → quality-weighted `pickRandom(Object.keys(FUSION_DATA))` → `'Pop+Country'` → `fd.name='Country Pop'`, `q.overall=91`. `_normalizeGenreKey` → `g1=pop`, `g2=country`.
- SUBJECT → `ZREVRANGE soniq:topics:top 0 99` → clean/rank → score-weighted pick → `{surface:'the version of yourself you abandoned', score:73, source:'hybrid', agency:'agent'}`.
- PERSPECTIVE → bag draws WHEN; `isFlipLegal('WHEN','country')`=true (country ∈ `perspectiveRotation.genres`). Subject is agent → WHEN stands. FLIP-RESOLVE: shift to *before* the abandonment.
- METAPHOR → fusion `pop<-country`/`country<-pop`: no `CROSS_STYLE_METAPHOR_BORROWS` entry → fall back to primary (pop) palette, 3× country-biased; rolls `{token:'a porch light still left on', sentiment:'someone kept the door open', family:'Home / waiting'}`.

**Coherence score:** genre↔metaphor +10 (related domain, no borrow) + subject↔perspective +25 + genre↔perspective +20 + fusion 13.6 + low over-extension +10 = **78** → accepted, highest of the 5.

**Emitted Concept Brief:**
```json
{
  "version":"prism-1",
  "subject":{ "surface":"the version of yourself you abandoned","score":73,"source":"hybrid","agency":"agent" },
  "metaphor":{ "token":"a porch light still left on","sentiment":"someone kept the door open",
               "family":"Home / waiting","genres":["pop"],"directive":"TOUCHPOINT not THROUGHLINE","borrow":null },
  "flip":{ "axis":"WHEN","defaultPOV":"present-day singer mourning who they used to be",
           "flippedPOV":"the younger self, BEFORE the abandonment, still hopeful and unaware",
           "reconciliation":"final chorus snaps to present — the porch light is now off",
           "generatorParams":{ "dualPerspective":true,"verse2Archetype":"Time Jump",
                               "narrativeReveal":false,"structure":"storytelling" } },
  "genre":{ "mode":"fusion","primary":"pop","secondary":"country","fusionName":"Country Pop",
            "label":"Pop x Country (Country Pop)","quality":{"overall":91},
            "blend":{"genre2":"country","ratio":40},
            "treatment":"Story matters as much as hook; verse 2 must deepen, not repeat (fd.tip).",
            "metaphorBridge":null },
  "coherenceScore":78,
  "conceptLine":"Country Pop. A song to the younger self you abandoned, sung from BEFORE you gave up on them — the porch light still left on. Verse 2 jumps back in time; the final chorus reveals the light went out."
}
```

**Handoff →** `buildSongPrompt({ genre:'pop', blend:{genre2:'country',ratio:40}, topic:<conceptLine>, seedLine:'a porch light still left on', dualPerspective:true, structure:'storytelling', mood:'Bittersweet' })` → `{system,prompt,meta}` → streamed as SSE. `X-Soniq-Meta` carries the brief; UI shows 4 chips. `redisIncrExpire('soniq:analytics:prism:2026-06', ...)` fires.

---

## 7. Build order (MVP-first)

1. **`pickWeighted(keys,weightFn)` + `rollGenreDial()`** — smallest self-contained slice; reuses `FUSION_DATA`. Test in isolation.
2. **`buildPrismConcept` v0** — GENRE dial only + `LUCKY_TOPICS` for subject + static perspective. Returns a minimal brief. **Shippable:** wire `buildPrismSongPrompt` (map to `buildSongPrompt`) + the `prism` stream.js branch + analytics counter. End-to-end song generates from a 1-dial brief.
3. **METAPHOR dial** — `buildMetaphorBank()` + `rollMetaphorDial()`; feed `seedLine`. (No balance-note re-splice — it's already at 6384.)
4. **SUBJECT dial live** — `buildSubjectPool` + `normalizeSubject` + `SUBJECT_SEED` + score-weighted pick; replaces the `LUCKY_TOPICS` stub.
5. **PERSPECTIVE dial** — `rollFlipAxis` + `isFlipLegal` + agency tag + FLIP-RESOLVE + the `dualPerspective`/structure bridge.
6. **Coherence scoring + N=5 candidate roll** — layer on top once all four dials roll; this is the quality gate, not the MVP.
7. **Reveal UI** — 4-dial chips from `X-Soniq-Meta`; per-dial override params + lock flags; optional `soniq:prism:subjects` telemetry on a separate key.

**Decisions made where specialists disagreed:** (a) **N=5 scored candidates**, not a single roll. (b) **No new `buildSongPrompt` params** — fold metaphor into `seedLine`, perspective into `dualPerspective`/`structure`/`topic`. (c) **Don't re-splice `buildMetaphorBalanceNote()`** — `buildSongPrompt:6384` already emits it. (d) Roll **GENRE first** because it gates the metaphor bias and the perspective legality.

---

## 8. Addendum — Dial 2 (Metaphor) BUILT + Dial 5 (Phrase Flip) ADDED

*Implemented 2026-06-01 after the initial MVP. Both live in `_brain.js`, wired through the `prism` action in `stream.js`.*

### Dial 2 — METAPHOR (now built)
- `buildMetaphorBank()` flattens `GENRE_METAPHOR_PALETTE` (genre → `families[]` → `images[]`) into **308 rollable tokens**, cached once. Each token carries `{token, family, sentiment, genre}`.
- `rollMetaphorDial({genreKey, metaphor?})` rolls from the **active genre's** palette (home vocabulary); ~25% of rolls **borrow** a cross-genre image for surprise; falls back to the full bank when the genre has no palette. Honours a user-supplied `metaphor`.
- Feeds `seedLine` (when no phrase) and is woven into `conceptLine` as a TOUCHPOINT (the SONIQ balance rule — never an extended-metaphor throughline). The genre↔metaphor term of the coherence score (0–30) is now live; reject-below-55 gate applies.

### Dial 5 — PHRASE FLIP (new)
Turns a colloquial saying / idiom / proverb into a song concept by **flipping** it. Accepts a **user-typed phrase** (e.g. *"God willing and the creek don't rise"*) or rolls from a 40-entry `PHRASE_BANK` of public-domain sayings (each `{phrase, meaning, register}`).

**5 flip strategies** (`PHRASE_FLIP_STRATEGIES`), one rolled or user-chosen per concept:
| Strategy | What the song does |
|---|---|
| **LITERAL** | Write the saying as a real event, not a figure of speech (the creek *actually* rises) |
| **SUBVERT** | Contradict it — the song proves the old wisdom wrong this time |
| **PERSONAL** | Shrink the proverb to one intimate moment / one person / one night |
| **ANSWER** | The narrator talks *back* to whoever says it |
| **ORIGIN** | The story of the first time someone said it, and why it stuck |

**Activation:** `params.phrase` (typed) → on; `params.phraseMode:true` → force-on with a rolled phrase; `params.phraseMode:'auto'` → ~35% of rolls. When active, the **phrase wins `seedLine`** (it's a ready-made hook/title); the metaphor demotes to a supporting touchpoint in `conceptLine`. The flip directive is embedded in `topic` so the model receives it.

**New exports:** `buildMetaphorBank`, `rollMetaphorDial`, `rollPhraseDial`, `PHRASE_BANK`, `PHRASE_FLIP_STRATEGIES`.
**New request params** (`action:'prism'`): `metaphor?`, `phrase?`, `phraseStrategy?` (LITERAL|SUBVERT|PERSONAL|ANSWER|ORIGIN), `phraseMode?` (true|'auto'). All optional; whitelisted server-side.

**Still open:** live subject ZSET (step 4), full weighted perspective roller + legality re-roll (step 5), reveal-UI chips (step 7), `CROSS_STYLE_METAPHOR_BORROWS` fusion-borrow bank (metaphor enhancement).

---

## 9. Blindside audit — 4 blockers found + fixed (2026-06-01)

*Three independent fresh-eyes teams (8 agents) audited the code cold; findings adversarially re-verified. All 4 confirmed blockers are now fixed and offline-verified.*

1. **Paywall bypass (critical)** — the prism branch never applied the free-genre gate the `generate` path enforces; ~73% of free rolls returned premium genres. **Fixed:** `rollGenreDial` takes `allowedGenres`; `stream.js` passes the 6 free genres for unentitled plans. Disallowed explicit `g1/g2` locks are ignored (no bypass), random rolls are constrained, fusions require both legs free. Verified: 0 premium leaks in 400 free rolls; forced `metal+jazz` as free → gated to `pop/edm`.
2. **Client-reachable crash (critical)** — a `null`/garbage entry in the live `subjectPool` ZSET threw a TypeError → HTTP 500. **Fixed:** `rollSubjectDial` filters non-objects/nulls before mapping. Verified: malformed pool (`[null, 42, {}, …]`) no longer throws.
3. **Metaphor violated "touchpoint not throughline" (high)** — the non-phrase path routed the rolled metaphor into `seedLine`, which `seedLineNote` force-locks verbatim into every chorus. **Fixed:** only a flipped PHRASE earns `seedLine` (a saying is a real hook); a rolled metaphor stays in `conceptLine`/`topic` only. Verified.
4. **Reject-55 gate didn't exist / couldn't bind (high)** — code kept max-of-N but never rejected, and the dead `perspectiveRotation` ref (it lives under `LYRIC_CRAFT_UNIVERSAL`) capped legality at 8. **Fixed:** legality ref corrected (reaches 20); over-extension term added; the flip dial now rolls freely while the SCORE culls bad pairings; reject-floor recalibrated **55 → 70** (empirical — coherent dials floor at ~58, so 55 could never bind; 70 sits inside the live winner band). Verified: 2,000 winners min=71, mean=95, none below 70 — the gate now genuinely culls weak batches.

Plus non-blocking: `meta.mood`/`vocal` now surfaced (was `undefined`). The `} else if (lucky) / else (prism)` refactor was verified **safe** — generate/lucky/legacy paths intact, and quota + `recordUsage` **do** cover prism (rate-limiting was NOT bypassed).

**Still not done before this could ship:** ~~UI entry point~~ ✅ **built** (see §10), and **one real authenticated end-to-end test** (free + paid user hit `/api/stream` with `action:'prism'`) — still unproven against the live model + data.

---

## 10. UI built (2026-06-02) — 2-agent build, single-writer integration

Prism ships as a **sibling page to Lucky** in `public/index.html` (vanilla JS, no framework), maximally reusing Lucky's plumbing:

- **New page** `#pg-prism` modeled on `#pg-lucky` — 🔮 orb + "Refract" CTA + slot-machine spin, plus Prism-only controls: a **phrase-flip input**, a **flip-strategy** `<select>` (Auto/Literal/Subvert/Personal/Answer/Origin), a **Spice** toggle, and optional **genre-lock** inputs.
- **Nav**: 🔮 entry added to both sidebar (`.sb-btn`) and mobile (`.mb-btn`) beside Lucky's 🎲.
- **`feelPrism()`** mirrors `feelLucky()` — gathers inputs → `callServerStream('prism', params, …)` (the SAME SSE transport, no new code) → spins `spinPrismWheel()` → on success calls `renderPrismReveal()`. Reuses the exact auth-gate, abort, error, founding-upsell, achievement, and global-counter handling.
- **`renderPrismReveal(meta, song)`** paints the four-dial chip grid (Subject · Metaphor · Flip · Genre) + a highlighted **Phrase-flip** chip when present + the `conceptLine` + a Coherence badge, then the streamed song (escaped via `escHtml`, tags highlighted).
- **Wiring**: `S.prismController` abort + `stopGeneration('prism')` in the controllerMap; `_pendingGenerate==='prism'` resume after signup; `loadGlobalCounter()` on page open.

Build method: two agents produced disjoint artifacts (Agent 1 = UX/markup/CSS, Agent 2 = JS logic), reconciled (slot-reel IDs unified to `slot-*-p?`, stop routed to `stopGeneration('prism')`, reveal CSS classes merged) and spliced by a single writer. **Verified:** all 3 inline `<script>` blocks compile (vm.Script), each function defined once, no regressions to Lucky/generate. Local dev shows a "requires deployed server" notice (concept engine is server-side) — consistent with the no-local-model rule.

**The only thing left to call it live:** deploy + one real authenticated end-to-end generation (free user gated to base genres, paid user full, song renders, counter ticks).

## 11. Idea Engine + live subjects (2026-10-17)

- **Step 4 done (live subjects):** the Prism branch in `stream.js` now builds `subjectPool` server-side from today's live sparks (`getLiveSparks`), never from the client.
- **Spark Factory** (`src/lib/sparks.mjs` in soniq-workers): Google Trends daily RSS + Google News top stories + Wikipedia most-read (2-3 days back) → stem-regex block list (tragedy, violence, politics, religion, illness) → free Workers AI Qwen (`llmChat prefer:'free'`) writes evergreen sparks (no real names, no events) → Redis `soniq:sparks:live` (3-day TTL). Refreshed on every cron slot and lazily when older than 10h (lock `soniq:sparks:lock`, 5 min).
- **Pools opened up:** `SUBJECT_SEED` 49 → 180 (all moods, not just sad), `PHRASE_BANK` 40 → 103, Lucky draws from `LUCKY_TOPICS + SUBJECT_SEED` (+ live sparks via `params.topicPool`).
- **Pitches:** `buildIdeaBriefs` (N distinct Prism concepts) → `buildPitchWriterPrompt` (free model) → `parsePitches` (bad-title filter + brief fallback) → `pitchToWrite` (Write Song pre-fill + dial locks for one-dial re-rolls). Endpoint `/api/ideas` (`handlers/ideas.js`): GET sparks (Studio full list, others 3 + lock), POST pitches; own daily limit (anon 8 / free 25 / paid 60 / Studio 200), free plans gated to the 6 free genres. Community topics (`soniq:topics:top`) only join the pool when 3+ songs share them.
- **UI:** 💡 Ideas page (`#pg-ideas`) replaces the Lucky + Prism nav entries; both pages open from buttons on it.
