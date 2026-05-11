import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { HOME } from './home';
import { PRIVACY_POLICY } from './legal';
import { NAVIGATION } from './navigation';
import { SITE } from './site';

const TEST_FILE = fileURLToPath(import.meta.url);
const APP_ROOT = path.resolve(path.dirname(TEST_FILE), '..', '..');
const SCAN_ROOTS = ['src', 'public'];
const SCAN_FILES = [
  'astro.config.mjs',
  'wrangler.jsonc',
  'package.json',
  'package-lock.json',
  'README.md',
  'scripts/generate-favicons.mjs',
];
const BANNED_TERMS = [
  new RegExp(['Focus', 'Equals', 'Freedom'].join(' '), 'i'),
  new RegExp(['focus', 'equals', 'freedom'].join(''), 'i'),
  new RegExp(['fr', 'inter'].join(''), 'i'),
  new RegExp(['github\\.com\\/delta', '240mvt'].join(''), 'i'),
];

function walkFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = readdirSync(dir).sort();
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

test('starter site config is Polish and analytics are disabled by default', () => {
  assert.equal(SITE.locale, 'pl-PL');
  assert.equal(SITE.analytics.enabled, false);
  assert.match(SITE.contact.email, /@/);
  assert.ok(SITE.canonicalBaseUrl.startsWith('https://'));
});

test('homepage data includes required service sections', () => {
  assert.ok(HOME.hero.title.length > 0);
  assert.ok(HOME.about.heading.length > 0);
  assert.ok(HOME.services.items.length >= 3);
  assert.ok(HOME.realizations.items.length >= 2);
  assert.ok(HOME.faq.items.length >= 3);
  assert.ok(HOME.contact.emailCtaLabel.length > 0);
});

test('navigation points to public Polish starter routes', () => {
  assert.ok(NAVIGATION.main.some((item) => item.href === '#oferta'));
  assert.ok(NAVIGATION.main.some((item) => item.href === '/blog'));
  assert.ok(NAVIGATION.footer.some((item) => item.href === '/polityka-prywatnosci'));
});

test('privacy policy includes the required starter disclaimer', () => {
  assert.match(PRIVACY_POLICY.disclaimer, /przykładowy szablon polityki prywatności/i);
});

test('starter-facing files do not expose old public brand terms', () => {
  const files = [
    ...SCAN_ROOTS.flatMap((root) => walkFiles(path.join(APP_ROOT, root))),
    ...SCAN_FILES.map((file) => path.join(APP_ROOT, file)).filter((file) => existsSync(file)),
  ];
  const offenders: string[] = [];

  for (const file of files) {
    const relativeFile = path.relative(APP_ROOT, file).replace(/\\/g, '/');
    const content = readFileSync(file, 'utf8');

    for (const bannedTerm of BANNED_TERMS) {
      if (bannedTerm.test(content)) {
        offenders.push(relativeFile);
        break;
      }
    }
  }

  assert.deepEqual([...new Set(offenders)].sort(), []);
});
