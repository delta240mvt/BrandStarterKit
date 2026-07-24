export type AnalyticsProvider = 'umami' | 'plausible' | 'custom';

export interface AnalyticsConfig {
  enabled: boolean;
  provider?: AnalyticsProvider;
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
  articleSuffix: string;
  authorName: string;
  productUrl: string;
  registrationUrl: string;
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  socialLinks: Array<{
    label: string;
    url: string;
  }>;
  analytics: AnalyticsConfig;
  theme: {
    color: string;
    backgroundColor: string;
  };
}

export const SITE: SiteConfig = {
  // Single source of truth for public identity and machine-readable SEO/GEO copy.
  slug: 'frinter',
  displayName: 'Frinter',
  shortName: 'Frinter',
  locale: 'pl-PL',
  canonicalBaseUrl: 'https://frinter.app',
  primaryDomain: 'frinter.app',
  defaultTitle: 'Frinter | Skupienie, praca głęboka i energia',
  defaultDescription:
    'Frinter to polska aplikacja do skupienia, pracy głębokiej i obserwowania energii dla founderów, twórców i pracowników wiedzy.',
  blogTitle: 'Blog Frinter — skupienie, praca głęboka i energia',
  blogDescription:
    'Polskie artykuły o skupieniu, pracy głębokiej, energii i budowaniu Frintera.',
  articleSuffix: 'Frinter',
  authorName: 'Przemysław Filipiak',
  productUrl: 'https://web.frinter.app',
  registrationUrl: 'https://web.frinter.app/register',
  contact: {
    email: 'hello@frinter.app',
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
