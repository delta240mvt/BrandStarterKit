export interface SitePresentation {
  slug: 'focusequalsfreedom';
  entityType: 'Person';
  displayName: string;
  shortName: string;
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
  structuredData: {
    givenName: string;
    familyName: string;
    jobTitle: string;
    knowsAbout: string[];
  };
}

export const SITE: SitePresentation = {
  slug: 'focusequalsfreedom',
  entityType: 'Person',
  displayName: 'Focus Equals Freedom',
  shortName: 'F=F',
  canonicalBaseUrl: 'https://focusequalsfreedom.com',
  primaryDomain: 'focusequalsfreedom.com',
  defaultTitle: 'Focus Equals Freedom | Deep Work, AI Building, and Intentional Systems',
  defaultDescription:
    'Focus Equals Freedom is the publishing home of Przemyslaw Filipiak: essays, experiments, and practical systems for deep work, AI building, and intentional living.',
  blogTitle: 'Blog | Focus Equals Freedom',
  blogDescription:
    'Notes on deep work, AI product engineering, and building calmer, more intentional systems.',
  articleSuffix: 'Focus Equals Freedom',
  authorName: 'Przemyslaw Filipiak',
  contactEmail: 'hello@focusequalsfreedom.com',
  socialLinks: [
    'https://github.com/delta240mvt',
    'https://www.linkedin.com/in/przemyslaw-filipiak-8a9b77113/',
  ],
  heroTagline: 'Deep work, AI building, and a life designed around signal over noise.',
  llmsSummary:
    'Focus Equals Freedom is a personal publishing site by Przemyslaw Filipiak about deep work, AI product engineering, and intentional systems.',
  structuredData: {
    givenName: 'Przemyslaw',
    familyName: 'Filipiak',
    jobTitle: 'AI Product Engineer and Writer',
    knowsAbout: [
      'Artificial Intelligence',
      'Deep Work',
      'Astro',
      'TypeScript',
      'Product Engineering',
      'Local-first Software',
      'Knowledge Systems',
      'Intentional Living',
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
