# Polish Service Starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current brand-specific Astro site into a production-ready Polish starter for simple service websites on Cloudflare Pages.

**Architecture:** Move all client-editable business copy into typed `src/data/*` modules, keep blog content in Astro MDX collections, and make components, SEO, schema, RSS, sitemap, robots, LLM files, manifest, privacy policy, and health checks consume the shared data. Keep the public site one-page-first with a permanent blog and Polish legal/discovery defaults.

**Tech Stack:** Astro 4, TypeScript, MDX content collections, Tailwind CSS, Cloudflare Pages adapter, Node test runner with `tsx`, Wrangler.

---

## Source Documents

- Spec: `docs/superpowers/specs/2026-05-11-polish-service-starter-design.md`
- Optional background only: `docs/superpowers/audits/2026-04-25-seo-geo-audit.md`. The implementation must be executable from this plan and the spec without relying on the audit.

## Git Safety

- Before each task commit, run `git status --short`.
- Stage only the exact files changed for the current task.
- Do not use `git add .`.
- Do not stage unrelated user changes.

## File Structure

### New Files

- `src/data/site.ts` - typed global site/business config, contact data, locale, SEO defaults, analytics config.
- `src/data/home.ts` - typed Polish homepage content sections.
- `src/data/navigation.ts` - typed main and footer navigation.
- `src/data/legal.ts` - Polish privacy policy data and required disclaimer.
- `src/data/starter.test.ts` - tests for required data fields, analytics defaults, and old-brand cleanup scope.
- `src/components/Benefits.astro` - homepage benefits section.
- `src/components/Services.astro` - service/offer cards section.
- `src/components/Process.astro` - cooperation process section.
- `src/components/Testimonials.astro` - testimonials section.
- `src/components/Faq.astro` - FAQ section.
- `src/pages/404.astro` - Polish not-found page.
- `src/content/blog/pierwszy-wpis-startera.mdx` - neutral Polish demo blog post.

### Modified Files

- `package.json` - neutral package name, test script list, keep Cloudflare commands.
- `package-lock.json` - package name metadata after `npm install` or lock update.
- `astro.config.mjs` - use starter canonical URL from config or neutral default.
- `wrangler.jsonc` - neutral Cloudflare Pages project name.
- `README.md` - Polish starter documentation.
- `src/pages/robots.txt.ts` - generated robots endpoint aligned with `SITE.canonicalBaseUrl`.
- `src/content.config.ts` - keep blog schema; tighten Polish starter metadata if needed.
- `src/lib/site.ts` - refactor to consume `src/data/site.ts` and expose URL helpers.
- `src/lib/seo.ts` - preserve SEO contract but make locale/social/image defaults data-driven.
- `src/lib/schema.ts` - replace personal/software schema with service-business schema builders.
- `src/lib/discovery.ts` - centralize public routes, blog pagination, discovery endpoints.
- `src/lib/llms.ts` - Polish service-business AI context from data.
- `src/lib/privacy-policy.ts` - replace with wrapper over `src/data/legal.ts` or remove after migrating imports.
- `src/lib/blog.ts` - keep normalization; adjust Polish fallback behavior only if tests require.
- `src/components/layouts/Base.astro` - remove hardcoded Umami, render optional analytics, set Polish defaults.
- `src/components/layouts/Landing.astro` - pass through locale/SEO props as needed.
- `src/components/layouts/BlogPost.astro` - Polish labels, schema language, links.
- `src/components/Hero.astro` - render typed hero data.
- `src/components/About.astro` - render business-intro data.
- `src/components/Projects.astro` - render realizations/case studies data.
- `src/components/Contact.astro` - render mailto contact data.
- `src/components/Nav.astro` - render typed navigation data.
- `src/components/Footer.astro` - render typed footer navigation.
- `src/components/BlogPreview.astro` - Polish labels and data-driven section heading/copy.
- `src/components/BlogCard.astro` - Polish date/reading labels if present.
- `src/pages/index.astro` - compose new homepage sections and schema.
- `src/pages/blog/index.astro` - Polish blog index labels and schema.
- `src/pages/blog/[page].astro` - Polish paginated archive labels and schema.
- `src/pages/blog/[slug].astro` - Polish related-article labels.
- `src/pages/polityka-prywatnosci.astro` - use Polish legal data, no English alternate.
- `src/pages/privacy-policy.astro` - remove route or leave unlinked only if explicitly needed; default plan is delete.
- `src/pages/rss.xml.ts` - Polish RSS metadata.
- `src/pages/sitemap.xml.ts` - include configured public routes and generated blog pages.
- `src/pages/site.webmanifest.ts` - configured manifest values.
- `src/pages/llms.txt.ts` - Polish short LLM context.
- `src/pages/llms-full.txt.ts` - Polish full LLM context.
- `src/pages/health.ts` - configured site slug.
- `src/lib/*.test.ts` - update tests from old brand to starter contracts.

