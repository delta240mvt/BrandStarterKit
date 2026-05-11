import { getSitePresentation } from '@/lib/site';

const site = getSitePresentation();

export const GET = async () =>
  new Response(JSON.stringify({ ok: true, siteSlug: process.env.SITE_SLUG ?? site.slug }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
