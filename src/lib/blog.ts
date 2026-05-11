import { getCollection, type CollectionEntry } from 'astro:content';
import { absoluteUrl } from '@/lib/site';

export const BLOG_PAGE_SIZE = 10;
const WORDS_PER_MINUTE = 200;

type BlogEntry = CollectionEntry<'blog'>;

export interface BlogPost {
  entry: BlogEntry;
  slug: string;
  url: string;
  canonicalUrl: string;
  title: string;
  description: string;
  excerpt: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  draft: boolean;
  heroImage?: string;
  readingTime: number;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return words > 0 ? Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) : 1;
}

function normalizeDescription(description: string): string {
  return description.trim().replace(/\s+/g, ' ');
}

function normalizeTags(tags: string[]): string[] {
  return tags
    .map((tag) => tag.trim())
    .filter((tag): tag is string => tag.length > 0);
}

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

function comparePostsDesc(a: BlogPost, b: BlogPost): number {
  return b.pubDate.getTime() - a.pubDate.getTime();
}

function toBlogPost(entry: BlogEntry): BlogPost {
  const tags = normalizeTags(entry.data.tags ?? []);
  const description = normalizeDescription(entry.data.description);
  const url = `/blog/${entry.slug}`;

  return {
    entry,
    slug: entry.slug,
    url,
    canonicalUrl: absoluteUrl(url),
    title: entry.data.title,
    description,
    excerpt: description,
    pubDate: entry.data.pubDate,
    updatedDate: entry.data.updatedDate,
    tags,
    draft: entry.data.draft ?? false,
    heroImage: entry.data.heroImage,
    readingTime: estimateReadingTime(entry.body),
  };
}

function scoreRelatedPost(source: BlogPost, candidate: BlogPost): number {
  const sourceTags = new Set(source.tags.map(normalizeTag));

  if (sourceTags.size === 0) {
    return 0;
  }

  return candidate.tags.reduce((score, tag) => {
    return score + (sourceTags.has(normalizeTag(tag)) ? 1 : 0);
  }, 0);
}

function clampPositiveInteger(value: number, fallback: number): number {
  if (!Number.isFinite(value) || value < 1) {
    return fallback;
  }

  return Math.floor(value);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);

  return entries.map(toBlogPost).sort(comparePostsDesc);
}

export async function getPublishedTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const tagsByKey = new Map<string, string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const key = normalizeTag(tag);
      if (!tagsByKey.has(key)) {
        tagsByKey.set(key, tag);
      }
    }
  }

  return [...tagsByKey.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, tag]) => tag);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPaginatedPosts(
  page: number,
  pageSize = BLOG_PAGE_SIZE,
  tag?: string,
): Promise<PaginatedPosts> {
  const requestedPage = clampPositiveInteger(page, 1);
  const safePageSize = clampPositiveInteger(pageSize, BLOG_PAGE_SIZE);
  const normalizedTagFilter = tag ? normalizeTag(tag) : '';

  const allPosts = await getPublishedPosts();
  const filteredPosts = normalizedTagFilter
    ? allPosts.filter((post) => post.tags.some((entryTag) => normalizeTag(entryTag) === normalizedTagFilter))
    : allPosts;

  const totalCount = filteredPosts.length;
  const totalPages = totalCount === 0 ? 1 : Math.ceil(totalCount / safePageSize);
  const currentPage = Math.min(requestedPage, totalPages);
  const offset = (currentPage - 1) * safePageSize;

  return {
    posts: filteredPosts.slice(offset, offset + safePageSize),
    page: currentPage,
    pageSize: safePageSize,
    totalPages,
    totalCount,
  };
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const safeLimit = Math.max(0, Math.floor(limit));
  if (safeLimit === 0) {
    return [];
  }

  const posts = await getPublishedPosts();

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: scoreRelatedPost(post, candidate),
    }))
    .sort((a, b) => b.score - a.score || comparePostsDesc(a.post, b.post))
    .slice(0, safeLimit)
    .map(({ post: candidate }) => candidate);
}
