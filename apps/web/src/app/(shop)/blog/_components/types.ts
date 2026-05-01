/**
 * Local shape mirrors of the CMS API contracts. These live in the blog
 * folder rather than `@akonbutik/types` because the CMS surface is still
 * evolving (a parallel stream owns the api side); when it stabilises,
 * promote to the shared package.
 */

export interface BlogCategoryRef {
  slug: string;
  nameTr: string;
}

export interface BlogTagRef {
  slug: string;
  nameTr: string;
}

export interface BlogPostListItem {
  id: string;
  slug: string;
  titleTr: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt: string;
  category: BlogCategoryRef | null;
}

export interface BlogPostListResponse {
  items: readonly BlogPostListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface BlogPostDetail {
  id: string;
  slug: string;
  titleTr: string;
  excerpt: string | null;
  bodyMd: string;
  coverUrl: string | null;
  publishedAt: string;
  metaDescription: string | null;
  category: BlogCategoryRef | null;
  tags: readonly BlogTagRef[];
}

export interface BlogCategory {
  slug: string;
  nameTr: string;
  postCount: number;
}

/**
 * Resolves a possibly-relative cover URL against the public-facing API
 * origin. Posts emit paths like `/uploads/seed/blog-1.jpg`, served by the
 * api app. The storefront's `/api/*` rewrite forwards to that same
 * origin, so prefixing the public base url keeps the URL stable across
 * SSR + client hydration without depending on `next/image` remotePatterns.
 */
export function resolveBlogImage(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  // Read raw env at call time, not part of the zod-validated env block,
  // because the CMS imagery is optional infra in dev.
  // eslint-disable-next-line no-restricted-syntax
  const base = (process.env['NEXT_PUBLIC_API_PUBLIC_BASE_URL'] ?? 'http://localhost:4000').replace(
    /\/$/,
    '',
  );
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
}
