# @frinter/client-focusequalsfreedom

Standalone Astro site for the FocusEqualsFreedom marketing/blog surface, built for Cloudflare Pages.

## Extract to a new repository

1. Copy `apps/client-focusequalsfreedom/` into the root of the new repository.
2. Keep the app-owned execution files with the copy:
   - `package.json` for local scripts
   - `wrangler.jsonc` for Cloudflare Pages configuration
3. From the copied directory, run `npm install`.

After extraction, the copied directory can run on its own without the rest of the monorepo.

## Local commands

Run these commands from the extracted app directory, or from `apps/client-focusequalsfreedom` while it still lives in this monorepo:

- `npm run dev` - start the Astro dev server on the local network
- `npm run check` - run Astro type/content checks
- `npm run build` - build the production bundle into `dist/`
- `npm run preview -- --host 127.0.0.1 --port 4321` - serve the built `dist/` bundle with Cloudflare Pages via Wrangler for a local preview
- `npm run deploy` - deploy the built `dist/` bundle to Cloudflare Pages

## Content authoring

Add or edit MDX blog posts in `src/content/blog/`.

## SEO/GEO maintenance

- Run `npm test` before changing metadata, schema, discovery assets, or blog content contracts.
- Run `npm run check` before deploying; it includes the standalone SEO/GEO regression suite.
- Keep canonical URLs, sitemap entries, RSS, `llms.txt`, `llms-full.txt`, and `robots.txt` aligned through the shared helpers in `src/lib/`.
- Use the schema builders in `src/lib/schema.ts` instead of adding ad hoc JSON-LD in page templates.

## Notes

- The app uses the Cloudflare adapter configured in `astro.config.mjs`.
- `package.json` owns the standalone dev/build/preview/deploy entrypoints.
- `wrangler.jsonc` owns the Cloudflare Pages project name, compatibility settings, and build output directory.
