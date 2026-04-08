# Swarm Build — Parallel Agent Orchestration Engine

Multi-agent build system with specialized roles, dependency-aware task splitting, and integrated quality gates. Scales from 2 agents (small project) to 6+ agents (full-stack build).

## When to Use

Triggers: "swarm build", "team build", "parallel build", "agent team", "multi-agent build", "builder + auditor", "deploy as a team", "team deploy", "build sprint"

Use when:
- Building 3+ files that can be partially or fully parallelized
- A spec or design doc exists and needs to be implemented
- Quality matters — SEO, accessibility, performance, brand consistency
- You want specialized agents (not generic builders) working on what they're best at

Do NOT use when:
- Editing a single file (just edit it directly)
- The task is exploratory/research only (use brainstorming skill instead)
- There's no spec yet (write the spec first, then swarm build it)

---

## Agent Roster

### Required Agents (every swarm build)

| Agent | Role | Runs When | Tools Focus |
|-------|------|-----------|-------------|
| **Research Agent** | Scans codebase, extracts patterns, writes conventions brief, produces BUILD MANIFEST | First (solo) | Read, Grep, Glob |
| **Builder Agent(s)** | Implements assigned files following spec + conventions | After Research | Write, Edit, Bash |
| **QA Agent** | Reviews all output against quality checklist | After Builders | Read, Grep (isolation:worktree) |

### Optional Specialist Agents (add based on project type)

| Agent | Role | When to Add | Tools Focus |
|-------|------|-------------|-------------|
| **SEO Agent** | Meta tags, schema markup, sitemap, llms.txt, keyword targeting, internal links | Any project with public-facing pages | Write, Edit, WebSearch |
| **Copy Agent** | Headlines, CTAs, value props, microcopy — applies brand voice | Marketing pages, landing pages, feature pages | Read, Write (invoke copywriting skill) |
| **Style Agent** | CSS architecture, responsive breakpoints, design system compliance | Projects with 3+ new pages sharing styles | Write, Edit (invoke ux-grid-system skill) |
| **Deploy Agent** | Git staging, commit, push, post-deploy verification | Always recommended for final step | Bash, WebFetch |

### Scaling Rules

| Project Size | Files | Agent Team |
|-------------|-------|------------|
| Small (1-3 files) | Bug fix, single page | 1 Builder + 1 QA |
| Medium (4-8 files) | Feature set, multi-page | Research + 2 Builders + QA |
| Large (9-15 files) | Full section, page architecture | Research + 3 Builders + SEO + QA |
| XL (16+ files) | Full site rebuild, major feature | Research + 4 Builders + SEO + Copy + Style + QA + Deploy |

---

## The Workflow

```
┌─────────────────────────────────────────────────────────┐
│  PHASE 0: PREFLIGHT                                      │
│  Read spec → Determine project size → Select agent team  │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 1: RESEARCH (1 agent, solo)                       │
│  Scan codebase → Extract patterns → Write conventions    │
│  → Map dependencies → Produce BUILD MANIFEST             │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 2: BUILD (2-4 agents, parallel)                   │
│  Each builder gets: spec + conventions + assigned files   │
│  Specialists (SEO, Copy, Style) run in parallel           │
│  Builders flag BLOCKED files for dependency resolution    │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 3: QA (1 agent, sequential review)                │
│  Full checklist: HTML validity, SEO, a11y, responsive,   │
│  links, performance, brand consistency                    │
│  Returns: PASS / FAIL per file with line references       │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 4: FIX (builders fix QA findings)                 │
│  Re-assign issues to original builders                    │
│  QA re-reviews only modified files                        │
│  Loop until all files PASS                                │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 5: DEPLOY                                         │
│  Stage → Commit → Push → Verify live                     │
│  Generate Windows-compatible commands if needed           │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 0: Preflight

Before launching any agents, the orchestrator (you) must:

1. **Locate the spec document**
   - Check: `docs/specs/`, `REQUIREMENTS.md`, `README.md`, design docs, or user instructions
   - If no spec exists: STOP. Use the brainstorming skill to create one first.

2. **Determine project size** using the scaling rules table above

3. **Select the agent team** — list which agents will run and what each will do

4. **Announce the plan to the user:**
   ```
   Swarm Build: [Project Name]
   Team: Research + Builder 1 (HTML/structure) + Builder 2 (CSS/style) + SEO + QA
   Files: [count] across [directories]
   Estimated phases: 5
   ```

---

## Phase 1: Research Agent

**Launch as:** `Agent` tool with `subagent_type: "Explore"` and thoroughness "very thorough"

**Prompt template:**
```
You are the Research Agent for a swarm build. Your job is to scan the existing codebase and produce two deliverables:

