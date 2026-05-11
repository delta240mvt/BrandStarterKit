import { SITE, absoluteUrl } from '@/lib/site';

export const DEFAULT_ROBOTS_DIRECTIVE =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export type SeoPageType = 'website' | 'article';

export interface SeoAlternates {
  [locale: string]: string;
}

export interface CreatePageSeoInput {
  type: SeoPageType;
  pathname: string;
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  alternates?: SeoAlternates;
}

export interface PageSeo {
  type: SeoPageType;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  openGraph: {
    type: SeoPageType;
    title: string;
    description: string;
    url: string;
    siteName: string;
    image: string;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
  };
  alternates?: SeoAlternates;
}

export function formatSocialImageAlt(title: string, siteName = SITE.displayName): string {
  return title.includes(siteName) ? title : `${title} — ${siteName}`;
}

function normalizeAbsoluteUrl(url: string): string {
  const parsed = new URL(url);

  if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }

  return parsed.toString();
}

function resolveCanonicalUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? normalizeAbsoluteUrl(value) : absoluteUrl(value);
}

function normalizeAlternates(alternates?: SeoAlternates): SeoAlternates | undefined {
  if (!alternates) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(alternates).map(([locale, href]) => [locale, resolveCanonicalUrl(href)]),
  );
}

export function createPageSeo(input: CreatePageSeoInput): PageSeo {
  const canonical = resolveCanonicalUrl(input.canonical ?? input.pathname);
  const image = resolveCanonicalUrl(input.image ?? '/og-image.png');
  const article =
    input.type === 'article'
      ? {
          publishedTime: input.publishedAt,
          modifiedTime: input.updatedAt,
        }
      : undefined;

  return {
    type: input.type,
    title: input.title,
    description: input.description,
    canonical,
    robots: input.robots ?? DEFAULT_ROBOTS_DIRECTIVE,
    openGraph: {
      type: input.type,
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: SITE.displayName,
      image,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      image,
    },
    article,
    alternates: normalizeAlternates(input.alternates),
  };
}
