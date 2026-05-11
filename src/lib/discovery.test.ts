import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDiscoveryIndex, getPaginatedBlogArchiveUrls, getStaticCrawlableUrls } from '@/lib/discovery';
import { buildLlmsFullTxt, buildLlmsTxt } from '@/lib/llms';

const TEST_FILE = fileURLToPath(import.meta.url);
const APP_ROOT = path.resolve(path.dirname(TEST_FILE), '..', '..');

test('buildDiscoveryIndex returns canonical machine-readable endpoints', () => {
  const discovery = buildDiscoveryIndex();

  assert.deepEqual(discovery, {
    sitemap: 'https://focusequalsfreedom.com/sitemap.xml',
    rss: 'https://focusequalsfreedom.com/rss.xml',
    llms: 'https://focusequalsfreedom.com/llms.txt',
    llmsFull: 'https://focusequalsfreedom.com/llms-full.txt',
  });
});

test('getStaticCrawlableUrls returns normalized public static routes', () => {
  assert.deepEqual(getStaticCrawlableUrls(), [
    'https://focusequalsfreedom.com/',
    'https://focusequalsfreedom.com/blog',
    'https://focusequalsfreedom.com/privacy-policy',
    'https://focusequalsfreedom.com/polityka-prywatnosci',
  ]);
});

test('getPaginatedBlogArchiveUrls returns archive pages beyond the first blog page', () => {
  assert.deepEqual(getPaginatedBlogArchiveUrls(10, 10), []);
  assert.deepEqual(getPaginatedBlogArchiveUrls(11, 10), ['https://focusequalsfreedom.com/blog/2']);
  assert.deepEqual(getPaginatedBlogArchiveUrls(21, 10), [
    'https://focusequalsfreedom.com/blog/2',
    'https://focusequalsfreedom.com/blog/3',
  ]);
});

test('robots.txt advertises discovery assets from buildDiscoveryIndex', () => {
  const robots = readFileSync(path.join(APP_ROOT, 'public', 'robots.txt'), 'utf8');
  const discovery = buildDiscoveryIndex();

  assert.match(robots, new RegExp(discovery.sitemap.replaceAll('.', '\\.')));
  assert.match(robots, new RegExp(discovery.rss.replaceAll('.', '\\.')));
  assert.match(robots, /https:\/\/focusequalsfreedom\.com\/llms\.txt/);
});

test('robots.txt keeps Sitemap directives limited to sitemap files', () => {
  const robots = readFileSync(path.join(APP_ROOT, 'public', 'robots.txt'), 'utf8');
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
  assert.match(llms, new RegExp(`RSS: ${discovery.rss.replaceAll('.', '\\.')}`));
  assert.match(llmsFull, new RegExp(`Short LLM context: ${discovery.llms.replaceAll('.', '\\.')}`));
});
