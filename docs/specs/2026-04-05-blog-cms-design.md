# SONIQ Content Manager — Blog CMS Design Spec

**Version:** 1.0
**Date:** 2026-04-05
**Status:** Implementation-Ready
**Author:** Design Team

## Executive Summary

This spec describes a blog content management system built into the existing SONIQ admin panel. The CMS allows the site owner to write, edit, and publish blog posts from within the app—functioning as a lightweight WordPress admin. The system maintains backward compatibility with 16 existing static blog posts while adding dynamic post creation, rich text editing, AI-assisted writing, and full SEO optimization.

---

## 1. Context & Current State

### 1.1 SONIQ Application
- **Location:** Single-page app at `/public/index.html` (~13,000+ lines)
- **Admin Panel:** Existing admin UI at `#pg-admin` inside index.html
- **Access:** Requires `S.isAdmin === true` for entry
- **Current Tabs:** Analytics (existing)

### 1.2 Existing Blog
- **Static Posts:** 16 existing blog posts at `/public/blog/*.html` (preserved as-is)
- **Blog Index:** Static file at `/public/blog/index.html` (will be enhanced)
- **Styling:** `/public/blog/blog.css` (reused for dynamic posts)

### 1.3 Infrastructure
- **Database:** Supabase project ID `gotrwbhkavkqmxtnxkkj`
- **Hosting:** Vercel deployment from GitHub repo `Alvindean/soniq`
- **Admin Emails:**
  - thealvindean@gmail.com
  - alvin@nuwavmedia.com

---

## 2. Architecture Overview

