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
  slug: 'delta240mvt',
  displayName: 'DELTA240MVT',
  shortName: 'DELTA240MVT',
  locale: 'pl-PL',
  canonicalBaseUrl: 'https://delta240mvt.com',
  primaryDomain: 'delta240mvt.com',
  defaultTitle: 'DELTA240MVT — Twój pomysł. W końcu w działaniu.',
  defaultDescription:
    'Strategia, design i wdrożenie strony dla Twojej marki. Przemysław Filipiak — od pomysłu do publikacji, z pomocą AI.',
  blogTitle: 'Blog | DELTA240MVT',
  blogDescription:
    'Aktualności, poradniki i materiały związane z rozwojem nowego projektu.',
  articleSuffix: 'DELTA240MVT',
  authorName: 'Przemysław Filipiak',
  productUrl: 'https://delta240mvt.com',
  registrationUrl: 'https://delta240mvt.com',
  contact: {
    email: 'delta240mvt@gmail.com',
  },
  socialLinks: [],
  analytics: {
    enabled: false,
  },
  theme: {
    color: '#00D6D8',
    backgroundColor: '#F8F7F3',
  },
};
