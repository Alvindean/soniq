# SONIQ Smart Lyrics Import with One-Click Upgrade
## Complete UX Architecture & Design Specification

---

## 1. FEATURE OVERVIEW

The Smart Lyrics Import feature enables users to import/paste lyrics and receive AI-powered analysis with:
- Real-time score breakdown (rhyme density, syllable consistency, structure, emotional depth)
- Specific improvement recommendations (weak rhymes, inconsistent meter, missing bridge sections)
- One-click instant upgrades with before/after comparison
- Genre migration suggestions with impact preview
- Easy save/paste/copy workflows

---

## 2. CSS DESIGN LANGUAGE & VARIABLES

### Existing SONIQ Foundation
```
Color Tokens (Dark Theme):
--s0: #07070c (darkest bg)
--s1: #0d0d14
--s2: #12121a (card bg)
--s3: #1a1a24 (panel bg)
--s4: #21212e (interactive)
--s5: #2a2a3a (borders/subtle)
--s6: #333346 (highlight)

Text Colors:
--tx1: #f0f0f8 (primary text)
--tx2: #a0a0c4 (secondary)
--tx3: #6a6a90 (tertiary)
--tx4: #52526e (disabled/hint)

Accent Colors:
--amber: #f5c000 (primary accent)
--cyan: #00dcc0 (secondary accent)
--violet: #a892ff (tertiary accent)
--green: #3ee896 (positive)
--red: #ff6b6b (negative/warning)

Border/Background:
--b1: rgba(255,255,255,0.06)
--b2: rgba(255,255,255,0.11)
--b3: rgba(255,255,255,0.18)
--b4: rgba(255,255,255,0.26)

Radius:
--r1: 7px (small, tight)
--r2: 12px (standard button)
--r3: 16px (card)
--r4: 22px (large)

Spacing:
--sp-xs: clamp(2px, 0.15vw, 4px)
--sp-sm: clamp(6px, 0.5vw, 8px)
--sp-md: clamp(12px, 1vw, 16px)
--sp-lg: clamp(16px, 1.5vw, 24px)
--sp-xl: clamp(20px, 2vw, 28px)

Gaps:
--gap-xs: clamp(4px, 0.25vw, 6px)
--gap-sm: clamp(6px, 0.5vw, 8px)
--gap-md: clamp(8px, 1vw, 12px)
--gap-lg: clamp(12px, 1.5vw, 20px)
```

### New CSS Variables for Smart Import
```css
:root {
  /* Smart Import Score Colors */
  --score-excellent: #4ade80; /* green-500 */
  --score-good: #60a5fa;      /* blue-400 */
  --score-ok: var(--amber);
  --score-poor: #f87171;      /* red-400 */

  /* Import-specific backgrounds */
  --import-input-bg: var(--s3);
  --import-input-border: var(--b2);
  --import-input-focus: var(--amberline);

  /* Before/After comparison */
  --before-accent: rgba(255, 107, 107, 0.15); /* soft red */
  --after-accent: rgba(62, 232, 150, 0.15);   /* soft green */
}
```

---

## 3. COMPONENT HIERARCHY & STRUCTURE

### 3.1 Modal Container Structure
```
.import-upgrade-overlay (fixed overlay)
  ├── .import-upgrade-modal (main card container)
  │   ├── .iup-header
  │   │   ├── .iup-title (h2)
  │   │   └── .iup-close-btn
  │   │
  │   ├── .iup-tabs-nav (tab navigation)
  │   │   ├── .iup-tab-btn.analysis (current)
  │   │   ├── .iup-tab-btn.improvements
  │   │   └── .iup-tab-btn.genre-shift
  │   │
  │   ├── .iup-content (tab content wrapper)
  │   │   └── .iup-pane (one per tab, animated fade-in)
  │   │       ├── .iup-pane.analysis-pane
  │   │       ├── .iup-pane.improvements-pane
  │   │       └── .iup-pane.genre-pane
  │   │
  │   └── .iup-footer
  │       ├── .iup-action-primary (Copy / Save)
  │       ├── .iup-action-secondary (Paste More)
  │       └── .iup-action-tertiary (Done)
```

### 3.2 Analysis Tab Structure
```
.analysis-pane
  ├── .lyrics-input-section
  │   ├── .import-field (textarea with lyric text)
  │   │   ├── label "Original Lyrics"
  │   │   └── textarea#iup-lyrics-input
  │   └── .input-meta (character count, line count)
  │
  ├── .score-breakdown-section
  │   ├── .score-header
  │   │   ├── .score-title "📊 Lyric Analysis"
  │   │   └── .score-overall (main score visual)
  │   │       ├── .score-overall-num (0-100)
  │   │       └── .score-overall-lbl "overall"
  │   │
  │   └── .score-grid
  │       ├── .score-item (per metric)
  │       │   ├── .score-item-label (uppercase title)
  │       │   ├── .score-bar-wrap
  │       │   │   └── .score-bar (colored fill)
  │       │   ├── .score-item-val (numeric)
  │       │   └── .score-item-note (explanation)
  │       ├── score-item (rhyme-density)
  │       ├── score-item (syllable-consistency)
  │       ├── score-item (structure-clarity)
  │       ├── score-item (emotional-depth)
  │       ├── score-item (originality)
  │       └── score-item (hook-strength)
  │
  └── .insights-section
      ├── .insights-title "Key Insights"
      └── .insights-grid
          ├── .insight-card (strength)
          ├── .insight-card (weakness)
          └── .insight-card (opportunity)
```