### Removed Files

- `src/content/blog/hello-focus-equals-freedom.mdx`
- `src/pages/privacy-policy.astro` unless retained as an unlinked example. Default implementation removes it.
- `public/robots.txt` because robots should be generated from shared config.

## Implementation Tasks

### Task 1: Baseline And Dependency Setup

**Files:**
- Read: `package.json`
- Read: `package-lock.json`
- Read: `src/lib/*.test.ts`

- [ ] **Step 1: Install dependencies if missing**

Run: `Test-Path -LiteralPath node_modules`

If output is `False`, run:

```powershell
npm install
```

Expected: dependencies installed and `node_modules` exists.

- [ ] **Step 2: Run baseline tests**

Run:

```powershell
npm test
```

Expected: current tests pass or fail only because the repo starts without dependencies. Record the exact result in the working notes.

- [ ] **Step 3: Run baseline check**

Run:

```powershell
npm run check
```

Expected: current check passes or exposes existing baseline issues. Record exact failures before changing code.

- [ ] **Step 4: Commit only if dependency metadata changed**

If `package-lock.json` changed only due to install/package metadata normalization, defer the commit until Task 2 package rename. Do not commit `node_modules`.

### Task 2: Add Typed Starter Data

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/home.ts`
- Create: `src/data/navigation.ts`
- Create: `src/data/legal.ts`
- Create: `src/data/starter.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Add failing data tests**

Create `src/data/starter.test.ts` with tests like:

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { HOME } from './home';
import { NAVIGATION } from './navigation';
import { SITE } from './site';
import { PRIVACY_POLICY } from './legal';

test('starter site config is Polish and analytics are disabled by default', () => {
  assert.equal(SITE.locale, 'pl-PL');
  assert.equal(SITE.analytics.enabled, false);
  assert.match(SITE.contact.email, /@/);
  assert.ok(SITE.canonicalBaseUrl.startsWith('https://'));
});

test('homepage data includes required service sections', () => {
  assert.ok(HOME.hero.title.length > 0);
  assert.ok(HOME.about.heading.length > 0);
  assert.ok(HOME.services.items.length >= 3);
  assert.ok(HOME.realizations.items.length >= 2);
  assert.ok(HOME.faq.items.length >= 3);
  assert.ok(HOME.contact.emailCtaLabel.length > 0);
});

test('navigation points to public Polish starter routes', () => {
  assert.ok(NAVIGATION.main.some((item) => item.href === '#oferta'));
  assert.ok(NAVIGATION.main.some((item) => item.href === '/blog'));
  assert.ok(NAVIGATION.footer.some((item) => item.href === '/polityka-prywatnosci'));
});

test('privacy policy includes the required starter disclaimer', () => {
  assert.match(PRIVACY_POLICY.disclaimer, /przykładowy szablon polityki prywatności/i);
});
```

- [ ] **Step 2: Add the test to `package.json`**

Modify the `test` script to include `src/data/starter.test.ts`.

- [ ] **Step 3: Run the new test and verify it fails**

Run:

```powershell
npm test
```

Expected: FAIL because `src/data/site.ts`, `src/data/home.ts`, `src/data/navigation.ts`, and `src/data/legal.ts` do not exist yet.

- [ ] **Step 4: Implement `src/data/site.ts`**

Define exported types and data:

```ts
export interface AnalyticsConfig {
  enabled: boolean;
  provider?: 'umami' | 'plausible' | 'custom';
  scriptSrc?: string;
  siteId?: string;
  dataAttributes?: Record<string, string>;
}

