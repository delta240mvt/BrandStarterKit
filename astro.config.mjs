import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from 'tailwindcss';

const appDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [mdx()],
  vite: {
    css: {
      postcss: { plugins: [tailwindcss()] },
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(appDir, 'src') },
      ],
    },
  },
});
