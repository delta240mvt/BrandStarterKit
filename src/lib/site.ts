import { SITE as STARTER_SITE } from '@/data/site';
import type { AnalyticsConfig } from '@/data/site';

export interface SitePresentation {
  slug: string;
  entityType: 'Organization';
  displayName: string;
  shortName: string;
  locale: 'pl-PL';
  canonicalBaseUrl: string;
  primaryDomain: string;
  defaultTitle: string;
  defaultDescription: string;
  blogTitle: string;
  blogDescription: string;
  articleSuffix: string;
  authorName: string;
  productUrl: string;
  registrationUrl: string;
  contactEmail: string;
  socialLinks: string[];
  heroTagline: string;
  llmsSummary: string;
  analytics: AnalyticsConfig;
  theme: {
    color: string;
    backgroundColor: string;
  };
  structuredData: {
    serviceType: string;
    areaServed: string;
    knowsAbout: string[];
  };
}

export const SITE: SitePresentation = {
  slug: STARTER_SITE.slug,
  entityType: 'Organization',
  displayName: STARTER_SITE.displayName,
  shortName: STARTER_SITE.shortName,
  locale: STARTER_SITE.locale,
  canonicalBaseUrl: STARTER_SITE.canonicalBaseUrl,
  primaryDomain: STARTER_SITE.primaryDomain,
  defaultTitle: STARTER_SITE.defaultTitle,
  defaultDescription: STARTER_SITE.defaultDescription,
  blogTitle: STARTER_SITE.blogTitle,
  blogDescription: STARTER_SITE.blogDescription,
  articleSuffix: STARTER_SITE.articleSuffix,
  authorName: STARTER_SITE.authorName,
  productUrl: STARTER_SITE.productUrl,
  registrationUrl: STARTER_SITE.registrationUrl,
  contactEmail: STARTER_SITE.contact.email,
  socialLinks: STARTER_SITE.socialLinks.map((link) => link.url),
  heroTagline: STARTER_SITE.defaultDescription,
  llmsSummary: STARTER_SITE.defaultDescription,
  analytics: STARTER_SITE.analytics,
  theme: STARTER_SITE.theme,
  structuredData: {
    serviceType: 'Projektowanie i wdrażanie stron internetowych',
    areaServed: 'Polska',
    knowsAbout: [
      'Astro 7',
      'Statyczne strony internetowe',
      'SEO',
      'GEO',
      'Edycja z AI',
    ],
  },
};

export function getSitePresentation(): SitePresentation {
  return SITE;
}

export function absoluteUrl(pathname: string): string {
  const prefixedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalizedPath =
    prefixedPath !== '/' && prefixedPath.endsWith('/') ? prefixedPath.slice(0, -1) : prefixedPath;

  return new URL(normalizedPath, `${SITE.canonicalBaseUrl}/`).toString();
}