PROJECT: [project name]
SPEC LOCATION: [path to spec document]
TARGET DIRECTORY: [where new files will go]

TASK 1 — CONVENTIONS BRIEF
Scan the existing codebase and document:
- CSS patterns: class naming convention, spacing units, color variables, breakpoints, grid system
- HTML patterns: document structure, meta tag format, nav structure, footer, common components
- JS patterns: state management, event handling, naming conventions, module structure
- File naming: kebab-case, camelCase, etc.
- Shared assets: fonts, icons, images, CSS files referenced across pages
- Internal linking: how pages reference each other (relative paths, absolute, etc.)

Write findings as a concise CONVENTIONS BRIEF (not a novel — builders need to scan this fast).

TASK 2 — BUILD MANIFEST
Based on the spec at [path], produce a BUILD MANIFEST:

For each file that needs to be built:
- File path (exact location)
- File purpose (one sentence)
- Dependencies (which other files must exist first — CSS imports, shared components, data files)
- Complexity: LOW / MEDIUM / HIGH
- Suggested builder assignment (group by skill type: structure, style, content, logic)

Group files into INDEPENDENT TRACKS that can run in parallel.
Flag any files that BLOCK other files (must be built first).

OUTPUT FORMAT:
=== CONVENTIONS BRIEF ===
[findings]

=== BUILD MANIFEST ===
TRACK A (Builder 1 — [specialization]):
  1. [file path] — [purpose] — [complexity] — depends on: [none / file]
  2. ...

TRACK B (Builder 2 — [specialization]):
  1. [file path] — [purpose] — [complexity] — depends on: [none / file]
  2. ...

BLOCKED FILES (must be built before dependent tracks start):
  1. [file path] — blocks: [list of dependent files]

SHARED RESOURCES (exist already, builders should reference):
  1. [file path] — [what it provides]
```

**Output:** Save conventions brief and build manifest to working memory. All subsequent agents receive both.

---

## Phase 2: Build Agents (Parallel)

Launch ALL builders simultaneously using the `Agent` tool. Each builder gets a specialized prompt.

### Builder Prompt Template (adapt per specialization)

```
You are Builder Agent [N] — specializing in [STRUCTURE / STYLE / LOGIC / CONTENT].

PROJECT: [project name]
YOUR TRACK: [Track letter from BUILD MANIFEST]

=== CONVENTIONS BRIEF ===
[paste from Research Agent output]

=== YOUR ASSIGNED FILES ===
[paste assigned track from BUILD MANIFEST]

