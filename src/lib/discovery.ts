import { absoluteUrl } from '@/lib/site';

export interface DiscoveryIndex {
  sitemap: string;
  rss: string;
  llms: string;
  llmsFull: string;
}

const STATIC_CRAWLABLE_PATHS = ['/', '/blog', '/privacy-policy', '/polityka-prywatnosci'] as const;

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
