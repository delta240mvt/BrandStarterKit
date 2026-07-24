# Polish Service Website Starter Design

Date: 2026-05-11
Status: approved for specification review
Project: StarterKit-website

## Goal

Turn the current brand-specific Astro site into a production-ready Polish starter for simple service websites for local businesses and freelancers.

The starter must be easy to adapt locally with AI. It must not include an admin panel, CMS, backend contact form, payment system, multi-language routing, or industry preset system.

## Target Use Case

The default site is a Polish one-page service website with a permanent blog.

Primary audience:

- local service businesses;
- solo freelancers;
- small professional practices;
- simple client sites deployed on Cloudflare Pages.

The frontend design can be rewritten per client, so the main improvement is code quality, structure, configuration, SEO, discovery assets, and maintainability.

## Platform

- Astro remains the framework.
- Cloudflare Pages remains the deployment target.
- The Cloudflare adapter remains configured.
- Blog content remains MDX-based.
- Contact starts as `mailto:` only.
- Analytics are disabled by default and configurable without hardcoded third-party IDs.

## Public Pages And Assets

The starter should expose:

- `/` - one-page service homepage.
- `/blog` - blog index.
- `/blog/[page]` - paginated blog archive pages generated only when the number of published posts exceeds the page size.
- `/blog/[slug]` - blog article pages.
- `/polityka-prywatnosci` - Polish privacy policy.
- `/404` - production 404 page.
- `/sitemap.xml` - generated sitemap.
- `/rss.xml` - generated RSS feed.
- `/robots.txt` - crawler policy aligned with the configured site URL.
- `/llms.txt` - short AI-readable site context.
- `/llms-full.txt` - fuller AI-readable site context. This is a required companion to `/llms.txt` because the existing repo already exposes it and the starter should keep a complete AI discovery surface.
- `/site.webmanifest` - generated app manifest. This is a required technical asset, not a user-facing content page.
- `/health` - simple health endpoint. This is a required technical asset for deployment checks.

The previous English privacy policy route should not be part of the default public starter unless retained only as an unlinked example. The default public legal surface is Polish.

The blog does not include tag landing pages in this scope. Tags are visible metadata and may be used for related-post scoring, but `/tag/...` routes are out of scope.

## Homepage Sections

The homepage should be data-driven and include these sections:

- hero with headline, supporting copy, primary CTA, secondary CTA, and trust cues;
- benefits or reasons to choose the business;
- about or business-intro section;
- services or offer cards;
- process or cooperation steps;
- projects, realizations, or case studies;
- testimonials;
- FAQ;
- contact section with `mailto:` and optional phone/address/social links;
- blog preview linking to `/blog`.

Sections should render optional items only when data exists. Required fields should be validated through TypeScript and tests.

## Data Model

Client-editable site data should live in central TypeScript files:

- `src/data/site.ts`
  - company name;
  - short name;
  - slug;
  - canonical base URL;
  - primary domain;
  - default title and description;
  - contact email;
  - optional phone;
  - optional address;
  - optional social links;
  - locale `pl-PL`;
  - analytics settings;
  - SEO defaults.

- `src/data/home.ts`
  - homepage section content;
  - CTAs;
  - benefits;
  - services;
  - process steps;
  - realizations;
  - testimonials;
  - FAQ;
  - contact copy.

- `src/data/navigation.ts`
  - main navigation;
  - footer navigation;
  - section anchors;
  - external links.

- `src/content/blog/*.mdx`
  - blog entries with typed frontmatter.

Existing brand-specific hardcode in components should move into these data files or be removed.

## Component Boundaries

Components should render structured data rather than owning client copy.

Expected component direction:

- `Hero.astro` renders hero data from `src/data/home.ts`.
- `About.astro` becomes a generic about or business-intro section.
- `Projects.astro` becomes realizations or case studies.
- `Contact.astro` renders mailto contact data from `src/data/site.ts` and `src/data/home.ts`.
- `Nav.astro` renders `src/data/navigation.ts`.
- `Footer.astro` renders footer navigation and site identity.
- Blog components remain reusable and content-driven.

No public component should contain `Focus Equals Freedom`, `brand-starter-kit`, personal-brand copy, personal GitHub URLs, or project-specific application schema.

Brand cleanup scope is limited to starter-facing files:

- `src/**`;
- `public/**`;
- `astro.config.mjs`;
- `wrangler.jsonc`;
- `package.json`;
- `package-lock.json` when dependency metadata changes;
- `README.md`;
- new or current starter docs created for this transformation.

