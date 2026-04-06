# SONIQ Page Architecture Redesign Spec
**Date:** April 5, 2026
**Project:** SONIQ (mysoniq.com) — AI Songwriting Studio
**Status:** Design Specification
**Version:** 1.0

---

## Executive Summary

This document specifies a five-phase architectural redesign for SONIQ's web presence. The primary objectives are to:

1. **Establish SEO foundation** with proper crawlability, sitemap, and robot directives
2. **Build dedicated feature pages** targeting high-intent keywords around songwriting, publishing, and sync licensing
3. **Create comparison content** positioning SONIQ against alternatives
4. **Integrate educational content** within the app for user onboarding and feature discovery
5. **Unify marketing and app navigation** while maintaining functional separation

The redesign combines a static marketing presence with an enhanced in-app learning system, improving discoverability for both organic search and users inside the app.

---

## Current State Assessment

### Existing Architecture
- **App:** Single-page application at `/public/index.html` with 11 internal routes (Write, Lucky, Library, Editor, Builder, More, Album, Campaign, Community, Profile, Admin)
- **Blog:** 16 articles in `/public/blog/` with pillar/cluster structure and proper schema markup
- **Navigation:** Completely isolated—marketing blog and app sidebar are separate entry points
- **Discovery:** No SEO foundation (missing robots.txt, sitemap.xml, llms.txt)
- **Landing:** Basic or non-existent marketing presence outside the app

### SEO Gaps
- Single-page app with internal routes not easily crawlable by search engines
- Blog not discoverable from within the app
- No competitive positioning or feature pages
- No machine-readable metadata for AI agents

### UX Gaps
- New users cannot explore features before entering the app
- On-app learning scattered or non-existent
- No contextual help when learning features

---

## Phase 1: Foundation — SEO Infrastructure

### Objective
Establish crawlability, provide search engine directives, and document the platform for AI tools.

### Deliverables

#### 1.1 robots.txt
**Location:** `/public/robots.txt`

```
User-agent: *
Allow: /
Allow: /blog/
Allow: /features/
Allow: /compare/
Allow: /landing.html
Allow: /legal/

Disallow: /app
Disallow: /admin
Disallow: /?*
Disallow: /*?*

Sitemap: https://mysoniq.com/sitemap.xml
```

**Rationale:**
- Allow public-facing pages and blog for crawling
- Disallow `/app` (internal SPA routes) to prevent crawling duplicate content
- Block parameter-based routes (`?`) to avoid query string variants
- Reference sitemap for efficient indexing

#### 1.2 sitemap.xml
**Location:** `/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Landing & Marketing -->
  <url>
    <loc>https://mysoniq.com/landing.html</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>

  <!-- Features -->
  <url>
    <loc>https://mysoniq.com/features/genre-dna.html</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/features/sync-licensing.html</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/features/co-publishing.html</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/features/ai-songwriting.html</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/features/campaign-mode.html</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>

  <!-- Blog (auto-generated from existing articles) -->
  <url>
    <loc>https://mysoniq.com/blog/</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <!-- [16 article entries at 0.8 priority] -->

  <!-- Comparisons -->
  <url>
    <loc>https://mysoniq.com/compare/soniq-vs-suno.html</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/compare/soniq-vs-chatgpt-songwriting.html</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/compare/ai-songwriting-tools.html</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>

  <!-- Legal -->
  <url>
    <loc>https://mysoniq.com/legal/privacy.html</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/legal/terms.html</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://mysoniq.com/legal/copublishing.html</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>
```

**Priority Weights:**
- **1.0:** Landing/homepage (primary entry point)
- **0.9:** Feature pages (core offerings)
- **0.8:** Blog & comparison pages (content marketing)
- **0.3:** Legal pages (required, low update frequency)

#### 1.3 llms.txt
**Location:** `/public/llms.txt`