### 3.3 Improvements Tab Structure
```
.improvements-pane
  ├── .improvements-intro
  │   └── p "We found 3 areas that could be stronger"
  │
  ├── .improvements-list
  │   ├── .improvement-item
  │   │   ├── .imp-header
  │   │   │   ├── .imp-icon (⚠️ or 🎯)
  │   │   │   ├── .imp-title (e.g., "Weak Bridge Rhyme Scheme")
  │   │   │   ├── .imp-severity (low/med/high)
  │   │   │   └── .imp-impact-score (e.g., "+12 points potential")
  │   │   │
  │   │   ├── .imp-details
  │   │   │   ├── .imp-explanation (why this matters)
  │   │   │   └── .imp-example
  │   │   │       ├── .example-label "Current"
  │   │   │       └── .example-text (quoted lyric snippet)
  │   │   │
  │   │   └── .imp-actions
  │   │       ├── .btn.btn-sm.btn-amber "✨ One-Click Fix" (onclick: applyImprovement)
  │   │       └── .btn.btn-sm.btn-outline "Preview First"
  │   │
  │   ├── improvement-item (rhyme improvement)
  │   ├── improvement-item (meter improvement)
  │   └── improvement-item (structure improvement)
  │
  └── .improvements-footer
      └── .improve-all-btn "Apply All Suggestions" (onclick: applyAllImprovements)
```

### 3.4 Genre Shift Tab Structure
```
.genre-pane
  ├── .genre-current-section
  │   ├── .genre-label "Detected Primary Genre"
  │   └── .genre-badge
  │       ├── .genre-icon
  │       ├── .genre-name (e.g., "Indie Pop")
  │       ├── .genre-confidence (e.g., "92% match")
  │       └── .genre-score-summary
  │
  ├── .genre-alternatives-section
  │   ├── .genre-section-title "Shift to a Different Genre"
  │   └── .genre-shifts-grid
  │       ├── .genre-shift-card (for each alternative)
  │       │   ├── .gsc-icon
  │       │   ├── .gsc-name (target genre)
  │       │   ├── .gsc-desc (brief change description)
  │       │   ├── .gsc-changes
  │       │   │   └── ul (bullet list of required changes)
  │       │   ├── .gsc-score-delta
  │       │   │   ├── before: 78
  │       │   │   ├── arrow
  │       │   │   └── after: 85
  │       │   └── .btn.btn-sm "Shift Genre" (onclick: applyGenreShift)
  │       ├── genre-shift-card (Alt Rock)
  │       ├── genre-shift-card (Hip-Hop)
  │       └── genre-shift-card (Pop)
  │
  └── .genre-footer
      └── p.note "Genre shifts apply thematic, structural, and stylistic changes"
```

### 3.5 Before/After Comparison Modal
```
.before-after-modal (nested overlay)
  ├── .ba-header
  │   ├── .ba-title "Lyric Upgrade Preview"
  │   └── .ba-close
  │
  ├── .ba-content
  │   ├── .ba-left-section
  │   │   ├── .ba-label "Before"
  │   │   └── .lyrics-block.before
  │   │       └── pre (with syntax highlighting, diff markers)
  │   │
  │   ├── .ba-divider (animated arrow: →)
  │   │
  │   └── .ba-right-section
  │       ├── .ba-label "After"
  │       └── .lyrics-block.after
  │           └── pre (with syntax highlighting, green highlights)
  │
  ├── .ba-score-comparison
  │   ├── .score-col.before
  │   │   ├── .sc-label "Before"
  │   │   └── .score-overall-num (78)
  │   │
  │   ├── .score-delta "+12 points"
  │   │
  │   └── .score-col.after
  │       ├── .sc-label "After"
  │       └── .score-overall-num (90)
  │
  ├── .ba-explanation
  │   ├── .ba-exp-title "Why This Works Better"
  │   └── .ba-exp-text
  │       p "The new rhyme scheme uses a consistent AABB pattern, improving rhyme density and memorability. The meter is now consistent at 8 syllables per line."
  │
  └── .ba-footer
      ├── .btn.btn-gold "Apply This Change"
      ├── .btn.btn-outline "Try Different Fix"
      └── .btn.btn-subtle "Cancel"
```

---

## 4. CSS CLASS NAMING CONVENTION

### Smart Import Specific Classes
```css
/* Prefixes */
.iup-*         /* import-upgrade-panel classes */
.imp-*         /* improvement-specific classes */
.gsc-*         /* genre-shift-card classes */
.ba-*          /* before-after comparison classes */
.score-*       /* score/analysis classes (existing, extended) */
.insights-*    /* insights section classes */

/* Button variants */
.btn-amber     /* primary action */
.btn-cyan      /* secondary action */
.btn-gold      /* alternative to amber */
.btn-outline   /* neutral secondary */
.btn-subtle    /* tertiary, low emphasis */

/* States */
.on            /* active/selected */
.visible       /* shown with animation */
.applying      /* during fix application */
.comparing     /* during before/after view */

/* Size variants (existing) */
.btn-sm        /* small: 7px 14px, font-size 12px */
.btn-xs        /* extra-small: 4px 10px, font-size 11px */

/* Semantic colors */
.score-excellent    /* >= 85 */
.score-good         /* 70-84 */
.score-ok           /* 55-69 */
.score-poor         /* < 55 */

.status-strength    /* for insights showing strengths */
.status-weakness    /* for insights showing weaknesses */
.status-opportunity /* for insights showing opportunities */
```

---

