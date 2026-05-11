import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildArticleSchema,
  buildCollectionSchema,
  buildHomeSchema,
  buildLegalSchema,
  buildRootSiteGraph,
} from '@/lib/schema';

function graphTypes(schema: { '@graph': Array<Record<string, unknown>> }): string[] {
  return schema['@graph'].map((node) => String(node['@type']));
}

test('buildRootSiteGraph returns stable site and author identifiers', () => {
  const schema = buildRootSiteGraph();
  const json = JSON.stringify(schema);

  assert.equal(schema['@context'], 'https://schema.org');
  assert.match(json, /#website/);
  assert.match(json, /#entity/);
  assert.deepEqual(graphTypes(schema), ['Person', 'WebSite']);
});

test('buildHomeSchema links the homepage to the root site graph', () => {
  const schema = buildHomeSchema();
  const types = graphTypes(schema);
  const webPage = schema['@graph'].find((node) => node['@type'] === 'WebPage');

  assert.ok(types.includes('Person'));
  assert.ok(types.includes('WebSite'));
  assert.ok(types.includes('WebPage'));
  assert.equal(webPage?.['@id'], 'https://focusequalsfreedom.com/#webpage');
  assert.deepEqual(webPage?.isPartOf, { '@id': 'https://focusequalsfreedom.com/#website' });
});

test('buildCollectionSchema differentiates blog index and paginated archives', () => {
  const schema = buildCollectionSchema({
    canonical: 'https://focusequalsfreedom.com/blog/2',
    title: 'Blog | Focus Equals Freedom - Page 2',
    description: 'Notes on deep work',
    page: 2,
  });
  const collection = schema['@graph'].find((node) => node['@type'] === 'CollectionPage');

  assert.equal(collection?.['@id'], 'https://focusequalsfreedom.com/blog/2#collection');
  assert.equal(collection?.name, 'Blog | Focus Equals Freedom - Page 2');
  assert.equal(collection?.pageStart, 2);
});

test('buildArticleSchema links articles to the website and author entity', () => {
  const schema = buildArticleSchema({
    title: 'Hello',
    description: 'World',
    canonical: 'https://focusequalsfreedom.com/blog/hello-focus-equals-freedom',
    publishedAt: '2026-04-17T00:00:00.000Z',
    updatedAt: '2026-04-18T00:00:00.000Z',
    tags: ['Deep Work'],
  });
  const article = schema['@graph'].find((node) => node['@type'] === 'BlogPosting');

  assert.equal(article?.['@id'], 'https://focusequalsfreedom.com/blog/hello-focus-equals-freedom#article');
  assert.deepEqual(article?.author, { '@id': 'https://focusequalsfreedom.com/#entity' });
  assert.deepEqual(article?.publisher, { '@id': 'https://focusequalsfreedom.com/#entity' });
  assert.deepEqual(article?.mainEntityOfPage, {
    '@id': 'https://focusequalsfreedom.com/blog/hello-focus-equals-freedom#webpage',
  });
});

test('buildArticleSchema accepts relative image URLs', () => {
  const schema = buildArticleSchema({
    title: 'Hello',
    description: 'World',
    canonical: '/blog/hello-focus-equals-freedom',
    publishedAt: '2026-04-17T00:00:00.000Z',
    image: '/og-image.png',
  });
  const article = schema['@graph'].find((node) => node['@type'] === 'BlogPosting');

  assert.equal(article?.image, 'https://focusequalsfreedom.com/og-image.png');
});

test('buildLegalSchema exposes current language and translations separately', () => {
  const schema = buildLegalSchema({
    canonical: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'How Focus Equals Freedom handles privacy.',
    language: 'en-US',
    alternates: {
      'en-US': '/privacy-policy',
      'pl-PL': '/polityka-prywatnosci',
    },
  });
  const legal = schema['@graph'].find((node) => node['@type'] === 'WebPage');

  assert.equal(legal?.['@id'], 'https://focusequalsfreedom.com/privacy-policy#webpage');
  assert.equal(legal?.inLanguage, 'en-US');
  assert.deepEqual(legal?.workTranslation, [
    { '@id': 'https://focusequalsfreedom.com/polityka-prywatnosci#webpage', inLanguage: 'pl-PL' },
  ]);
});
