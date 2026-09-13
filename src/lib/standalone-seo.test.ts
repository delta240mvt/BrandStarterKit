import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildRobotsTxt } from '@/lib/discovery';
import { absoluteUrl } from '@/lib/site';

const TEST_FILE = fileURLToPath(import.meta.url);
const APP_ROOT = path.resolve(path.dirname(TEST_FILE), '..', '..');

test('absoluteUrl normalizes trailing slashes for canonical page URLs', () => {
  assert.equal(absoluteUrl('/'), 'https://delta240mvt.com/');
  assert.equal(absoluteUrl('/blog'), 'https://delta240mvt.com/blog');
  assert.equal(absoluteUrl('/blog/'), 'https://delta240mvt.com/blog');
  assert.equal(absoluteUrl('/polityka-prywatnosci/'), 'https://delta240mvt.com/polityka-prywatnosci');
});

test('robots.txt points AI/SEO discovery to configured starter domain', () => {
  const robots = buildRobotsTxt();

  assert.match(robots, /https:\/\/delta240mvt\.com\/llms\.txt/);
  assert.match(robots, /https:\/\/delta240mvt\.com\/sitemap\.xml/);
  assert.match(robots, /https:\/\/delta240mvt\.com\/rss\.xml/);
});

test('package scripts expose and run the standalone regression guard', () => {
  const packageJson = JSON.parse(
    readFileSync(path.join(APP_ROOT, 'package.json'), 'utf8'),
  ) as { scripts?: Record<string, string> };

  assert.match(packageJson.scripts?.test ?? '', /src\/lib\/import-boundary\.test\.ts/);
  assert.match(packageJson.scripts?.test ?? '', /src\/data\/starter\.test\.ts/);
  assert.match(packageJson.scripts?.test ?? '', /src\/lib\/standalone-seo\.test\.ts/);
  assert.match(packageJson.scripts?.test ?? '', /src\/lib\/seo\.test\.ts/);
  assert.match(packageJson.scripts?.test ?? '', /src\/lib\/schema\.test\.ts/);
  assert.match(packageJson.scripts?.test ?? '', /src\/lib\/discovery\.test\.ts/);
  assert.match(packageJson.scripts?.check ?? '', /\bnpm run test\b/);
});
