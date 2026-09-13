import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
export const prerender = true;
const require = createRequire(import.meta.url);
export function GET() {
  const root = dirname(require.resolve('@hyperframes/core/package.json'));
  return new Response(readFileSync(join(root, 'dist/hyperframe.runtime.iife.js'), 'utf8'), { headers: { 'Content-Type': 'application/javascript; charset=utf-8' } });
}
