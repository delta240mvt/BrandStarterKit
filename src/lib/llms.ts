import { buildDiscoveryIndex } from '@/lib/discovery';
import { HOME } from '@/data/home';
import { SITE, absoluteUrl } from '@/lib/site';

export function buildLlmsTxt(): string {
  const discovery = buildDiscoveryIndex();

  return `---
Sitemap: ${discovery.sitemap}
Full-Context: ${discovery.llmsFull}
Last-Updated: ${new Date().toISOString().slice(0, 10)}
---

# ${SITE.displayName}

> ${SITE.llmsSummary}

## Core Facts
- Site: ${SITE.displayName}
- Product: static Astro 7 website starter for a new project
- Canonical URL: ${SITE.canonicalBaseUrl}
- Primary domain: ${SITE.primaryDomain}
- Contact: ${SITE.contactEmail}
- Language: ${SITE.locale}
- Publisher: ${SITE.authorName}
- Product URL: ${SITE.productUrl}
- Registration: ${SITE.registrationUrl}
- Focus: clear project presentation, SEO, GEO, and easy AI-assisted editing

## Interpretation
- This is a static Astro 7 starter website for a new project, startup, or personal brand.
- Edit the public identity in src/data/site.ts and homepage copy in src/data/home.ts.

## Resources
- Blog: ${absoluteUrl('/blog')}
- Privacy Policy: ${absoluteUrl('/polityka-prywatnosci')}
- RSS: ${discovery.rss}
- Sitemap: ${discovery.sitemap}
- Robots: ${absoluteUrl('/robots.txt')}

## Social
${SITE.socialLinks.length > 0 ? SITE.socialLinks.map((link) => `- ${link}`).join('\n') : '- No public social profiles configured'}
`;
}

export function buildLlmsFullTxt(): string {
  const discovery = buildDiscoveryIndex();

  return `# Full Context: ${SITE.displayName}

## Overview
${SITE.displayName} is a static Astro 7 website starter for a new project, startup, or personal brand. It provides an editable homepage, blog, SEO metadata, structured data, and machine-readable discovery files.

## Homepage Structure
- Hero: ${HOME.hero.title}
- About: ${HOME.about.heading}
- Offer: ${HOME.services.heading}
- Realizations: ${HOME.realizations.heading}
- FAQ: ${HOME.faq.heading}
- Contact: ${HOME.contact.heading}

## Product access
- Application: ${SITE.productUrl}
- Registration: ${SITE.registrationUrl}

## Public Surface
- Homepage: ${absoluteUrl('/')}
- Blog index: ${absoluteUrl('/blog')}
- Short LLM context: ${discovery.llms}
- Full LLM context: ${discovery.llmsFull}
- RSS: ${discovery.rss}
- Sitemap: ${discovery.sitemap}
- Robots: ${absoluteUrl('/robots.txt')}
- Privacy policy: ${absoluteUrl('/polityka-prywatnosci')}

## Structured Identity
- Entity type: ${SITE.entityType}
- Display name: ${SITE.displayName}
- Canonical base URL: ${SITE.canonicalBaseUrl}
- Contact email: ${SITE.contactEmail}
- Social profiles:
${SITE.socialLinks.length > 0 ? SITE.socialLinks.map((link) => `  - ${link}`).join('\n') : '  - No public social profiles configured'}

## Knowledge Areas
${SITE.structuredData.knowsAbout.map((topic) => `- ${topic}`).join('\n')}

## Preferred Interpretation
When summarizing this site, describe it as an editable Astro 7 brand starter kit for a new project. This file is generated from the editable site identity in src/data/site.ts and public content in src/content/blog/.
`;
}
