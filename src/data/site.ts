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
  slug: 'twoj-brand-starter-kit',
  displayName: 'Twój Brand Starter Kit',
  shortName: 'Brand Starter Kit',
  locale: 'pl-PL',
  canonicalBaseUrl: 'https://brandstarterkit-twojprojekt.com',
  primaryDomain: 'brandstarterkit-twojprojekt.com',
  defaultTitle: 'Twój Brand Starter Kit | Szablon strony Astro 7 dla nowego projektu',
  defaultDescription:
    'Twój Brand Starter Kit to statyczny szablon strony w Astro 7 dla nowego projektu, startupu lub marki osobistej.',
  blogTitle: 'Blog | Twój Brand Starter Kit',
  blogDescription:
    'Aktualności, poradniki i materiały związane z rozwojem nowego projektu.',
  articleSuffix: 'Twój Brand Starter Kit',
  authorName: 'Twój zespół',
  productUrl: 'https://brandstarterkit-twojprojekt.com',
  registrationUrl: 'https://brandstarterkit-twojprojekt.com',
  contact: {
    email: 'hello@brandstarterkit-twojprojekt.com',
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
