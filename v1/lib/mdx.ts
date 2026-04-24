/**
 * MDX Opt-In Loader
 *
 * Hybrid content system:
 * - Default: content from `content/content.ts` (typed config)
 * - Override: if a section has an MDX file registered below, use it instead
 *
 * Usage:
 *   const section = await loadSection('bio');
 *   if (section.kind === 'mdx') {
 *     const { Component } = section;
 *     return <Component />;
 *   }
 *   return <BioComponent {...section.value} />;
 *
 * To add MDX override for a new section:
 * 1. Create `content/sections/{key}.mdx`
 * 2. Add an entry to `mdxModules` below
 */

import type { FC } from 'react';
import { content } from '@/content/content';

type Content = typeof content;

type LoadedSection<K extends keyof Content> =
  | { kind: 'mdx'; Component: FC }
  | { kind: 'data'; value: Content[K] };

// Static import map — webpack/turbopack can analyze these
const mdxModules: Partial<Record<keyof Content, () => Promise<{ default: FC }>>> = {
  bio: () => import('@/content/sections/bio.mdx'),
};

export async function loadSection<K extends keyof Content>(
  key: K
): Promise<LoadedSection<K>> {
  const loader = mdxModules[key];
  if (loader) {
    try {
      const mod = await loader();
      return { kind: 'mdx', Component: mod.default };
    } catch (error) {
      console.warn(`Failed to load MDX for ${String(key)}, falling back to data`, error);
    }
  }
  return { kind: 'data', value: content[key] };
}
