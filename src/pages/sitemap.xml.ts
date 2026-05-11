import type { APIRoute } from 'astro';
import { BLOG_PAGE_SIZE, getPublishedPosts } from '@/lib/blog';
import { buildDiscoveryIndex, getPaginatedBlogArchiveUrls, getStaticCrawlableUrls } from '@/lib/discovery';
import { absoluteUrl } from '@/lib/site';

export const GET: APIRoute = async () => {
  const publishedArticles = await getPublishedPosts();

  const today = new Date().toISOString().split('T')[0];
  const discovery = buildDiscoveryIndex();
  const discoveryAssetUrls = [discovery.rss, discovery.llms, discovery.llmsFull];

  const staticUrls = [...new Set([
    ...getStaticCrawlableUrls(),
    ...getPaginatedBlogArchiveUrls(publishedArticles.length, BLOG_PAGE_SIZE),
    ...discoveryAssetUrls,
  ])].map((loc) => ({
    loc,
    lastmod: today,
  }));

  const articleUrls = publishedArticles.map((article) => ({
    loc: absoluteUrl(`/blog/${article.slug}`),
    lastmod: (article.updatedDate ?? article.pubDate).toISOString().split('T')[0],
  }));

  const allUrls = [...staticUrls, ...articleUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