export interface SiteConfig {
  slug: string;
  displayName: string;
  shortName: string;
  locale: 'pl-PL';
  canonicalBaseUrl: string;
  primaryDomain: string;
  defaultTitle: string;
  defaultDescription: string;
  blogTitle: string;
  blogDescription: string;
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  socialLinks: Array<{ label: string; url: string }>;
  analytics: AnalyticsConfig;
  theme: {
    color: string;
    backgroundColor: string;
  };
}

export const SITE: SiteConfig = {
  slug: 'polski-starter-uslugowy',
  displayName: 'Pracownia Usługowa',
  shortName: 'Pracownia',
  locale: 'pl-PL',
  canonicalBaseUrl: 'https://example.com',
  primaryDomain: 'example.com',
  defaultTitle: 'Pracownia Usługowa | Proste i skuteczne usługi dla lokalnych firm',
  defaultDescription:
    'Polski starter strony usługowej dla lokalnych firm i freelancerów: oferta, realizacje, FAQ, kontakt i blog.',
  blogTitle: 'Blog | Pracownia Usługowa',
  blogDescription: 'Porady, aktualności i praktyczne wskazówki dla klientów lokalnej firmy usługowej.',
  contact: {
    email: 'kontakt@example.com',
    phone: '+48 000 000 000',
    address: 'ul. Przykładowa 1, 00-000 Warszawa',
  },
  socialLinks: [],
  analytics: {
    enabled: false,
  },
  theme: {
    color: '#0f766e',
    backgroundColor: '#ffffff',
  },
};
```

- [ ] **Step 5: Implement `src/data/home.ts`**

Use Polish neutral demo content for a fictional service business. Include typed sections for hero, benefits, about, services, process, realizations, testimonials, FAQ, contact, and blog preview.

- [ ] **Step 6: Implement `src/data/navigation.ts`**

Export `NAVIGATION.main` with anchors: `#oferta`, `#realizacje`, `#faq`, `#kontakt`, plus `/blog`. Export `NAVIGATION.footer` with `/polityka-prywatnosci`, `/rss.xml`, `/llms.txt`, `/sitemap.xml`.

- [ ] **Step 7: Implement `src/data/legal.ts`**

Export `PRIVACY_POLICY` with Polish title, lead, last updated date, sections, and exact or close disclaimer from the spec.

- [ ] **Step 8: Run tests**

Run:

```powershell
npm test
```

Expected: starter data tests pass; older SEO/schema/discovery tests still fail until later tasks update contracts.

- [ ] **Step 9: Commit**

```powershell
git status --short
git add package.json src/data/site.ts src/data/home.ts src/data/navigation.ts src/data/legal.ts src/data/starter.test.ts
git commit -m "feat: add Polish starter data"
```

### Task 3: Refactor Site Helpers, SEO, Analytics, And Layout Defaults

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/lib/standalone-seo.test.ts`
- Modify: `src/components/layouts/Base.astro`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update SEO tests first**

Change old expectations from `https://focusequalsfreedom.com` and `Focus Equals Freedom` to the configured starter values from `SITE`.

Example assertions:

```ts
assert.equal(seo.canonical, 'https://example.com/blog');
assert.equal(seo.openGraph.siteName, SITE.displayName);
assert.equal(formatSocialImageAlt('Blog'), `Blog — ${SITE.displayName}`);
```

Add a test that disabled analytics produces no script config from `SITE.analytics`.

- [ ] **Step 2: Run focused tests and verify failures**

Run:

```powershell
npm test -- src/lib/seo.test.ts src/lib/standalone-seo.test.ts
```

Expected: FAIL where helper implementation still imports old constants or uses old domain.

- [ ] **Step 3: Refactor `src/lib/site.ts`**

Import `SITE` from `src/data/site.ts`, export it for compatibility, keep `getSitePresentation()`, and make `absoluteUrl()` use `SITE.canonicalBaseUrl`.

- [ ] **Step 4: Refactor `src/lib/seo.ts`**

Use `SITE.displayName`, `SITE.locale`, and `absoluteUrl()` only. Keep the existing public function names unless tests require a typed rename.