## 5. WIREFRAME DESCRIPTIONS

### Screen 1: Import Lyrics Entry
**State**: User pastes/imports lyrics for the first time

```
┌─────────────────────────────────────────────┐
│ 📝 Import Lyrics                         [✕] │
├─────────────────────────────────────────────┤
│ Paste your lyrics below and we'll analyze    │
│ them for rhyme quality, structure, & depth.  │
│                                              │
│ ┌─────────────────────────────────────────┐ │
│ │ [Verse 1]                              │ │
│ │ Something in the way she moves...     │ │
│ │ Attracts me like no other lover...    │ │
│ │                                      │ │
│ │ [Chorus]                             │ │
│ │ Could it be magic?...                │ │
│ │ (13 lines, 92 characters)             │ │
│ └─────────────────────────────────────────┘ │
│                                              │
│ [🎤 Dictate by voice]                      │
│                                              │
│ [✨ Analyze Lyrics]  [Cancel]               │
└─────────────────────────────────────────────┘
```

---

### Screen 2: Analysis Results (Breakdown Tab - Active)
**State**: System has analyzed lyrics, shows score breakdown

```
┌────────────────────────────────────────────────────┐
│ ✨ Smart Lyrics Upgrade                        [✕] │
├─ Analysis │ Improvements │ Genre Shift ───────────┤
├────────────────────────────────────────────────────┤
│                                                    │
│ Original Lyrics                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ [Verse 1]                                   │ │
│ │ Something in the way she moves...           │ │
│ │ Attracts me like no other lover...          │ │
│ │ ...                                         │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐
│ │ 📊 Song Score Analysis                       │ │
│ │                                     78       │ │
│ │                                     overall  │ │
│ ├────────────────────────────────────────────────┤
│ │ Rhyme         ████████░ 82                   │ │
│ │ Density       Good coverage                  │ │
│ │                                              │ │
│ │ Syllable      ███████░░ 75                   │ │
│ │ Consistency   Some variation (can improve)   │ │
│ │                                              │ │
│ │ Structure     █████░░░░ 65                   │ │
│ │ Clarity       Missing clear bridge           │ │
│ │                                              │ │
│ │ Emotional     ████████░ 80                   │ │
│ │ Depth         Strong imagery                 │ │
│ │                                              │ │
│ │ Originality   ██████░░░ 70                   │ │
│ │              Familiar phrasing               │ │
│ │                                              │ │
│ │ Hook          ████████░ 85                   │ │
│ │ Strength      Memorable chorus               │ │
│ └────────────────────────────────────────────────┘
│                                                    │
│ 🎯 Key Insights                                  │
│ ┌──────────────────┬──────────────────┐          │
│ │ ✅ Strength      │ ⚠️ Weakness     │          │
│ │ Great hook with  │ Inconsistent    │          │
│ │ strong emotion   │ meter in verse  │          │
│ │                  │                  │          │
│ │ 💡 Opportunity  │                  │          │
│ │ Add contrasting  │                  │          │
│ │ pre-chorus       │                  │          │
│ └──────────────────┴──────────────────┘          │
│                                                    │
│ [📋 Copy Lyrics]  [💾 Save Draft]  [Done]       │
└────────────────────────────────────────────────────┘
```

---

### Screen 3: Improvements Tab (Active)
**State**: Shows specific fixable issues with one-click apply

```
┌────────────────────────────────────────────────────┐
│ ✨ Smart Lyrics Upgrade                        [✕] │
├ Analysis │ ✨ Improvements │ Genre Shift ──────────┤
├────────────────────────────────────────────────────┤
│                                                    │
│ We found 3 areas that could be stronger.          │
│ Apply them one-by-one or all at once.             │
│                                                    │
│ ┌────────────────────────────────────────────────┐
│ │ 🎯 IMPROVEMENT 1: Strengthen Verse Meter      │
│ │ Potential Impact: +8 points  [HIGH]            │
│ │ ────────────────────────────────────────────── │
│ │ Currently, your verse lines vary from 7 to 10  │
│ │ syllables. Consistent meter (8 syllables)      │
│ │ makes lyrics feel more polished.               │
│ │                                                │
│ │ Current Line:                                  │
│ │   "Attracts me like no other lover"  (8)      │
│ │ → "She attracts me like no other" (7)         │
│ │                                                │
│ │ [✨ One-Click Fix]  [Preview First]            │
│ └────────────────────────────────────────────────┘
│                                                    │
│ ┌────────────────────────────────────────────────┐
│ │ 🎯 IMPROVEMENT 2: Add Bridge Section          │
│ │ Potential Impact: +12 points  [CRITICAL]       │
│ │ ────────────────────────────────────────────── │
│ │ Your song has Verse → Chorus → Verse →        │
│ │ Chorus. A bridge adds contrast before the     │
│ │ final chorus, making the song more memorable. │
│ │                                                │
│ │ Suggested Bridge:                              │
│ │   "In the silence, can you hear me?"           │
│ │   "All the things I can't quite say..."        │
│ │                                                │
│ │ [✨ One-Click Fix]  [Preview First]            │
│ └────────────────────────────────────────────────┘
│                                                    │
│ ┌────────────────────────────────────────────────┐
│ │ 🎯 IMPROVEMENT 3: Improve Rhyme Scheme       │
│ │ Potential Impact: +6 points  [MEDIUM]          │
│ │ ────────────────────────────────────────────── │
│ │ Your bridge currently has partial rhymes.      │
│ │ Using full, clear rhymes will improve flow.    │
│ │                                                │
│ │ Current: "magic" / "tragic"  → Good but        │
│ │ Could be stronger with internal rhymes.       │
│ │                                                │
│ │ [✨ One-Click Fix]  [Preview First]            │
│ └────────────────────────────────────────────────┘
│                                                    │
│ [Apply All Suggestions ▼]                         │
│                                                    │
│ [📋 Copy Lyrics]  [💾 Save]  [Done]             │
└────────────────────────────────────────────────────┘
```

