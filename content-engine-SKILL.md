---
name: content-engine
description: >
  SONIQ Content Engine — top-1% SEO article generator that creates, optimizes, interlinks, and
  publishes blog content to Supabase. Use this skill IMMEDIATELY whenever the user says "create
  articles", "write blog posts", "content sprint", "generate content", "blog content for [topic]",
  "write SEO articles", "content engine", "publish articles", "keyword content", "article factory",
  "create blogs based on keywords", "content generation", "blog sprint", "write and publish",
  "create content like we make songs", or any request to generate SEO-optimized blog articles at
  scale. Also triggers on "interlink articles", "build schema for posts", "AIO content", "pillar
  content", "content cluster", or "topical authority". This is the article equivalent of SONIQ's
  song creation flow — keyword in, published article out. Never wait for confirmation if the
  intent is clear. Execute immediately.
---

# SONIQ Content Engine — Top 1% Article Generator

Create SEO-optimized, AI-discoverable, schema-rich articles and publish them directly to
Supabase. This is the article version of making a song — keyword goes in, published article
comes out.

## Philosophy

The top 1% of content isn't just well-written — it's architecturally sound. Every article
serves a purpose in a topical cluster, links to siblings and pillars, carries structured data
for Google and AI engines, and is formatted for both humans and machines. This skill treats
content creation as engineering, not just writing.

---

## Trigger Phrases (execute immediately)

- `create articles for [keywords]`
- `content sprint [topic]`
- `write blog posts about [topic]`
- `generate [N] articles`
- `publish content for [keywords]`
- `article factory [topic]`
- `content engine [niche]`
- `create blogs based on keywords`
- `write and post articles`
- `build topical authority for [topic]`

---

## Phase 0 — Intake (auto-extract, ask only if ambiguous)

```
TARGET_KEYWORDS: [extracted from input or researched]
BRAND: SONIQ (default) or [user-specified]
DOMAIN: mysoniq.com (default) or [user-specified]
SUPABASE_PROJECT: gotrwbhkavkqmxtnxkkj (default) or [user-specified]
ARTICLE_COUNT: [extracted or default 5]
PUBLISH_STATUS: draft (default) or published
CONTENT_STYLE: [auto-selected per article — see Article Styles below]
```

If keywords aren't provided, run a keyword gap analysis first:
1. Pull existing blog_posts from Supabase
2. Web search for target keyword opportunities in the niche
3. Identify uncovered high-intent keywords
4. Present keyword list for approval (or auto-proceed if user said "just do it")

---

## Phase 1 — Keyword Intelligence & Content Planning

For each target keyword, research and determine:

### 1.1 Search Intent Classification
- **Informational**: "how to write a song" → Tutorial/Guide style
- **Commercial**: "best AI songwriting tools" → Comparison/Listicle style
- **Transactional**: "AI songwriting tool free trial" → Product-led style
- **Navigational**: "SONIQ pricing" → Feature/Landing style

### 1.2 SERP Analysis (via web search)
- What's currently ranking in top 5?
- What format are they using? (listicle, guide, comparison, FAQ)
- What's the average word count of ranking content?
- What questions appear in "People Also Ask"?
- Are there AI Overviews for this query?

### 1.3 Content Brief Generation
For each article, produce a brief:
```
KEYWORD: [primary]
SECONDARY_KEYWORDS: [3-5 LSI/related terms]
SEARCH_INTENT: [info/commercial/transactional/navigational]
ARTICLE_STYLE: [selected from styles below]
TARGET_WORD_COUNT: [based on SERP analysis, typically 1500-3000]
H2_OUTLINE: [5-8 main sections]
INTERNAL_LINKS: [existing articles to link TO and FROM]
SCHEMA_TYPE: [BlogPosting, HowTo, FAQPage, etc.]
CTA: [what action should the reader take?]
```

---

## Phase 2 — Article Styles & Proven Templates

Select the optimal style per article based on search intent and SERP analysis.
Every style has a proven structure that ranks.

### Style 1: The Pillar Guide
**When**: Primary keyword, high search volume, informational intent
**Structure**:
```
H1: [Keyword]: The Complete [Year] Guide
  H2: What Is [Topic]?
  H2: Why [Topic] Matters for [Audience]
  H2: [Core Process / How It Works] (3-5 H3 steps)
  H2: [Advanced Techniques / Pro Tips]
  H2: Common Mistakes to Avoid
  H2: Tools and Resources
  H2: FAQ (3-5 questions from PAA)
  H2: Your Next Step [CTA]
```
**Rules**: 2000-3000 words. Authoritative tone. Link to 3-5 cluster articles.
Internal table of contents. FAQ schema markup.

