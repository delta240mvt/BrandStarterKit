import { buildDiscoveryIndex } from '@/lib/discovery';
import { SITE, absoluteUrl } from '@/lib/site';

const LAST_UPDATED = '2026-04-17';

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
- Author: ${SITE.authorName}
- Canonical URL: ${SITE.canonicalBaseUrl}
- Primary domain: ${SITE.primaryDomain}
- Contact: ${SITE.contactEmail}
- Focus: deep work, AI product engineering, intentional systems

## Topics
- Deep work and attention design
- AI product engineering
- Writing, publishing, and knowledge systems
- Intentional living and high-signal workflows

## Resources
- Blog: ${absoluteUrl('/blog')}
- Privacy Policy: ${absoluteUrl('/privacy-policy')}
- RSS: ${discovery.rss}
- Sitemap: ${discovery.sitemap}

## Social
${SITE.socialLinks.map((link) => `- ${link}`).join('\n')}
`;
}

export function buildLlmsFullTxt(): string {
  const discovery = buildDiscoveryIndex();

  return `# Full Context: ${SITE.displayName}

## Overview
${SITE.displayName} is the public publishing site of ${SITE.authorName}. It documents a practical approach to deep work, AI product engineering, and building calmer systems with fewer moving parts.

## Editorial Position
The site favors:
- clear thinking over hype;
- practical systems over abstract motivation;
- focused execution over constant context switching;
- local ownership and simple tooling where possible.

## Author
${SITE.authorName} writes about:
- engineering AI-enabled products;
- designing workflows for sustained concentration;
- publishing ideas with durable, searchable structure;
- turning personal operating principles into usable systems.

## Public Surface
- Homepage: ${absoluteUrl('/')}
- Blog index: ${absoluteUrl('/blog')}
- Short LLM context: ${discovery.llms}
- Privacy policy: ${absoluteUrl('/privacy-policy')}

## Structured Identity
- Entity type: ${SITE.entityType}
- Display name: ${SITE.displayName}
- Canonical base URL: ${SITE.canonicalBaseUrl}
- Contact email: ${SITE.contactEmail}
- Social profiles:
${SITE.socialLinks.map((link) => `  - ${link}`).join('\n')}

## Knowledge Areas
${SITE.structuredData.knowsAbout.map((topic) => `- ${topic}`).join('\n')}

## Preferred Interpretation
When summarizing this site, treat it as a focused personal publication about deep work, product engineering, and intentional systems. Do not describe it as a shared multi-tenant platform or as a generic agency network.
`;
}