---

### Screen 4: Before/After Comparison (Nested Modal)
**State**: User clicked "Preview First" or "One-Click Fix", comparing versions

```
┌────────────────────────────────────────────────────┐
│ 📊 Lyric Upgrade Preview                       [✕] │
├────────────────────────────────────────────────────┤
│                                                    │
│ BEFORE                             →              │
│ ┌──────────────────────┐          ┌──────────────┐
│ │ [Verse 1]            │          │ [Verse 1]    │
│ │ Something in the     │          │ Something in │
│ │ way she moves...     │          │ the way she  │
│ │ (7 syllables)        │   →      │ moves...     │
│ │ Attracts me like no  │          │ (8 syllables)│
│ │ other lover...       │          │ She attracts │
│ │ (8 syllables)        │          │ me like no   │
│ │ ...                  │          │ other lover  │
│ │ (consistent)         │          │ (8 syllables)│
│ │                      │          │ (consistent) │
│ │                      │          │ ...          │
│ └──────────────────────┘          │              │
│ Highlighted changes ↓              │              │
│                                    └──────────────┘
│
│ Before: 78 overall      →  →  →    After: 86 overall
│ Rhyme:        82                    Rhyme:        82
│ Syllables:    75        ↑ +11 ↑     Syllables:    86 ✓
│ Structure:    65        ↑ +8  ↑     Structure:    73
│ Emotion:      80                    Emotion:      80
│ Originality:  70                    Originality:  70
│ Hook:         85                    Hook:         85
│                                                    │
│ ┌────────────────────────────────────────────────┐
│ │ Why This Works Better                          │
│ │ ──────────────────────────────────────────── │
│ │ Consistent 8-syllable meter creates a natural  │
│ │ rhythm that's easier to sing and remember.     │
│ │ The human ear expects 8 syllables, so          │
│ │ deviations feel jarring. This fix removes      │
│ │ those friction points without changing your    │
│ │ meaning or emotion.                            │
│ └────────────────────────────────────────────────┘
│                                                    │
│ [✨ Apply This Change]  [Try Different Fix]      │
│ [Cancel]                                          │
└────────────────────────────────────────────────────┘
```

---

### Screen 5: Genre Shift Tab (Active)
**State**: Shows current genre + alternative genre options with impact preview

```
┌────────────────────────────────────────────────────┐
│ ✨ Smart Lyrics Upgrade                        [✕] │
├ Analysis │ Improvements │ 🎵 Genre Shift ─────────┤
├────────────────────────────────────────────────────┤
│                                                    │
│ 🎵 Detected Primary Genre                         │
│ ┌────────────────────────────────────────────────┐
│ │             Indie Pop                          │
│ │         92% confidence match                   │
│ │      Current Score: 78 points                  │
│ └────────────────────────────────────────────────┘
│                                                    │
│ Shift to a Different Genre?                       │
│ ┌───────────────────┬───────────────────┐        │
│ │ 🎸 Alt Rock       │ 🎹 Piano Ballad  │        │
│ │ ───────────────   │ ────────────────  │        │
│ │ Make it edgier    │ Make it more      │        │
│ │ Heavier drums     │ intimate          │        │
│ │ Distorted guitar  │ Acoustic piano    │        │
│ │ Darker tone       │ Orchestral        │        │
│ │                   │ strings           │        │
│ │ 78 → 82 points    │ 78 → 85 points   │        │
│ │ [Shift Genre]     │ [Shift Genre]     │        │
│ └───────────────────┴───────────────────┘        │
│                                                    │
│ ┌────────────────────────────────────────────────┐
│ │ 🎤 Hip-Hop / Rap                              │
│ │ ────────────────────────────────────────────  │
│ │ Adapt rhyme scheme for rap flow                │
│ │ Add internal rhymes and wordplay               │
│ │ Adjust syllable stress for hip-hop timing      │
│ │ Add spoken-word elements in verses             │
│ │                                                │
│ │ 78 → 73 points (less natural for this style)  │
│ │ [Shift Genre]                                  │
│ └────────────────────────────────────────────────┘
│                                                    │
│ Note: Genre shifts apply thematic, structural,    │
│ and stylistic changes to optimize for the new     │
│ genre while preserving your emotional core.       │
│                                                    │
│ [📋 Copy Lyrics]  [💾 Save]  [Done]             │
└────────────────────────────────────────────────────┘
```

---

## 6. INTERACTION FLOW (User Journey)

### Flow 1: Basic Import & Review
```
User pastes lyrics
       ↓
[Analyze Lyrics button]
       ↓
System generates analysis (loading state with spinner)
       ↓
Analysis Tab displays:
  - Original lyrics in textarea
  - Score breakdown with 6 metrics
  - Key insights cards (strength, weakness, opportunity)
       ↓
User reviews score and insights
       ↓
User actions:
  - [Copy Lyrics] → Clipboard
  - [Save Draft] → Local storage / account
  - [Done] → Close modal
  - Switch to "Improvements" tab
```