### 2.1 System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    SONIQ Admin Panel                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Tabs: Analytics | Content (NEW)                       │  │
│  │                                                        │  │
│  │ Content Tab:                                          │  │
│  │ ├─ Post List View                                    │  │
│  │ │  └─ Search, Filter, Stats                          │  │
│  │ └─ Post Editor View (overlay)                        │  │
│  │    ├─ Rich Text Editor (70%)                         │  │
│  │    └─ Metadata Sidebar (30%)                         │  │
│  │       ├─ SEO Fields                                  │  │
│  │       ├─ Publish Controls                            │  │
│  │       └─ AI Assist Buttons                           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Supabase     │ │ Vercel API   │ │ Static Files │
    │ blog_posts   │ │ Routes       │ │ /blog/*.html │
    │ Table (RLS)  │ │              │ │              │
    │              │ │ /api/blog/   │ │ /blog/index  │
    │ (Read/Write) │ │  [slug].js   │ │ Dynamic Load │
    │              │ │  list.js     │ │              │
    │              │ │  assist.js   │ │              │
    └──────────────┘ └──────────────┘ └──────────────┘
```

### 2.2 Data Flow

**Creating/Publishing a Post:**
1. Admin enters post in editor
2. Clicks "Save Draft" or "Publish"
3. JavaScript POST to Supabase via RLS-protected row
4. Post stored in `blog_posts` table
5. If published, accessible at `/blog/[slug]`

**Reading a Published Post:**
1. User visits `/blog/my-post-slug`
2. Vercel rewrite routes to `/api/blog/[slug].js`
3. API queries Supabase for published post
4. Returns full HTML page with post content, SEO tags, schema
5. Page matches blog.css styling

**Listing Posts:**
1. `/blog/index.html` loads static content
2. JavaScript snippet calls `/api/blog/list.js`
3. Fetches published posts from Supabase
4. Appends cards to grid alongside static posts

---

## 3. Supabase Table: blog_posts

### 3.1 Schema Definition

```sql
CREATE TABLE blog_posts (
  -- Core identifiers
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,

  -- Content
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT DEFAULT '',
  featured_image TEXT DEFAULT '',

  -- Publishing
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMPTZ,

  -- Metadata
  category TEXT DEFAULT 'cluster'
    CHECK (category IN ('pillar', 'cluster', 'tutorial', 'news')),
  tags TEXT[] DEFAULT '{}',

  -- Author
  author_name TEXT DEFAULT 'Alvin Dean',
  author_email TEXT DEFAULT 'thealvindean@gmail.com',

  -- SEO
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  schema_json JSONB DEFAULT '{}',

  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  views INTEGER DEFAULT 0
);
```

### 3.2 Row-Level Security (RLS)

```sql
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published" ON blog_posts
  FOR SELECT USING (
    status = 'published'
    AND published_at <= NOW()
  );

-- Admin can do everything
CREATE POLICY "Admin full access" ON blog_posts
  FOR ALL USING (
    auth.jwt() ->> 'email'
    IN ('thealvindean@gmail.com', 'alvin@nuwavmedia.com')
  );
```

### 3.3 Indexes

```sql
-- Slug lookups (for rendering)
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Status filtering (for admin list)
CREATE INDEX idx_blog_posts_status ON blog_posts(status);

-- Chronological queries (for homepage/archive)
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at DESC);
```

### 3.4 Auto-Update Trigger

```sql
-- Auto-update updated_at on any write
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 3.5 Data Considerations

- **HTML Content:** The `content` field stores raw HTML from the rich text editor (e.g., `<h2>Title</h2><p>Paragraph...</p>`). No markdown processing needed.
- **Slug Generation:** Admin enters title → JavaScript auto-generates kebab-cased slug (e.g., "My Great Post" → "my-great-post"). Admin can edit before saving.
- **Excerpt:** If left empty, auto-generated from first 150 characters of content on save.
- **Featured Image:** Expects full URL to external image (e.g., `https://cdn.example.com/image.jpg`). Admin pastes URL, sees preview.
- **Tags:** Stored as text array. UI accepts comma-separated input (e.g., "AI, Music, Production") and splits on insert.
- **Schema JSON:** Auto-generated by "Generate SEO" button. Example:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Post Title",
    "description": "Post excerpt",
    "author": {"@type": "Person", "name": "Alvin Dean"},
    "datePublished": "2026-04-05T00:00:00Z"
  }
  ```

---

## 4. Admin UI — Content Tab

### 4.1 Tab Navigation

Add a second tab to the admin panel (currently only "Analytics"):

```
┌────────────────────────────────────────────┐
│ [ Analytics ]  [ Content ]                 │
└────────────────────────────────────────────┘
```

Clicking "Content" switches view to post management.

### 4.2 Post List View (Default)

The primary view for managing all posts.

#### Top Bar
```
┌─────────────────────────────────────────────────────────────┐
│ [✍ New Post]  [Search posts...]   [All ▼] [Filter by date] │
└─────────────────────────────────────────────────────────────┘
```

- **"✍ New Post" Button:** Amber/gold color. Creates blank draft, opens editor.
- **Search Input:** Real-time filters post list by title/excerpt.
- **Status Filter Dropdown:** All / Draft / Published / Scheduled
- **Date Filter:** Optional, shows recent posts first (default sorted by `updated_at DESC`)

#### Stats Row
```
┌──────────┬────────────┬──────────┬───────────┐
│ 24 Posts │ 18 Live    │ 4 Draft  │ 2 Pending │
└──────────┴────────────┴──────────┴───────────┘
```

- Displays counts pulled from database query
- Updates when posts are saved/deleted

#### Post Table

| Title | Status | Category | Updated | Views | Edit | Delete |
|-------|--------|----------|---------|-------|------|--------|
| AI in Music Production | ✓ Published | Pillar | Mar 28 | 342 | [Edit] | [x] |
| Quick Chord Tips | Draft | Cluster | Apr 2 | - | [Edit] | [x] |

- **Title:** Clickable → opens editor
- **Status Badge:** `✓ Published` (green), `Draft` (gray), `⏱ Scheduled` (blue)
- **Category:** Pill badge (Pillar, Cluster, Tutorial, News)
- **Updated:** Human-readable date (e.g., "Apr 2, 3:45 PM")
- **Views:** Display count from `views` column (0 for drafts)
- **Edit Button:** Opens editor for post
- **Delete Button:** Confirms deletion, removes from table

#### Sorting & Pagination
- Default sort: `updated_at DESC` (newest first)
- Pagination: Show 20 posts per page, load more button

### 4.3 Post Editor View (Overlay)

Opens when creating or editing a post. Replaces the post list with a full editor.

#### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [← Back to Posts]                                                │
├────────────────────────────────┬─────────────────────────────────┤
│                                │                                 │
│  Rich Text Editor (70%)        │  Metadata Sidebar (30%)         │
│                                │                                 │
│  ┌──────────────────────────┐  │  ┌──────────────────────────┐  │
│  │ Formatting Toolbar       │  │  │ Title Input              │  │
│  │ B I H2 H3 " • • > ‾ ↔ ↶ │  │  │ [Post Title Here...]     │  │
│  ├──────────────────────────┤  │  │                          │  │
│  │                          │  │  │ Slug: post-title-here    │  │
│  │ [Rich text content       │  │  │                          │  │
│  │  with live WYSIWYG       │  │  │ Status: Published ▼      │  │
│  │  rendering matching      │  │  │                          │  │
│  │  blog.css]               │  │  │ Publish Date: Apr 5, 10am│  │
│  │                          │  │  │                          │  │
│  │                          │  │  │ Category: Pillar ▼       │  │
│  │                          │  │  │                          │  │
│  │                          │  │  │ Tags: [+] Add tag        │  │
│  │                          │  │  │ ai, music, production    │  │
│  │                          │  │  │                          │  │
│  │                          │  │  │ Featured Image URL       │  │
│  │                          │  │  │ [https://...]            │  │
│  │                          │  │  │ [Preview thumbnail]      │  │
│  │                          │  │  │                          │  │
│  │                          │  │  │ Excerpt (auto-filled)    │  │
│  │                          │  │  │ [First 150 chars...]     │  │
│  │                          │  │  │                          │  │
│  │                          │  │  │ Author: Alvin Dean       │  │
│  │                          │  │  │ Email: thealvindean...   │  │
│  └──────────────────────────┘  │  │                          │  │
│                                │  │ ┌──────────────────────┐ │  │
│                                │  │ │ ⚡ AI Assist Buttons │ │  │
│                                │  │ ├──────────────────────┤ │  │
│                                │  │ │ Generate Outline     │ │  │
│                                │  │ │ Write Section        │ │  │
│                                │  │ │ Suggest Headlines    │ │  │
│                                │  │ │ Generate SEO         │ │  │
│                                │  │ │ Improve Selection    │ │  │
│                                │  │ └──────────────────────┘ │  │
│                                │  │                          │  │
│                                │  │ [Save Draft] [Publish]   │  │
│                                │  └──────────────────────────┘  │
└────────────────────────────────┴─────────────────────────────────┘
```

#### Left Panel: Rich Text Editor (70%)

**Toolbar**

```
┌──────────────────────────────────────────┐
│ B  I  H2  H3  "  •  •  >  ‾  ↔  ↶  ↷    │
└──────────────────────────────────────────┘
```

- **B (Bold):** `Ctrl+B` or button → `execCommand('bold')`
- **I (Italic):** `Ctrl+I` → `execCommand('italic')`
- **H2:** Convert block to `<h2>`
- **H3:** Convert block to `<h3>`
- **" (Blockquote):** Wrap in `<blockquote>`
- **• (Unordered List):** `execCommand('insertUnorderedList')`
- **• (Ordered List):** `execCommand('insertOrderedList')`
- **> (Code Block):** Wrap selection in `<pre><code>`
- **‾ (Strikethrough):** Wrap in `<s>`
- **↔ (Link):** Prompt for URL, wrap in `<a href=...>`
- **↶ (Undo):** `execCommand('undo')`
- **↷ (Redo):** `execCommand('redo')`

**Content Area**

- Contenteditable `<div>` with `overflow-y: auto`
- Content auto-saved to memory (not Supabase) as user types
- Styled to match `/public/blog/blog.css` output
- Font-family, line-height, spacing mirrors published blog post appearance
- User sees WYSIWYG rendering in real-time
- Content stored internally as HTML string (e.g., `<h2>Title</h2><p>Paragraph</p>`)

#### Right Sidebar: Metadata & Controls (30%)

**Title Input**
- Accepts any text
- On blur: automatically generates slug
- Slug generation: lowercase, remove special chars, spaces → hyphens
- Example: "My Great Post!" → "my-great-post"

**Slug Input**
- Shows auto-generated slug
- Fully editable by admin
- Must be unique (validated on save)
- Validated as kebab-case on save

**Status Dropdown**
- Options: `Draft` / `Published` / `Scheduled`
- Default: `Draft`
- If `Scheduled`, show publish date picker below

**Publish Date Picker**
- Only visible if status is `Scheduled`
- Date + time selector
- Defaults to current date/time
- Post goes live at selected time

**Category Dropdown**
- Options: `Pillar` / `Cluster` / `Tutorial` / `News`
- Default: `Cluster`
- Stored in database

**Tags Input**
- Chip/token-style or comma-separated
- User types "AI, Music Production" → ["AI", "Music Production"]
- Display as removable pills
- Autocomplete from existing tags (optional)

**Featured Image URL**
- Text input for full image URL
- Below: small image preview (150px × 100px)
- If URL invalid, show placeholder

**Excerpt Textarea**
- 2-3 line textarea
- Optional: auto-filled from first 150 chars of content on save
- If left empty and no content → "[No excerpt]" placeholder
- Used in blog index cards and meta description fallback

**Author Fields**
- **Author Name:** Text input, defaults to "Alvin Dean"
- **Author Email:** Text input, defaults to "thealvindean@gmail.com"
- Both editable per-post

**AI Assist Section**

Five buttons that call `/api/content-assist.js`:

1. **Generate Outline**
   - Takes title + current content
   - Returns suggested H2/H3 outline (as JSON or bullet list)
   - User can insert into editor or ignore
   - Example response:
     ```
     - Introduction
       - What is generative AI?
       - Why it matters for music
     - Main Section 1: Creating Melodies
       - AI melody tools
       - Best practices
     - Main Section 2: Harmonizing
     - Conclusion & Next Steps
     ```

2. **Write Section**
   - Requires selection or cursor in editor
   - Takes selected heading + context
   - Generates 3-5 paragraph draft
   - User can insert, regenerate, or discard

3. **Suggest Headlines**
   - Takes current title
   - Returns 5 alternative headlines
   - User picks one or keeps original
   - Helps with SEO and engagement

4. **Generate SEO**
   - Auto-fills `meta_title`, `meta_description`, `og_image` (if not set)
   - Generates `schema_json` for BlogPosting
   - One-click optimization
   - User can edit results before saving

5. **Improve Selection**
   - Requires text selection
   - Rewrites selected text for clarity, tone, SEO
   - Returns alternative version
   - User can accept, regenerate, or keep original

All AI features are **optional** and gated by the same auth/API rate limits as SONIQ's existing song generation.

**Save Actions**

```
┌─────────────────────────────────┐
│ [Save Draft]  [Publish]         │
│              [Schedule] (if ≥2h) │
└─────────────────────────────────┘
```

- **Save Draft:** Saves post with `status='draft'`, no `published_at` set. Post is not visible publicly.
- **Publish:** Saves with `status='published'`, sets `published_at=NOW()`. Post goes live immediately.
- **Schedule:** Saves with `status='scheduled'`, sets `published_at` to selected date. Goes live at that time.

All actions POST to Supabase, validated by RLS policies.

---

## 5. API Routes

### 5.1 `/api/blog/[slug].js` — Dynamic Post Renderer

Vercel serverless function. Returns full HTML page for published posts.

**Request:**
```
GET /api/blog/my-post-slug
```

**Behavior:**
1. Query Supabase for post with matching slug, `status='published'`, `published_at <= NOW()`
2. If found:
   - Increment `views` counter
   - Render full HTML page (see below)
   - Set `Content-Type: text/html`
   - Return 200
3. If not found:
   - Return 404 (Vercel then tries static `/blog/my-post-slug.html`)

**Implementation:**

```javascript
// /api/blog/[slug].js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { slug } = req.query;

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .single();

  if (error || !post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Increment views (async, don't wait)
  supabase.from('blog_posts')
    .update({ views: post.views + 1 })
    .eq('id', post.id)
    .catch(() => {});

  // Render HTML
  const html = renderBlogPost(post);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}

function renderBlogPost(post) {
  const pubDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tagsHtml = post.tags && post.tags.length
    ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.meta_title || post.title} — SONIQ Blog</title>
  <meta name="description" content="${escapeHtml(post.meta_description || post.excerpt)}" />
  <link rel="canonical" href="https://www.mysoniq.com/blog/${post.slug}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(post.meta_title || post.title)}" />
  <meta property="og:description" content="${escapeHtml(post.meta_description || post.excerpt)}" />
  <meta property="og:url" content="https://www.mysoniq.com/blog/${post.slug}" />
  <meta property="og:image" content="${post.og_image || post.featured_image || 'https://www.mysoniq.com/og-image.png'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  ${post.schema_json && Object.keys(post.schema_json).length > 0 ? `<script type="application/ld+json">${JSON.stringify(post.schema_json)}</script>` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog/blog.css" />
</head>
<body>
  <nav class="site-nav">
    <a href="/" class="site-logo">◈ SONIQ</a>
    <div class="site-nav-links">
      <a href="/">Home</a>
      <a href="/blog" style="color:var(--text)">Blog</a>
      <a href="/#pricing">Pricing</a>
      <a href="/?ref=blog" class="nav-cta">Try Free →</a>
    </div>
  </nav>
  <article class="blog-article">
    <header class="article-hero">
      ${post.featured_image ? `<img src="${post.featured_image}" alt="${escapeHtml(post.title)}" class="article-hero-img" />` : ''}
      <div class="article-category">${post.category.toUpperCase()}</div>
      <h1>${escapeHtml(post.title)}</h1>
      <div class="article-meta">
        <span>${escapeHtml(post.author_name)}</span> ·
        <time>${pubDate}</time>
        ${tagsHtml ? ` · ${tagsHtml}` : ''}
      </div>
    </header>
    <div class="article-body">${post.content}</div>
  </article>
  <footer class="site-footer">
    <div class="footer-inner">
      <a href="/">◈ SONIQ</a> · <a href="/blog">Blog</a> · <a href="/legal/privacy.html">Privacy</a> · <a href="/legal/terms.html">Terms</a>
      <div style="margin-top:8px;font-size:12px;color:var(--text-dim)">© ${new Date().getFullYear()} Nu Wav Media LLC</div>
    </div>
  </footer>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}
```

**Response Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>AI in Music Production — SONIQ Blog</title>
  ...
</head>
<body>
  <nav>...</nav>
  <article class="blog-article">
    <header>
      <img src="..." alt="AI in Music Production" />
      <div class="article-category">PILLAR</div>
      <h1>AI in Music Production</h1>
      <div class="article-meta">Alvin Dean · April 5, 2026 · AI, Music, Production</div>
    </header>
    <div class="article-body">
      <h2>Introduction</h2>
      <p>Generative AI is transforming...</p>
      ...
    </div>
  </article>
  <footer>...</footer>
</body>
</html>
```

**Notes:**
- Content is rendered as-is (no Markdown conversion)
- HTML sanitization: Use `.textContent` in editor and re-escape on render, or use a library like `DOMPurify` if concerned about XSS
- Image URLs are trusted (admin input)
- Schema JSON included verbatim from database

### 5.2 `/api/blog/list.js` — Published Posts List

Returns JSON list of published posts. Called by blog index to load dynamic posts.

**Request:**
```
GET /api/blog/list?limit=10&offset=0
```

**Response:**
```json
{
  "posts": [
    {
      "id": "uuid-1",
      "title": "AI in Music Production",
      "slug": "ai-music-production",
      "excerpt": "Generative AI is transforming...",
      "featured_image": "https://...",
      "category": "pillar",
      "author_name": "Alvin Dean",
      "published_at": "2026-04-05T10:00:00Z",
      "views": 342
    }
  ],
  "total": 24,
  "limit": 10,
  "offset": 0
}
```

**Implementation:**

```javascript
// /api/blog/list.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const offset = parseInt(req.query.offset) || 0;

  const { data: posts, error, count } = await supabase
    .from('blog_posts')
    .select(
      'id, title, slug, excerpt, featured_image, category, author_name, published_at, views',
      { count: 'exact' }
    )
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({
    posts: posts || [],
    total: count || 0,
    limit,
    offset
  });
}
```

**Used by:** `/public/blog/index.html` JavaScript to populate grid.

### 5.3 `/api/content-assist.js` — AI Writing Assistant

Handles all AI-assisted writing features. Calls OpenAI or Anthropic (whichever SONIQ uses for song generation).

**Request:**
```json
POST /api/content-assist
Content-Type: application/json

{
  "action": "outline" | "write" | "headlines" | "seo" | "improve",
  "context": "My Great Post Title",
  "selection": "Optional selected text for rewrite",
  "fullContent": "Optional current post content"
}
```

**Response Examples:**

**Action: outline**
```json
{
  "success": true,
  "result": [
    "Introduction: Set the stage",
    "  - Why this topic matters",
    "Section 1: Key Concepts",
    "  - Definition",
    "  - Historical context",
    "Section 2: Best Practices",
    "  - Tip 1",
    "  - Tip 2",
    "Conclusion: Takeaways"
  ]
}
```

**Action: headlines**
```json
{
  "success": true,
  "result": [
    "AI Is Reshaping Music Production: Here's Why",
    "5 Ways Generative AI Changes How We Make Music",
    "The Complete Guide to AI Music Tools in 2026",
    "AI + Human Creativity: A New Era in Music",
    "Stop Using AI Wrong: A Musician's Playbook"
  ]
}
```

**Action: seo**
```json
{
  "success": true,
  "result": {
    "meta_title": "AI Music Production: Tools, Techniques & Best Practices 2026",
    "meta_description": "Learn how to use generative AI effectively in music production. Explore top tools, workflows, and creative strategies for producers.",
    "schema": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "AI in Music Production",
      "description": "Learn how to use generative AI...",
      "author": {
        "@type": "Person",
        "name": "Alvin Dean"
      },
      "datePublished": "2026-04-05",
      "wordCount": 2400
    }
  }
}
```

**Action: improve**
```json
{
  "success": true,
  "result": "Generative AI is fundamentally transforming music production, offering creators unprecedented tools to experiment with melody, harmony, and arrangement."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Rate limit exceeded. Try again in 1 minute."
}
```

**Implementation Notes:**
- Reuse SONIQ's existing API key and request wrapper (`safeFetch()`)
- Rate limit: 10 requests per admin per hour (track in memory or Redis)
- Timeout: 30 seconds max
- Fallback: If API down, show "Unable to generate. Try again later."
- All responses are **suggestions** — admin must review before publishing

---

## 6. Client-Side Integration

### 6.1 Modifications to `/public/index.html`

**Add Tab Button:**
```html
<div class="admin-tabs">
  <button class="admin-tab active" data-tab="analytics">Analytics</button>
  <button class="admin-tab" data-tab="content">Content</button>
</div>

<div id="pg-analytics" class="admin-tab-content active">
  <!-- Existing analytics content -->
</div>

<div id="pg-content" class="admin-tab-content" style="display:none;">
  <!-- CMS UI here -->
</div>
```

**Tab Switching JavaScript:**
```javascript
document.querySelectorAll('.admin-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');
    btn.classList.add('active');
    document.getElementById(`pg-${tab}`).style.display = 'block';
  });
});
```

**CMS UI Structure:**
```html
<div id="pg-content" class="admin-tab-content">
  <!-- Post List View (default) -->
  <div id="cms-list-view">
    <div class="cms-header">
      <button id="cms-new-post-btn" class="btn btn-amber">✍ New Post</button>
      <input type="text" id="cms-search" placeholder="Search posts..." />
      <select id="cms-status-filter">
        <option value="">All</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="scheduled">Scheduled</option>
      </select>
    </div>

    <div class="cms-stats">
      <span id="cms-stat-total">0 Posts</span>
      <span id="cms-stat-live">0 Live</span>
      <span id="cms-stat-draft">0 Drafts</span>
      <span id="cms-stat-scheduled">0 Scheduled</span>
    </div>

    <table id="cms-posts-table" class="cms-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Category</th>
          <th>Updated</th>
          <th>Views</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="cms-posts-tbody">
        <!-- Populated by JavaScript -->
      </tbody>
    </table>
  </div>

  <!-- Post Editor View (hidden initially) -->
  <div id="cms-editor-view" style="display:none;">
    <button id="cms-back-btn">← Back to Posts</button>

    <div class="cms-editor-layout">
      <!-- Left: Rich Text Editor -->
      <div class="cms-editor-main">
        <div class="editor-toolbar">
          <button data-cmd="bold" title="Bold (Ctrl+B)">B</button>
          <button data-cmd="italic" title="Italic (Ctrl+I)">I</button>
          <button data-cmd="h2" title="Heading 2">H2</button>
          <button data-cmd="h3" title="Heading 3">H3</button>
          <button data-cmd="blockquote">"</button>
          <button data-cmd="insertUnorderedList">•</button>
          <button data-cmd="insertOrderedList">→</button>
          <button data-cmd="code">‾</button>
          <button data-cmd="link">↔</button>
          <button data-cmd="undo">↶</button>
          <button data-cmd="redo">↷</button>
        </div>
        <div id="cms-editor-content" contenteditable="true" class="editor-content"></div>
      </div>

      <!-- Right: Metadata Sidebar -->
      <div class="cms-editor-sidebar">
        <input type="text" id="cms-title" placeholder="Post Title" />

        <div class="form-group">
          <label>Slug</label>
          <input type="text" id="cms-slug" placeholder="post-slug" />
        </div>

        <div class="form-group">
          <label>Status</label>
          <select id="cms-status">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div class="form-group" id="cms-date-picker" style="display:none;">
          <label>Publish Date</label>
          <input type="datetime-local" id="cms-publish-date" />
        </div>

        <div class="form-group">
          <label>Category</label>
          <select id="cms-category">
            <option value="pillar">Pillar</option>
            <option value="cluster">Cluster</option>
            <option value="tutorial">Tutorial</option>
            <option value="news">News</option>
          </select>
        </div>

        <div class="form-group">
          <label>Tags</label>
          <input type="text" id="cms-tags" placeholder="ai, music, production" />
        </div>

        <div class="form-group">
          <label>Featured Image URL</label>
          <input type="text" id="cms-featured-image" placeholder="https://..." />
          <img id="cms-featured-preview" class="image-preview" />
        </div>

        <div class="form-group">
          <label>Excerpt</label>
          <textarea id="cms-excerpt" rows="3" placeholder="Summary of post..."></textarea>
        </div>

        <div class="form-group">
          <label>Author</label>
          <input type="text" id="cms-author-name" placeholder="Author Name" />
          <input type="email" id="cms-author-email" placeholder="author@example.com" />
        </div>

        <div class="cms-ai-assist">
          <h4>⚡ AI Assist</h4>
          <button id="cms-ai-outline" class="btn btn-sm">Generate Outline</button>
          <button id="cms-ai-write" class="btn btn-sm">Write Section</button>
          <button id="cms-ai-headlines" class="btn btn-sm">Suggest Headlines</button>
          <button id="cms-ai-seo" class="btn btn-sm">Generate SEO</button>
          <button id="cms-ai-improve" class="btn btn-sm">Improve Selection</button>
        </div>

        <div class="cms-save-actions">
          <button id="cms-save-draft" class="btn btn-primary">Save Draft</button>
          <button id="cms-publish" class="btn btn-success">Publish</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 6.2 JavaScript Implementation (Core CMS Logic)

**Post List Management:**
```javascript
// Initialize CMS
const CMS = {
  currentPost: null, // { id, title, content, ... }
  allPosts: [], // Cache from Supabase

  async init() {
    // Load posts on tab switch
    document.querySelector('[data-tab="content"]').addEventListener('click', () => {
      this.loadPostList();
    });

    // New post button
    document.getElementById('cms-new-post-btn').addEventListener('click', () => {
      this.editPost(null); // null = new post
    });

    // Back button
    document.getElementById('cms-back-btn').addEventListener('click', () => {
      this.showListView();
    });

    // Search & filter
    document.getElementById('cms-search').addEventListener('input', (e) => {
      this.filterPostList(e.target.value, document.getElementById('cms-status-filter').value);
    });

    document.getElementById('cms-status-filter').addEventListener('change', (e) => {
      this.filterPostList(document.getElementById('cms-search').value, e.target.value);
    });

    // Status change shows/hides date picker
    document.getElementById('cms-status').addEventListener('change', (e) => {
      const datePicker = document.getElementById('cms-date-picker');
      datePicker.style.display = e.target.value === 'scheduled' ? 'block' : 'none';
    });

    // Rich text toolbar
    document.querySelectorAll('.editor-toolbar button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.execEditorCommand(btn.dataset.cmd);
      });
    });

    // AI buttons
    document.getElementById('cms-ai-outline').addEventListener('click', () => this.aiAssist('outline'));
    document.getElementById('cms-ai-write').addEventListener('click', () => this.aiAssist('write'));
    document.getElementById('cms-ai-headlines').addEventListener('click', () => this.aiAssist('headlines'));
    document.getElementById('cms-ai-seo').addEventListener('click', () => this.aiAssist('seo'));
    document.getElementById('cms-ai-improve').addEventListener('click', () => this.aiAssist('improve'));

    // Save buttons
    document.getElementById('cms-save-draft').addEventListener('click', () => this.savePost('draft'));
    document.getElementById('cms-publish').addEventListener('click', () => this.savePost('published'));

    // Slug generation on title blur
    document.getElementById('cms-title').addEventListener('blur', () => {
      const title = document.getElementById('cms-title').value;
      const slug = this.generateSlug(title);
      document.getElementById('cms-slug').value = slug;
    });

    // Featured image preview
    document.getElementById('cms-featured-image').addEventListener('change', () => {
      const url = document.getElementById('cms-featured-image').value;
      const img = document.getElementById('cms-featured-preview');
      img.src = url;
      img.style.display = url ? 'block' : 'none';
    });
  },

  async loadPostList() {
    // Fetch from Supabase
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      alert('Error loading posts: ' + error.message);
      return;
    }

    this.allPosts = posts || [];
    this.renderPostList();
    this.updateStats();
  },

  renderPostList() {
    const tbody = document.getElementById('cms-posts-tbody');
    tbody.innerHTML = '';

    this.allPosts.forEach(post => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="cursor-pointer" onclick="CMS.editPost('${post.id}')">${post.title}</td>
        <td><span class="badge badge-${post.status}">${this.statusLabel(post.status)}</span></td>
        <td>${post.category || 'cluster'}</td>
        <td>${new Date(post.updated_at).toLocaleDateString()}</td>
        <td>${post.status === 'published' ? post.views || 0 : '—'}</td>
        <td>
          <button class="btn btn-sm" onclick="CMS.editPost('${post.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="CMS.deletePost('${post.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  },

  filterPostList(searchTerm, statusFilter) {
    const filtered = this.allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const tbody = document.getElementById('cms-posts-tbody');
    tbody.innerHTML = '';
    filtered.forEach(post => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td onclick="CMS.editPost('${post.id}')">${post.title}</td>
        <td><span class="badge badge-${post.status}">${this.statusLabel(post.status)}</span></td>
        <td>${post.category || 'cluster'}</td>
        <td>${new Date(post.updated_at).toLocaleDateString()}</td>
        <td>${post.status === 'published' ? post.views || 0 : '—'}</td>
        <td>
          <button class="btn btn-sm" onclick="CMS.editPost('${post.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="CMS.deletePost('${post.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  },

  updateStats() {
    const published = this.allPosts.filter(p => p.status === 'published').length;
    const draft = this.allPosts.filter(p => p.status === 'draft').length;
    const scheduled = this.allPosts.filter(p => p.status === 'scheduled').length;

    document.getElementById('cms-stat-total').textContent = `${this.allPosts.length} Posts`;
    document.getElementById('cms-stat-live').textContent = `${published} Live`;
    document.getElementById('cms-stat-draft').textContent = `${draft} Drafts`;
    document.getElementById('cms-stat-scheduled').textContent = `${scheduled} Scheduled`;
  },

  async editPost(postId) {
    if (postId) {
      // Load existing post
      const post = this.allPosts.find(p => p.id === postId);
      this.currentPost = post;

      // Populate fields
      document.getElementById('cms-title').value = post.title || '';
      document.getElementById('cms-slug').value = post.slug || '';
      document.getElementById('cms-editor-content').innerHTML = post.content || '';
      document.getElementById('cms-status').value = post.status || 'draft';
      document.getElementById('cms-category').value = post.category || 'cluster';
      document.getElementById('cms-tags').value = (post.tags || []).join(', ');
      document.getElementById('cms-featured-image').value = post.featured_image || '';
      document.getElementById('cms-excerpt').value = post.excerpt || '';
      document.getElementById('cms-author-name').value = post.author_name || 'Alvin Dean';
      document.getElementById('cms-author-email').value = post.author_email || 'thealvindean@gmail.com';

      if (post.featured_image) {
        document.getElementById('cms-featured-preview').src = post.featured_image;
        document.getElementById('cms-featured-preview').style.display = 'block';
      }

      // Show/hide date picker
      const datePicker = document.getElementById('cms-date-picker');
      if (post.status === 'scheduled') {
        datePicker.style.display = 'block';
        document.getElementById('cms-publish-date').value = new Date(post.published_at).toISOString().slice(0, 16);
      } else {
        datePicker.style.display = 'none';
      }
    } else {
      // New post
      this.currentPost = {
        id: null,
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        category: 'cluster',
        tags: [],
        featured_image: '',
        excerpt: '',
        author_name: 'Alvin Dean',
        author_email: 'thealvindean@gmail.com'
      };

      // Clear fields
      document.getElementById('cms-title').value = '';
      document.getElementById('cms-slug').value = '';
      document.getElementById('cms-editor-content').innerHTML = '';
      document.getElementById('cms-status').value = 'draft';
      document.getElementById('cms-category').value = 'cluster';
      document.getElementById('cms-tags').value = '';
      document.getElementById('cms-featured-image').value = '';
      document.getElementById('cms-excerpt').value = '';
      document.getElementById('cms-author-name').value = 'Alvin Dean';
      document.getElementById('cms-author-email').value = 'thealvindean@gmail.com';
      document.getElementById('cms-date-picker').style.display = 'none';
    }

    this.showEditorView();
  },

  showListView() {
    document.getElementById('cms-list-view').style.display = 'block';
    document.getElementById('cms-editor-view').style.display = 'none';
  },

  showEditorView() {
    document.getElementById('cms-list-view').style.display = 'none';
    document.getElementById('cms-editor-view').style.display = 'block';
  },

  generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  execEditorCommand(cmd) {
    const editor = document.getElementById('cms-editor-content');
    editor.focus();

    if (cmd === 'h2') {
      document.execCommand('formatBlock', false, '<h2>');
    } else if (cmd === 'h3') {
      document.execCommand('formatBlock', false, '<h3>');
    } else if (cmd === 'blockquote') {
      document.execCommand('formatBlock', false, '<blockquote>');
    } else if (cmd === 'code') {
      const selection = window.getSelection().toString();
      if (selection) {
        document.execCommand('insertHTML', false, `<code>${selection}</code>`);
      }
    } else if (cmd === 'link') {
      const url = prompt('Enter URL:');
      if (url) {
        document.execCommand('createLink', false, url);
      }
    } else {
      document.execCommand(cmd);
    }
  },

  async savePost(status) {
    const post = {
      title: document.getElementById('cms-title').value,
      slug: document.getElementById('cms-slug').value,
      content: document.getElementById('cms-editor-content').innerHTML,
      status: status,
      category: document.getElementById('cms-category').value,
      tags: document.getElementById('cms-tags').value.split(',').map(t => t.trim()).filter(Boolean),
      featured_image: document.getElementById('cms-featured-image').value,
      excerpt: document.getElementById('cms-excerpt').value || this.autoExcerpt(document.getElementById('cms-editor-content').textContent),
      author_name: document.getElementById('cms-author-name').value,
      author_email: document.getElementById('cms-author-email').value,
      published_at: status === 'scheduled' ? document.getElementById('cms-publish-date').value : (status === 'published' ? new Date().toISOString() : null)
    };

    // Validation
    if (!post.title) {
      alert('Title is required');
      return;
    }
    if (!post.slug) {
      alert('Slug is required');
      return;
    }
    if (!post.content) {
      alert('Content is required');
      return;
    }

    try {
      if (this.currentPost.id) {
        // Update
        const { error } = await supabase
          .from('blog_posts')
          .update(post)
          .eq('id', this.currentPost.id);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('blog_posts')
          .insert([post]);

        if (error) throw error;
      }

      alert(`Post ${status === 'published' ? 'published' : status === 'scheduled' ? 'scheduled' : 'saved as draft'}!`);
      this.loadPostList();
      this.showListView();
    } catch (error) {
      alert('Error saving post: ' + error.message);
    }
  },

  autoExcerpt(text) {
    return text.substring(0, 150).trim() + '...';
  },

  async deletePost(postId) {
    if (!confirm('Delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      alert('Post deleted');
      this.loadPostList();
    } catch (error) {
      alert('Error deleting post: ' + error.message);
    }
  },

  async aiAssist(action) {
    const title = document.getElementById('cms-title').value;
    const content = document.getElementById('cms-editor-content').innerHTML;
    const selection = window.getSelection().toString();

    try {
      const response = await safeFetch('/api/content-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          context: title,
          selection,
          fullContent: content
        })
      });

      const result = await response.json();

      if (!result.success) {
        alert('AI Error: ' + result.error);
        return;
      }

      this.handleAIResult(action, result.result);
    } catch (error) {
      alert('AI request failed: ' + error.message);
    }
  },

  handleAIResult(action, result) {
    const editor = document.getElementById('cms-editor-content');

    if (action === 'outline') {
      alert('Outline generated:\n\n' + result.join('\n') + '\n\nCopy this and paste into your post.');
    } else if (action === 'write') {
      if (window.getSelection().toString()) {
        document.execCommand('insertHTML', false, result);
      } else {
        editor.innerHTML += `<p>${result}</p>`;
      }
    } else if (action === 'headlines') {
      const chosen = result.join('\n');
      alert('Suggested headlines:\n\n' + chosen + '\n\nPaste one into the Title field above.');
    } else if (action === 'seo') {
      document.getElementById('cms-title').value = result.meta_title;
      document.getElementById('cms-excerpt').value = result.meta_description;
      this.currentPost.schema_json = result.schema;
      alert('SEO fields auto-filled!');
    } else if (action === 'improve') {
      if (window.getSelection().toString()) {
        document.execCommand('insertHTML', false, result);
      } else {
        alert('Selected text:\n\n' + result);
      }
    }
  },

  statusLabel(status) {
    return status === 'published' ? '✓ Published' : status === 'scheduled' ? '⏱ Scheduled' : 'Draft';
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (S.isAdmin) {
    CMS.init();
  }
});
```

### 6.3 Styling (CSS)

Add to a style block in `/public/index.html` or link external stylesheet:

```css
/* CMS Tab System */
.admin-tabs {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}