- [ ] **Step 5: Remove hardcoded analytics from `Base.astro`**

Replace the hardcoded Umami script with conditional rendering:

```astro
{site.analytics.enabled && site.analytics.scriptSrc && (
  <script
    is:inline
    defer
    src={site.analytics.scriptSrc}
    data-website-id={site.analytics.siteId}
    {...Object.fromEntries(
      Object.entries(site.analytics.dataAttributes ?? {}).map(([key, value]) => [`data-${key}`, value]),
    )}
  ></script>
)}
```

If Astro spread typing causes trouble, build a small `analyticsAttributes` object in frontmatter and spread it there.

- [ ] **Step 6: Set Polish HTML defaults**

Ensure `Base.astro` defaults to `lang={site.locale}` and uses `SITE.theme.color` for `theme-color`.

- [ ] **Step 7: Update `astro.config.mjs`**

Use the starter default URL directly or import-safe config if supported by Astro config. The conservative path is:

```js
site: 'https://example.com',
```

- [ ] **Step 8: Run focused tests**

Run:

```powershell
npm test -- src/lib/seo.test.ts src/lib/standalone-seo.test.ts
```

Expected: PASS for updated SEO tests.

- [ ] **Step 9: Commit**

```powershell
git status --short
git add astro.config.mjs src/lib/site.ts src/lib/seo.ts src/lib/seo.test.ts src/lib/standalone-seo.test.ts src/components/layouts/Base.astro
git commit -m "refactor: centralize starter SEO config"
```

### Task 4: Refactor Schema For Service-Business Pages

**Files:**
- Modify: `src/lib/schema.ts`
- Modify: `src/lib/schema.test.ts`

- [ ] **Step 1: Rewrite schema tests first**

Expected graph types:

```ts
assert.deepEqual(graphTypes(buildRootSiteGraph()), ['ProfessionalService', 'WebSite']);
```

Add assertions for:

- `@id` equals `https://example.com/#entity`;
- root entity name equals `SITE.displayName`;
- `buildHomeSchema()` includes `WebPage`, `FAQPage`, and service-business root nodes;
- `buildArticleSchema()` author/publisher points to `#entity`;
- no `SoftwareApplication` nodes exist.

- [ ] **Step 2: Run focused schema tests and verify failures**

Run:

```powershell
npm test -- src/lib/schema.test.ts
```

Expected: FAIL because implementation still uses `Person` and `SoftwareApplication`.

- [ ] **Step 3: Implement service-business root nodes**

Use `ProfessionalService` as the default business entity. Include configured contact data where present:

```ts
{
  '@type': 'ProfessionalService',
  '@id': ENTITY_ID,
  name: SITE.displayName,
  url: SITE.canonicalBaseUrl,
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  address: SITE.contact.address,
  sameAs: SITE.socialLinks.map((link) => link.url),
}
```

- [ ] **Step 4: Implement homepage FAQ and service schema**

Build `FAQPage` from `HOME.faq.items`. Add `Service` nodes only from visible `HOME.services.items`.

- [ ] **Step 5: Keep collection, article, and legal schema APIs stable**

Preserve `buildCollectionSchema`, `buildArticleSchema`, and `buildLegalSchema` names so page imports need minimal churn.

- [ ] **Step 6: Run focused schema tests**

Run:

```powershell
npm test -- src/lib/schema.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git status --short
git add src/lib/schema.ts src/lib/schema.test.ts
git commit -m "refactor: use service business schema"
```

### Task 5: Refactor Discovery, Robots, LLM Files, RSS, Manifest, And Health

**Files:**
- Modify: `src/lib/discovery.ts`
- Modify: `src/lib/discovery.test.ts`
- Modify: `src/lib/llms.ts`
- Modify: `src/pages/sitemap.xml.ts`
- Modify: `src/pages/rss.xml.ts`
- Modify: `src/pages/site.webmanifest.ts`
- Modify: `src/pages/llms.txt.ts`
- Modify: `src/pages/llms-full.txt.ts`
- Modify: `src/pages/health.ts`
- Create: `src/pages/robots.txt.ts`
- Delete: `public/robots.txt`

- [ ] **Step 1: Update discovery tests first**

Expect:

