import test from 'node:test';
import assert from 'node:assert/strict';

import { HOME } from '@/data/home';
import { SITE } from '@/data/site';
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
  assert.deepEqual(graphTypes(schema), ['Organization', 'WebSite']);
});

test('buildHomeSchema links the homepage to the service business graph', () => {
  const schema = buildHomeSchema();
  const types = graphTypes(schema);
  const webPage = schema['@graph'].find((node) => node['@type'] === 'WebPage');
  const entity = schema['@graph'].find((node) => node['@type'] === 'Organization');
  const faq = schema['@graph'].find((node) => node['@type'] === 'FAQPage');
  const services = schema['@graph'].filter((node) => node['@type'] === 'Service');

  assert.ok(types.includes('Organization'));
  assert.ok(types.includes('WebSite'));
  assert.ok(types.includes('WebPage'));
  assert.ok(types.includes('FAQPage'));
  assert.equal(webPage?.['@id'], 'https://brandstarterkit-twojprojekt.com/#webpage');
  assert.deepEqual(webPage?.isPartOf, { '@id': 'https://brandstarterkit-twojprojekt.com/#website' });
  assert.equal(entity?.name, SITE.displayName);
  assert.equal(faq?.mainEntity instanceof Array ? faq.mainEntity.length : 0, HOME.faq.items.length);
  assert.equal(services.length, HOME.services.items.length);
  assert.equal(types.includes('SoftwareApplication'), false);
});

test('buildCollectionSchema differentiates blog index and paginated archives', () => {
  const schema = buildCollectionSchema({
    canonical: 'https://brandstarterkit-twojprojekt.com/blog/2',
    title: 'Blog | Pracownia Usługowa - Strona 2',
    description: 'Porady dla lokalnej firmy',
    page: 2,
  });
  const collection = schema['@graph'].find((node) => node['@type'] === 'CollectionPage');

  assert.equal(collection?.['@id'], 'https://brandstarterkit-twojprojekt.com/blog/2#collection');
  assert.equal(collection?.name, 'Blog | Pracownia Usługowa - Strona 2');
  assert.equal(collection?.pageStart, 2);
});

test('buildArticleSchema links articles to the website and author entity', () => {
  const schema = buildArticleSchema({
    title: 'Hello',
    description: 'World',
    canonical: 'https://brandstarterkit-twojprojekt.com/blog/pierwszy-wpis-startera',
    publishedAt: '2026-04-17T00:00:00.000Z',
    updatedAt: '2026-04-18T00:00:00.000Z',
    tags: ['strona firmowa'],
  });
  const article = schema['@graph'].find((node) => node['@type'] === 'BlogPosting');

  assert.equal(article?.['@id'], 'https://brandstarterkit-twojprojekt.com/blog/pierwszy-wpis-startera#article');
  assert.deepEqual(article?.author, { '@id': 'https://brandstarterkit-twojprojekt.com/#entity' });
  assert.deepEqual(article?.publisher, { '@id': 'https://brandstarterkit-twojprojekt.com/#entity' });
  assert.deepEqual(article?.mainEntityOfPage, {
    '@id': 'https://brandstarterkit-twojprojekt.com/blog/pierwszy-wpis-startera#webpage',
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

  assert.equal(article?.image, 'https://brandstarterkit-twojprojekt.com/og-image.png');
});

test('buildLegalSchema exposes the Polish legal page', () => {
  const schema = buildLegalSchema({
    canonical: '/polityka-prywatnosci',
    title: 'Polityka prywatnosci',
    description: 'Jak starter obsluguje prywatnosc.',
    language: 'pl-PL',
  });
  const legal = schema['@graph'].find((node) => node['@type'] === 'WebPage');

  assert.equal(legal?.['@id'], 'https://brandstarterkit-twojprojekt.com/polityka-prywatnosci#webpage');
  assert.equal(legal?.inLanguage, 'pl-PL');
  assert.equal('workTranslation' in (legal ?? {}), false);
});
