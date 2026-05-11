import { SITE, absoluteUrl } from '@/lib/site';

type SchemaValue =
  | string
  | number
  | boolean
  | null
  | SchemaNode
  | SchemaValue[];

export interface SchemaNode {
  [key: string]: SchemaValue;
}

export interface SchemaGraph {
  '@context': 'https://schema.org';
  '@graph': SchemaNode[];
}

export interface CollectionSchemaInput {
  canonical: string;
  title: string;
  description: string;
  page?: number;
}

export interface ArticleSchemaInput {
  canonical: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  image?: string;
}

export interface LegalSchemaInput {
  canonical: string;
  title: string;
  description: string;
  language: string;
  alternates?: Record<string, string>;
}

const ENTITY_ID = absoluteUrl('/#entity');
const WEBSITE_ID = absoluteUrl('/#website');

function normalizeSchemaUrl(url: string): string {
  const parsed = /^https?:\/\//i.test(url) ? new URL(url) : new URL(url, `${SITE.canonicalBaseUrl}/`);

  if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }

  return parsed.toString();
}

function graph(nodes: SchemaNode[]): SchemaGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

function rootNodes(): SchemaNode[] {
  return [
    {
      '@type': 'Person',
      '@id': ENTITY_ID,
      name: SITE.authorName,
      givenName: SITE.structuredData.givenName,
      familyName: SITE.structuredData.familyName,
      jobTitle: SITE.structuredData.jobTitle,
      url: SITE.canonicalBaseUrl,
      sameAs: SITE.socialLinks,
      knowsAbout: SITE.structuredData.knowsAbout,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE.displayName,
      alternateName: SITE.shortName,
      url: SITE.canonicalBaseUrl,
      description: SITE.defaultDescription,
      publisher: { '@id': ENTITY_ID },
      author: { '@id': ENTITY_ID },
      inLanguage: 'en-US',
    },
  ];
}

function breadcrumb(items: Array<{ name: string; item: string }>): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: normalizeSchemaUrl(item.item),
    })),
  };
}

export function buildRootSiteGraph(): SchemaGraph {
  return graph(rootNodes());
}

export function buildHomeSchema(): SchemaGraph {
  return graph([
    ...rootNodes(),
    {
      '@type': 'WebPage',
      '@id': absoluteUrl('/#webpage'),
      url: absoluteUrl('/'),
      name: SITE.defaultTitle,
      description: SITE.defaultDescription,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ENTITY_ID },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl('/og-image.png'),
      },
      inLanguage: 'en-US',
    },
    breadcrumb([{ name: 'Home', item: SITE.canonicalBaseUrl }]),
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://frinter.app/#software',
      name: 'frinter.app',
      alternateName: 'frinter.',
      description:
        'A WholeBeing performance system for High Performers - measuring Focus Sprints (Frints), energy tracking, and life-sphere balance.',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web, Windows, macOS, Linux',
      author: { '@id': ENTITY_ID },
      url: 'https://frinter.app',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://pypi.org/project/frinterflow/#software',
      name: 'FrinterFlow',
      description:
        'Local voice dictation CLI using faster-whisper. zero cloud, zero subscription, works offline.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      author: { '@id': ENTITY_ID },
      url: 'https://pypi.org/project/frinterflow/',
    },
  ]);
}

export function buildCollectionSchema(input: CollectionSchemaInput): SchemaGraph {
  const canonical = normalizeSchemaUrl(input.canonical);

  return graph([
    ...rootNodes(),
    {
      '@type': 'CollectionPage',
      '@id': `${canonical}#collection`,
      url: canonical,
      name: input.title,
      description: input.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ENTITY_ID },
      inLanguage: 'en-US',
      ...(input.page ? { pageStart: input.page } : {}),
    },
    breadcrumb([
      { name: 'Home', item: SITE.canonicalBaseUrl },
      { name: 'Blog', item: absoluteUrl('/blog') },
      ...(input.page ? [{ name: `Page ${input.page}`, item: canonical }] : []),
    ]),
  ]);
}

export function buildArticleSchema(input: ArticleSchemaInput): SchemaGraph {
  const canonical = normalizeSchemaUrl(input.canonical);

  return graph([
    ...rootNodes(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: input.title,
      description: input.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': `${canonical}#article` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: input.title,
      description: input.description,
      url: canonical,
      datePublished: input.publishedAt,
      dateModified: input.updatedAt ?? input.publishedAt,
      keywords: input.tags ?? [],
      image: input.image ? normalizeSchemaUrl(input.image) : absoluteUrl('/og-image.png'),
      author: { '@id': ENTITY_ID },
      publisher: { '@id': ENTITY_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      inLanguage: 'en-US',
    },
    breadcrumb([
      { name: 'Home', item: SITE.canonicalBaseUrl },
      { name: 'Blog', item: absoluteUrl('/blog') },
      { name: input.title, item: canonical },
    ]),
  ]);
}

export function buildLegalSchema(input: LegalSchemaInput): SchemaGraph {
  const canonical = normalizeSchemaUrl(input.canonical);
  const translations = Object.entries(input.alternates ?? {})
    .filter(([, href]) => normalizeSchemaUrl(href) !== canonical)
    .map(([language, href]) => ({
      '@id': `${normalizeSchemaUrl(href)}#webpage`,
      inLanguage: language,
    }));

  return graph([
    ...rootNodes(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: input.title,
      description: input.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ENTITY_ID },
      inLanguage: input.language,
      ...(translations.length > 0 ? { workTranslation: translations } : {}),
    },
  ]);
}