- sitemap: `https://example.com/sitemap.xml`;
- RSS: `https://example.com/rss.xml`;
- llms: `https://example.com/llms.txt`;
- static URLs include `/`, `/blog`, `/polityka-prywatnosci`, `/llms.txt`, `/llms-full.txt`;
- paginated blog archive URLs are empty when `totalPosts <= pageSize`;
- paginated blog archive URLs are `/blog/2`, `/blog/3`, etc. only when `totalPosts > pageSize`;
- robots references configured sitemap, RSS comment, and llms URL.

- [ ] **Step 2: Run focused discovery tests and verify failures**

Run:

```powershell
npm test -- src/lib/discovery.test.ts
```

Expected: FAIL on old domain and old English/privacy route expectations.

- [ ] **Step 3: Refactor `src/lib/discovery.ts`**

Remove `/privacy-policy` from static crawlable URLs. Keep `/polityka-prywatnosci`. Keep paginated archive generation.

- [ ] **Step 4: Refactor `src/lib/llms.ts`**

Generate Polish starter copy from `SITE` and `HOME`. Include offer/services, contact, blog, privacy policy, sitemap, RSS, and full context links.

- [ ] **Step 5: Update public endpoints**

Update:

- `rss.xml.ts` language to `pl-PL`;
- `site.webmanifest.ts` colors and names from `SITE`;
- `health.ts` slug fallback to `SITE.slug`;
- `sitemap.xml.ts` route list from discovery helpers;
- `llms.txt.ts` and `llms-full.txt.ts` to call updated builders.

- [ ] **Step 6: Replace static robots with generated `src/pages/robots.txt.ts`**

Delete `public/robots.txt` and create an Astro endpoint that uses `buildDiscoveryIndex()`:

```ts
import type { APIRoute } from 'astro';
import { buildDiscoveryIndex } from '@/lib/discovery';

export const GET: APIRoute = () => {
  const discovery = buildDiscoveryIndex();
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

# llms.txt: ${discovery.llms}
# RSS: ${discovery.rss}
Sitemap: ${discovery.sitemap}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
```

- [ ] **Step 7: Run focused discovery tests**

Run:

```powershell
npm test -- src/lib/discovery.test.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```powershell
git status --short
git add src/lib/discovery.ts src/lib/discovery.test.ts src/lib/llms.ts src/pages/sitemap.xml.ts src/pages/rss.xml.ts src/pages/site.webmanifest.ts src/pages/llms.txt.ts src/pages/llms-full.txt.ts src/pages/health.ts src/pages/robots.txt.ts
git rm public/robots.txt
git commit -m "refactor: align discovery assets with starter config"
```

### Task 6: Rebuild Homepage Components From Data

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/About.astro`
- Modify: `src/components/Projects.astro`
- Modify: `src/components/Contact.astro`
- Modify: `src/components/Nav.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/BlogPreview.astro`
- Create: `src/components/Benefits.astro`
- Create: `src/components/Services.astro`
- Create: `src/components/Process.astro`
- Create: `src/components/Testimonials.astro`
- Create: `src/components/Faq.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add/import component data contracts**

Use `HOME`, `SITE`, and `NAVIGATION` imports from `src/data`.

- [ ] **Step 2: Replace `Hero.astro`**

Remove ASCII brand art and typewriter hardcode. Render:

- `HOME.hero.eyebrow`;
- `HOME.hero.title`;
- `HOME.hero.description`;
- primary and secondary CTA;
- `HOME.hero.trustCues`.

- [ ] **Step 3: Replace `About.astro`**

Render `HOME.about.heading`, `HOME.about.body`, and optional highlight bullets.

- [ ] **Step 4: Replace `Projects.astro`**

Render `HOME.realizations.items` as case-study cards. Keep component filename or rename only if imports are updated everywhere.

- [ ] **Step 5: Add `Benefits.astro`, `Services.astro`, `Process.astro`, `Testimonials.astro`, `Faq.astro`**

Each component should:

- return no visible section if its item list is empty and the section is optional;
- use stable section IDs matching navigation;
- render Polish headings from `HOME`.

- [ ] **Step 6: Replace `Contact.astro`**

Render contact copy and links:

```astro
<a href={`mailto:${SITE.contact.email}`}>{HOME.contact.emailCtaLabel}</a>
```

Only render phone/address/social links if configured.

- [ ] **Step 7: Refactor `Nav.astro` and `Footer.astro`**

Render links from `NAVIGATION`. Remove GitHub hardcode. Use Polish labels and `SITE.shortName`.

- [ ] **Step 8: Update `BlogPreview.astro`**

Use Polish empty state and CTA labels from `HOME.blogPreview`.

- [ ] **Step 9: Compose homepage in `index.astro`**

Order:

1. Hero
2. Benefits
3. About
4. Services
5. Process
6. Projects/Realizations
7. Testimonials
8. FAQ
9. BlogPreview
10. Contact

Keep `buildHomeSchema()` in head.

- [ ] **Step 10: Run Astro check**

Run:

```powershell
npm run check
```

Expected: PASS or only failures from not-yet-updated blog/legal labels. Fix local component typing issues before committing.

- [ ] **Step 11: Commit**

```powershell
git status --short
git add src/components/Hero.astro src/components/About.astro src/components/Projects.astro src/components/Contact.astro src/components/Nav.astro src/components/Footer.astro src/components/BlogPreview.astro src/components/Benefits.astro src/components/Services.astro src/components/Process.astro src/components/Testimonials.astro src/components/Faq.astro src/pages/index.astro
git commit -m "feat: render homepage from starter data"
```

### Task 7: Polish Blog Pages And Content

**Files:**
- Delete: `src/content/blog/hello-focus-equals-freedom.mdx`
- Create: `src/content/blog/pierwszy-wpis-startera.mdx`
- Modify: `src/components/layouts/BlogPost.astro`
- Modify: `src/components/BlogCard.astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[page].astro`
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/lib/blog.ts` if labels/fallbacks require it.

