import Link from 'next/link';

import { formatBlogDate } from './format-date';
import { resolveBlogImage, type BlogCategory, type BlogPostListItem } from './types';

interface BlogSidebarProps {
  categories: readonly BlogCategory[];
  recentPosts: readonly BlogPostListItem[];
  activeCategorySlug?: string;
}

/**
 * Left rail for blog list pages. Reuses vendor `blog-sidebar` shell so the
 * sticky-top + sidebar-item rhythm comes from the same SCSS as the
 * vendor reference, but trims the search/instagram/banner blocks: search
 * is a v2 feature (no /api/cms/search yet), and the editorial direction
 * for v1 favours fewer modules with more breathing room over a five-tile
 * sidebar that fights the article grid for attention.
 */
export function BlogSidebar({ categories, recentPosts, activeCategorySlug }: BlogSidebarProps) {
  return (
    <aside className="blog-sidebar sidebar-content-wrap sticky-top">
      <div className="sidebar-item">
        <h4 className="sb-title">Kategoriler</h4>
        {categories.length === 0 ? (
          <p className="text-muted mb-0">Henüz kategori yok.</p>
        ) : (
          <ul className="sb-category">
            <li>
              <Link href="/blog" className={`h6 link${activeCategorySlug ? '' : ' fw-bold'}`}>
                Tüm Yazılar
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={{ pathname: '/blog', query: { category: c.slug } }}
                  className={`h6 link${activeCategorySlug === c.slug ? ' fw-bold' : ''}`}
                >
                  {c.nameTr}
                  <span>{c.postCount.toString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-item">
        <h4 className="sb-title">Son Yazılar</h4>
        {recentPosts.length === 0 ? (
          <p className="text-muted mb-0">Henüz yazı yok.</p>
        ) : (
          <ul className="sb-recent">
            {recentPosts.map((post) => {
              const cover = resolveBlogImage(post.coverUrl);
              const href = `/blog/${post.slug}`;
              return (
                <li className="wg-recent hover-img" key={post.id}>
                  <Link href={href} className="image img-style" aria-label={post.titleTr}>
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt={post.titleTr} width={224} height={152} loading="lazy" />
                    ) : (
                      <span aria-hidden className="d-block w-100 h-100 bg-light" />
                    )}
                  </Link>
                  <div className="content">
                    <Link href={href} className="entry_name h6 link">
                      {post.titleTr}
                    </Link>
                    <span className="entry_date text-small">
                      {formatBlogDate(post.publishedAt)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
