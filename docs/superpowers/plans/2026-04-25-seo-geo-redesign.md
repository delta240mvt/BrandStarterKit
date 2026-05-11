# SEO/GEO Discovery Layer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Astro site's SEO/GEO discovery layer so page metadata, schema, discovery assets, and content contracts are centralized, testable, and aligned with repository-only best practices.

**Architecture:** Introduce typed SEO/GEO helper modules under `src/lib/` that own canonical URLs, metadata contracts, page-type schema graphs, and machine-readable discovery assets. Refactor layouts and routes to consume those contracts instead of hand-assembling SEO logic per page, then add regression tests that fail when canonical, schema, or discovery consistency drifts.

**Tech Stack:** Astro 4, TypeScript, Node test runner, `tsx`, Cloudflare Pages

---

## Implementation Status

Status: completed and pushed to `origin/main`.

Completion commits:

- `2490275` Add SEO GEO audit and contracts
- `245bfd3` Refactor SEO GEO discovery rendering
- `05b4cf4` Strengthen blog SEO GEO authority
- `2de8549` Fix final SEO GEO review gaps

Final verification:

- `npm test`: passed, 20/20 tests
- `npm run check`: passed, 0 errors, 0 warnings, 0 hints
- `npm run build`: passed, Astro build completed
- Final subagent review: approved for push

Notes:

- External live indexing, rankings, Search Console state, and third-party crawler behavior remain outside this repository-only implementation.
- Astro/Cloudflare logs may print adapter/tooling warnings even when commands exit successfully.

---

## File Structure

### Existing files to modify

- `src/lib/site.ts`
  Responsibility: canonical domain, entity identity, global brand metadata, language settings, shared SEO defaults.
- `src/components/layouts/Base.astro`
  Responsibility: global `<head>` rendering, default metadata composition, root JSON-LD injection.
- `src/components/layouts/Landing.astro`
  Responsibility: landing page layout wrapper that passes page SEO props into `Base.astro`.
- `src/components/layouts/BlogPost.astro`
  Responsibility: article-level SEO inputs and article rendering shell.
- `src/pages/index.astro`
  Responsibility: homepage SEO contract, homepage schema graph, authority copy and internal linking.
- `src/pages/blog/index.astro`
  Responsibility: blog collection page metadata and collection schema.
- `src/pages/blog/[page].astro`
  Responsibility: paginated archive metadata and canonical behavior.
- `src/pages/blog/[slug].astro`
  Responsibility: article route rendering and related content output.
- `src/lib/blog.ts`
  Responsibility: blog data normalization and post-derived SEO fields.
- `src/lib/llms.ts`
  Responsibility: AI-readable summaries and machine-readable knowledge output.
- `src/pages/llms.txt.ts`
  Responsibility: short AI-readable endpoint.
- `src/pages/llms-full.txt.ts`
  Responsibility: long AI-readable endpoint.
- `src/pages/sitemap.xml.ts`
  Responsibility: sitemap generation from canonical content.
- `public/robots.txt`
  Responsibility: crawler directives and discovery asset advertising.
- `src/pages/privacy-policy.astro`
  Responsibility: English legal page metadata and duplication strategy.
- `src/pages/polityka-prywatnosci.astro`
  Responsibility: Polish legal page metadata and duplication strategy.
- `src/lib/standalone-seo.test.ts`
  Responsibility: current standalone regression coverage.
- `package.json`
  Responsibility: test command expansion if new test files are added.

### New files to create

- `src/lib/seo.ts`
  Responsibility: typed page SEO contracts, title/description/canonical/robots/Open Graph helpers.
- `src/lib/schema.ts`
  Responsibility: page-type JSON-LD graph builders and stable entity references.
- `src/lib/discovery.ts`
  Responsibility: shared generation helpers for sitemap, robots-linked assets, AI discovery summaries.
- `src/lib/seo.test.ts`
  Responsibility: metadata and contract unit coverage.