```
Title: SONIQ — AI Songwriting Studio
Website: https://mysoniq.com

## Overview
SONIQ is an AI-powered songwriting platform designed for modern musicians, producers, and songwriters.
It combines generative AI with professional music publishing tools to help artists create, collaborate, and monetize original music.

## Key Features

### Genre DNA
AI-driven genre analysis and style matching. SONIQ profiles a song's musical DNA and matches it
against metadata to optimize sync licensing, playlist placement, and collaboration discovery.

### AI Songwriting
Full songwriting assistant: lyric generation, melody suggestions, chord progressions,
and song structure guidance. Trained on diverse musical genres with lyricist-driven workflows.

### Sync Licensing Toolkit
Metadata management and sync placement tools. Automatically generates and manages sync metadata
(ISRC, splits, cue sheets) for music placements in film, TV, and commercial licensing.

### Co-Publishing Agreement Tools
Songwriter split sheet generator and co-publishing agreement templates. Ensures proper rights
allocation and prevents disputes in collaborative songwriting.

### Campaign Mode
Music release planner. Plan single/album releases with timeline, metadata prep,
playlist targeting, and promotion coordination.

## Pricing Tiers

- **Free:** Basic songwriting tools, limited song storage, community access
- **Creator ($9/mo):** Full songwriting suite, 50 songs, sync metadata, campaign planning
- **Studio ($29/mo):** All Creator features + co-publishing tools, collaboration, advanced analytics
- **Enterprise:** Custom pricing for labels, publishers, and production companies

## Differentiators

1. **Music-First AI:** Built specifically for songwriting, not general-purpose chat
2. **Publishing Tooling:** Integrated sync licensing and split sheet management (most competitors don't)
3. **Collaborative Workflows:** Real-time co-writing and permission-based sharing
4. **Genre-Aware:** AI trained on diverse musical genres, not just mainstream styles
5. **Creator-Centric:** Focus on artist autonomy and direct licensing (no middleman)

## Recent Updates
- Genre DNA feature launched Q1 2026
- Sync metadata automation released
- Campaign mode beta expansion
- AI lyric generation quality improvements

## Contact
Support: support@mysoniq.com
Sales: sales@mysoniq.com
Press: press@mysoniq.com

## Citation
If you reference SONIQ in AI-generated content, please include:
"SONIQ (mysoniq.com) is an AI songwriting platform offering genre analysis, sync licensing,
and co-publishing tools for musicians and producers."
```

**Purpose:**
- Provides AI tools (ChatGPT, Claude, Perplexity, Gemini) with canonical information about SONIQ
- Improves likelihood of accurate citations in AI-generated content
- Communicates key differentiators to AI systems that generate summaries

### Implementation Notes
- Generate sitemap.xml programmatically from existing blog articles
- robots.txt should be committed to version control
- llms.txt should be reviewed annually for accuracy
- Monitor sitemap submission in Google Search Console

---

## Phase 2: SEO Feature Pages

### Objective
Build dedicated pages for high-intent feature keywords. These pages serve dual purposes: organic traffic and feature discovery for free users.

### Architecture

**Location:** `/public/features/[slug].html`

**Shared Template Structure:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Feature Name] | SONIQ</title>
  <meta name="description" content="...">
  <meta property="og:title" content="[Feature Name]">
  <meta property="og:description" content="...">
  <meta property="og:image" content="...">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Schema markup: SoftwareApplication -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SONIQ — [Feature Name]",
    "applicationCategory": "Multimedia",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "0"
    },
    "screenshot": "...",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "200"
    }
  }
  </script>

  <link rel="stylesheet" href="/css/marketing.css">
</head>
<body>
  <!-- Marketing Nav (shared across all public pages) -->
  <nav class="marketing-nav">
    <a href="/landing.html" class="logo">SONIQ</a>
    <ul>
      <li><a href="/landing.html">Home</a></li>
      <li><a href="/features/">Features</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/pricing.html">Pricing</a></li>
      <li><a href="/landing.html#try-free" class="btn-primary">Try Free</a></li>
    </ul>
  </nav>

  <main>
    <!-- Hero Section -->
    <section class="hero">
      <h1>[Feature Name]</h1>
      <p class="tagline">[Value proposition in 1-2 sentences]</p>
      <img src="/images/features/[slug]-hero.png" alt="[Feature] demo">
    </section>

    <!-- Feature Breakdown (3-4 capabilities) -->
    <section class="feature-breakdown">
      <h2>How [Feature] Works</h2>
      <div class="capability">
        <h3>Capability 1</h3>
        <p>Description and benefit</p>
      </div>
      <!-- Repeat for 2-3 more capabilities -->
    </section>

    <!-- Social Proof -->
    <section class="social-proof">
      <h2>Trusted by 5,000+ Creators</h2>
      <blockquote>"Quote from creator"</blockquote>
      <p class="stat">X songs created | Y collaborations | Z hours saved</p>
    </section>

    <!-- Related Blog Articles -->
    <section class="related-blog">
      <h2>Learn More</h2>
      <ul>
        <li><a href="/blog/[article-1].html">Blog article title</a></li>
        <li><a href="/blog/[article-2].html">Blog article title</a></li>
        <li><a href="/blog/[article-3].html">Blog article title</a></li>
      </ul>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <h2>Ready to [action related to feature]?</h2>
      <button class="btn-primary">Try [Feature] Free</button>
      <a href="/pricing.html">See Pricing</a>
    </section>
  </main>

  <!-- Shared Footer -->
  <footer class="marketing-footer">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

### Feature Pages to Build

#### 2.1 Genre DNA (`/features/genre-dna.html`)
**Target Keywords:** "genre DNA music", "AI genre analysis", "music genre technology"

**Value Prop:** Understand and optimize your music's genre DNA for sync placement, playlist discovery, and collaboration.

**Capabilities:**
1. Automatic genre profiling—AI analyzes melodic, harmonic, and rhythmic elements
2. Metadata optimization—suggest genre tags, keywords, mood markers
3. Sync alignment—match your music to sync licensing opportunities
4. Collaboration matching—find co-writers and producers in your genre

