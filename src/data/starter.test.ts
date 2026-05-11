import test from 'node:test';
import assert from 'node:assert/strict';

import { HOME } from './home';
import { PRIVACY_POLICY } from './legal';
import { NAVIGATION } from './navigation';
import { SITE } from './site';

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
