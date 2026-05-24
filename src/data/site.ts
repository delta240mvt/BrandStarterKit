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
  slug: 'starter-projektowy',
  displayName: 'Twój Projekt',
  shortName: 'Projekt',
  locale: 'pl-PL',
  canonicalBaseUrl: 'https://example.com',
  primaryDomain: 'example.com',
  defaultTitle: 'Twój Projekt | Profesjonalna strona dla Twojej inicjatywy',
  defaultDescription:
    'Nowoczesny starter strony internetowej dla projektów, startupów i niezależnych twórców. Zaprezentuj swoją ofertę i zrealizowane działania.',
  blogTitle: 'Blog | Twój Projekt',
  blogDescription:
    'Aktualności, poradniki i przemyślenia związane z rozwojem naszego projektu.',
  articleSuffix: 'Twój Projekt',
  contact: {
    email: 'kontakt@example.com',
    phone: '+48 000 000 000',
    address: 'ul. Przykładowa 1, 00-000 Warszawa',
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
