# Focus Equals Freedom SEO/GEO Audit

Date: 2026-04-25
Scope: repository only
Status: baseline snapshot before implementation tasks in `docs/superpowers/plans/2026-04-25-seo-geo-redesign.md`
Reviewed commit: `8d2d29369d72d2426720d93f703967b188b5f626`

This audit records the repository state before the discovery-layer redesign implementation.
Later uncommitted or committed implementation changes, such as new SEO/schema/discovery
helper modules, should be evaluated as remediation work rather than baseline evidence.

## Summary

The repository already has a strong baseline for search and AI discovery:

- Global canonical URL normalization through `src/lib/site.ts`
- Global metadata, Open Graph, Twitter Card, robots meta, and site identity JSON-LD in `src/components/layouts/Base.astro`
- Page-level JSON-LD for the homepage, blog collection pages, and blog articles
- `public/robots.txt`, `src/pages/sitemap.xml.ts`, RSS, `llms.txt`, and `llms-full.txt`
- A visible footer path to `llms.txt` and `sitemap.xml`
- Baseline standalone tests for canonical URL normalization and robots discovery links

The main baseline risk is not absence of SEO/GEO primitives. The risk is that metadata, structured data, sitemap entries, robots directives, and LLM-readable context are assembled in several places without a single typed discovery contract. This makes future drift likely.

## Findings

### Critical

- None found from repository-only review.

### High

- Severity: High
  Area: Metadata governance
  Affected files: `src/components/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/blog/index.astro`, `src/pages/blog/[page].astro`, `src/components/layouts/BlogPost.astro`, `src/pages/privacy-policy.astro`, `src/pages/polityka-prywatnosci.astro`
  Finding: Page metadata is layout-prop driven rather than defined by page-type contracts. `Base.astro` renders the canonical URL, title, description, Open Graph, Twitter Card, article metadata, robots meta, RSS link, and site JSON-LD, while pages separately inject their own JSON-LD graphs. This produces valid baseline output, but there is no typed contract guaranteeing that home, collection, paginated archive, article, and legal pages all provide the required fields consistently.
  Impact: Future page additions can silently omit descriptions, canonical rules, alternate links, or article fields while still rendering.
  Recommendation: Introduce centralized SEO contract helpers for each page type and make layout rendering consume those contracts.

- Severity: High
  Area: Structured data consistency
  Affected files: `src/components/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/blog/index.astro`, `src/pages/blog/[page].astro`, `src/components/layouts/BlogPost.astro`
  Finding: JSON-LD graphs are hand-assembled across multiple templates. The global `Person`/`WebSite` graph lives in `Base.astro`, homepage `WebPage` and `SoftwareApplication` nodes live in `src/pages/index.astro`, collection schema lives in blog index templates, and article schema lives in `BlogPost.astro`.
  Impact: Entity IDs are mostly consistent today, but schema changes must be manually repeated across files. This increases risk of graph drift between `#entity`, `#website`, `#webpage`, article nodes, breadcrumbs, and product/software nodes.
  Recommendation: Move structured data composition to shared schema builders with tests for stable IDs, graph relationships, and page-type coverage.

- Severity: High
  Area: Discovery asset consistency
  Affected files: `src/lib/llms.ts`, `src/pages/sitemap.xml.ts`, `public/robots.txt`, `src/lib/site.ts`
  Finding: Discovery endpoints and canonical resources are repeated across `llms.ts`, sitemap generation, and `robots.txt`. `absoluteUrl()` provides a good base normalizer, but there is no shared discovery index defining sitemap, RSS, LLM files, public static routes, and their eligibility rules.
  Impact: A route can be added, renamed, noindexed, or removed without forcing `sitemap.xml`, `robots.txt`, RSS references, and LLM summaries to stay aligned.
  Recommendation: Create a discovery helper that owns canonical discovery endpoints and route eligibility, then use it from sitemap, LLM files, and tests.

### Medium

- Severity: Medium
  Area: Crawlability and indexation
  Affected files: `public/robots.txt`
  Finding: `robots.txt` is intentionally permissive and AI-forward, but it includes many bot-specific allow sections, a `Crawl-delay`, and an RSS file under `Sitemap:`. The baseline is discoverable, but the file is more complex than required and mixes standards-oriented crawler directives with policy/intention comments for AI usage.
  Impact: Most major crawlers will still crawl the site, but unnecessary directives are harder to maintain and some crawlers ignore non-standard or unsupported fields. Advertising RSS as `Sitemap:` may be less standards-aligned than linking it through page head and discovery docs.
  Recommendation: Simplify robots to durable standards-aligned directives, keep sitemap advertisement explicit, and ensure AI intent is represented without conflicting with crawler parsing.

