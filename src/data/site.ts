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
  slug: 'polski-starter-uslugowy',
  displayName: 'Pracownia Uslugowa',
  shortName: 'Pracownia',
  locale: 'pl-PL',
  canonicalBaseUrl: 'https://example.com',
  primaryDomain: 'example.com',
  defaultTitle: 'Pracownia Uslugowa | Prosta strona dla lokalnej firmy',
  defaultDescription:
    'Polski starter strony uslugowej dla lokalnych firm i freelancerow: oferta, realizacje, FAQ, kontakt i blog.',
  blogTitle: 'Blog | Pracownia Uslugowa',
  blogDescription:
    'Porady, aktualnosci i praktyczne wskazowki dla klientow lokalnej firmy uslugowej.',
  articleSuffix: 'Pracownia Uslugowa',
  contact: {
    email: 'kontakt@example.com',
    phone: '+48 000 000 000',
    address: 'ul. Przykladowa 1, 00-000 Warszawa',
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