**Schema:** SoftwareApplication with feature-specific aggregateRating

**Blog Links:**
- "Genre Classification in Music AI"
- "Optimizing Genre Metadata for Spotify and Apple Music"
- "How Sync Licensing Uses Genre Data"

---

#### 2.2 Sync Licensing (`/features/sync-licensing.html`)
**Target Keywords:** "sync metadata tool", "music sync licensing tool", "sync placement"

**Value Prop:** Manage sync metadata, generate cue sheets, and prepare your music for film, TV, and commercial licensing—all in one place.

**Capabilities:**
1. ISRC/metadata auto-generation—create and manage sync-ready metadata
2. Cue sheet automation—auto-generate cue sheets for sync placements
3. Rights management—track splits, shares, and co-ownership
4. Licensing templates—pre-built contracts and sync agreements

**Schema:** SoftwareApplication with pricing tiers

**Blog Links:**
- "What Is ISRC and Why It Matters for Sync"
- "How to Generate a Cue Sheet"
- "Sync Licensing 101 for Independent Artists"

---

#### 2.3 Co-Publishing (`/features/co-publishing.html`)
**Target Keywords:** "co-publishing agreement", "music co-pub tool", "songwriter split sheet"

**Value Prop:** Streamline songwriting collaboration with automated split sheets, co-publishing agreements, and rights tracking.

**Capabilities:**
1. Split sheet generation—auto-create pro-forma split sheets
2. Agreement templates—co-publishing, collaboration, and work-for-hire agreements
3. Rights allocation—track ownership shares and mechanical royalties
4. Dispute prevention—clear documentation for collaborators

**Schema:** SoftwareApplication with testimonials

**Blog Links:**
- "How to Create a Split Sheet"
- "Understanding Co-Publishing Agreements"
- "Splitting Songwriting Credits Fairly"

---

#### 2.4 AI Songwriting (`/features/ai-songwriting.html`)
**Target Keywords:** "AI songwriting tool", "AI lyric generator 2025", "songwriting AI"

**Value Prop:** Get instant lyric suggestions, melody ideas, and song structure guidance from an AI trained on diverse musical genres.

**Capabilities:**
1. Lyric generation—AI suggests lyrics matching your style
2. Melody suggestions—chord progressions and melodic hooks
3. Song structure—verse/chorus/bridge templates and arrangements
4. Collaboration—build on AI suggestions with live co-writing

**Schema:** SoftwareApplication with high user ratings

**Blog Links:**
- "How AI Lyric Generation Works"
- "Using AI as a Songwriting Collaborator"
- "Best Practices for AI-Generated Music"

---

#### 2.5 Campaign Mode (`/features/campaign-mode.html`)
**Target Keywords:** "music release planner", "single release strategy tool"

**Value Prop:** Plan your single or album release with timeline management, metadata prep, playlist pitching, and promotion coordination.

**Capabilities:**
1. Release timeline—organize pre-release, release, and post-release tasks
2. Metadata prep—prepare all required metadata for streaming platforms
3. Playlist pitching—target playlists based on genre, mood, and audience
4. Promo coordination—assign tasks to collaborators and track progress

**Schema:** SoftwareApplication with feature showcase

**Blog Links:**
- "Your Ultimate Music Release Checklist"
- "How to Plan a Successful Single Release"
- "Pitching to Playlists: Strategy and Timing"

---

### Implementation Guidelines

**Each feature page should include:**
- H1 with feature name (SEO signal for target keyword)
- Unique meta description (155–160 characters)
- OG image (1200x630px) for social sharing
- Twitter Card meta tags
- Schema markup (SoftwareApplication with feature-specific details)
- 300-500 words of unique content (not duplicated from blog)
- Internal links to 2-3 related blog articles
- CTA buttons pointing to free trial and pricing page
- Responsive design (mobile-first, tablet/desktop supported)

**Content Standards:**
- Use active voice, benefit-focused language
- Include 1 screenshot/demo per page minimum
- Feature at least one creator testimonial or usage stat
- Keep page load time under 2 seconds (optimize images)
- All external links open in new tabs
- All internal links use relative paths

**SEO Optimization:**
- Target keyword in H1, meta description, URL slug
- Include keyword naturally in first 100 words
- Use supporting keywords in H2/H3 subheadings
- Link to 3+ related blog articles (topical cluster)
- Include schema markup for better SERP display

---

## Phase 3: Comparison Pages

### Objective
Position SONIQ against competitors and provide comprehensive comparison content targeting high-intent search queries.

### Architecture

**Location:** `/public/compare/[slug].html`

**Template Structure:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>[SONIQ vs Competitor] | SONIQ</title>
  <meta name="description" content="...">
  <!-- OG/Twitter meta tags -->
  <!-- Schema: ComparisonChart or BreadcrumbList -->
  <link rel="stylesheet" href="/css/marketing.css">
