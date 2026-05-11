import { buildDiscoveryIndex } from '@/lib/discovery';
import { HOME } from '@/data/home';
import { SITE, absoluteUrl } from '@/lib/site';

const LAST_UPDATED = '2026-05-11';

export function buildLlmsTxt(): string {
  const discovery = buildDiscoveryIndex();

  return `---
Sitemap: ${discovery.sitemap}
Full-Context: ${discovery.llmsFull}
Last-Updated: ${LAST_UPDATED}
---

# ${SITE.displayName}

> ${SITE.llmsSummary}

## Core Facts
- Site: ${SITE.displayName}
- Business type: local service business starter
- Canonical URL: ${SITE.canonicalBaseUrl}
- Primary domain: ${SITE.primaryDomain}
- Contact: ${SITE.contactEmail}
- Language: ${SITE.locale}
- Focus: local services, offer clarity, realizations, FAQ, contact, and blog

## Services
${HOME.services.items.map((service) => `- ${service.title}: ${service.description}`).join('\n')}

## Resources
- Blog: ${absoluteUrl('/blog')}
- Privacy Policy: ${absoluteUrl('/polityka-prywatnosci')}
- RSS: ${discovery.rss}
- Sitemap: ${discovery.sitemap}

## Social
${SITE.socialLinks.length > 0 ? SITE.socialLinks.map((link) => `- ${link}`).join('\n') : '- No public social profiles configured'}
`;
}

export function buildLlmsFullTxt(): string {
  const discovery = buildDiscoveryIndex();

  return `# Full Context: ${SITE.displayName}

## Overview
${SITE.displayName} is a Polish starter website for a local service business. It demonstrates a one-page service homepage, permanent blog, Polish privacy policy, and machine-readable discovery assets for a simple client site.

## Homepage Structure
- Hero: ${HOME.hero.title}
- About: ${HOME.about.heading}
- Offer: ${HOME.services.heading}
- Realizations: ${HOME.realizations.heading}
- FAQ: ${HOME.faq.heading}
- Contact: ${HOME.contact.heading}

## Offer
${HOME.services.items.map((service) => `- ${service.title}: ${service.description}`).join('\n')}

## Public Surface
- Homepage: ${absoluteUrl('/')}
- Blog index: ${absoluteUrl('/blog')}
- Short LLM context: ${discovery.llms}
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
When summarizing this site, treat it as a Polish service-business starter for local companies and freelancers. Do not describe it as a personal brand, admin panel, CMS, SaaS platform, or multi-tenant system.
`;
}
