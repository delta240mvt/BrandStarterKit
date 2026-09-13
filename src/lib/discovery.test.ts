import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildDiscoveryIndex,
  buildRobotsTxt,
  getPaginatedBlogArchiveUrls,
  getStaticCrawlableUrls,
} from '@/lib/discovery';
import { buildLlmsFullTxt, buildLlmsTxt } from '@/lib/llms';

test('buildDiscoveryIndex returns canonical machine-readable endpoints', () => {
  const discovery = buildDiscoveryIndex();

  assert.deepEqual(discovery, {
    sitemap: 'https://delta240mvt.com/sitemap.xml',
    rss: 'https://delta240mvt.com/rss.xml',
    llms: 'https://delta240mvt.com/llms.txt',
    llmsFull: 'https://delta240mvt.com/llms-full.txt',
  });
});

test('getStaticCrawlableUrls returns normalized public static routes', () => {
  assert.deepEqual(getStaticCrawlableUrls(), [
    'https://delta240mvt.com/',
    'https://delta240mvt.com/blog',
    'https://delta240mvt.com/polityka-prywatnosci',
    'https://delta240mvt.com/llms.txt',
    'https://delta240mvt.com/llms-full.txt',
  ]);
});

test('getPaginatedBlogArchiveUrls only returns archive pages beyond the first blog page', () => {
  assert.deepEqual(getPaginatedBlogArchiveUrls(9, 10), []);
  assert.deepEqual(getPaginatedBlogArchiveUrls(10, 10), []);
  assert.deepEqual(getPaginatedBlogArchiveUrls(11, 10), ['https://delta240mvt.com/blog/2']);
  assert.deepEqual(getPaginatedBlogArchiveUrls(21, 10), [
    'https://delta240mvt.com/blog/2',
    'https://delta240mvt.com/blog/3',
  ]);
});

test('buildRobotsTxt advertises discovery assets from buildDiscoveryIndex', () => {
  const robots = buildRobotsTxt();
  const discovery = buildDiscoveryIndex();

  assert.match(robots, new RegExp(discovery.sitemap.replaceAll('.', '\\.')));
  assert.match(robots, new RegExp(discovery.rss.replaceAll('.', '\\.')));
  assert.match(robots, /https:\/\/delta240mvt\.com\/llms\.txt/);
});

test('buildRobotsTxt keeps Sitemap directives limited to sitemap files', () => {
  const robots = buildRobotsTxt();
  const discovery = buildDiscoveryIndex();
  const sitemapDirectives = [...robots.matchAll(/^Sitemap:\s+(.+)$/gm)].map((match) => match[1]);

  assert.deepEqual(sitemapDirectives, [discovery.sitemap]);
  assert.match(robots, new RegExp(`RSS: ${discovery.rss.replaceAll('.', '\\.')}`));
});

test('llms text advertises discovery assets from buildDiscoveryIndex', () => {
  const discovery = buildDiscoveryIndex();
  const llms = buildLlmsTxt();
  const llmsFull = buildLlmsFullTxt();

  assert.match(llms, new RegExp(`Sitemap: ${discovery.sitemap.replaceAll('.', '\\.')}`));
  assert.match(llms, new RegExp(`Full-Context: ${discovery.llmsFull.replaceAll('.', '\\.')}`));
  assert.match(llms, /^# .+/m);
  assert.match(llms, new RegExp(`\\[RSS\\]\\(${discovery.rss.replaceAll('.', '\\.')}\\)`));
  assert.match(llmsFull, new RegExp(`Short LLM context: ${discovery.llms.replaceAll('.', '\\.')}`));
});
