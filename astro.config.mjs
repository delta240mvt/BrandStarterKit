import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

const appDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://focusequalsfreedom.com',
  output: 'hybrid',
  adapter: cloudflare({}),
  integrations: [mdx(), tailwind({ configFile: './tailwind.config.mjs' })],
  vite: {
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(appDir, 'src') },
      ],
    },
  },
});