- `src/lib/schema.test.ts`
  Responsibility: schema graph assertions.
- `src/lib/discovery.test.ts`
  Responsibility: sitemap, `llms`, and robots consistency tests.

## Task 1: Capture Baseline Audit Findings

**Files:**
- Modify: `docs/superpowers/specs/2026-04-25-seo-geo-audit-design.md`
- Create: `docs/superpowers/audits/2026-04-25-seo-geo-audit.md`
- Test: none

- [ ] **Step 1: Create audit findings document with repository-only findings template**

```md
# Focus Equals Freedom SEO/GEO Audit

## Summary
- Scope: repository only
- Status: baseline before redesign

## Findings
### Critical
- [ ] Example placeholder

### High
- [ ] Example placeholder
```

- [ ] **Step 2: Inspect current routes, layouts, and discovery assets against the spec**

Run: `rg -n "canonical|og:|twitter:|ld\\+json|llms|sitemap|robots" src public`
Expected: hits in `Base.astro`, page routes, `src/lib/llms.ts`, `public/robots.txt`

- [ ] **Step 3: Record concrete findings with severity and affected files**

```md
### High
- `src/components/layouts/Base.astro`: metadata assembly is global and prop-driven, but not enforced by page-type contract.
- `src/pages/index.astro`: homepage JSON-LD includes product nodes without a dedicated structured data builder.
```

- [ ] **Step 4: Review the audit for gaps against spec sections 7 and 8**

Run: `Get-Content docs/superpowers/audits/2026-04-25-seo-geo-audit.md`
Expected: document covers crawlability, metadata, schema, content extractability, GEO, internal linking

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-04-25-seo-geo-audit-design.md docs/superpowers/audits/2026-04-25-seo-geo-audit.md
git commit -m "docs: add SEO GEO audit baseline"
```

## Task 2: Write Failing Tests for Central SEO Contracts

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/seo.test.ts`
- Modify: `package.json`
- Test: `src/lib/seo.test.ts`

- [ ] **Step 1: Write the failing test for normalized canonical generation**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { createPageSeo } from '@/lib/seo';

