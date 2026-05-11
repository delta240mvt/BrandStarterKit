export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavigationConfig {
  main: NavigationItem[];
  footer: NavigationItem[];
}

export const NAVIGATION: NavigationConfig = {
  main: [
    { label: 'Oferta', href: '#oferta' },
    { label: 'Realizacje', href: '#realizacje' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontakt', href: '#kontakt' },
    { label: 'Blog', href: '/blog' },
  ],
  footer: [
    { label: 'Polityka prywatnosci', href: '/polityka-prywatnosci' },
    { label: 'RSS', href: '/rss.xml' },
    { label: 'llms.txt', href: '/llms.txt' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
};