- [ ] **Step 1: Replace demo MDX**

Delete old Focus Equals Freedom post. Add a Polish neutral post:

```mdx
---
title: Jak przygotować treści do prostej strony usługowej
description: Krótki przewodnik po tym, co warto zebrać przed stworzeniem strony dla lokalnej firmy.
pubDate: 2026-05-11
tags:
  - strona firmowa
  - marketing lokalny
  - oferta
draft: false
---

Pierwsza wersja strony usługowej nie musi być rozbudowana. Najważniejsze jest to, żeby jasno pokazywała, komu pomagasz, w czym pomagasz i jak można się z Tobą skontaktować.
```

- [ ] **Step 2: Polish blog UI labels**

Update labels:

- `/blog` heading and empty state;
- `Topics` -> `Tematy`;
- `Page X of Y` -> `Strona X z Y`;
- `Next`/`Previous` -> `Następna`/`Poprzednia`;
- `Related Articles` -> `Powiązane wpisy`;
- reading time label if rendered.

- [ ] **Step 3: Ensure blog schema uses Polish site config**

Verify article schema author/publisher points to service-business entity.

- [ ] **Step 4: Verify paginated route generation uses the tested helper**

Ensure `src/pages/blog/[page].astro` derives `getStaticPaths()` from the same pagination rules tested in `src/lib/discovery.test.ts`, so route generation and sitemap/discovery pagination cannot drift.

- [ ] **Step 5: Run blog build-related tests**

Run:

```powershell
npm test
```

Expected: blog-related tests pass after old content expectations are removed.

- [ ] **Step 6: Commit**

```powershell
git status --short
git add src/content/blog/pierwszy-wpis-startera.mdx src/components/layouts/BlogPost.astro src/components/BlogCard.astro src/pages/blog/index.astro 'src/pages/blog/[page].astro' 'src/pages/blog/[slug].astro' src/lib/blog.ts
git rm src/content/blog/hello-focus-equals-freedom.mdx
git commit -m "feat: localize blog starter content"
```

### Task 8: Polish Privacy Policy And Remove English Route

**Files:**
- Modify: `src/pages/polityka-prywatnosci.astro`
- Delete: `src/pages/privacy-policy.astro`
- Modify: `src/lib/privacy-policy.ts` or replace imports with `src/data/legal.ts`
- Modify: `src/lib/schema.test.ts`
- Modify: `src/lib/discovery.test.ts`