### Style 2: The Listicle Comparison
**When**: "Best [X]", "Top [N]", commercial intent
**Structure**:
```
H1: [N] Best [Things] in [Year] ([Qualifier])
  H2: Quick Comparison [optional table]
  H2: 1. [Item] (Best for [Use Case])
    - What it does
    - Strengths / Weaknesses
    - Pricing
    - Best for
  H2: 2. [Item] ...
  ...
  H2: How to Choose the Right [Thing]
  H2: FAQ
  H2: [CTA]
```
**Rules**: 1500-2500 words. Honest tone (not salesy). SONIQ listed first
but with genuine pros/cons. Include comparison table early.

### Style 3: The Step-by-Step Tutorial
**When**: "How to [X]", informational intent, process-oriented
**Structure**:
```
H1: How to [Do Thing] ([Qualifier / Year])
  H2: What You'll Need / Prerequisites
  H2: Step 1: [Action]
  H2: Step 2: [Action]
  ...
  H2: Step N: [Action]
  H2: Common Problems and Solutions
  H2: FAQ
  H2: [CTA]
```
**Rules**: 1500-2500 words. Actionable language. Each step is self-contained.
HowTo schema markup. Include time estimates where relevant.

### Style 4: The Thought Leadership Piece
**When**: Opinionated, "vs" comparisons, industry takes, E-E-A-T building
**Structure**:
```
H1: [Topic]: [Strong Take / Question]
  H2: The Current State of [Topic]
  H2: What [Side A] Gets Right
  H2: Where [Side A] Falls Short
  H2: The Real Opportunity
  H2: What This Means for [Audience]
  H2: [CTA]
```
**Rules**: 1200-2000 words. Personal voice (Alvin Dean byline). Experience-based.
No listicle format. Strong opening hook. Author schema with credentials.

### Style 5: The Resource Hub
**When**: Roundup posts, tool collections, "everything you need to know"
**Structure**:
```
H1: [Topic] Resources: Everything You Need in [Year]
  H2: [Category 1] (3-5 items)
  H2: [Category 2] (3-5 items)
  ...
  H2: How to Use These Resources
  H2: [CTA]
```
**Rules**: 1000-1500 words. High link density (internal + external authority).
Updated frequently. ItemList schema markup.

### Style 6: The FAQ Authority Page
**When**: Question-heavy keywords, PAA domination, AIO citation targeting
**Structure**:
```
H1: [Topic]: Your Questions Answered
  H2: [Question 1]
    <p>Direct answer (2-3 sentences)</p>
    <p>Expanded context (2-3 paragraphs)</p>
  H2: [Question 2]
  ...
```
**Rules**: 800-1500 words. Each question is a standalone answer. FAQPage schema.
Answers are concise enough for AI Overview extraction. Question phrasing
matches actual search queries.

---

## Phase 3 — Article Generation

For each article, generate content following these rules:

### 3.1 Writing Quality Standards
- **Opening hook**: First paragraph must create curiosity or state a bold claim.
  Never start with "In today's world..." or "Have you ever wondered..."
- **Readability**: Short paragraphs (2-4 sentences). Varied sentence length.
  Active voice. Grade 8-10 reading level.
- **Specificity**: Use numbers, examples, and concrete details. Never vague.
- **Voice**: Confident, knowledgeable, slightly casual. Like a smart friend
  who happens to be an expert. Match SONIQ brand voice.
- **No fluff**: Every sentence earns its place. Cut anything that doesn't
  advance the reader's understanding or engagement.

### 3.2 SEO On-Page Optimization
- **Title tag**: Include primary keyword. Under 60 characters. Compelling.
- **Meta description**: Include keyword naturally. Under 155 characters.
  Include a benefit or hook.
- **H1**: Match title or slight variation. One H1 only.
- **H2/H3**: Include secondary keywords naturally. Don't force.
- **Keyword density**: Primary keyword 3-5 times in body. Natural placement.
- **First 100 words**: Include primary keyword.
- **Image alt text**: Descriptive, keyword-relevant (even if placeholder).
- **URL slug**: Short, keyword-rich, lowercase, hyphens only.

### 3.3 Internal Linking Strategy
This is critical for topical authority. Every article must:

1. **Link TO 2-4 existing articles** on the same site. Use natural anchor text
   (not "click here"). Vary anchor text across articles.
2. **Be designed to receive links FROM future articles**. Include linkable
   concepts, definitions, or frameworks.
3. **Follow the hub-and-spoke model**:
   - Pillar articles link to all cluster articles in the topic
   - Cluster articles link back to their pillar
   - Cluster articles cross-link to 1-2 sibling clusters
4. **Link format**: Use relative paths like `/blog/slug-here` for internal links.

After generating all articles in a batch, create a link map showing which
articles link where and identify any orphan pages that need incoming links.