test('createPageSeo normalizes canonical URLs and inherits global defaults', () => {
  const seo = createPageSeo({
    type: 'website',
    pathname: '/blog/',
    title: 'Blog',
    description: 'Notes',
  });

  assert.equal(seo.canonical, 'https://focusequalsfreedom.com/blog');
  assert.equal(seo.robots, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  assert.equal(seo.openGraph.type, 'website');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test src/lib/seo.test.ts`
Expected: FAIL with module or export not found for `@/lib/seo`

- [ ] **Step 3: Write minimal implementation for page SEO contracts**

```ts
export function createPageSeo(input: {
  type: 'website' | 'article';
  pathname: string;
  title: string;
  description: string;
}) {
  return {
    canonical: absoluteUrl(input.pathname),
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      type: input.type,
      image: absoluteUrl('/og-image.png'),
    },
  };
}
```

- [ ] **Step 4: Expand tests for alternate language and article metadata inputs**

```ts
test('createPageSeo supports alternates and article timestamps', () => {
  const seo = createPageSeo({
    type: 'article',
    pathname: '/blog/hello-focus-equals-freedom',
    title: 'Hello',
    description: 'World',
    publishedAt: '2026-04-17T00:00:00.000Z',
    updatedAt: '2026-04-18T00:00:00.000Z',
    alternates: {
      'en-US': 'https://focusequalsfreedom.com/privacy-policy',
      'pl-PL': 'https://focusequalsfreedom.com/polityka-prywatnosci',
    },
  });

  assert.equal(seo.openGraph.type, 'article');
  assert.equal(seo.article?.publishedTime, '2026-04-17T00:00:00.000Z');
  assert.equal(seo.alternates?.['pl-PL'], 'https://focusequalsfreedom.com/polityka-prywatnosci');
});
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --import tsx --test src/lib/seo.test.ts`
Expected: PASS

- [ ] **Step 6: Add the new test file to the package test script**

```json
"test": "node --import tsx --test src/lib/import-boundary.test.ts src/lib/standalone-seo.test.ts src/lib/seo.test.ts"
```

- [ ] **Step 7: Run the updated test command**

Run: `npm test`
Expected: PASS for existing tests plus `src/lib/seo.test.ts`

- [ ] **Step 8: Commit**

```bash
git add package.json src/lib/seo.ts src/lib/seo.test.ts
git commit -m "test: add SEO contract coverage"
```

## Task 3: Write Failing Tests for Structured Data Contracts

**Files:**
- Create: `src/lib/schema.ts`
- Create: `src/lib/schema.test.ts`
- Modify: `package.json`
- Test: `src/lib/schema.test.ts`

- [ ] **Step 1: Write failing tests for homepage and article schema graphs**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildHomeSchema, buildArticleSchema } from '@/lib/schema';

test('buildHomeSchema returns stable site and entity identifiers', () => {
  const graph = buildHomeSchema();

  assert.equal(graph['@context'], 'https://schema.org');
  assert.match(JSON.stringify(graph), /#website/);
  assert.match(JSON.stringify(graph), /#entity/);
});

test('buildArticleSchema links article to website and author entity', () => {
  const graph = buildArticleSchema({
    title: 'Hello',
    description: 'World',
    canonical: 'https://focusequalsfreedom.com/blog/hello-focus-equals-freedom',
    publishedAt: '2026-04-17T00:00:00.000Z',
    updatedAt: '2026-04-18T00:00:00.000Z',
    tags: ['Deep Work'],
  });

  assert.match(JSON.stringify(graph), /BlogPosting/);
  assert.match(JSON.stringify(graph), /mainEntityOfPage/);
  assert.match(JSON.stringify(graph), /#entity/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test src/lib/schema.test.ts`
Expected: FAIL with module or export not found for `@/lib/schema`

- [ ] **Step 3: Write minimal graph builder implementation**

```ts
export function buildHomeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [],
  };
}
```

- [ ] **Step 4: Expand tests for collection pages and legal alternates**

```ts
test('buildCollectionSchema differentiates /blog and paginated archives', () => {
  const graph = buildCollectionSchema({
    canonical: 'https://focusequalsfreedom.com/blog/2',
    title: 'Blog | Focus Equals Freedom — Page 2',
    description: 'Notes on deep work',
    page: 2,
  });

  assert.match(JSON.stringify(graph), /CollectionPage/);
  assert.match(JSON.stringify(graph), /Page 2/);
});

test('buildLegalSchema exposes language-specific canonical relationships', () => {
  const graph = buildLegalSchema({
    canonical: 'https://focusequalsfreedom.com/privacy-policy',
    alternates: {
      'en-US': 'https://focusequalsfreedom.com/privacy-policy',
      'pl-PL': 'https://focusequalsfreedom.com/polityka-prywatnosci',
    },
  });

  assert.match(JSON.stringify(graph), /privacy-policy/);
  assert.match(JSON.stringify(graph), /polityka-prywatnosci/);
});
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --import tsx --test src/lib/schema.test.ts`
Expected: PASS

- [ ] **Step 6: Add schema tests to the package test script**

```json
"test": "node --import tsx --test src/lib/import-boundary.test.ts src/lib/standalone-seo.test.ts src/lib/seo.test.ts src/lib/schema.test.ts"
```

- [ ] **Step 7: Run the updated test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add package.json src/lib/schema.ts src/lib/schema.test.ts
git commit -m "test: add schema graph coverage"
```

## Task 4: Write Failing Tests for Discovery Asset Contracts

**Files:**
- Create: `src/lib/discovery.ts`
- Create: `src/lib/discovery.test.ts`
- Modify: `package.json`
- Test: `src/lib/discovery.test.ts`

- [ ] **Step 1: Write failing tests for sitemap, robots, and LLM discovery consistency**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLlmsTxt, buildDiscoveryIndex } from '@/lib/discovery';

test('buildDiscoveryIndex returns canonical machine-readable endpoints', () => {
  const discovery = buildDiscoveryIndex();

  assert.equal(discovery.sitemap, 'https://focusequalsfreedom.com/sitemap.xml');
  assert.equal(discovery.llms, 'https://focusequalsfreedom.com/llms.txt');
});

test('buildLlmsTxt includes canonical resources without contradiction', () => {
  const content = buildLlmsTxt();

  assert.match(content, /Sitemap: https:\/\/focusequalsfreedom.com\/sitemap.xml/);
  assert.match(content, /Blog: https:\/\/focusequalsfreedom.com\/blog/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test src/lib/discovery.test.ts`
Expected: FAIL with module or export not found for `@/lib/discovery`

- [ ] **Step 3: Write minimal discovery helper implementation**

```ts
export function buildDiscoveryIndex() {
  return {
    sitemap: absoluteUrl('/sitemap.xml'),
    rss: absoluteUrl('/rss.xml'),
    llms: absoluteUrl('/llms.txt'),
    llmsFull: absoluteUrl('/llms-full.txt'),
  };
}
```

- [ ] **Step 4: Add robots consistency assertions using the actual file**

```ts
import { readFileSync } from 'node:fs';
import path from 'node:path';

test('robots.txt advertises discovery assets from buildDiscoveryIndex', () => {
  const robots = readFileSync(path.join(APP_ROOT, 'public', 'robots.txt'), 'utf8');
  const discovery = buildDiscoveryIndex();

  assert.match(robots, new RegExp(discovery.sitemap.replaceAll('.', '\\.')));
  assert.match(robots, /llms\.txt/);
});
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --import tsx --test src/lib/discovery.test.ts`
Expected: PASS

- [ ] **Step 6: Add discovery tests to the package test script**

```json
"test": "node --import tsx --test src/lib/import-boundary.test.ts src/lib/standalone-seo.test.ts src/lib/seo.test.ts src/lib/schema.test.ts src/lib/discovery.test.ts"
```

- [ ] **Step 7: Run the full test command**

Run: `npm test`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add package.json src/lib/discovery.ts src/lib/discovery.test.ts
git commit -m "test: add discovery asset coverage"
```

## Task 5: Centralize Site Identity and Global Defaults

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/lib/seo.ts`
- Test: `src/lib/seo.test.ts`, `src/lib/schema.test.ts`, `src/lib/discovery.test.ts`

- [ ] **Step 1: Add language and alternate metadata to the site source-of-truth**

```ts
export const SITE = {
  // existing fields...
  locale: 'en-US',
  alternates: {
    'en-US': absoluteUrl('/privacy-policy'),
    'pl-PL': absoluteUrl('/polityka-prywatnosci'),
  },
};
```

- [ ] **Step 2: Add typed defaults for OG image, robots, and social metadata**

```ts
export const SEO_DEFAULTS = {
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogImage: absoluteUrl('/og-image.png'),
  locale: 'en_US',
};
```

- [ ] **Step 3: Update tests to assert the new site identity values**

```ts
assert.equal(SEO_DEFAULTS.ogImage, 'https://focusequalsfreedom.com/og-image.png');
assert.equal(SITE.locale, 'en-US');
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/site.ts src/lib/seo.ts src/lib/seo.test.ts src/lib/schema.test.ts src/lib/discovery.test.ts
git commit -m "feat: centralize SEO site identity defaults"
```

## Task 6: Refactor `Base.astro` to Consume Central SEO Contracts

**Files:**
- Modify: `src/components/layouts/Base.astro`
- Modify: `src/components/layouts/Landing.astro`
- Modify: `src/lib/seo.ts`
- Test: `npm test`, `npm run check`

- [ ] **Step 1: Replace raw head prop handling with `createPageSeo` output**

```ts
const seo = createPageSeo({
  type: ogType === 'article' ? 'article' : 'website',
  pathname: Astro.url.pathname,
  title: resolvedTitle,
  description: resolvedDescription,
  publishedAt: articlePublishedAt,
  updatedAt: articleModifiedAt,
});
```

- [ ] **Step 2: Replace inline `<meta>` values with `seo` fields**

```astro
<link rel="canonical" href={seo.canonical} />
<meta property="og:url" content={seo.canonical} />
<meta property="og:image" content={seo.openGraph.image} />
<meta name="robots" content={seo.robots} />
```

- [ ] **Step 3: Add alternate language `<link rel="alternate" hreflang>` rendering when provided**

```astro
{seo.alternates && Object.entries(seo.alternates).map(([locale, href]) => (
  <link rel="alternate" hreflang={locale} href={href} />
))}
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Run Astro checks**

Run: `npm run check`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/layouts/Base.astro src/components/layouts/Landing.astro src/lib/seo.ts
git commit -m "refactor: centralize head metadata rendering"
```

## Task 7: Refactor Schema Injection for Home, Blog, Article, and Legal Pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[page].astro`
- Modify: `src/components/layouts/BlogPost.astro`
- Modify: `src/pages/privacy-policy.astro`
- Modify: `src/pages/polityka-prywatnosci.astro`
- Modify: `src/lib/schema.ts`
- Test: `src/lib/schema.test.ts`, `npm run check`

- [ ] **Step 1: Replace homepage inline JSON-LD with `buildHomeSchema()`**

```astro
<script type="application/ld+json" set:html={JSON.stringify(buildHomeSchema())} />
```

- [ ] **Step 2: Add collection-page schema builders for `/blog` and `/blog/[page]`**

```ts
export function buildCollectionSchema(input: {
  canonical: string;
  title: string;
  description: string;
  page?: number;
}) {
  // return CollectionPage graph
}
```

- [ ] **Step 3: Replace article JSON-LD in `BlogPost.astro` with `buildArticleSchema()`**

```astro
<script type="application/ld+json" set:html={JSON.stringify(buildArticleSchema({
  title,
  description: description ?? '',
  canonical: canonicalUrl,
  publishedAt: publishedAt?.toISOString(),
  updatedAt: updatedAt?.toISOString(),
  tags,
}))} />
```

- [ ] **Step 4: Add `buildLegalSchema()` and inject it into both privacy pages**

```astro
<script type="application/ld+json" set:html={JSON.stringify(buildLegalSchema({
  canonical: absoluteUrl('/privacy-policy'),
  alternates: {
    'en-US': absoluteUrl('/privacy-policy'),
    'pl-PL': absoluteUrl('/polityka-prywatnosci'),
  },
}))} />
```

- [ ] **Step 5: Run schema tests**

Run: `node --import tsx --test src/lib/schema.test.ts`
Expected: PASS

- [ ] **Step 6: Run Astro checks**

Run: `npm run check`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/pages/blog/index.astro src/pages/blog/[page].astro src/components/layouts/BlogPost.astro src/pages/privacy-policy.astro src/pages/polityka-prywatnosci.astro src/lib/schema.ts
git commit -m "refactor: centralize structured data graphs"
```

## Task 8: Redesign Discovery Asset Generation Around Shared Helpers

**Files:**
- Modify: `src/lib/llms.ts`
- Modify: `src/pages/llms.txt.ts`
- Modify: `src/pages/llms-full.txt.ts`
- Modify: `src/pages/sitemap.xml.ts`
- Modify: `public/robots.txt`
- Modify: `src/lib/discovery.ts`
- Modify: `src/lib/discovery.test.ts`
- Test: `src/lib/discovery.test.ts`, `src/lib/standalone-seo.test.ts`

- [ ] **Step 1: Move shared endpoint URLs and site summaries into `src/lib/discovery.ts`**

```ts
export function buildDiscoveryIndex() {
  return {
    sitemap: absoluteUrl('/sitemap.xml'),
    rss: absoluteUrl('/rss.xml'),
    llms: absoluteUrl('/llms.txt'),
    llmsFull: absoluteUrl('/llms-full.txt'),
  };
}
```

- [ ] **Step 2: Make `src/lib/llms.ts` consume discovery helpers instead of hardcoding URLs**

```ts
const discovery = buildDiscoveryIndex();
return `Sitemap: ${discovery.sitemap}\nFull-Context: ${discovery.llmsFull}`;
```

- [ ] **Step 3: Rework sitemap generation to derive static routes from one source of truth**

```ts
const staticUrls = getStaticDiscoveryUrls();
const articleUrls = publishedArticles.map(toSitemapEntry);
```

- [ ] **Step 4: Simplify `public/robots.txt` to standards-aligned directives plus advertised discovery assets**

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://focusequalsfreedom.com/sitemap.xml
```

- [ ] **Step 5: Update tests to assert robots, sitemap, and `llms` all agree on canonical assets**

```ts
assert.match(buildLlmsTxt(), /https:\/\/focusequalsfreedom.com\/sitemap.xml/);
assert.match(robots, /Sitemap: https:\/\/focusequalsfreedom.com\/sitemap.xml/);
```

- [ ] **Step 6: Run discovery and standalone SEO tests**

Run: `node --import tsx --test src/lib/discovery.test.ts src/lib/standalone-seo.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/lib/llms.ts src/pages/llms.txt.ts src/pages/llms-full.txt.ts src/pages/sitemap.xml.ts public/robots.txt src/lib/discovery.ts src/lib/discovery.test.ts src/lib/standalone-seo.test.ts
git commit -m "refactor: unify discovery asset generation"
```

## Task 9: Strengthen Blog and Content Authority Contracts

**Files:**
- Modify: `src/lib/blog.ts`
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[page].astro`
- Test: `src/lib/seo.test.ts`, `src/lib/schema.test.ts`, `npm run check`

- [ ] **Step 1: Add derived blog helpers for canonical-ready metadata**

```ts
export interface BlogPost {
  // existing fields...
  canonicalUrl: string;
  excerpt: string;
}
```

- [ ] **Step 2: Add tests for article helper output**

```ts
assert.equal(post.canonicalUrl, 'https://focusequalsfreedom.com/blog/hello-focus-equals-freedom');
assert.ok(post.excerpt.length > 0);
```

- [ ] **Step 3: Surface stronger authority and navigation signals in blog templates**

```astro
<nav aria-label="Article topics">
  {article.tags.map((tag) => <span>{tag}</span>)}
</nav>
```

- [ ] **Step 4: Ensure related articles and index cards use normalized descriptions consistently**

```astro
<BlogCard description={related.excerpt} ... />
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Run Astro checks**

Run: `npm run check`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/lib/blog.ts src/pages/blog/[slug].astro src/pages/blog/index.astro src/pages/blog/[page].astro
git commit -m "feat: strengthen blog authority metadata"
```

## Task 10: Add Legal Page Alternate and Duplicate-Handling Contracts

**Files:**
- Modify: `src/pages/privacy-policy.astro`
- Modify: `src/pages/polityka-prywatnosci.astro`
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`
- Test: `src/lib/seo.test.ts`, `src/lib/schema.test.ts`

- [ ] **Step 1: Write failing tests for legal-page alternates**

```ts
test('legal pages expose explicit cross-language alternates', () => {
  const seo = createPageSeo({
    type: 'website',
    pathname: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'Privacy Policy',
    alternates: {
      'en-US': 'https://focusequalsfreedom.com/privacy-policy',
      'pl-PL': 'https://focusequalsfreedom.com/polityka-prywatnosci',
    },
  });

  assert.equal(seo.alternates?.['pl-PL'], 'https://focusequalsfreedom.com/polityka-prywatnosci');
});
```

- [ ] **Step 2: Run the targeted tests to verify the pre-change failure if needed**

Run: `node --import tsx --test src/lib/seo.test.ts src/lib/schema.test.ts`
Expected: FAIL before implementation, PASS after implementation

- [ ] **Step 3: Pass alternate metadata into both legal pages**

```astro
<Base
  title={`${doc.title} — ${site.displayName}`}
  description={doc.lead}
  canonical={absoluteUrl('/privacy-policy')}
  alternates={{
    'en-US': absoluteUrl('/privacy-policy'),
    'pl-PL': absoluteUrl('/polityka-prywatnosci'),
  }}
>
```

- [ ] **Step 4: Run targeted tests**

Run: `node --import tsx --test src/lib/seo.test.ts src/lib/schema.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/privacy-policy.astro src/pages/polityka-prywatnosci.astro src/lib/seo.ts src/lib/schema.ts src/lib/seo.test.ts src/lib/schema.test.ts
git commit -m "feat: add legal page alternate contracts"
```

## Task 11: Expand End-to-End Repository Verification

**Files:**
- Modify: `src/lib/standalone-seo.test.ts`
- Modify: `package.json`
- Test: full suite plus build checks

- [ ] **Step 1: Add assertions for new SEO/GEO guarantees**

```ts
test('test script includes SEO, schema, and discovery suites', () => {
  const packageJson = JSON.parse(readFileSync(path.join(APP_ROOT, 'package.json'), 'utf8'));
  assert.match(packageJson.scripts.test, /seo\.test\.ts/);
  assert.match(packageJson.scripts.test, /schema\.test\.ts/);
  assert.match(packageJson.scripts.test, /discovery\.test\.ts/);
});
```

- [ ] **Step 2: Add assertions for canonical consistency of legal routes**

```ts
assert.equal(absoluteUrl('/privacy-policy/'), 'https://focusequalsfreedom.com/privacy-policy');
assert.equal(absoluteUrl('/polityka-prywatnosci/'), 'https://focusequalsfreedom.com/polityka-prywatnosci');
```

- [ ] **Step 3: Run full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 4: Run type and content validation**

Run: `npm run check`
Expected: PASS

- [ ] **Step 5: Run production build**

Run: `npm run build`
Expected: PASS and updated production bundle in `dist/`

- [ ] **Step 6: Commit**

```bash
git add package.json src/lib/standalone-seo.test.ts
git commit -m "test: expand repository SEO verification"
```

## Task 12: Final Audit Closure and Delivery Notes

**Files:**
- Modify: `docs/superpowers/audits/2026-04-25-seo-geo-audit.md`
- Modify: `README.md`
- Test: none

- [ ] **Step 1: Update the audit document with resolved findings and residual risks**

```md
## Resolved
- Metadata contracts centralized in `src/lib/seo.ts`
- Discovery assets unified through `src/lib/discovery.ts`

## Residual Risks
- Live indexing and field CWV remain out of scope for repository-only verification
```

- [ ] **Step 2: Add a short maintenance note to `README.md`**

```md
## SEO/GEO maintenance

- Run `npm test`
- Run `npm run check`
- Keep discovery assets aligned with canonical URLs and published content
```

- [ ] **Step 3: Review docs for clarity and drift**

Run: `Get-Content docs/superpowers/audits/2026-04-25-seo-geo-audit.md`
Expected: findings status reflects post-implementation state

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/audits/2026-04-25-seo-geo-audit.md README.md
git commit -m "docs: close SEO GEO redesign audit"
```

## Verification Checklist

- Run: `npm test`
- Expected: all test files pass

- Run: `npm run check`
- Expected: Astro validation passes

- Run: `npm run build`
- Expected: production build succeeds

## Notes for Implementation

- Keep `absoluteUrl()` as the single canonical URL normalizer unless a stronger abstraction fully replaces it.
- Prefer adding new helpers under `src/lib/` rather than expanding page files with more inline logic.
- Keep product-level schema only where visible page content justifies it.
- Do not claim live SEO outcomes in repository docs or tests.