- [ ] **Step 1: Add/update tests for legal route**

Expect:

- discovery excludes `https://example.com/privacy-policy`;
- discovery includes `https://example.com/polityka-prywatnosci`;
- legal schema `inLanguage` is `pl-PL`;
- privacy content contains the required disclaimer.

- [ ] **Step 2: Run focused tests and verify failures**

Run:

```powershell
npm test -- src/lib/schema.test.ts src/lib/discovery.test.ts src/data/starter.test.ts
```

Expected: FAIL until page/imports are updated.

- [ ] **Step 3: Refactor `/polityka-prywatnosci`**

Render `PRIVACY_POLICY` from `src/data/legal.ts`. Remove language switch and English alternate links.

- [ ] **Step 4: Delete `/privacy-policy` route**

Remove `src/pages/privacy-policy.astro`. Ensure no navigation, sitemap, robots, llms, or schema references it.

- [ ] **Step 5: Run focused tests**

Run:

```powershell
npm test -- src/lib/schema.test.ts src/lib/discovery.test.ts src/data/starter.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git status --short
git add src/pages/polityka-prywatnosci.astro src/lib/privacy-policy.ts src/lib/schema.test.ts src/lib/discovery.test.ts src/data/legal.ts
# If src/lib/privacy-policy.ts is removed instead of kept as a compatibility wrapper, use: git rm src/lib/privacy-policy.ts
git rm src/pages/privacy-policy.astro
git commit -m "feat: add Polish privacy policy"
```

### Task 9: Add 404 Page And Clean Project Metadata

**Files:**
- Create: `src/pages/404.astro`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `wrangler.jsonc`
- Modify: `scripts/generate-favicons.mjs`

- [ ] **Step 1: Add Polish 404 page**

Create `src/pages/404.astro` using `Base` or `Landing` and Polish links back to `/` and `/blog`.

- [ ] **Step 2: Rename package**

Set `package.json` name to a neutral starter name, for example:

```json
"name": "@frinter/polish-service-website-starter"
```

If avoiding old public brand in package metadata is stricter, use:

```json
"name": "polish-service-website-starter"
```

Prefer the unscoped version to satisfy brand-cleanup tests.

- [ ] **Step 3: Update lockfile metadata**

Run:

```powershell
npm install --package-lock-only
```

Expected: `package-lock.json` root package name updates without dependency churn.

- [ ] **Step 4: Update Wrangler project name**

Set `wrangler.jsonc` name to `polish-service-website-starter`.

- [ ] **Step 5: Update favicon script message**

Replace `client-focusequalsfreedom` log text with neutral starter text.

- [ ] **Step 6: Run check**

Run:

```powershell
npm run check
```

Expected: PASS or only remaining old-brand test failures handled in Task 10.

- [ ] **Step 7: Commit**

```powershell
git status --short
git add src/pages/404.astro package.json package-lock.json wrangler.jsonc scripts/generate-favicons.mjs
git commit -m "chore: clean starter project metadata"
```

### Task 10: Old Brand Cleanup Tests

**Files:**
- Modify: `src/data/starter.test.ts`
- Modify: any remaining starter-facing files found by the scan.

- [ ] **Step 1: Add cleanup scan test**

In `src/data/starter.test.ts`, add a scanner that checks starter-facing files only:

```ts
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const SCAN_ROOTS = ['src', 'public'];
const SCAN_FILES = ['astro.config.mjs', 'wrangler.jsonc', 'package.json', 'package-lock.json', 'README.md'];
const BANNED_TERMS = [
  /Focus Equals Freedom/i,
  /focusequalsfreedom/i,
  /frinter/i,
  /github\.com\/delta240mvt/i,
];
```

Walk only `src/**` and `public/**`; exclude `.git`, `node_modules`, `dist`, historical docs, and the absolute workspace path.

- [ ] **Step 2: Run cleanup test and verify failures**

Run:

```powershell
npm test -- src/data/starter.test.ts
```

Expected: FAIL listing remaining old brand terms.

- [ ] **Step 3: Remove remaining old public brand terms**

Use `rg -n "Focus Equals Freedom|focusequalsfreedom|frinter|github.com/delta240mvt" src public astro.config.mjs wrangler.jsonc package.json package-lock.json README.md scripts/generate-favicons.mjs`

