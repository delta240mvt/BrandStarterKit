import { absoluteUrl } from '@/lib/site';

export interface DiscoveryIndex {
  sitemap: string;
  rss: string;
  llms: string;
  llmsFull: string;
}

const STATIC_CRAWLABLE_PATHS = ['/', '/blog', '/polityka-prywatnosci', '/llms.txt', '/llms-full.txt'] as const;

export function buildDiscoveryIndex(): DiscoveryIndex {
  return {
    sitemap: absoluteUrl('/sitemap.xml'),
    rss: absoluteUrl('/rss.xml'),
    llms: absoluteUrl('/llms.txt'),
    llmsFull: absoluteUrl('/llms-full.txt'),
  };
}

export function getStaticCrawlableUrls(): string[] {
  return STATIC_CRAWLABLE_PATHS.map((pathname) => absoluteUrl(pathname));
}

export function getPaginatedBlogArchiveUrls(totalPosts: number, pageSize: number): string[] {
  if (!Number.isFinite(totalPosts) || !Number.isFinite(pageSize) || totalPosts <= pageSize || pageSize < 1) {
    return [];
  }

  const totalPages = Math.ceil(totalPosts / pageSize);
  const urls: string[] = [];

  for (let page = 2; page <= totalPages; page += 1) {
    urls.push(absoluteUrl(`/blog/${page}`));
  }

  return urls;
}

export function buildRobotsTxt(): string {
  const discovery = buildDiscoveryIndex();

  return `User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: *
Allow: /

# llms.txt: ${discovery.llms}
# llms-full.txt: ${discovery.llmsFull}
# RSS: ${discovery.rss}
Sitemap: ${discovery.sitemap}
`;
}