### Flow 2: One-Click Improvement Application
```
User is on Improvements tab
       ↓
User sees 1-3 suggested improvements with impact scores
       ↓
User clicks [✨ One-Click Fix] on an improvement
       ↓
Before/After modal opens (nested overlay)
  - Shows diff between old and new lyrics
  - Shows score before/after (animated transition)
  - Shows explanation of WHY it's better
       ↓
User can:
  A) [Apply This Change] → Updates lyrics in textarea, closes modal, returns to Improvements
  B) [Try Different Fix] → Shows alternative suggestion for same issue
  C) [Cancel] → Closes modal without applying
       ↓
If Applied:
  - Lyrics update in the textarea
  - Score updates with animation (bars grow/shrink)
  - Improvement item gets "✓ Applied" badge
  - Next improvement auto-highlights
       ↓
[Apply All Suggestions] button becomes active if multiple remain
```

### Flow 3: Genre Shift Application
```
User is on Genre Shift tab
       ↓
User sees:
  - Current detected genre (e.g., "Indie Pop")
  - 3-5 alternative genre cards with impact preview
       ↓
User clicks [Shift Genre] on a target genre
       ↓
Genre Shift Confirmation Modal opens:
  - Shows current genre vs. target genre
  - Lists specific changes that will be applied
  - Shows score delta (before → after)
  - Shows example changes from lyrics
       ↓
User can:
  A) [Confirm Shift] → Applies all changes, updates lyrics
  B) [Compare Genres] → Shows side-by-side comparison
  C) [Cancel] → Stays on Genre Shift tab
       ↓
If Confirmed:
  - Lyrics update to reflect genre shift
  - All improvements related to genre apply
  - Analysis tab updates with new score
  - Genre badge changes
  - User sees "✓ Shifted to [Genre]" confirmation
```

### Flow 4: Save & Export
```
After any improvements/shifts, user can:

[📋 Copy Lyrics]
  → Copies current edited lyrics to clipboard
  → Shows toast: "Copied to clipboard"

[💾 Save Draft]
  → Options popup:
    a) Save to Browser (localStorage)
    b) Save to Account (if logged in)
    c) Email to Self
  → Shows toast: "Saved successfully"

[Paste More]
  → Clears textarea, refocuses, ready for new lyrics
  → Resets analysis/improvements (asks for confirmation if changes)

[Done]
  → Closes modal
  → If unsaved changes: "You have unsaved edits. Save before closing?"
  → Returns to main editor
```

---

## 7. ANIMATION & TRANSITION SPECIFICATIONS

### Modal Entry/Exit
```css
.import-upgrade-overlay {
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.import-upgrade-modal {
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Tab Switching
```css
.iup-pane {
  animation: tabFadeIn 0.15s ease;
  opacity: 0;
  transform: translateY(4px);
}

.iup-pane.on {
  opacity: 1;
  transform: translateY(0);
}

@keyframes tabFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Score Bar Fill (Before→After)
```css
.score-bar {
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: width;
}

/* When improving from 75% to 85%: */
.score-bar {
  width: 75%;
}
.score-bar.updated {
  width: 85%;
  background: linear-gradient(90deg, var(--amber), var(--green));
}
```

### Improvement Application (Loading State)
```css
.improvement-item.applying {
  opacity: 0.6;
  pointer-events: none;
}

.improvement-item.applying::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(245,192,0,0.1), transparent);
  background-size: 200% 100%;
  animation: shimmerLoad 1.5s infinite;
}

@keyframes shimmerLoad {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.improvement-item.applied {
  border-left: 3px solid var(--green);
}

.improvement-item.applied::before {
  content: '✓';
  color: var(--green);
  font-weight: 700;
}
```

### Before/After Diff Highlighting
```css
.ba-left-section .lyrics-block.before .changed {
  background: var(--before-accent);
  padding: 2px 4px;
  border-radius: 3px;
  text-decoration: line-through;
  opacity: 0.7;
}

.ba-right-section .lyrics-block.after .changed {
  background: var(--after-accent);
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
}

/* Animated comparison flip */
.ba-divider {
  animation: compareArrow 1.4s ease-in-out infinite;
}

@keyframes compareArrow {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(4px); opacity: 1; }
}
```

### Score Number Animation (Flip)
```css
.score-overall-num.updating {
  animation: scoreFlip 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--green);
}

@keyframes scoreFlip {
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
```

---

## 8. DATA MODEL FOR BEFORE/AFTER TRACKING

### Core Data Structure
```javascript
{
  // Original lyrics as imported
  originalLyrics: string,

  // Current working version (may have improvements applied)
  currentLyrics: string,

  // Full version history
  versions: [
    {
      id: "v-timestamp",
      label: "Original Import",
      lyrics: string,
      timestamp: ISO8601,
      scoreBreakdown: {
        overall: number (0-100),
        rhymeDensity: number,
        syllableConsistency: number,
        structureClarity: number,
        emotionalDepth: number,
        originality: number,
        hookStrength: number
      },
      genre: string,
      improvements: [] // which improvements were applied in this version
    }
  ],

  // Detected improvements (before application)
  improvements: [
    {
      id: "imp-1",
      type: "meter" | "rhyme" | "structure" | "emotion" | "originality",
      title: string,
      description: string,
      severity: "low" | "medium" | "high",
      potentialImpact: number (points to gain 0-20),
      currentExample: string,
      suggestedExample: string,
      explanation: string,
      applied: boolean,
      appliedAt: ISO8601 | null,
      appliedVersion: string | null
    }
  ],

  // Genre analysis
  genreAnalysis: {
    detected: {
      genre: string,
      confidence: number (0-100),
      characteristics: string[]
    },
    alternatives: [
      {
        genre: string,
        confidence: number (0-100),
        changes: string[],
        scoreDelta: number,
        exampleChanges: [
          {
            before: string,
            after: string,
            reason: string
          }
        ]
      }
    ],
    shiftApplied: {
      from: string | null,
      to: string | null,
      appliedAt: ISO8601 | null
    }
  },

  // Metadata
  metadata: {
    importedAt: ISO8601,
    lastModified: ISO8601,
    totalImprovementsApplied: number,
    genreShiftApplied: boolean,
    userSaved: boolean,
    saveLocation: "browser" | "account" | null
  }
}
```

