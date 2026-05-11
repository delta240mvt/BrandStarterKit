import type { APIRoute } from 'astro';
import { getSitePresentation } from '@/lib/site';

export const GET: APIRoute = async () => {
  const site = getSitePresentation();

  return Response.json({
    name: site.displayName,
    short_name: site.shortName,
    start_url: '/',
    display: 'standalone',
    background_color: site.theme.backgroundColor,
    theme_color: site.theme.color,
    icons: [
      { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  });
};