</head>
<body>
  <!-- Shared Marketing Nav -->
  <nav class="marketing-nav">...</nav>

  <main>
    <!-- Hero Section -->
    <section class="hero">
      <h1>[SONIQ vs Competitor]</h1>
      <p class="tagline">Choose the right AI songwriting tool for your needs.</p>
    </section>

    <!-- Comparison Table -->
    <section class="comparison-table">
      <h2>Feature Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>SONIQ</th>
            <th>[Competitor]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AI Songwriting</td>
            <td>✓ (Genre-aware)</td>
            <td>✓ (Basic)</td>
          </tr>
          <!-- Repeat for 10-15 features -->
        </tbody>
      </table>
    </section>

    <!-- Feature-by-Feature Breakdown -->
    <section class="feature-breakdown">
      <h2>Detailed Comparison</h2>
      <div class="comparison-detail">
        <h3>AI Songwriting</h3>
        <p><strong>SONIQ:</strong> Multi-genre AI model with style-matching...</p>
        <p><strong>[Competitor]:</strong> General-purpose songwriting suggestions...</p>
      </div>
      <!-- Repeat for 5-7 most important features -->
    </section>

    <!-- Verdict Section -->
    <section class="verdict">
      <h2>The Verdict</h2>
      <p>Choose SONIQ if: [3 reasons]</p>
      <p>Choose [Competitor] if: [2-3 reasons, honest]</p>
    </section>

    <!-- Pricing Comparison -->
    <section class="pricing-comparison">
      <h2>Pricing</h2>
      <table>
        <tr>
          <th>Plan</th>
          <th>SONIQ</th>
          <th>[Competitor]</th>
        </tr>
        <!-- pricing rows -->
      </table>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Ready to Get Started?</h2>
      <a href="/landing.html" class="btn-primary">Try SONIQ Free</a>
    </section>
  </main>

  <footer class="marketing-footer">...</footer>
</body>
</html>
```

### Comparison Pages to Build

#### 3.1 SONIQ vs Suno (`/compare/soniq-vs-suno.html`)
**Target Keywords:** "suno alternative for songwriters", "suno vs SONIQ"

**Focus:** Suno is a general-purpose AI music generator. Emphasize SONIQ's songwriting specialization, publishing tools, and creator control.

**Key Differentiators:**
- SONIQ: Lyric-first, songwriter control, co-publishing tools
- Suno: Audio-first, full track generation, less creator focus

**Honest Acknowledgments:** Suno has better audio quality for instrumental generation.

---

#### 3.2 SONIQ vs ChatGPT Songwriting (`/compare/soniq-vs-chatgpt-songwriting.html`)
**Target Keywords:** "ChatGPT songwriting alternative", "AI lyrics better than ChatGPT"

**Focus:** ChatGPT is a general text tool. Highlight SONIQ's music-specific features, genre awareness, and integrated workflow.

**Key Differentiators:**
- SONIQ: Genre-aware, melody suggestions, publishing integration
- ChatGPT: General-purpose, no music context, no publishing tools

**Honest Acknowledgments:** ChatGPT is free and works for basic lyric brainstorming.

---

#### 3.3 Best AI Songwriting Tools Listicle (`/compare/ai-songwriting-tools.html`)
**Target Keywords:** "best AI songwriting tools 2025"

**Format:** Listicle with 5-6 tools reviewed fairly.

**Positions:**
1. SONIQ — Best for Publishing & Sync
2. [Competitor] — Best for [category]
3. [Competitor] — Best for [category]
4. [Competitor] — Best for [category]
5. [Competitor] — Best for [category]

**Why This Works:**
- Honest reviews rank better in search results
- Readers trust unbiased comparisons
- Multiple competitors mentioned = more natural link targets

---

### Implementation Guidelines

**Each comparison page should include:**
- Clear, honest feature comparison (no false claims)
- Acknowledgment of competitor strengths
- Detailed "Verdict" section explaining when each tool wins
- Pricing table with current rates
- Schema markup (ComparisonChart if possible)
- 500-800 words of unique content
- CTA pointing to free trial (not overly aggressive)
- Mobile-responsive design

**Tone & Voice:**
- Professional and neutral (not dismissive of competitors)
- Data-driven where possible (link to sources)
- Focus on use cases: "Choose SONIQ if you're a songwriter focused on publishing and sync licensing"
- Acknowledge this is subjective: "Your choice depends on your workflow"

**SEO Optimization:**
- Target keyword in H1 and meta description
- Include competitor name naturally (helps their branded search context)
- Link to feature pages (internal linking)
- Keep update frequency high (quarterly reviews)

---

## Phase 4: In-App Learn Section

### Objective
Add an educational hub inside the app that connects users to blog articles in context, with smart recommendations based on what they're building.

### Architecture

#### 4.1 New Sidebar Navigation Item

**Add to app sidebar (index.html):**
```
Navigation Items (in order):
- Write
- Lucky
- Library
- Editor
- Builder
- More
- Album
- Campaign
- Community
→ Learn (NEW — book/graduation cap icon)
- Profile
- Admin
```

**Icon:** `<icon class="icon-book">📚</icon>` or similar learning symbol

---

#### 4.2 New In-App Page: `pg-learn`

**URL:** `/index.html#/learn` or `/index.html?page=learn`