### Score Tracking Object
```javascript
{
  // For comparing before/after application
  scoreComparison: {
    before: {
      overall: 78,
      metrics: {
        rhymeDensity: 82,
        syllableConsistency: 75,
        structureClarity: 65,
        emotionalDepth: 80,
        originality: 70,
        hookStrength: 85
      }
    },
    after: {
      overall: 86,
      metrics: {
        rhymeDensity: 82,
        syllableConsistency: 86,
        structureClarity: 73,
        emotionalDepth: 80,
        originality: 70,
        hookStrength: 85
      }
    },
    delta: {
      overall: 8,
      metrics: {
        syllableConsistency: 11,
        structureClarity: 8
      }
    }
  }
}
```

---

## 9. ACCESSIBILITY & UX CONSIDERATIONS

### Keyboard Navigation
```
Tab         → Move between tabs, buttons, textarea
Shift+Tab   → Move backward
Enter       → Activate buttons, apply improvements
Escape      → Close modal or sub-modal
Arrow Keys  → Navigate improvement cards (optional)
```

### Screen Reader Support
```
- All buttons have aria-label
- Tab sections have role="tablist" and aria-label
- Score metrics have aria-label describing range (e.g., "syllable consistency: 75 out of 100, good")
- Improvement severity badges have aria-label
- Before/After sections have aria-live="polite" for updates
- Modal has role="dialog" and aria-labelledby="iup-title"
```

### Color Contrast
```
Text on dark backgrounds: #f0f0f8 (--tx1) meets WCAG AA
Score bars use color + numeric value (not color-only)
Improvement severity uses icon + label (not color-only)
Links are underlined in addition to color
```

### Mobile Responsiveness
```css
/* Tablets (768px+) */
@media (max-width: 1024px) {
  .import-upgrade-modal {
    max-width: 90vw;
    max-height: 95vh;
  }
  .ba-left-section, .ba-right-section {
    flex: 1;
  }
}

/* Mobile (< 768px) */
@media (max-width: 767px) {
  .import-upgrade-modal {
    max-width: 95vw;
    max-height: 90vh;
    padding: 16px;
  }

  .iup-tabs-nav {
    flex-wrap: wrap;
  }

  .iup-tab-btn {
    font-size: 11px;
    padding: 8px 12px;
  }

  .score-grid {
    grid-template-columns: 1fr;
  }

  .genre-shifts-grid {
    grid-template-columns: 1fr;
  }

  .ba-left-section, .ba-right-section {
    display: block;
  }

  .ba-divider {
    transform: rotate(90deg);
    margin: 12px 0;
  }

  .improvements-list {
    gap: 12px;
  }
}
```

---

## 10. COMPONENT CSS TEMPLATES

### Base Modal Structure
```css
.import-upgrade-overlay {
  position: fixed;
  inset: 0;
  z-index: 8500;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-lg);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.25s ease;
}

.import-upgrade-modal {
  background: var(--s2);
  border: 1px solid var(--b2);
  border-radius: var(--r3);
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.iup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid var(--b1);
  flex-shrink: 0;
}

.iup-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--tx1);
  margin: 0;
  letter-spacing: -0.3px;
}

.iup-close-btn {
  background: none;
  border: none;
  color: var(--tx3);
  font-size: 20px;
  cursor: pointer;
  transition: color 0.15s;
  padding: 4px 8px;
}

.iup-close-btn:hover {
  color: var(--tx1);
}

.iup-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.iup-pane {
  display: none;
  opacity: 0;
  transform: translateY(4px);
}

.iup-pane.on {
  display: block;
  animation: tabFadeIn 0.15s ease;
  opacity: 1;
  transform: translateY(0);
}

.iup-footer {
  display: flex;
  gap: var(--gap-md);
  padding: 20px 24px;
  border-top: 1px solid var(--b1);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.iup-action-primary {
  flex: 1;
  min-width: 140px;
}

.iup-action-secondary {
  flex: 1;
  min-width: 120px;
}

.iup-action-tertiary {
  padding: 10px 20px;
}
```

### Tab Navigation
```css
.iup-tabs-nav {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--b1);
  padding: 0 24px;
  margin-bottom: 0;
  overflow-x: auto;
}

.iup-tabs-nav::-webkit-scrollbar {
  height: 3px;
}

.iup-tabs-nav::-webkit-scrollbar-track {
  background: var(--s3);
}

.iup-tabs-nav::-webkit-scrollbar-thumb {
  background: var(--b2);
  border-radius: 2px;
}

.iup-tab-btn {
  padding: 14px 16px;
  border: none;
  background: none;
  color: var(--tx3);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.iup-tab-btn:hover {
  color: var(--tx1);
}

.iup-tab-btn.on {
  color: var(--tx1);
  border-bottom-color: var(--amber);
}
```

