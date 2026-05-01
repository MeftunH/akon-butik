import { Pagination } from '@akonbutik/ui';
import type { Metadata } from 'next';
import Link from 'next/link';

import { BlogCard } from './_components/BlogCard';
import { BlogSidebar } from './_components/BlogSidebar';
import { type BlogCategory, type BlogPostListResponse } from './_components/types';

import { api, ApiError } from '@/lib/api';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const PAGE_SIZE = 12;
const RECENT_LIMIT = 5;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Akon Butik blogu: sezon trendleri, stil rehberleri, koleksiyon hikayeleri ve marka notları.',
};

export const revalidate = 300;

function pickFirst(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

async function safeList(query: string): Promise<BlogPostListResponse> {
  try {
    return await api<BlogPostListResponse>(`/cms/posts?${query}`);
  } catch (err) {
    // Tolerate the CMS not yet existing in dev: a 404 from the api app or
    // an outright fetch failure should render the empty state, not crash
    // the storefront. Re-throw on other errors so production keeps its
    // observability signal.
    if (err instanceof ApiError && (err.status === 404 || err.status === 501)) {
      return { items: [], total: 0, page: 1, pageSize: PAGE_SIZE };
    }
    if (err instanceof TypeError) {
      return { items: [], total: 0, page: 1, pageSize: PAGE_SIZE };
    }
    throw err;
  }
}

async function safeCategories(): Promise<readonly BlogCategory[]> {
  try {
    return await api<readonly BlogCategory[]>('/cms/categories');
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 501)) return [];
    if (err instanceof TypeError) return [];
    throw err;
  }
}

/**
 * Storefront blog index. Editorial three-up grid (two-up below xl) with
 * a quiet left rail for category navigation + recent posts, vendor
 * `s-page-title` breadcrumb on top, shared `Pagination` at the bottom.
 *
 * Treats the CMS as best-effort: if the api hasn't shipped yet, we
 * render the empty state with a CTA back to /shop rather than a 500.
 */
export default async function BlogIndexPage({ searchParams }: Props) {
  const params = await searchParams;
  const pageParam = pickFirst(params['page']);
  const categorySlug = pickFirst(params['category']);

  const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : 1;
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const qs = new URLSearchParams();
  qs.set('page', page.toString());
  qs.set('pageSize', PAGE_SIZE.toString());
  if (categorySlug) qs.set('category', categorySlug);

  const [postsResult, categories, recentResult] = await Promise.all([
    safeList(qs.toString()),
    safeCategories(),
    safeList(`page=1&pageSize=${RECENT_LIMIT.toString()}`),
  ]);

  const lastPage = Math.max(1, Math.ceil(postsResult.total / PAGE_SIZE));
  const activeCategory = categorySlug
    ? (categories.find((c) => c.slug === categorySlug) ?? null)
    : null;

  const buildPageHref = (p: number): string => {
    const next = new URLSearchParams();
    if (categorySlug) next.set('category', categorySlug);
    if (p > 1) next.set('page', p.toString());
    const search = next.toString();
    return search ? `/blog?${search}` : '/blog';
  };

  const heading = activeCategory ? activeCategory.nameTr : 'Blog';
  const lead = activeCategory
    ? `${activeCategory.nameTr} kategorisindeki yazılar.`
    : 'Sezon trendleri, stil rehberleri, koleksiyon hikayeleri.';

  return (
    <>
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">{heading}</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link href="/" className="h6 link">
                  Ana Sayfa
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              {activeCategory ? (
                <>
                  <li>
                    <Link href="/blog" className="h6 link">
                      Blog
                    </Link>
                  </li>
                  <li className="d-flex">
                    <i className="icon icon-caret-right" />
                  </li>
                  <li>
                    <h6 className="current-page fw-normal">{activeCategory.nameTr}</h6>
                  </li>
                </>
              ) : (
                <li>
                  <h6 className="current-page fw-normal">Blog</h6>
                </li>
              )}
            </ul>
            <p className="text-muted mt-3 mb-0" style={{ maxWidth: '70ch' }}>
              {lead}
            </p>
          </div>
        </div>
      </section>

      <section className="flat-spacing">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-3 col-lg-4 d-none d-lg-block">
              <BlogSidebar
                categories={categories}
                recentPosts={recentResult.items}
                {...(activeCategory && { activeCategorySlug: activeCategory.slug })}
              />
            </div>

            <div className="col-xl-9 col-lg-8">
              {postsResult.total === 0 ? (
                <div className="py-5 text-center">
                  <p
                    className="lead text-muted mb-4"
                    style={{ maxWidth: '60ch', margin: '0 auto' }}
                  >
                    Blog yazılarımız yakında yayınlanacak. O zamana kadar yeni koleksiyonlara göz
                    atabilirsiniz.
                  </p>
                  <Link href="/shop" className="tf-btn animate-btn fw-semibold">
                    Mağazaya git <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="tf-grid-layout sm-col-2 xl-col-3 row-xl-gap-56">
                    {postsResult.items.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                  <Pagination page={page} lastPage={lastPage} buildHref={buildPageHref} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