- Severity: Medium
  Area: Crawlability and indexation
  Affected files: `src/pages/sitemap.xml.ts`, `src/pages/blog/[page].astro`
  Finding: The sitemap includes static routes and published article routes, but it does not define a future rule for paginated blog archive URLs once `totalPages > 1`.
  Impact: Future paginated archive pages would remain crawlable through internal pagination links, but sitemap coverage could become incomplete for archive pages beyond `/blog`.
  Recommendation: Derive paginated archive sitemap entries from the same pagination source used by `getStaticPaths()`, or explicitly document that paginated archives are intentionally link-discovered only.

- Severity: Medium
  Area: Canonical and alternate handling
  Affected files: `src/components/layouts/Base.astro`, `src/pages/sitemap.xml.ts`, `src/lib/site.ts`, `src/pages/privacy-policy.astro`, `src/pages/polityka-prywatnosci.astro`
  Finding: Canonical URL normalization is centralized in `absoluteUrl()`, but alternate language/cross-language handling is not represented in the base layout contract. The sitemap includes both `/privacy-policy` and `/polityka-prywatnosci`, but the reviewed shared layout does not expose `hreflang` alternates.
  Impact: Multilingual legal pages can be interpreted as separate pages without an explicit alternate relationship from repository metadata.
  Recommendation: Add page-level alternate support to the SEO contract and render `rel="alternate" hreflang="..."` where applicable.

- Severity: Medium
  Area: Structured data justification
  Affected files: `src/pages/index.astro`
  Finding: Homepage schema includes two `SoftwareApplication` nodes for `frinter.app` and `FrinterFlow`. This may be justified by visible homepage project content, but the schema is embedded directly in the page rather than generated from a project/content model.
  Impact: If visible project copy changes independently of schema, the homepage can overstate or drift from extractable page content. This is especially relevant for answer engines that reconcile schema with visible text.
  Recommendation: Generate project/product schema from the same source used for visible project cards, or keep software schema only where the visible page content directly supports it.

- Severity: Medium
  Area: Article structured data
  Affected files: `src/components/layouts/BlogPost.astro`, `src/content.config.ts`, `src/lib/blog.ts`
  Finding: `src/content.config.ts` already requires `description` and `pubDate`, and defaults `tags`, but there is no repository-level assertion for stronger article SEO/GEO quality such as non-empty tags, intentional `updatedDate` handling, or schema behavior for layout usage outside the content pipeline.
  Impact: Published posts have baseline required metadata, but article schema can still become weak if topical tags are omitted or if article layout props are reused without the normalized blog content path.
  Recommendation: Add content/frontmatter quality tests or blog normalization helpers that enforce the article fields this site considers mandatory for SEO/GEO.

- Severity: Medium
  Area: GEO-specific signals
  Affected files: `src/lib/llms.ts`, `src/lib/site.ts`
  Finding: `llms.txt` and `llms-full.txt` provide strong site-level context, but they are static summaries. They do not currently derive a current list of published articles, project pages, or content item summaries from repository content.
  Impact: AI crawlers receive a clear site summary, but not a complete machine-readable map of all topical evidence available in the repository.
  Recommendation: Generate LLM-readable resources from the same content index used by blog and sitemap generation.

### Low

- Severity: Low
  Area: Metadata completeness
  Affected files: `src/components/layouts/Base.astro`
  Finding: Open Graph and Twitter Card metadata are present globally with an image fallback, dimensions, type, and alt text. The implementation does not appear to expose per-page social image dimensions or type contracts beyond the global fallback.
  Impact: This is acceptable baseline behavior, but future pages with custom images can drift if image dimensions or alt text are not validated.
  Recommendation: Model social image metadata in the SEO helper rather than only as free-form layout props.

- Severity: Low
  Area: Internal linking and discoverability
  Affected files: `src/pages/blog/index.astro`, `src/pages/blog/[page].astro`, `src/components/layouts/BlogPost.astro`, `src/components/Footer.astro`
  Finding: The blog index, paginated archives, article footer, related-article slot, and footer links provide crawl paths to posts, blog, `llms.txt`, and sitemap. However, article tags are rendered as non-link spans, and topical clustering remains limited until there is enough content for related articles to appear.
  Impact: Crawlability is adequate for the current small site, but topical clustering and entity-topic reinforcement are limited.
  Recommendation: Add topic/tag landing pages or related-article links only if the content model supports them.