Fix all starter-facing matches.

- [ ] **Step 4: Run cleanup test**

Run:

```powershell
npm test -- src/data/starter.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git status --short
git add src/data/starter.test.ts astro.config.mjs wrangler.jsonc package.json package-lock.json README.md scripts/generate-favicons.mjs
# Also git add only the exact src/** and public/** files listed by the cleanup test as changed.
git commit -m "test: guard starter brand cleanup"
```

### Task 11: Rewrite README In Polish

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README with Polish starter guide**

Include:

- purpose;
- quick start;
- edit `src/data/site.ts`;
- edit `src/data/home.ts`;
- edit `src/data/navigation.ts`;
- add blog posts in `src/content/blog`;
- update domain and Cloudflare Pages project;
- optional analytics config;
- privacy policy reminder;
- commands: `npm run dev`, `npm test`, `npm run check`, `npm run build`, `npm run preview`, `npm run deploy`.

- [ ] **Step 2: Run old-brand scan**

Run:

```powershell
rg -n "Focus Equals Freedom|focusequalsfreedom|frinter|github.com/delta240mvt" README.md
```

Expected: no output.

- [ ] **Step 3: Commit**

```powershell
git status --short
git add README.md
git commit -m "docs: write Polish starter guide"
```

### Task 12: Full Verification And Build Fixes

**Files:**
- Modify only files needed to fix test/check/build failures.

- [ ] **Step 1: Run all tests**

Run:

```powershell
npm test
```

Expected: PASS. Fix failures before continuing.

- [ ] **Step 2: Run Astro check**

Run:

```powershell
npm run check
```

Expected: PASS. Fix type/content errors before continuing.

- [ ] **Step 3: Run production build**

Run:

```powershell
npm run build
```

Expected: PASS and `dist/` generated.

- [ ] **Step 4: Inspect generated public routes**

Run:

```powershell
Get-ChildItem -Recurse -File dist | Select-Object -First 80 FullName
```

Expected: output includes homepage, blog, Polish privacy policy, sitemap, RSS, robots if copied, llms files, manifest, 404, and health output where applicable.

- [ ] **Step 5: Commit verification fixes if any**

```powershell
git status --short
# Stage only exact files changed to fix verification failures. Do not use git add .
git add <exact-files-changed-for-verification-fixes>
git commit -m "fix: pass starter verification"
```

Only commit if files changed.

### Task 13: Local Preview Smoke Test

**Files:**
- No planned file changes unless smoke test finds issues.

- [ ] **Step 1: Start dev server**

Run:

```powershell
npm run dev -- --host 127.0.0.1 --port 4321
```

Expected: local Astro dev server starts.

- [ ] **Step 2: Open local browser preview**

Use the in-app browser for `http://127.0.0.1:4321`.

Check:

- homepage renders;
- navigation anchors work;
- `/blog` renders;
- first blog post renders;
- `/polityka-prywatnosci` renders;
- `/404` renders;
- mobile width has no obvious overlap.

- [ ] **Step 3: Stop dev server**

Stop the running dev server after verification.

- [ ] **Step 4: Commit smoke-test fixes if any**

```powershell
git status --short
# Stage only exact files changed during smoke-test fixes. Do not use git add .
git add <exact-files-changed-for-smoke-test-fixes>
git commit -m "fix: polish starter smoke test issues"
```

Only commit if files changed.

## Final Verification Checklist

- [ ] `npm test` passes.
- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] Homepage is Polish and service-business oriented.
- [ ] Blog is Polish and permanent.
- [ ] `/polityka-prywatnosci` exists and includes the starter disclaimer.
- [ ] `/privacy-policy` is not generated or linked by default.
- [ ] Analytics is disabled by default and no hardcoded Umami script remains.
- [ ] `rg -n "Focus Equals Freedom|focusequalsfreedom|frinter|github.com/delta240mvt" src public astro.config.mjs wrangler.jsonc package.json package-lock.json README.md scripts/generate-favicons.mjs` returns no starter-facing matches.
- [ ] `git status --short` is clean or only contains intentionally uncommitted runtime artifacts.