The cleanup scan should exclude the absolute workspace path, `.git/**`, `node_modules/**`, `dist/**`, historical audit/plan/spec documents under `docs/superpowers/**` that describe the previous state, and third-party package contents.

## SEO And Discovery

SEO and discovery must be generated from the shared configuration.

Requirements:

- canonical URLs use the configured base URL;
- default language is `pl-PL`;
- Open Graph and Twitter metadata use the configured Polish title and description;
- RSS language is Polish;
- `sitemap.xml` includes static public pages, blog archive pages, and published blog posts;
- `robots.txt` is generated or kept in sync with the configured canonical URL;
- `llms.txt` and `llms-full.txt` describe the Polish service business starter demo and use configured site data;
- `site.webmanifest` uses configured site name, short name, and theme colors;
- `/health` reports the configured site slug.

## Structured Data

The schema layer should move from personal-brand `Person` and software-specific nodes to service-business schema.

Expected schema types:

- `LocalBusiness` or `ProfessionalService` for the business entity;
- `WebSite` for the site;
- `WebPage` for pages;
- `BlogPosting` for articles;
- `BreadcrumbList` where useful;
- `FAQPage` for homepage FAQ when FAQ data exists;
- optional `Service` nodes for configured services where supported by visible content.

Schema builders should be tested for stable IDs, canonical URLs, Polish language, and correct entity relationships.

## Privacy Policy

The starter must include a ready Polish privacy policy at `/polityka-prywatnosci`.

The privacy policy should use configured business/contact data where possible:

- controller name;
- contact email;
- optional address;
- date of last update;
- static website scope;
- contact by email;
- hosting and technical logs;
- optional analytics section that reflects whether analytics are enabled;
- GDPR rights;
- retention and processors at a general level.

The page should be useful as a starter, not legal advice. It should avoid naming services that are not configured.

The visible page must include this disclaimer or a close Polish equivalent near the top or bottom:

`To jest przykładowy szablon polityki prywatności. Przed użyciem na stronie klienta dostosuj go do faktycznego sposobu działania firmy i skonsultuj z prawnikiem, jeśli sytuacja tego wymaga.`

## Analytics

Analytics are disabled by default.

The site configuration should support optional analytics without hardcoded production IDs:

- provider name;
- script URL;
- site ID or data attributes;
- enabled flag.

If analytics are disabled, no analytics script is rendered.

## Tests

Automated tests should cover:

- central site config values and URL normalization;
- SEO canonical, Open Graph, Twitter, robots directive, and Polish locale behavior;
- schema graph relationships for service-business pages and blog articles;
- discovery index consistency across sitemap, RSS, robots, `llms.txt`, and `llms-full.txt`;
- blog post normalization, draft filtering, tags, reading time, and pagination;
- public source files do not expose old brand terms such as `Focus Equals Freedom`, `focusequalsfreedom`, `brand-starter-kit`, or personal-brand URLs;
- analytics is not rendered when disabled;
- required homepage data is present.

Verification commands should include:

- `npm test`;
- `npm run check`;
- `npm run build`.

If dependencies are missing, run `npm install` before verification.

## Documentation

`README.md` should be rewritten as a Polish starter guide.

It should explain:

- what the starter is for;
- how to edit `src/data/site.ts`, `src/data/home.ts`, and `src/data/navigation.ts`;
- how to add blog posts;
- how to update domain and Cloudflare Pages project settings;
- how to configure optional analytics;
- how to update the privacy policy;
- local development, checks, build, preview, and deploy commands.

## Renaming And Cleanup

Production cleanup should include:

- neutral `package.json` name;
- neutral `wrangler.jsonc` project name;
- updated `astro.config.mjs` site URL;
- removal of old brand-specific demo blog content;
- replacement with neutral Polish sample content;
- removal of old personal/software schema nodes;
- removal of hardcoded Umami script;
- updated favicon/OG guidance if assets stay as placeholders.

## Out Of Scope

The implementation should not add:

- admin panel;
- CMS;
- backend contact form;
- Turnstile;
- webhook/email provider integration;
- payment flow;
- multi-language routing;
- industry preset generator;
- separate service pages;
- separate portfolio pages;
- JavaScript-heavy app behavior.

## Acceptance Criteria

The work is complete when:

- the public site is a neutral Polish service-business starter;
- all client-editable copy is centralized in typed data files except blog MDX;
- homepage, blog, privacy policy, 404, sitemap, RSS, robots, LLM files, manifest, and health endpoint are aligned with the same config;
- no old public brand copy remains in source files intended for the starter;
- analytics is disabled by default;
- Polish privacy policy exists at `/polityka-prywatnosci`;
- tests, type checks, and production build pass.
