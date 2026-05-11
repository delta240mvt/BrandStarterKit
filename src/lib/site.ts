import { SITE as STARTER_SITE } from '@/data/site';
import type { AnalyticsConfig } from '@/data/site';

export interface SitePresentation {
  slug: string;
  entityType: 'ProfessionalService';
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
  entityType: 'ProfessionalService',
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
  authorName: STARTER_SITE.displayName,
  contactEmail: STARTER_SITE.contact.email,
  socialLinks: STARTER_SITE.socialLinks.map((link) => link.url),
  heroTagline: STARTER_SITE.defaultDescription,
  llmsSummary: STARTER_SITE.defaultDescription,
  analytics: STARTER_SITE.analytics,
  theme: STARTER_SITE.theme,
  structuredData: {
    serviceType: 'Usługi lokalne',
    areaServed: 'Polska',
    knowsAbout: [
      'Strony internetowe',
      'Uslugi lokalne',
      'Marketing lokalny',
      'Obsluga klienta',
      'Blog firmowy',
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
