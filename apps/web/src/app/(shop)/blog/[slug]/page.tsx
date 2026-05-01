import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogCard } from '../_components/BlogCard';
import { formatBlogDate } from '../_components/format-date';
import { RenderMarkdown } from '../_components/RenderMarkdown';
import {
  resolveBlogImage,
  type BlogPostDetail,
  type BlogPostListResponse,
} from '../_components/types';

import { env } from '@/config/env';
import { api, ApiError } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

const RELATED_LIMIT = 3;

export const revalidate = 300;

async function loadPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    return await api<BlogPostDetail>(`/cms/posts/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

async function loadRelated(
  categorySlug: string | null,
  excludeId: string,
): Promise<BlogPostListResponse['items']> {
  if (!categorySlug) return [];
  try {
    const result = await api<BlogPostListResponse>(
      `/cms/posts?page=1&pageSize=${(RELATED_LIMIT + 1).toString()}&category=${encodeURIComponent(
        categorySlug,
      )}`,
    );
    return result.items.filter((p) => p.id !== excludeId).slice(0, RELATED_LIMIT);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 501)) return [];
    if (err instanceof TypeError) return [];
    throw err;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: 'Yazı bulunamadı' };

  const description = (post.metaDescription ?? post.excerpt ?? '').slice(0, 160);
  const cover = resolveBlogImage(post.coverUrl);

  return {
    title: post.titleTr,
    ...(description && { description }),
    openGraph: {
      type: 'article',
      title: post.titleTr,
      ...(description && { description }),
      ...(cover && { images: [cover] }),
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
    },
  };
}

/**
 * Blog detail page.
 *
 * Layout choices: full-bleed editorial hero with a compressed text column
 * (65–75ch) below for body copy, related posts at the bottom in a 3-up
 * strip. No author byline beyond publication date: Akon Butik posts are
 * institutional, not personal columns, so a "by editor" line would read
 * as filler.
 */
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const related = await loadRelated(post.category?.slug ?? null, post.id);
  const cover = resolveBlogImage(post.coverUrl);
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titleTr,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    ...(cover && { image: [cover] }),
    ...(post.metaDescription && { description: post.metaDescription }),
    ...(post.category && { articleSection: post.category.nameTr }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/blog/${post.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Akon Butik',
      url: base,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page" style={{ maxWidth: '20ch' }}>
              {post.titleTr}
            </h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link href="/" className="h6 link">
                  Ana Sayfa
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <Link href="/blog" className="h6 link">
                  Blog
                </Link>
              </li>
              {post.category && (
                <>
                  <li className="d-flex">
                    <i className="icon icon-caret-right" />
                  </li>
                  <li>
                    <Link
                      href={{ pathname: '/blog', query: { category: post.category.slug } }}
                      className="h6 link"
                    >
                      {post.category.nameTr}
                    </Link>
                  </li>
                </>
              )}
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">{post.titleTr}</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flat-spacing">
        <div className="container">
          <header className="text-center mb-5" style={{ maxWidth: '70ch', margin: '0 auto 3rem' }}>
            {post.category && (
              <p
                className="text-uppercase mb-3 text-muted"
                style={{ letterSpacing: '0.18em', fontSize: '0.8125rem' }}
              >
                {post.category.nameTr}
              </p>
            )}
            <p className="text-muted mb-0">
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            </p>
          </header>

          {cover && (
            <figure className="entry_image mb-5" style={{ maxHeight: '560px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover}
                alt={post.titleTr}
                width={1602}
                height={900}
                className="w-100"
                style={{ objectFit: 'cover', maxHeight: '560px' }}
              />
            </figure>
          )}

          <article
            className="blog-detail_content"
            style={{
              maxWidth: '68ch',
              margin: '0 auto',
              fontSize: '1.0625rem',
              lineHeight: 1.75,
            }}
          >
            {post.excerpt && (
              <p className="lead fw-medium mb-4" style={{ fontSize: '1.25rem' }}>
                {post.excerpt}
              </p>
            )}
            <RenderMarkdown source={post.bodyMd} />

            {post.tags.length > 0 && (
              <div className="tag-post mt-5 pt-4 border-top">
                <p
                  className="title-label text-uppercase text-muted mb-3"
                  style={{ letterSpacing: '0.12em', fontSize: '0.75rem' }}
                >
                  Etiketler
                </p>
                <ul className="tag-list d-flex flex-wrap gap-2 list-unstyled mb-0">
                  {post.tags.map((tag) => (
                    <li key={tag.slug}>
                      <Link href={{ pathname: '/blog', query: { tag: tag.slug } }} className="link">
                        #{tag.nameTr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="flat-spacing pt-0">
          <div className="container">
            <header className="d-flex align-items-baseline justify-content-between mb-4">
              <h2 className="h3 mb-0">Diğer Yazılar</h2>
              <Link href="/blog" className="tf-btn-line">
                Tümünü gör
              </Link>
            </header>
            <div className="tf-grid-layout sm-col-2 lg-col-3 row-xl-gap-56">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