### Score Display
```css
.score-breakdown-section {
  margin-bottom: var(--sp-xl);
}

.score-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-lg);
  margin-bottom: 20px;
}

.score-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--tx2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.score-overall {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-overall-num {
  font-size: 36px;
  font-weight: 800;
  font-family: var(--mono);
  color: var(--amber);
  line-height: 1;
  min-width: 60px;
  text-align: center;
}

.score-overall-lbl {
  font-size: 10px;
  color: var(--tx3);
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--gap-md);
}

.score-item {
  background: var(--s3);
  border-radius: var(--r2);
  padding: 12px;
}

.score-item-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.score-bar-wrap {
  height: 5px;
  background: var(--s5);
  border-radius: 99px;
  margin-bottom: 6px;
  overflow: hidden;
}

.score-bar {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--cyan), var(--amber));
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: width;
}

.score-bar.excellent { background: var(--score-excellent); }
.score-bar.good { background: var(--score-good); }
.score-bar.ok { background: var(--score-ok); }
.score-bar.poor { background: var(--score-poor); }

.score-item-val {
  font-size: 13px;
  font-weight: 700;
  font-family: var(--mono);
  color: var(--tx1);
  margin-bottom: 4px;
}

.score-item-note {
  font-size: 11px;
  color: var(--tx3);
  line-height: 1.5;
}
```

### Improvement Cards
```css
.improvements-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);
}

.improvement-item {
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  padding: 16px;
  transition: all 0.15s;
}

.improvement-item:hover {
  border-color: var(--b3);
  background: var(--s4);
}

.improvement-item.applied {
  border-left: 3px solid var(--green);
  opacity: 0.75;
}

.imp-header {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-md);
  margin-bottom: 12px;
}

.imp-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.imp-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--tx1);
  flex: 1;
}

.imp-severity {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--s5);
  color: var(--tx3);
}

.imp-severity.high { background: rgba(255, 107, 107, 0.2); color: var(--red); }
.imp-severity.medium { background: var(--amberbg); color: var(--amber); }
.imp-severity.low { background: rgba(62, 232, 150, 0.2); color: var(--green); }

.imp-impact-score {
  font-size: 11px;
  color: var(--cyan);
  font-weight: 600;
}

.imp-details {
  margin-bottom: 14px;
}

.imp-explanation {
  font-size: 12px;
  color: var(--tx2);
  line-height: 1.6;
  margin-bottom: 8px;
}

.imp-example {
  background: var(--s2);
  border: 1px solid var(--b1);
  border-radius: var(--r1);
  padding: 10px 12px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--tx3);
}

.example-label {
  font-size: 9px;
  font-weight: 700;
  color: var(--tx4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.example-text {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--tx2);
}

.imp-actions {
  display: flex;
  gap: var(--gap-sm);
  flex-wrap: wrap;
}
```

### Genre Shift Cards
```css
.genre-shifts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--gap-lg);
}

.genre-shift-card {
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  padding: 14px 16px;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.genre-shift-card:hover {
  border-color: var(--b3);
  background: var(--s4);
}

.gsc-icon {
  font-size: 24px;
  line-height: 1;
}

.gsc-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--tx1);
}

.gsc-desc {
  font-size: 11px;
  color: var(--tx3);
  line-height: 1.5;
}

.gsc-changes {
  background: var(--s2);
  border: 1px solid var(--b1);
  border-radius: var(--r1);
  padding: 10px;
  font-size: 11px;
  color: var(--tx2);
}

.gsc-changes ul {
  margin: 0;
  padding-left: 18px;
  line-height: 1.6;
}

.gsc-changes li {
  margin-bottom: 4px;
}

.gsc-score-delta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--tx2);
}

.gsc-score-delta::before {
  content: '→';
  color: var(--amber);
}
```

### Before/After Comparison Modal
```css
.before-after-modal {
  position: fixed;
  inset: 0;
  z-index: 8600;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-lg);
  backdrop-filter: blur(6px);
}

.ba-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--b1);
}

.ba-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--tx1);
}

.ba-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  padding: 24px;
  align-items: start;
}

.ba-left-section,
.ba-right-section {
  flex: 1;
}

.ba-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.lyrics-block {
  background: var(--s3);
  border: 1px solid var(--b1);
  border-radius: var(--r2);
  padding: 12px;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.8;
  color: var(--tx2);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
}

.ba-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--amber);
  animation: compareArrow 1.4s ease-in-out infinite;
}

.ba-score-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: center;
  padding: 16px 24px;
  background: var(--s3);
  border-radius: var(--r2);
  margin-top: 16px;
}

.score-col {
  text-align: center;
}

.sc-label {
  font-size: 10px;
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.ba-explanation {
  padding: 16px 24px;
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  background: rgba(168, 146, 255, 0.05);
  margin-top: 16px;
}

.ba-exp-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--tx1);
  margin-bottom: 8px;
}

.ba-exp-text {
  font-size: 12px;
  color: var(--tx2);
  line-height: 1.6;
}

.ba-footer {
  display: flex;
  gap: var(--gap-md);
  padding: 20px 24px;
  border-top: 1px solid var(--b1);
  flex-wrap: wrap;
}
```

---

## 11. IMPLEMENTATION CHECKLIST

### Phase 1: Core Infrastructure
- [ ] Add CSS variables for score colors and import-specific styles
- [ ] Create `.import-upgrade-overlay` and `.import-upgrade-modal` containers
- [ ] Build tab navigation system (`.iup-tabs-nav`, `.iup-tab-btn`)
- [ ] Create modal header, content wrapper, footer structure
- [ ] Add fade-in and slide-up animations

