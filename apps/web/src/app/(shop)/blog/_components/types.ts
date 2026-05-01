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
 * Returns the cover URL as-is. Posts emit paths like
 * `/uploads/seed/blog-1.jpg`, served by the api app at port 4000.
 * Next.js's `/uploads/*` rewrite (apps/web/next.config.ts) proxies
 * those to the api so the storefront sees them same-origin, which
 * keeps the CSP `img-src 'self'` directive happy without per-image
 * prefixing or `next/image` remotePatterns.
 */
export function resolveBlogImage(url: string | null | undefined): string | null {
  return url ?? null;
}
