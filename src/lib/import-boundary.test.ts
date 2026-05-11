import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const TEST_FILE = fileURLToPath(import.meta.url);
const APP_ROOT = path.resolve(path.dirname(TEST_FILE), '..', '..');
const SRC_ROOT = path.join(APP_ROOT, 'src');
const REPO_ROOT = path.resolve(APP_ROOT, '..', '..');
const RESOLVABLE_EXTENSIONS = ['.astro', '.ts', '.tsx', '.js', '.mjs', '.mdx', '.css', '.json'];
const EXPLICIT_SHARED_SPECIFIERS = new Set(['@/lib/site-config', '@/lib/internal-api']);
function isGuardedPublicSurfaceFile(relativeFile: string): boolean {
  if (relativeFile.startsWith('src/components/admin/')) {
    return false;
  }

  if (relativeFile.startsWith('src/pages/admin/') || relativeFile.startsWith('src/pages/api/')) {
    return false;
  }

  return (
    relativeFile.startsWith('src/components/') ||
    relativeFile.startsWith('src/lib/') ||
    relativeFile.startsWith('src/pages/') ||
    relativeFile.startsWith('src/utils/')
  );
}

function extractModuleSpecifiers(content: string): string[] {
  const specifiers: string[] = [];
  const staticImportExportRe =
    /(?:^|[;\r\n])\s*(?:import|export)\s+[\s\S]*?\s+from\s+['"]([^'"]+)['"]/gm;
  const dynamicImportRe = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

  for (const match of content.matchAll(staticImportExportRe)) {
    if (match[1]) specifiers.push(match[1]);
  }

  for (const match of content.matchAll(dynamicImportRe)) {
    if (match[1]) specifiers.push(match[1]);
  }

  return specifiers;
}

function resolveExistingModule(basePath: string): string | null {
  const candidates = path.extname(basePath)
    ? [basePath]
    : [
        basePath,
        ...RESOLVABLE_EXTENSIONS.map((extension) => `${basePath}${extension}`),
        ...RESOLVABLE_EXTENSIONS.map((extension) => path.join(basePath, `index${extension}`)),
      ];

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function resolveAppSpecifier(fromFile: string, specifier: string): string | null {
  if (specifier.startsWith('@/')) {
    return resolveExistingModule(path.resolve(SRC_ROOT, specifier.slice(2)));
  }
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    return resolveExistingModule(path.resolve(path.dirname(fromFile), specifier));
  }
  return null;
}

function resolveSharedRepoSpecifier(specifier: string): string | null {
  if (!specifier.startsWith('@/')) {
    return null;
  }

  return resolveExistingModule(path.resolve(REPO_ROOT, 'src', specifier.slice(2)));
}

function isWorkspacePackageImport(specifier: string): boolean {
  return specifier.startsWith('@frinter/');
}

function walk(dir: string): string[] {
  const entries = readdirSync(dir).sort();
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (/\.(astro|ts|tsx|js|mjs|mdx)$/.test(entry)) files.push(fullPath);
  }
  return files;
}

test('extractModuleSpecifiers matches multiline import and export-from statements', () => {
  const content = `
    import {
      alpha,
      beta,
    } from 'node:fs';

    export {
      gamma,
      delta,
    } from 'node:path';
  `;

  assert.deepEqual(extractModuleSpecifiers(content), ['node:fs', 'node:path']);
});

test('client-focusequalsfreedom has no imports to shared backend or monorepo-only runtime modules', () => {
  const offenders: string[] = [];
  for (const file of walk(SRC_ROOT)) {
    const relativeFile = path.relative(APP_ROOT, file).replace(/\\/g, '/');
    if (!isGuardedPublicSurfaceFile(relativeFile)) {
      continue;
    }

    const content = readFileSync(file, 'utf8');
    for (const specifier of extractModuleSpecifiers(content)) {
      if (!specifier) continue;
      const resolved = resolveAppSpecifier(file, specifier);
      if (resolved) {
        if (!resolved.startsWith(APP_ROOT)) {
          offenders.push(
            `${relativeFile} -> ${specifier} resolved outside app: ${path.relative(REPO_ROOT, resolved)}`,
          );
        }
        continue;
      }

      if (specifier.startsWith('@/')) {
        const sharedTarget = resolveSharedRepoSpecifier(specifier);
        if (EXPLICIT_SHARED_SPECIFIERS.has(specifier)) {
          offenders.push(
            sharedTarget
              ? `${relativeFile} -> ${specifier} is explicitly banned; shared target exists at ${path.relative(REPO_ROOT, sharedTarget)}`
              : `${relativeFile} -> ${specifier} is explicitly banned`,
          );
          continue;
        }
        if (sharedTarget) {
          offenders.push(
            `${relativeFile} -> ${specifier} resolves to repo-root shared code at ${path.relative(REPO_ROOT, sharedTarget)}`,
          );
          continue;
        }
        offenders.push(
          `${relativeFile} -> ${specifier} does not resolve inside ${path.relative(REPO_ROOT, SRC_ROOT)}`,
        );
        continue;
      }

      if (specifier.startsWith('./') || specifier.startsWith('../')) {
        const resolvedRelative = resolveExistingModule(path.resolve(path.dirname(file), specifier));
        if (resolvedRelative && !resolvedRelative.startsWith(APP_ROOT)) {
          offenders.push(
            `${relativeFile} -> ${specifier} resolves outside app at ${path.relative(REPO_ROOT, resolvedRelative)}`,
          );
          continue;
        }
        offenders.push(`${relativeFile} -> ${specifier} does not resolve to an app-owned file`);
        continue;
      }

      if (isWorkspacePackageImport(specifier)) {
        offenders.push(`${relativeFile} -> ${specifier} imports a workspace package`);
      }
    }
  }
  offenders.sort();
  assert.deepEqual(offenders, []);
});