- Severity: Low
  Area: Sitemap freshness
  Affected files: `src/pages/sitemap.xml.ts`
  Finding: Static sitemap entries use the build date as `lastmod`.
  Impact: This is acceptable for a static site, but it can imply that unchanged legal/discovery pages are modified on every build.
  Recommendation: Use content-derived modification dates where available, or document build-date `lastmod` as intentional.

## Dimension Coverage

### Crawlability and Indexation

- Positive: `public/robots.txt` allows global crawl access and advertises sitemap/RSS resources.
- Positive: `src/pages/sitemap.xml.ts` includes core static routes, discovery endpoints, legal pages, and published articles.
- Risk: Future paginated blog archive routes may be generated without corresponding sitemap entries once `totalPages > 1`.
- Risk: Legal language alternates are not evident in the shared layout contract.

### Metadata

- Positive: `Base.astro` renders description, canonical, Open Graph, Twitter Card, locale, author, robots, sitemap, and RSS metadata.
- Risk: Metadata assembly is prop-driven and not enforced by page type.
- Risk: Custom social image metadata is not modeled as a structured contract.

### Structured Data

- Positive: The repository emits `Person`, `WebSite`, `WebPage`, `CollectionPage`, `BlogPosting`, `BreadcrumbList`, and `SoftwareApplication` JSON-LD.
- Risk: Schema is hand-assembled in templates and can drift across page types.
- Risk: Software application schema should remain tied to visible project evidence.

### Content Extractability

- Positive: Homepage sections, blog cards, article headers, dates, descriptions, tags, and article body wrappers are semantically clear enough for repository-level extraction.
- Risk: Article SEO fields are not enforced for all published posts at the content-model level.
- Risk: Topic tags are visible but not linkable or represented as navigable topic entities.

### GEO-Specific Signals

- Positive: `llms.txt`, `llms-full.txt`, robots AI notices, site identity fields, `sameAs` links, and `knowsAbout` topics provide strong AI-oriented context.
- Risk: LLM files are static summaries rather than generated from the current published content graph.
- Risk: Discovery assets are not governed by one shared source of truth.

### Internal Linking

- Positive: Homepage links to major sections, blog previews exist, blog pagination links pages, articles link back to blog, and the footer exposes `llms.txt` and sitemap.
- Risk: Related article/topic pathways are limited, so deeper topical relationships rely mostly on index pages and schema rather than internal links.

## Recommended Next Steps

1. Introduce a central SEO contract module for canonical URLs, metadata, social metadata, robots directives, article metadata, and alternates.
2. Introduce schema builders for site identity, home, collection pages, articles, legal pages, and justified software/project entities.
3. Introduce a discovery module consumed by sitemap, LLM files, robots tests, and future RSS checks.
4. Add tests that enforce page-type contracts, schema graph relationships, sitemap coverage, robots consistency, and content/frontmatter completeness.
5. Revisit legal page alternates and paginated archive sitemap inclusion during implementation.

## Implementation Closure

Resolved in the SEO/GEO redesign:

- Central SEO contracts now generate canonical, robots, Open Graph, Twitter, article, and alternate metadata.
- Page JSON-LD now comes from shared schema builders for site identity, home, collection, article, and legal pages.
- Discovery endpoints are centralized and consumed by `llms.txt`, sitemap generation, and robots tests.
- Legal pages now expose explicit canonical and `hreflang` alternates.
- Blog posts now expose normalized excerpts and absolute canonical URLs for downstream metadata and card rendering.
- Automated regression tests now cover SEO, schema, discovery, and standalone extraction boundaries.

Residual repository-only risks:

- Live indexation, rankings, Search Console status, production CDN behavior, and third-party AI crawler behavior remain outside this repo-only audit.
- The visible content corpus is still small, so topical authority depends on future published articles and project content.
- Cloudflare/Astro tooling emits a benign Sharp adapter warning and a trailing canceled-build diagnostic despite successful zero-exit verification.

## Repository-Only Limitations

This audit does not verify live indexation, Search Console status, third-party parser behavior, Core Web Vitals field data, production headers, CDN behavior, rendered HTML after deployment, or ranking outcomes.