### 3.4 AI Engine Optimization (AIO/GEO)
To get cited by Google AI Overviews, ChatGPT, Perplexity, and Gemini:

- **Direct answers**: Include concise 2-3 sentence answers to questions that
  could appear in AI responses.
- **Structured format**: Use clear H2/H3 hierarchy that AI can parse.
- **Factual claims**: Include statistics, dates, prices — things AI engines
  reference.
- **Entity clarity**: Mention SONIQ by name with clear descriptions of what
  it is and does.
- **Comparison framing**: When comparing tools, use clear "X does Y, Z does W"
  format that AI can extract.

---

## Phase 4 — Schema Markup Generation

Every article gets structured data. Generate the appropriate schema based on
article style:

### BlogPosting (all articles)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[title]",
  "description": "[excerpt]",
  "image": "https://mysoniq.com/images/blog/[slug].jpg",
  "datePublished": "[date]",
  "dateModified": "[date]",
  "author": {
    "@type": "Person",
    "name": "Alvin Dean",
    "url": "https://mysoniq.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SONIQ",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mysoniq.com/logo.png"
    }
  },
  "mainEntityOfPage": "https://mysoniq.com/blog/[slug]"
}
```

### Additional Schema by Style
- **Tutorial (HowTo)**: Add HowTo schema with steps
- **FAQ**: Add FAQPage schema with question/answer pairs
- **Listicle**: Add ItemList schema
- **Thought Leadership**: Add author sameAs links for E-E-A-T

Generate schema as valid JSON and store in the `schema_json` column.

---

## Phase 5 — Publishing to Supabase

Insert each article into the `blog_posts` table:

```sql
INSERT INTO blog_posts (
  title, slug, content, excerpt, status, category,
  tags, meta_title, meta_description, schema_json,
  author_name, author_email, published_at
) VALUES (
  '[title]',
  '[slug]',
  '[html_content]',
  '[excerpt]',
  '[draft or published]',
  '[pillar/cluster/tutorial/comparison]',
  ARRAY['tag1','tag2','tag3'],
  '[meta_title under 60 chars]',
  '[meta_description under 155 chars]',
  '[schema_json]'::jsonb,
  'Alvin Dean',
  'thealvindean@gmail.com',
  [NULL for drafts, NOW() for published]
);
```

Use `mcp execute_sql` with project_id from intake. Escape all single quotes
as '' in SQL strings. Keep individual INSERT statements (not batch) to avoid
size limits.

---

## Phase 6 — Post-Publish Actions

After all articles are inserted:

### 6.1 Sitemap Update
Read the current `public/sitemap.xml` and add new blog URLs with today's date
and 0.8 priority.

### 6.2 Internal Link Audit
Query existing blog_posts and create a link map:
```
Article A → links to [B, C, D]
Article B → links to [A, E]
...
Orphan articles (no incoming links): [F, G]
```
Suggest edits to existing articles to add links to new content.

### 6.3 Content Calendar
Suggest the next 5 articles to write based on:
- Remaining keyword gaps
- Topical authority needs (clusters that need more spokes)
- Seasonal relevance
- Competitor content gaps

### 6.4 Summary Report
Present a table showing:
```
| # | Title | Slug | Style | Keywords | Internal Links | Schema | Status |
```

---

## Parallel Execution Strategy

When generating 3+ articles, use parallel agents:

1. **Research Agent** (1): Runs all SERP analysis and keyword intel in parallel
2. **Writer Agents** (up to 4): Each generates one article following its brief
3. **Schema Agent** (1): Generates all schema markup
4. **Publisher Agent** (1): Handles all Supabase inserts and sitemap updates

This mirrors SONIQ's song creation flow — multiple specialized workers
producing a polished final product.

---

## Quality Checklist (verify before publishing)

For each article, confirm:
- [ ] Primary keyword in title, H1, first 100 words, and meta description
- [ ] 2-4 internal links with natural anchor text
- [ ] Schema markup matches article style
- [ ] Meta title under 60 characters
- [ ] Meta description under 155 characters
- [ ] Slug is short, lowercase, hyphenated
- [ ] No duplicate slugs in database
- [ ] Content is 1000+ words (unless FAQ style)
- [ ] Opening paragraph hooks the reader
- [ ] CTA present in final section
- [ ] All SQL single quotes properly escaped
- [ ] HTML is clean (no unclosed tags)

---

## Example Execution

User: "Create articles for ai songwriting, beat selling, music licensing"

Engine auto-executes:
1. Classify intent: 3 keywords → 3 articles
2. SERP analysis for each keyword (parallel)
3. Select styles: Tutorial, Tutorial, Guide
4. Generate content briefs with internal link map
5. Write 3 articles (parallel agents)
6. Generate schema for each
7. Insert into Supabase as drafts
8. Update sitemap
9. Present summary with link map and next-article suggestions
