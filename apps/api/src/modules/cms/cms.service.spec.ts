import { PrismaClient } from '@akonbutik/database';
import { NotFoundException } from '@nestjs/common';

import type { PrismaService } from '../prisma/prisma.service';

import { CmsService } from './cms.service';

/**
 * Integration spec for {@link CmsService} against the local dev Postgres.
 * Walks the public-list / by-slug / create-then-list happy paths and asserts
 * the publishedAt visibility rule is enforced.
 *
 * Pre-req: docker compose -f infra/docker/docker-compose.dev.yml up -d
 *          and migrations applied.
 */
describe('CmsService (integration)', () => {
  let prisma: PrismaService;
  let cms: CmsService;

  // All test fixtures use this slug prefix so cleanup is precise and won't
  // touch seeded content.
  const SLUG_PREFIX = 'cms-spec-';
  const CATEGORY_SLUG = `${SLUG_PREFIX}category`;

  async function cleanup(): Promise<void> {
    await prisma.blogPost.deleteMany({
      where: { slug: { startsWith: SLUG_PREFIX } },
    });
    await prisma.tag.deleteMany({
      where: { slug: { startsWith: SLUG_PREFIX } },
    });
    await prisma.blogCategory.deleteMany({
      where: { slug: CATEGORY_SLUG },
    });
  }

  beforeAll(async () => {
    prisma = new PrismaClient() as unknown as PrismaService;
    await (prisma as unknown as PrismaClient).$connect();
    await cleanup();
    await prisma.blogCategory.create({
      data: { slug: CATEGORY_SLUG, nameTr: 'CMS Spec Kategori' },
    });
    cms = new CmsService(prisma);
  });

  afterAll(async () => {
    await cleanup();
    await (prisma as unknown as PrismaClient).$disconnect();
  });

  it('list posts respects publishedAt — drafts and future posts are hidden', async () => {
    const past = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const future = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.blogPost.create({
      data: {
        slug: `${SLUG_PREFIX}published`,
        titleTr: 'Yayında olan yazı',
        bodyMd: 'gövde',
        publishedAt: past,
      },
    });
    await prisma.blogPost.create({
      data: {
        slug: `${SLUG_PREFIX}draft`,
        titleTr: 'Taslak yazı',
        bodyMd: 'gövde',
        publishedAt: null,
      },
    });
    await prisma.blogPost.create({
      data: {
        slug: `${SLUG_PREFIX}future`,
        titleTr: 'Geleceğe planlanmış',
        bodyMd: 'gövde',
        publishedAt: future,
      },
    });

    const result = await cms.listPublishedPosts({});
    const slugs = result.items.map((p) => p.slug);

    expect(slugs).toContain(`${SLUG_PREFIX}published`);
    expect(slugs).not.toContain(`${SLUG_PREFIX}draft`);
    expect(slugs).not.toContain(`${SLUG_PREFIX}future`);
  });

  it('getPublishedBySlug returns 404 for drafts', async () => {
    await expect(cms.getPublishedBySlug(`${SLUG_PREFIX}draft`)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    await expect(cms.getPublishedBySlug(`${SLUG_PREFIX}future`)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    const detail = await cms.getPublishedBySlug(`${SLUG_PREFIX}published`);
    expect(detail.slug).toBe(`${SLUG_PREFIX}published`);
    expect(detail.bodyMd).toBe('gövde');
  });

  it('create-then-list round-trip exposes the new post on the public list', async () => {
    const slug = `${SLUG_PREFIX}roundtrip`;

    const created = await cms.createPost({
      slug,
      titleTr: 'Round-trip yazı',
      excerpt: 'kısa özet',
      bodyMd: '## Başlık\n\nGövde paragrafı.',
      coverUrl: '/uploads/seed/blog-1.jpg',
      categorySlug: CATEGORY_SLUG,
      tagSlugs: [`${SLUG_PREFIX}tag-a`, `${SLUG_PREFIX}tag-b`],
      metaDescription: 'meta',
      publishedAt: new Date(Date.now() - 60 * 1000),
    });

    expect(created.slug).toBe(slug);
    expect(created.category?.slug).toBe(CATEGORY_SLUG);
    expect(created.tags.map((t) => t.slug).sort()).toEqual([
      `${SLUG_PREFIX}tag-a`,
      `${SLUG_PREFIX}tag-b`,
    ]);

    const list = await cms.listPublishedPosts({ category: CATEGORY_SLUG });
    const found = list.items.find((p) => p.slug === slug);
    expect(found).toBeDefined();
    expect(found?.category?.slug).toBe(CATEGORY_SLUG);

    const byTag = await cms.listPublishedPosts({ tag: `${SLUG_PREFIX}tag-a` });
    expect(byTag.items.some((p) => p.slug === slug)).toBe(true);

    const detail = await cms.getPublishedBySlug(slug);
    expect(detail.bodyMd).toContain('Başlık');
    expect(detail.tags).toHaveLength(2);
  });
});