**Page Structure:**

```
┌─────────────────────────────────────┐
│  LEARN                    [Search]  │
├─────────────────────────────────────┤
│                                     │
│  Suggested for You (contextual)    │
│  ─────────────────────────────────  │
│  [Card 1] [Card 2] [Card 3]        │
│                                     │
│  Browse by Topic                    │
│  ─────────────────────────────────  │
│  [Songwriting] [Publishing]         │
│  [Sync] [Genre] [Production]       │
│                                     │
│  Article List                       │
│  ─────────────────────────────────  │
│  □ [Article Title 1]                │
│  □ [Article Title 2]                │
│  □ [Article Title 3]                │
│                                     │
└─────────────────────────────────────┘
```

---

#### 4.3 Content Organization

**Topics (organized by context):**

1. **Songwriting**
   - "How to Use AI Lyric Generation"
   - "Song Structure Basics"
   - "Melody Writing Tips"
   - "Collaboration Best Practices"

2. **Publishing**
   - "Understanding Splits and Ownership"
   - "How to Create a Split Sheet"
   - "Co-Publishing Agreements Explained"
   - "Mechanical Royalties 101"

3. **Sync Licensing**
   - "What Is ISRC and Why It Matters"
   - "How to Generate a Cue Sheet"
   - "Sync Licensing for Independent Artists"
   - "Preparing Music for Sync Pitching"

4. **Genre**
   - "Genre DNA Explained"
   - "Optimizing Genre Metadata"
   - "Genre Trends and Playlisting"

5. **Production**
   - "Mastering for Streaming"
   - "Audio Quality Standards"
   - "Mixing Tips for Modern Music"

---

#### 4.4 Card Component Specification

**Article Card HTML:**
```html
<article class="learn-card">
  <img src="/blog/images/[article-slug].png" alt="[Article Title]">
  <h3>[Article Title]</h3>
  <p class="excerpt">[First 100 chars of article]...</p>
  <div class="metadata">
    <span class="topic">Topic Tag</span>
    <span class="reading-time">5 min read</span>
  </div>
  <a href="/blog/[article-slug].html" class="btn-read" target="_blank">
    Read Article →
  </a>
</article>
```

**Card Styling:**
- 300px width, responsive to 2-column on tablet, 1-column on mobile
- Subtle shadow on hover
- Image aspect ratio 16:9
- Title: 18px, weight 600
- Excerpt: 14px, gray color
- "Read Article" button opens in new tab (preserves app state)

---

#### 4.5 Contextual Recommendations

**Business Logic:**

When user is on specific app pages, show relevant Learn cards:

| App Page | Suggested Topics |
|----------|------------------|
| Write | Songwriting, Genre, Production |
| Editor | Songwriting, Production |
| Campaign | Publishing, Sync Licensing |
| Album | Publishing, Sync Licensing |
| Library | All topics (default) |

**Implementation:**
```javascript
const contextualLinks = {
  'pg-write': ['songwriting', 'production', 'genre'],
  'pg-editor': ['songwriting', 'production'],
  'pg-campaign': ['publishing', 'sync', 'songwriting'],
  'pg-album': ['publishing', 'sync'],
  'pg-library': ['songwriting', 'publishing', 'sync', 'genre', 'production']
};

function getSuggestedArticles(currentPage) {
  const topics = contextualLinks[currentPage];
  return articles.filter(a => topics.includes(a.topic)).slice(0, 3);
}
```

---

#### 4.6 Search & Filter

**Search Box:**
- Real-time filtering by article title, excerpt, and keywords
- Debounced search (300ms) to avoid lag
- Shows matching article count ("3 results found")

**Topic Filter Buttons:**
- Multi-select toggle buttons
- Visual indicator for active filters
- "Clear Filters" button

**Implementation:**
```javascript
function filterArticles(query, selectedTopics) {
  return articles.filter(article => {
    const matchesQuery = article.title.toLowerCase().includes(query.toLowerCase());
    const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(article.topic);
    return matchesQuery && matchesTopic;
  });
}
```

---

### Implementation Notes

**Data Source:**
- Create a JSON file `/public/learn-index.json` mapping all 16 blog articles to topics and reading time
- Include article slug, title, excerpt (first 100 chars), topic(s), image URL

**Example JSON Structure:**
```json
{
  "articles": [
    {
      "slug": "how-to-use-ai-lyric-generation",
      "title": "How to Use AI Lyric Generation",
      "excerpt": "AI lyric generation can be a powerful tool for songwriters...",
      "topics": ["songwriting"],
      "readingTime": 5,
      "imageUrl": "/blog/images/ai-lyric-generation.png"
    }
  ]
}
```

**Load & Cache:**
- Fetch learn-index.json on app init
- Cache in localStorage with 30-day TTL
- Update cache on app update

