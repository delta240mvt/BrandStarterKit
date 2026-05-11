import type { APIRoute } from 'astro';
import { getPublishedPosts } from '@/lib/blog';
import { absoluteUrl, getSitePresentation } from '@/lib/site';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const site = getSitePresentation();
  const posts = await getPublishedPosts();
  const lastBuildDate = posts[0]?.updatedDate ?? posts[0]?.pubDate ?? new Date();

  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid>${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <description>${escapeXml(post.description)}</description>
      <author>${site.contactEmail} (${site.authorName})</author>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.blogTitle)}</title>
    <link>${site.canonicalBaseUrl}</link>
    <description>${escapeXml(site.blogDescription)}</description>
    <language>en</language>
    <copyright>${escapeXml(`© ${new Date().getFullYear()} ${site.displayName}`)}</copyright>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