### Phase 2: Analysis Tab
- [ ] Create lyrics input textarea with character/line counters
- [ ] Build score breakdown grid with 6 metrics
- [ ] Implement score bar animation (width transition)
- [ ] Create insights cards (strength, weakness, opportunity)
- [ ] Add score loading state with spinner

### Phase 3: Improvements Tab
- [ ] Create improvement item cards with headers, details, actions
- [ ] Implement before/after diff highlighting
- [ ] Add "One-Click Fix" and "Preview First" button handlers
- [ ] Create nested Before/After Comparison modal
- [ ] Implement improvement application with score updates
- [ ] Add "Apply All Suggestions" button logic

### Phase 4: Genre Shift Tab
- [ ] Create current genre badge display
- [ ] Build genre alternative cards with impact preview
- [ ] Implement genre shift confirmation modal
- [ ] Add score delta preview
- [ ] Create genre shift application logic

### Phase 5: Interactions & Animations
- [ ] Score bar fill animations (0.6s cubic-bezier)
- [ ] Tab switching fade-in animations
- [ ] Score number flip animation on update
- [ ] Improvement applied shimmer effect
- [ ] Diff highlighting animation

### Phase 6: Save/Export
- [ ] Copy Lyrics button (→ clipboard)
- [ ] Save Draft button (→ localStorage/account)
- [ ] Paste More button (clear & reset)
- [ ] Unsaved changes warning
- [ ] Toast notifications

### Phase 7: Data Management
- [ ] Implement version tracking object
- [ ] Create improvement tracking system
- [ ] Build genre analysis data structure
- [ ] Create before/after score comparison object
- [ ] Implement undo/redo for improvements

### Phase 8: Accessibility
- [ ] Add ARIA labels to all buttons
- [ ] Implement keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Add screen reader descriptions for scores
- [ ] Ensure color contrast WCAG AA
- [ ] Test with keyboard-only navigation

### Phase 9: Mobile Responsiveness
- [ ] Test on 320px, 640px, 768px breakpoints
- [ ] Adjust grid layouts for mobile
- [ ] Ensure Before/After modal displays correctly on small screens
- [ ] Test tab switching on mobile

### Phase 10: Polish & Testing
- [ ] Test all improvement applications
- [ ] Verify score animations smooth
- [ ] Test genre shift workflows
- [ ] Verify save/copy functionality
- [ ] Performance testing on large lyric texts
- [ ] Cross-browser testing

---

## 12. INTEGRATION WITH EXISTING SONIQ UI

### Entry Point
The Smart Lyrics Import modal should be triggered from:
1. Existing "Paste Lyrics" button → Enhanced modal
2. File import with lyrics → Trigger analysis
3. "Import" action in main nav

### Modal Hierarchy
```
z-index: 8500  ← import-upgrade-overlay (main modal)
z-index: 8600  ← before-after-modal (nested, appears over main)
(existing modals: z-index 900-950)
```

### Connection to Existing Systems
- **Lyrics Editor**: Load upgraded lyrics into the main editor on "Done"
- **Score Dashboard**: Reuse existing `.score-dashboard` and `.score-item` classes
- **Button Styles**: Use existing `.btn`, `.btn-gold`, `.btn-outline` patterns
- **Animations**: Follow existing `pgIn`, `tabFadeIn`, `slideUp` patterns
- **Colors**: Use existing CSS variables (--amber, --cyan, --green, --red)

---

## 13. SUCCESS METRICS

### User Experience
- Users should understand their lyric quality at a glance (< 2 seconds)
- Each improvement should be applicable in < 1 click
- Before/After comparison visible in single view
- Total workflow (import → apply improvements → export) < 3 minutes

### Performance
- Modal opens < 300ms
- Analysis generates < 2 seconds
- Score animation smooth (60fps)
- No layout shift on tab switching

### Adoption
- Track modal open rate
- Track improvement application rate
- Track save/export rate
- Track genre shift exploration rate

---

## 14. FUTURE ENHANCEMENTS

1. **Batch Improvements**: Apply multiple improvements with preview of cumulative score
2. **Custom Thresholds**: Let users set minimum score targets
3. **Genre Blending**: Suggest hybrid genres (e.g., "Indie-Folk")
4. **Collaboration**: Share analysis and improvements with other users
5. **History Timeline**: Visual timeline showing all applied improvements
6. **A/B Testing**: Compare two different improvement approaches side-by-side
7. **AI Variations**: Generate multiple alternative suggestions per improvement
8. **Emotion Mapping**: Visualize emotional arc of the lyrics
9. **Rhyme Scheme Diagram**: Visual display of rhyme patterns
10. **Lyric Structure Map**: Interactive outline showing verse/chorus/bridge layout

---

## SUMMARY

This UX architecture provides a complete, cohesive system for smart lyrics import with one-click upgrades in SONIQ. It:

✓ **Leverages existing design patterns** (cards, buttons, scores, modals)
✓ **Maintains visual consistency** (dark theme, spacing, animations)
✓ **Enables rapid iteration** (one-click fixes, preview first, apply all)
✓ **Supports complex workflows** (before/after, genre shift, version history)
✓ **Prioritizes accessibility** (keyboard nav, screen readers, contrast)
✓ **Scales responsively** (mobile to desktop)
✓ **Animates smoothly** (all transitions documented with timing curves)

The feature transforms passive lyric analysis into active improvement, giving users confidence that their lyrics are the best they can be.