**Performance:**
- Lazy-load article images (native lazy loading)
- Debounce search queries (300ms)
- Limit visible results to 12 per page (pagination optional for MVP)

---

## Phase 5: Marketing/App Navigation Separation

### Objective
Unify visual branding across marketing pages while maintaining functional separation between public pages and the app.

### Navigation Architecture

#### 5.1 Marketing Pages Top Navigation

**Applies to:** `/landing.html`, `/features/*.html`, `/compare/*.html`, `/blog/*`

```html
<nav class="marketing-nav">
  <a href="/landing.html" class="logo">SONIQ</a>
  <ul class="nav-menu">
    <li><a href="/landing.html">Home</a></li>
    <li><a href="/features/">Features</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li><a href="/pricing.html">Pricing</a></li>
    <li><a href="/landing.html#signup" class="btn-primary">Try Free</a></li>
  </ul>
</nav>
```

**CSS (in marketing.css):**
```css
.marketing-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.marketing-nav .logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  text-decoration: none;
}

.marketing-nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.marketing-nav a {
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}

.marketing-nav a:hover {
  color: #0066cc;
}

.marketing-nav .btn-primary {
  background: #0066cc;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
}

/* Mobile */
@media (max-width: 768px) {
  .marketing-nav ul {
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

---

#### 5.2 App Sidebar Navigation

**Applies to:** `/index.html` (SPA app)

**Unchanged structure, but enhanced:**
- Keep existing sidebar design
- Add "Learn" item with appropriate icon
- Maintain current styling
- Ensure visual consistency with marketing pages (colors, typography)

---

#### 5.3 Shared Footer

**Applies to:** All public pages (landing, features, compare, blog, legal)

```html
<footer class="marketing-footer">
  <div class="footer-content">
    <div class="footer-column">
      <h4>Product</h4>
      <ul>
        <li><a href="/features/">Features</a></li>
        <li><a href="/pricing.html">Pricing</a></li>
        <li><a href="/compare/">Comparisons</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Learn</h4>
      <ul>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/blog/category/songwriting">Songwriting Guide</a></li>
        <li><a href="/blog/category/publishing">Publishing 101</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Company</h4>
      <ul>
        <li><a href="/about.html">About</a></li>
        <li><a href="/legal/privacy.html">Privacy</a></li>
        <li><a href="/legal/terms.html">Terms</a></li>
        <li><a href="mailto:support@mysoniq.com">Support</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Follow</h4>
      <ul>
        <li><a href="https://twitter.com/mysoniq" target="_blank">Twitter</a></li>
        <li><a href="https://instagram.com/mysoniq" target="_blank">Instagram</a></li>
        <li><a href="https://discord.gg/mysoniq" target="_blank">Discord</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 SONIQ. All rights reserved.</p>
  </div>
