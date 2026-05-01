import Link from 'next/link';

import { formatBlogDate } from './format-date';
import { resolveBlogImage, type BlogPostListItem } from './types';

interface BlogCardProps {
  post: BlogPostListItem;
}

/**
 * Editorial blog card, derived from vendor `article-blog hover-img4` so
 * the hover-zoom + name-tag styling pulls straight out of the bundled
 * SCSS. Eyebrow shows the category (no eyebrow when uncategorised, to
 * keep the rhythm clean), the title is `h6` to match the vendor's quiet
 * scale, and the read-more sits as a hairline link rather than a button.
 * Keeps the page reading like a magazine spread, not a card grid with
 * five CTAs per row.
 */
export function BlogCard({ post }: BlogCardProps) {
  const cover = resolveBlogImage(post.coverUrl);
  const href = `/blog/${post.slug}`;
  return (
    <article className="article-blog hover-img4">
      <div className="blog-image">
        <Link href={href} className="entry_image img-style4" aria-label={post.titleTr}>
          {cover ? (
            // Plain <img>: vendor SCSS expects this exact tag for its
            // hover-zoom transform; next/image would wrap it in a div
            // and break the `.img-style4 img` selector.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={post.titleTr} width={896} height={968} loading="lazy" />
          ) : (
            <span aria-hidden className="d-block w-100 h-100 bg-light" />
          )}
        </Link>
        {post.category && (
          <div className="entry_tag">
            <Link
              href={{ pathname: '/blog', query: { category: post.category.slug } }}
              className="name-tag h6 link"
            >
              {post.category.nameTr}
            </Link>
          </div>
        )}
      </div>
      <div className="blog-content">
        <Link href={href} className="entry_name link h6">
          {post.titleTr}
        </Link>
        {post.excerpt && <p className="text mt-2 mb-3">{post.excerpt}</p>}
        <p className="entry_date mb-2">{formatBlogDate(post.publishedAt)}</p>
        <Link href={href} className="tf-btn-line">
          Yazıyı oku
        </Link>
      </div>
    </article>
  );
}