=== SPEC (relevant sections) ===
[paste only the spec sections relevant to this builder's files]

INSTRUCTIONS:
1. Read the conventions brief FIRST — match every pattern exactly
2. Build files in dependency order (check the "depends on" field)
3. For each file:
   a. Create the file at the exact path specified
   b. Follow the spec requirements for that file
   c. Match existing CSS/HTML/JS patterns from conventions brief
   d. Include ALL required elements (see checklist below)
4. If you encounter a BLOCKED dependency (a file another builder is creating):
   - Use a placeholder comment: <!-- BLOCKED: waiting for [file] from Builder [N] -->
   - Continue with other files
   - Report the block in your completion message
5. Self-review each file before marking complete

FILE CHECKLIST (every file must have):
□ Valid HTML5 doctype and structure (if HTML)
□ Proper <head> with charset, viewport, title, meta description
□ Canonical URL
□ OG + Twitter meta tags (if public-facing)
□ Schema markup as JSON-LD (if applicable)
□ Semantic HTML (header, main, nav, section, article, footer)
□ All images have alt text
□ All links have descriptive text (no "click here")
□ Responsive meta viewport tag
□ Proper heading hierarchy (H1 → H2 → H3, no skips)
□ CSS follows existing class naming pattern
□ No inline styles unless matching existing patterns
□ Comments for complex or non-obvious sections

COMPLETION REPORT:
When done, report:
- Files completed: [list with paths]
- Files blocked: [list with what they're waiting for]
- Deviations from spec: [any places you had to make judgment calls]
- Questions for QA: [anything you're unsure about]
```

### SEO Agent (runs in parallel with builders)

**Launch as:** `Agent` tool with `subagent_type: "general-purpose"`

```
You are the SEO Agent. Your job is to ensure every public-facing page has maximum search visibility.

PROJECT: [project name]
SPEC: [path]
CONVENTIONS BRIEF: [paste]
PUBLIC PAGES: [list all public-facing pages being built]

TASKS:

1. META TAGS — For each public page, write:
   - <title> tag: under 60 characters, includes primary keyword, brand name at end
   - <meta name="description">: 150-160 characters, includes CTA language, primary keyword
   - <link rel="canonical">: exact URL
   - OG tags: og:title, og:description, og:image, og:url, og:type
   - Twitter tags: twitter:card, twitter:title, twitter:description, twitter:image

2. SCHEMA MARKUP — For each page, write valid JSON-LD:
   - Landing/feature pages: SoftwareApplication or WebPage
   - Blog articles: BlogPosting with datePublished, author, publisher
   - Comparison pages: WebPage with review/comparison structured data
   - Include: name, description, url, publisher, datePublished

3. SITEMAP UPDATE — Add new pages to sitemap.xml:
   - Set priority weights (landing=1.0, features=0.9, blog/compare=0.8, legal=0.3)
   - Set changefreq (landing=weekly, blog=monthly, legal=yearly)

4. INTERNAL LINKS — Map internal link opportunities:
   - Each new page should link to 2-3 related existing pages
   - Each existing page that's relevant should eventually link to new pages
   - Use descriptive anchor text (not "click here" or "learn more")

5. HEADING HIERARCHY — Verify for each page:
   - Exactly one H1 per page
   - H1 contains primary keyword
   - H2s cover subtopics / keyword variations
   - No heading level skips (H1 → H3 is wrong)

6. KEYWORD TARGETING — For each page, confirm:
   - Primary keyword appears in: title, H1, first paragraph, meta description
   - Secondary keywords appear naturally in body content
   - No keyword stuffing (reads naturally)

OUTPUT: Provide SEO elements as code blocks that builders can paste into their files.
Report any pages where spec doesn't specify enough SEO targets.
```

### Copy Agent (optional, runs in parallel)

```
You are the Copy Agent. Your job is to write all user-facing text.

Read the brand voice guidelines (if they exist) and the copywriting skill.
For each page in the build, write:
- Hero headline (5-8 words, benefit-driven)
- Hero subheadline (1-2 sentences, expands on value prop)
- Section headers throughout the page
- CTA button text (action-oriented, specific)
- Feature descriptions (1-2 sentences each, benefit > feature)
- Social proof copy (if applicable)

Rules:
- Match existing brand voice and tone
- No jargon unless the audience expects it
- CTAs should create urgency without being pushy
- Every headline should pass the "so what?" test
```

### Style Agent (optional, runs in parallel)

```
You are the Style Agent. Your job is to create/extend the CSS for this build.

Read the ux-grid-system skill and existing CSS files.
Create:
- Shared marketing.css (if building multiple marketing pages)
- Page-specific styles that extend shared styles
- Responsive breakpoints matching existing patterns
- Dark mode support (if existing site uses it)
- Animation/transition definitions
- Print styles (if applicable)

Rules:
- Use existing CSS custom properties (--variables)
- Follow existing breakpoint values exactly
- Use clamp() for fluid typography and spacing
- Mobile-first approach
- No !important unless overriding third-party
```

---

## Phase 3: QA Agent

**Launch as:** `Agent` tool with `isolation: "worktree"` so it reviews without modifying originals.

```
You are the QA Agent. Review every file produced by the build team.

FILES TO REVIEW:
[list all files from all builders]

REVIEW CHECKLIST:

### 1. HTML VALIDITY
- [ ] Valid HTML5 doctype
- [ ] No missing closing tags
- [ ] Proper nesting (no <div> inside <p>, etc.)
- [ ] No duplicate IDs on the same page
- [ ] All attributes properly quoted

### 2. SEO COMPLIANCE
- [ ] <title> present and under 60 characters
- [ ] <meta name="description"> present, 150-160 chars
- [ ] Exactly one <H1> per page
- [ ] Heading hierarchy correct (H1 → H2 → H3, no skips)
- [ ] All images have descriptive alt text
- [ ] Canonical URL correct
- [ ] Schema markup is valid JSON-LD (check for syntax errors)
- [ ] OG + Twitter meta tags present
- [ ] Internal links use descriptive anchor text

### 3. ACCESSIBILITY (WCAG AA)
- [ ] All images have alt text (decorative images use alt="")
- [ ] Form inputs have associated <label> elements
- [ ] Interactive elements reachable by keyboard (tab order)
- [ ] Focus indicators visible
- [ ] ARIA labels on non-obvious interactive elements
- [ ] No text smaller than 14px
- [ ] Sufficient color contrast (4.5:1 for normal text, 3:1 for large)
- [ ] Skip-to-content link present (if applicable)

### 4. RESPONSIVE DESIGN
- [ ] Viewport meta tag present
- [ ] Layout works at 320px width (mobile)
- [ ] Layout works at 768px width (tablet)
- [ ] Layout works at 1024px+ width (desktop)
- [ ] Touch targets at least 44x44px
- [ ] No horizontal scrolling at any breakpoint
- [ ] Text readable without zooming on mobile

### 5. CODE QUALITY
- [ ] CSS class names match existing conventions
- [ ] No unused CSS rules
- [ ] No inline styles (unless matching existing patterns)
- [ ] JavaScript has no console.log left in production code
- [ ] Comments explain "why" not "what"
- [ ] File paths are correct (relative vs absolute)
- [ ] All referenced assets exist (images, CSS, JS files)

### 6. CROSS-FILE CONSISTENCY
- [ ] Navigation is identical across all pages
- [ ] Footer is identical across all pages
- [ ] Font loading is consistent
- [ ] CSS variable names match across files
- [ ] Color palette is consistent
- [ ] Spacing scale is consistent

### 7. LINKS & REFERENCES
- [ ] All internal links point to real pages
- [ ] No broken href="#" links (unless intentional)
- [ ] External links open in new tab (target="_blank" rel="noopener")
- [ ] Email links use mailto:
- [ ] Phone links use tel:

### 8. PERFORMANCE
- [ ] No images over 500KB without lazy loading
- [ ] CSS is not duplicated across files unnecessarily
- [ ] No render-blocking resources that could be deferred
- [ ] No excessive DOM nesting (10+ levels deep)

REPORT FORMAT:

For each file:
```
═══════════════════════════════════
FILE: [path/to/file.html]
STATUS: ✅ PASS / ❌ FAIL / ⚠️ WARNINGS
═══════════════════════════════════

CRITICAL (must fix before deploy):
- Line 45: <img> missing alt text
- Line 12: Title tag is 74 chars (max 60)

WARNINGS (should fix, not blocking):
- Line 88: Consider adding aria-label to icon button
- Line 120: CSS class .btn-primary not found in stylesheet

NOTES:
- Schema markup looks good
- Internal linking structure is solid
```

SUMMARY:
```
SWARM BUILD QA REPORT
═══════════════════════════════════
Total files reviewed: [X]
✅ Passed: [X]
❌ Failed: [X]
⚠️ Warnings only: [X]

BLOCKERS: [list or "none"]
READY TO DEPLOY: [YES / NO — fix blockers first]
═══════════════════════════════════
```
```

---

## Phase 4: Fix

If QA found issues:

1. Parse the QA report
2. Group issues by original builder assignment
3. Send fixes back to the correct builder using `SendMessage` (continue the agent)
4. Builder fixes issues in their assigned files only
5. QA re-reviews ONLY modified files (not full re-audit)
6. Repeat until QA reports: `READY TO DEPLOY: YES`

Maximum fix loops: 3. If issues persist after 3 rounds, escalate to user.

---

## Phase 5: Deploy

### For projects deployed via Git (most common):

Generate commands appropriate for the user's OS.

**Windows (Command Prompt):**
```cmd
del .git\index.lock .git\HEAD.lock 2>nul
git add [list of all new/modified files]
git commit -m "feat: [descriptive message]"
git push
```

**Mac/Linux (Terminal):**
```bash
rm -f .git/index.lock .git/HEAD.lock
git add [list of all new/modified files]
git commit -m "feat: [descriptive message]"
git push
```

### Post-Deploy Verification

After push, verify:
1. Deployment platform picked up the push (Vercel, Netlify, etc.)
2. Build succeeded (no errors)
3. Each new page loads at its expected URL
4. Spot-check: title tags, meta descriptions, schema markup render correctly
5. Mobile layout renders properly

If verification tools are available (WebFetch, browser tools), use them to check live pages.

---

## Integration with Existing Skills

The swarm build can invoke other skills as part of its workflow:

| Skill | When to Invoke | Which Agent Uses It |
|-------|---------------|-------------------|
| `ux-grid-system` | Any project building UI pages | Style Agent reads it before writing CSS |
| `seo-audit` | Post-deploy verification of SEO | QA Agent or Deploy Agent |
| `copywriting` | Marketing pages, landing pages | Copy Agent reads it before writing headlines |
| `brainstorming` | No spec exists yet | Orchestrator invokes BEFORE swarm build |
| `learning-loop` | Start of any build session | Orchestrator checks at Phase 0 |

**How to invoke:** The agent's prompt should include:
```
Before starting your work, read the [skill-name] skill at:
/sessions/.../mnt/.claude/skills/[skill-name]/SKILL.md
Follow its guidelines for [specific aspect].
```

---

## Build Manifest Format

The Research Agent produces this. All other agents consume it.

```
═══════════════════════════════════════════════════
BUILD MANIFEST — [Project Name]
Generated: [date]
Spec: [path to spec document]
═══════════════════════════════════════════════════

CONVENTIONS:
  CSS naming: [kebab-case / BEM / etc.]
  Breakpoints: [320, 768, 900, 1024, 1440]
  Color vars: [--amber, --violet, --s0 through --s4, etc.]
  Font stack: [var(--font) = Inter, system-ui, sans-serif]
  Grid: [12-col fluid / flexbox / CSS grid]
  Shared CSS: [/path/to/shared.css]
  Shared nav: [describe nav pattern]
  Shared footer: [describe footer pattern]

TRACK A — Builder 1 (Structure/HTML):
  Priority: HIGH
  Files:
    1. /public/features/genre-dna.html
       Purpose: Feature page for Genre DNA
       Depends on: /public/css/marketing.css (Track B)
       Complexity: MEDIUM
    2. /public/features/ai-songwriting.html
       Purpose: Feature page for AI Songwriting
       Depends on: /public/css/marketing.css (Track B)
       Complexity: MEDIUM

TRACK B — Builder 2 (Style/CSS + remaining HTML):
  Priority: HIGH (marketing.css blocks Track A)
  Files:
    1. /public/css/marketing.css ← BUILD FIRST (blocks Track A)
       Purpose: Shared styles for all marketing pages
       Depends on: nothing
       Complexity: HIGH
    2. /public/compare/soniq-vs-suno.html
       Purpose: Comparison page
       Depends on: /public/css/marketing.css (this track)
       Complexity: MEDIUM

TRACK C — SEO Agent:
  Files:
    1. /public/robots.txt — Depends on: nothing
    2. /public/sitemap.xml — Depends on: final file list from all tracks
    3. /public/llms.txt — Depends on: nothing
    4. Meta tags for all pages — Depends on: page files existing

BLOCKED FILES:
  /public/css/marketing.css → Must complete before Track A starts HTML files
  /public/sitemap.xml → Must wait for all pages to have final URLs

SHARED RESOURCES (already exist):
  /public/blog/blog.css — Reference for styling patterns
  /public/blog/index.html — Reference for page structure
  /public/index.html — App file, reference for CSS variables
═══════════════════════════════════════════════════
```

---

## Dependency Resolution

When Builder X needs a file that Builder Y is creating:

**Option 1: Build Order (preferred)**
If the dependency is a shared resource (CSS file, config, shared component):
- Assign it to the builder who creates it
- Mark it as PRIORITY in the manifest
- That builder creates it FIRST, then other builders can reference it

**Option 2: Placeholder + Patch**
If the dependency is circular or complex:
- Builder uses a placeholder: `<!-- WAITING: [file] from Builder [N] -->`
- After all builders complete, orchestrator resolves placeholders
- QA checks that all placeholders are resolved

**Option 3: Pre-build shared resources**
Before launching parallel builders, create shared resources first:
- Shared CSS file
- Shared nav/footer components
- Config files
- Then launch builders who can all reference the shared resources

---

## Error Recovery

| Situation | Response |
|-----------|----------|
| Builder agent fails/times out | Re-launch with same prompt + "Previous attempt failed. Start fresh." |
| QA finds 10+ critical issues in one file | That file needs a full rewrite, not patches. Re-assign to builder. |
| Dependency deadlock (A needs B, B needs A) | Orchestrator breaks the cycle by pre-building the shared piece |
| User reports issue after deploy | Roll back: `git revert HEAD` then fix and re-deploy |
| Build exceeds context limits | Split into 2 swarm builds: Phase A (foundation) then Phase B (content) |
| Files conflict with existing code | Research Agent missed a pattern. Re-run Research on the conflicting area. |

---

## Quick Start Template

Copy-paste this to kick off a swarm build:

```
I'm starting a swarm build.

SPEC: [path or description]
PROJECT: [name]
TARGET: [directory where files go]
DEPLOY: [git push / vercel / manual]
OS: [Windows / Mac / Linux]

Go.
```

The orchestrator will:
1. Read the spec
2. Determine team size
3. Launch Research Agent
4. Split work and launch builders in parallel
5. Run QA
6. Fix issues
7. Deploy

---

## Success Criteria

A swarm build is complete when:
- [ ] All files in the BUILD MANIFEST are created
- [ ] All QA checks pass (no CRITICAL findings)
- [ ] All placeholder dependencies are resolved
- [ ] All internal links work
- [ ] All SEO elements are present and valid
- [ ] Code matches existing conventions (Research Agent's brief)
- [ ] Deploy succeeded with no errors
- [ ] Post-deploy verification confirms pages load correctly