</footer>
```

**CSS:**
```css
.marketing-footer {
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  margin-top: 4rem;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.footer-column h4 {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column a {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-column a:hover {
  color: #0066cc;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

#### 5.4 Shared Typography & Variables

**Create `/public/css/variables.css`:**

```css
:root {
  /* Palette */
  --color-primary: #0066cc;
  --color-primary-dark: #0052a3;
  --color-primary-light: #e6f0ff;
  --color-text: #333;
  --color-text-light: #666;
  --color-border: #ddd;
  --color-bg: #f5f5f5;
  --color-bg-light: #fff;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Monaco", "Menlo", monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

**Import in all marketing pages:**
```html
<link rel="stylesheet" href="/css/variables.css">
<link rel="stylesheet" href="/css/marketing.css">
```

---

### Branding Consistency

**All public pages should:**
- Use the same color palette (variables.css)
- Load the same system font stack (no custom fonts unless critical)
- Use consistent heading hierarchy (H1=page topic, H2=sections)
- Apply consistent spacing (use CSS variables for margins/padding)
- Include marketing nav at top, footer at bottom
- Use the same button styling (.btn-primary, .btn-secondary)

**App pages should:**
- Load variables.css to ensure color consistency
- Maintain existing sidebar design (no top nav)
- Respect the same color palette in UI elements

---

## File Structure After Build

```
public/
├── index.html                          (app: main SPA)
├── landing.html                        (marketing: home page)
├── pricing.html                        (marketing: pricing)
├── about.html                          (marketing: about us)
├── robots.txt                          (NEW: SEO directives)
├── sitemap.xml                         (NEW: crawlable pages)
├── llms.txt                            (NEW: AI agent metadata)
│
├── blog/
│   ├── index.html                      (blog hub)
│   ├── blog.css                        (existing blog styles)
│   ├── [16 articles].html              (existing articles)
│
├── features/                           (NEW: feature pages)
│   ├── index.html                      (features listing page)
│   ├── genre-dna.html
│   ├── sync-licensing.html
│   ├── co-publishing.html
│   ├── ai-songwriting.html
│   └── campaign-mode.html
│
├── compare/                            (NEW: comparison pages)
│   ├── index.html                      (comparison listing)
│   ├── soniq-vs-suno.html
│   ├── soniq-vs-chatgpt-songwriting.html
│   └── ai-songwriting-tools.html
│
├── legal/
│   ├── privacy.html                    (existing)
│   ├── terms.html                      (existing)
│   └── copublishing.html               (existing)
│
├── css/
│   ├── variables.css                   (NEW: shared color/spacing)
│   ├── marketing.css                   (NEW: nav/footer/pages)
│   ├── blog.css                        (existing: blog styles)
│
├── images/
│   ├── features/                       (NEW: feature page images)
│   │   ├── genre-dna-hero.png
│   │   ├── sync-licensing-hero.png
│   │   └── [3 more]
│   ├── compare/                        (NEW: comparison images)
│   │   ├── soniq-vs-suno.png
│   │   └── [2 more]
│   └── [existing images]
│
├── js/
│   ├── app.js                          (existing: app logic)
│   ├── learn.js                        (NEW: Learn page functionality)
│   └── [existing scripts]
│
└── learn-index.json                    (NEW: Learn page article index)
```

---

## Technical Implementation Details

### Frontend Stack (Unchanged)
- **HTML5:** All pages are static HTML (no framework required)
- **CSS3:** Flexbox/Grid for layout, CSS variables for theming
- **JavaScript:** Vanilla JS for interactivity (Learn search/filter, sidebar, nav)
- **Analytics:** Existing GA4 integration applies to all pages
- **Fonts:** System fonts (no external font loads for performance)

### SEO Implementation
- **Meta tags:** All public pages include title, description, OG, Twitter tags
- **Schema markup:** SoftwareApplication on feature/compare pages
- **Sitemap:** Auto-generated from directory structure or manually maintained
- **Robots.txt:** Directs crawlers to public content, blocks app routes
- **Internal linking:** Feature pages → blog articles (topical clusters)

### Performance Targets
- **Page load:** Under 2 seconds on 4G (LightHouse target: 80+ Performance)
- **Image optimization:** WebP with fallbacks, lazy loading, <100KB per image
- **JS bundle:** Keep marketing pages <50KB (no framework overhead)
- **CSS:** Shared stylesheet (marketing.css) reused across all public pages

### Deployment & Updates
- **Platform:** Vercel (existing)
- **Auto-deploy:** On push to main branch
- **Cache invalidation:** Vercel automatically handles cache busting
- **Content updates:**
  - Blog articles: Update article HTML and re-generate sitemap
  - Feature pages: Edit HTML files directly
  - Learn section: Update learn-index.json and redeploy

### Analytics & Monitoring
- **Google Analytics 4:** Track page views, CTAs, conversions
- **Search Console:** Monitor indexing, search performance, sitemap submission
- **Core Web Vitals:** Monitor LCP, FID, CLS monthly
- **Goal tracking:**
  - Marketing pages → app sign-ups
  - Feature pages → feature adoption
  - Blog → time on page, scroll depth

---

## Implementation Roadmap

### Week 1: Foundation (Phase 1)
- Create robots.txt
- Create sitemap.xml
- Create llms.txt
- Deploy to production

### Week 2-3: Feature Pages (Phase 2)
- Build 5 feature page templates
- Write feature page copy and schema markup
- Create hero images and assets
- Link to existing blog articles
- A/B test CTA placement

### Week 4: Comparison Pages (Phase 3)
- Create comparison page template
- Write 3 comparison articles
- Build comparison tables
- Deploy and test

### Week 5: Learn Section (Phase 4)
- Create learn-index.json from blog articles
- Build Learn page UI (cards, search, filter)
- Implement contextual recommendations
- Integration testing in app
- User testing with 10-20 beta users

### Week 6: Branding & Polish (Phase 5)
- Create shared CSS variables
- Build shared marketing nav/footer
- Audit all public pages for consistency
- Mobile responsiveness QA
- Performance optimization (images, JS, CSS)

### Week 7: Launch & Monitor
- Final SEO audit
- Submit sitemap to Google Search Console
- Monitor indexing and traffic
- Track conversion metrics
- Iterate on underperforming pages

---

## Success Criteria

### SEO Metrics
- [ ] All public pages indexed in Google Search Console within 2 weeks
- [ ] Feature pages rank top 20 for target keywords within 8 weeks
- [ ] Blog articles maintain or improve rankings
- [ ] Zero crawl errors in Search Console

### Traffic & Engagement
- [ ] Organic traffic increases 30% within 3 months
- [ ] Feature pages drive 10% of sign-ups within 2 months
- [ ] Blog engagement improves (2+ min avg. time on page)
- [ ] Comparison pages get 500+ views/month by month 3

### User Experience
- [ ] In-app Learn section gets 20%+ engagement from new users
- [ ] 80%+ of CTAs convert (measure click-through rates)
- [ ] All pages load in under 2 seconds on 4G
- [ ] Mobile conversion rate matches desktop (or better)

### Conversion
- [ ] Free sign-ups increase 25% month-over-month
- [ ] Feature pages show 3-5% CTA conversion rate
- [ ] Comparison pages show 2-3% CTA conversion rate
- [ ] Creator retention improves (tracked via cohort analysis)

### Technical
- [ ] LightHouse score 80+ on all public pages
- [ ] Core Web Vitals: All pages pass (Green status)
- [ ] Mobile-first design: All pages responsive at 320px+
- [ ] Zero broken links across site

---

## Known Constraints & Risks

### Constraints
1. **No backend changes:** All pages are static HTML (no database queries)
2. **Existing blog structure:** 16 articles must be linked as-is (no restructuring)
3. **App is separate:** Internal routes at `/app/*` remain unindexed (by design)
4. **No custom fonts:** Stick to system fonts for performance
5. **No user personalization:** Contextual Learn suggestions are rule-based, not ML-driven

### Risks & Mitigation
| Risk | Mitigation |
|------|-----------|
| Blog articles outrank feature pages | Build topical clusters (blog → feature pages internal links) |
| Feature pages cannibalize each other | Use unique target keywords per page, avoid keyword overlap |
| Low comparison page traffic | Ensure they appear in Google News, update monthly for freshness |
| Learn section underused | A/B test placement (sidebar vs. top bar), measure engagement |
| Mobile traffic drops | Conduct mobile UX testing, optimize load times, use responsive images |
| SEO takes longer than expected | Start with high-volume keywords first (AI Songwriting, Sync Licensing) |

---

## Maintenance & Iteration

### Monthly Tasks
- Review Search Console for new keywords / errors
- Update comparison pages with latest competitor info
- Audit Learn section for outdated content
- Monitor Core Web Vitals and LightHouse scores

### Quarterly Tasks
- Analyze conversion funnel (traffic → sign-ups → activation)
- A/B test CTA copy and placement
- Refresh comparison pages (every 3-4 months)
- Review and update llms.txt

### Annual Tasks
- Comprehensive SEO audit
- Competitive analysis (feature pages vs. industry)
- Blog content calendar review
- Consider new feature/comparison pages based on keyword trends

---

## Appendix: Content Checklist

### Phase 1: Foundation
- [ ] robots.txt created and deployed
- [ ] sitemap.xml generated and submitted to GSC
- [ ] llms.txt created with accurate feature descriptions

### Phase 2: Feature Pages
- [ ] Genre DNA page written, designed, deployed
- [ ] Sync Licensing page written, designed, deployed
- [ ] Co-Publishing page written, designed, deployed
- [ ] AI Songwriting page written, designed, deployed
- [ ] Campaign Mode page written, designed, deployed
- [ ] All pages include schema markup
- [ ] All pages pass LightHouse audit
- [ ] All internal links to blog verified as working

### Phase 3: Comparison Pages
- [ ] SONIQ vs Suno page written and deployed
- [ ] SONIQ vs ChatGPT page written and deployed
- [ ] Best AI Songwriting Tools listicle written and deployed
- [ ] All tables and data accurate and up-to-date
- [ ] CTA buttons tested for conversion

### Phase 4: Learn Section
- [ ] learn-index.json created with all 16 articles
- [ ] Learn page UI built and styled
- [ ] Search functionality implemented and tested
- [ ] Topic filters implemented
- [ ] Contextual recommendations logic working
- [ ] Mobile responsive design verified
- [ ] Integrated into app sidebar

### Phase 5: Branding
- [ ] variables.css created with shared colors/spacing
- [ ] marketing.css created with nav/footer/shared styles
- [ ] All public pages updated to use shared CSS
- [ ] App loads variables.css for color consistency
- [ ] Footer appears on all marketing pages
- [ ] Marketing nav appears on all public pages
- [ ] Mobile nav tested and responsive

---

## Questions & Clarifications

**Q: Should the app homepage (landing.html) remain separate from index.html?**
A: Yes. Keep them separate: `/landing.html` is marketing, `/index.html` is the app. Users can navigate between them.

**Q: Do blog article titles need to change or be optimized?**
A: No. Keep existing titles and content as-is. Use internal links from feature pages to blog to boost ranking authority.

**Q: Should comparison pages mention product downsides?**
A: Yes, honestly. It increases trust and search ranking (Google prefers balanced content).

**Q: How frequently should sitemap.xml be updated?**
A: Every time you add/remove/rename a page. Include blog articles in the sitemap for completeness.

**Q: Is it worth adding a Features listing page (/features/index.html)?**
A: Yes. Create a simple listing page that links to all 5 feature pages. Good for UX and internal linking.

**Q: What about pagination on the Learn section?**
A: For MVP, show all 16 articles (fits one screen after scrolling). Add pagination if the list grows beyond 30 articles.

---

**Document End**

---

**Prepared by:** Product & Engineering
**Approved by:** [To be filled]
**Version:** 1.0 (April 5, 2026)
**Next Review:** July 5, 2026