.admin-tab {
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dim);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.admin-tab.active {
  color: var(--text);
  border-bottom-color: var(--amber);
}

.admin-tab-content {
  display: none;
}

.admin-tab-content.active {
  display: block;
}

/* CMS List View */
.cms-header {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.cms-header button,
.cms-header input,
.cms-header select {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
}

.cms-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--text-dim);
}

.cms-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.cms-table th {
  padding: 12px;
  text-align: left;
  background: var(--bg-secondary);
  font-weight: 600;
  border-bottom: 2px solid var(--border);
}

.cms-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.cms-table tr:hover {
  background: var(--bg-secondary);
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.badge-published {
  background: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
}

.badge-draft {
  background: rgba(107, 114, 128, 0.2);
  color: rgb(107, 114, 128);
}

.badge-scheduled {
  background: rgba(59, 130, 246, 0.2);
  color: rgb(59, 130, 246);
}

.cursor-pointer {
  cursor: pointer;
  color: var(--amber);
  text-decoration: underline;
}

/* CMS Editor */
.cms-editor-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  height: calc(100vh - 200px);
}

.cms-editor-main {
  display: flex;
  flex-direction: column;
}

.editor-toolbar {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px 6px 0 0;
}

.editor-toolbar button {
  padding: 8px 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.editor-toolbar button:hover {
  background: var(--text);
  color: var(--bg);
}

.editor-content {
  flex: 1;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 0 0 6px 6px;
  overflow-y: auto;
  background: white;
  color: var(--text);
  line-height: 1.6;
  font-family: var(--font-serif);
}

.editor-content h2 {
  font-size: 24px;
  margin: 20px 0 12px 0;
  font-weight: 700;
}

.editor-content h3 {
  font-size: 18px;
  margin: 16px 0 8px 0;
  font-weight: 600;
}

.editor-content p {
  margin: 12px 0;
}

.editor-content blockquote {
  padding-left: 16px;
  border-left: 3px solid var(--amber);
  margin: 12px 0;
  color: var(--text-dim);
}

.editor-content code {
  background: var(--bg-secondary);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.editor-content pre {
  background: var(--bg-secondary);
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}

.editor-content a {
  color: var(--amber);
  text-decoration: underline;
}

/* Sidebar */
.cms-editor-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.cms-editor-sidebar input,
.cms-editor-sidebar select,
.cms-editor-sidebar textarea {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  font-family: inherit;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.image-preview {
  max-width: 100%;
  max-height: 120px;
  border-radius: 4px;
  display: none;
}

.cms-ai-assist {
  padding: 12px;
  background: rgba(120, 113, 255, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(120, 113, 255, 0.3);
}

.cms-ai-assist h4 {
  margin: 0 0 12px 0;
  font-size: 13px;
}

.cms-ai-assist button {
  width: 100%;
  padding: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.cms-save-actions {
  display: flex;
  gap: 12px;
}

.cms-save-actions button {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
}

/* Button Variants */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-amber {
  background: var(--amber);
  color: var(--bg);
}

.btn-amber:hover {
  opacity: 0.9;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-success {
  background: rgb(34, 197, 94);
  color: white;
}

.btn-danger {
  background: rgba(239, 68, 68, 0.2);
  color: rgb(239, 68, 68);
  border: 1px solid rgb(239, 68, 68);
}

.btn-sm {
  padding: 6px 10px;
  font-size: 12px;
}
```

---

## 7. Blog Index Updates

### 7.1 Modifications to `/public/blog/index.html`

Add this JavaScript snippet at the bottom of the file, before closing `</body>`:

```html
<script>
async function loadDynamicPosts() {
  try {
    const response = await fetch('/api/blog/list?limit=20');
    if (!response.ok) return;

    const data = await response.json();
    const grid = document.querySelector('.blog-grid') || document.querySelector('.cluster-section .grid');

    if (!grid) return;

    data.posts.forEach(post => {
      const card = document.createElement('a');
      card.href = `/blog/${post.slug}`;
      card.className = 'blog-card';
      card.innerHTML = `
        <div class="blog-card-title">${post.title}</div>
        <div class="blog-card-excerpt">${post.excerpt}</div>
        <div class="blog-card-meta">${post.category.toUpperCase()} · ${new Date(post.published_at).toLocaleDateString()}</div>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading dynamic posts:', error);
  }
}

// Load dynamic posts on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDynamicPosts);
} else {
  loadDynamicPosts();
}
</script>
```

**How it works:**
1. Fetches `/api/blog/list` on page load
2. Appends new posts to existing blog grid
3. Uses same `.blog-card` CSS classes as static posts
4. Posts sorted by `published_at DESC` (newest first)

---

## 8. Vercel Configuration

### 8.1 Update or Create `/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/blog/:slug",
      "destination": "/api/blog/:slug.js"
    }
  ],
  "headers": [
    {
      "source": "/blog/:slug",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=3600, stale-while-revalidate=86400"
        }
      ]
    }
  ]
}
```

**Explanation:**
- **Rewrites:** When user visits `/blog/my-post`, Vercel internally calls `/api/blog/[slug].js`
- **Headers:** Cache pages for 1 hour on CDN, serve stale version for 24 hours if API is down
- **Hybrid approach:** API returns 404 → Vercel tries static file at `/blog/my-post.html` (existing 16 posts continue working)

---

## 9. Environment Variables

### 9.1 Vercel Secrets (set via Vercel dashboard)

```
SUPABASE_URL=https://gotrwbhkavkqmxtnxkkj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-... (or use existing SONIQ API key)
```

These are accessed in API routes via `process.env.VARIABLE_NAME`.

---

## 10. Implementation Checklist

### Phase 1: Backend Setup
- [ ] Create Supabase table `blog_posts` with schema & RLS policies
- [ ] Create indexes on slug, status, published_at
- [ ] Set up auto-update trigger for `updated_at`
- [ ] Test RLS policies (public read published, admin write all)

### Phase 2: API Routes
- [ ] Create `/api/blog/[slug].js` — post renderer
- [ ] Create `/api/blog/list.js` — published posts list
- [ ] Create `/api/content-assist.js` — AI writing helper
- [ ] Test all routes manually with curl or Postman
- [ ] Add error handling and logging

### Phase 3: Admin UI
- [ ] Add "Content" tab to admin panel in `/public/index.html`
- [ ] Build post list view (table, search, filter, stats)
- [ ] Build post editor view (rich text, sidebar)
- [ ] Implement rich text toolbar (bold, italic, headings, etc.)
- [ ] Connect all buttons to CMS JavaScript logic
- [ ] Add CSS for tab layout, editor, sidebar

### Phase 4: Client-Side Logic
- [ ] Implement CMS.loadPostList() — fetch & render
- [ ] Implement CMS.editPost() — load/create posts
- [ ] Implement CMS.savePost() — write to Supabase
- [ ] Implement CMS.deletePost() — delete posts
- [ ] Implement slug generation on title blur
- [ ] Add toolbar execCommand handlers
- [ ] Connect AI assist buttons to `/api/content-assist.js`

### Phase 5: Blog Index
- [ ] Add dynamic post loading script to `/blog/index.html`
- [ ] Test that static + dynamic posts both appear
- [ ] Verify card styling matches existing posts

### Phase 6: Vercel Deployment
- [ ] Create `/vercel.json` with rewrite rules
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy to production
- [ ] Test existing static posts still work
- [ ] Create new post in CMS, publish, verify it appears

### Phase 7: Testing & Polish
- [ ] Test admin auth (non-admin cannot access Content tab)
- [ ] Test post creation, editing, deletion
- [ ] Test rich text editor all buttons
- [ ] Test SEO fields and schema generation
- [ ] Test AI assist features
- [ ] Test blog index shows both static & dynamic posts
- [ ] Test metadata tags on published posts
- [ ] Test performance (page load, CMS list load)
- [ ] Fix CSS styling, responsiveness

---

## 11. Success Criteria

Upon completion, the following must be true:

1. **Admin can create posts:** "✍ New Post" button opens blank editor
2. **Rich text editing works:** All toolbar buttons function (bold, italic, headings, links, etc.)
3. **AI assist generates content:** All five AI buttons return usable suggestions
4. **Post is published:** "Publish" button saves to Supabase with `published_at`
5. **Post is visible:** Published post appears at `mysoniq.com/blog/[slug]`
6. **Post has SEO:** Proper `<title>`, `<meta>` tags, schema JSON, OG tags rendered
7. **Existing posts work:** All 16 static posts at `/blog/*.html` continue working
8. **Blog index updated:** `/blog/index.html` shows both static and dynamic posts
9. **Admin-only access:** Non-admin users cannot access Content tab
10. **Data persists:** Posts saved to Supabase, visible across sessions
11. **Performance acceptable:** Pages load in <2s, editor is responsive

---

## 12. Future Enhancements

Potential features not in this spec but worth noting:

- **Comments system:** Add Supabase table for reader comments, moderation
- **Analytics:** Track popular posts, engagement, time-on-page
- **Scheduled publishing:** Auto-publish posts at scheduled time via cron job
- **Collaboration:** Multi-author support, editing history/revisions
- **Markdown support:** Allow paste-from-Markdown, export as Markdown
- **Image uploads:** Upload images directly instead of pasting URLs
- **Drafts auto-save:** Save to browser localStorage every 30 seconds
- **Preview mode:** View post as it will look before publishing
- **Bulk actions:** Publish/unpublish/delete multiple posts
- **Categories as tags:** Full taxonomy, related posts
- **Search:** Full-text search on published posts
- **RSS feed:** Auto-generate `/feed.xml` from blog_posts

---

## 13. Maintenance & Support

### Regular Tasks
- Monitor Supabase usage and optimize queries if needed
- Review error logs in Vercel to catch API failures
- Check AI assistant API quota and rate limits
- Backup blog_posts table monthly

### Troubleshooting
- **"Admin can't access Content tab":** Check `S.isAdmin` is set correctly
- **"Post not published":** Verify Supabase RLS policy, check `published_at` timestamp
- **"AI buttons don't work":** Check API key validity, rate limit, OpenAI/Anthropic API status
- **"Old posts disappeared":** Confirm `/blog/*.html` files still exist, check redirect rules

---

**Document Version:** 1.0
**Last Updated:** 2026-04-05
**Status:** Ready for implementation
