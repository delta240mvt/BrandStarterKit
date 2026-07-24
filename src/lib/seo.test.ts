import test from 'node:test';
import assert from 'node:assert/strict';

import { SITE } from '@/data/site';
import { createPageSeo, DEFAULT_ROBOTS_DIRECTIVE, formatSocialImageAlt } from '@/lib/seo';

test('createPageSeo normalizes canonical URLs and applies social defaults', () => {
  const seo = createPageSeo({
    type: 'website',
    pathname: '/blog/',
    title: 'Blog',
    description: 'Porady dla lokalnej firmy',
  });

  assert.equal(seo.title, 'Blog');
  assert.equal(seo.description, 'Porady dla lokalnej firmy');
  assert.equal(seo.canonical, 'https://frinter.app/blog');
  assert.equal(seo.robots, DEFAULT_ROBOTS_DIRECTIVE);
  assert.deepEqual(seo.openGraph, {
    type: 'website',
    title: 'Blog',
    description: 'Porady dla lokalnej firmy',
    url: 'https://frinter.app/blog',
    siteName: SITE.displayName,
    image: 'https://frinter.app/og-image.png',
  });
  assert.deepEqual(seo.twitter, {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Porady dla lokalnej firmy',
    image: 'https://frinter.app/og-image.png',
  });
});

test('createPageSeo supports custom robots, article timestamps, and alternates', () => {
  const seo = createPageSeo({
    type: 'article',
    pathname: '/blog/pierwszy-wpis-startera',
    title: 'Hello',
    description: 'World',
    robots: 'noindex, follow',
    publishedAt: '2026-04-17T00:00:00.000Z',
    updatedAt: '2026-04-18T00:00:00.000Z',
    alternates: {
      'en-US': '/privacy-policy/',
      'pl-PL': 'https://frinter.app/polityka-prywatnosci/',
    },
  });

  assert.equal(seo.robots, 'noindex, follow');
  assert.equal(seo.openGraph.type, 'article');
  assert.equal(seo.article?.publishedTime, '2026-04-17T00:00:00.000Z');
  assert.equal(seo.article?.modifiedTime, '2026-04-18T00:00:00.000Z');
  assert.deepEqual(seo.alternates, {
    'en-US': 'https://frinter.app/privacy-policy',
    'pl-PL': 'https://frinter.app/polityka-prywatnosci',
  });
});

test('formatSocialImageAlt avoids duplicating the site name', () => {
  assert.equal(formatSocialImageAlt('Blog'), `Blog — ${SITE.displayName}`);
  assert.equal(
    formatSocialImageAlt(`Blog | ${SITE.displayName}`),
    `Blog | ${SITE.displayName}`,
  );
});
