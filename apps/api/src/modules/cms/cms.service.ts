import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

// NestJS DI requires the runtime class — `import type` would silently break startup.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

import type { AdminListPostsQuery } from './dto/admin-list-posts.query';
import type { CreatePostDto } from './dto/create-post.dto';
import type { ListPostsQuery } from './dto/list-posts.query';
import type { UpdatePostDto } from './dto/update-post.dto';

export interface BlogCategoryRef {
  slug: string;
  nameTr: string;
}

export interface BlogTagRef {
  slug: string;
  name: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  titleTr: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt: string | null;
  category: BlogCategoryRef | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  bodyMd: string;
  metaDescription: string | null;
  tags: readonly BlogTagRef[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoryWithCount extends BlogCategoryRef {
  postCount: number;
}

export interface PaginatedPosts<T> {
  items: readonly T[];
  total: number;
  page: number;
  pageSize: number;
}

const DEFAULT_PUBLIC_PAGE_SIZE = 12;
const DEFAULT_ADMIN_PAGE_SIZE = 20;

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Public storefront queries ────────────────────────────────────────

  async listPublishedPosts(query: ListPostsQuery): Promise<PaginatedPosts<BlogPostSummary>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? DEFAULT_PUBLIC_PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    const now = new Date();

    const where = {
      publishedAt: { lte: now, not: null },
      ...(query.category && { category: { slug: query.category } }),
      ...(query.tag && { tags: { some: { slug: query.tag } } }),
    };

    const [rows, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: pageSize,
        include: {
          category: { select: { slug: true, nameTr: true } },
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      items: rows.map((p) => toSummary(p)),
      total,
      page,
      pageSize,
    };
  }

  async getPublishedBySlug(slug: string): Promise<BlogPostDetail> {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: { select: { slug: true, nameTr: true } },
        tags: { select: { slug: true, name: true } },
      },
    });
    if (!post || post.publishedAt === null || post.publishedAt > new Date()) {
      throw new NotFoundException(`Yazı bulunamadı: ${slug}`);
    }
    return toDetail(post);
  }

  async listCategories(): Promise<readonly BlogCategoryWithCount[]> {
    const now = new Date();
    const rows = await this.prisma.blogCategory.findMany({
      orderBy: { nameTr: 'asc' },
      select: {
        slug: true,
        nameTr: true,
        _count: {
          select: { posts: { where: { publishedAt: { lte: now, not: null } } } },
        },
      },
    });
    return rows.map((r) => ({
      slug: r.slug,
      nameTr: r.nameTr,
      postCount: r._count.posts,
    }));
  }

  // ─── Admin queries / mutations ────────────────────────────────────────

  async adminListPosts(query: AdminListPostsQuery): Promise<PaginatedPosts<BlogPostDetail>> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? DEFAULT_ADMIN_PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    const status = query.status ?? 'all';
    const now = new Date();

    const where = {
      ...(status === 'draft' && {
        OR: [{ publishedAt: null }, { publishedAt: { gt: now } }],
      }),
      ...(status === 'published' && {
        publishedAt: { lte: now, not: null },
      }),
      ...(query.category && { category: { slug: query.category } }),
      ...(query.tag && { tags: { some: { slug: query.tag } } }),
    };

    const [rows, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
        skip,
        take: pageSize,
        include: {
          category: { select: { slug: true, nameTr: true } },
          tags: { select: { slug: true, name: true } },
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      items: rows.map((p) => toDetail(p)),
      total,
      page,
      pageSize,
    };
  }

  async adminGetById(id: string): Promise<BlogPostDetail> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: { select: { slug: true, nameTr: true } },
        tags: { select: { slug: true, name: true } },
      },
    });
    if (!post) throw new NotFoundException(`Yazı bulunamadı: ${id}`);
    return toDetail(post);
  }

  async createPost(dto: CreatePostDto): Promise<BlogPostDetail> {
    const existing = await this.prisma.blogPost.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException(`Slug zaten kullanılıyor: ${dto.slug}`);
    }

    const categoryId = dto.categorySlug ? await this.resolveCategoryId(dto.categorySlug) : null;
    const tagIds = await this.upsertTagsBySlug(dto.tagSlugs ?? []);

    const created = await this.prisma.blogPost.create({
      data: {
        slug: dto.slug,
        titleTr: dto.titleTr,
        excerpt: dto.excerpt ?? null,
        bodyMd: dto.bodyMd,
        coverUrl: dto.coverUrl ?? null,
        metaDescription: dto.metaDescription ?? null,
        publishedAt: dto.publishedAt ?? null,
        ...(categoryId && { category: { connect: { id: categoryId } } }),
        ...(tagIds.length > 0 && {
          tags: { connect: tagIds.map((id) => ({ id })) },
        }),
      },
      include: {
        category: { select: { slug: true, nameTr: true } },
        tags: { select: { slug: true, name: true } },
      },
    });

    return toDetail(created);
  }

  async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostDetail> {
    const current = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!current) throw new NotFoundException(`Yazı bulunamadı: ${id}`);

    if (dto.slug !== undefined && dto.slug !== current.slug) {
      const conflict = await this.prisma.blogPost.findUnique({ where: { slug: dto.slug } });
      if (conflict) throw new ConflictException(`Slug zaten kullanılıyor: ${dto.slug}`);
    }

    let categoryConnect: { connect: { id: string } } | { disconnect: true } | undefined;
    if (dto.categorySlug !== undefined) {
      if (dto.categorySlug === null) {
        categoryConnect = { disconnect: true };
      } else {
        const categoryId = await this.resolveCategoryId(dto.categorySlug);
        categoryConnect = { connect: { id: categoryId } };
      }
    }

    let tagsUpdate: { set: { id: string }[] } | undefined;
    if (dto.tagSlugs !== undefined) {
      const tagIds = await this.upsertTagsBySlug(dto.tagSlugs);
      tagsUpdate = { set: tagIds.map((tagId) => ({ id: tagId })) };
    }

    const updated = await this.prisma.blogPost.update({
      where: { id },
      data: {
        ...(dto.slug !== undefined && { slug: dto.slug }),
        ...(dto.titleTr !== undefined && { titleTr: dto.titleTr }),
        ...(dto.excerpt !== undefined && { excerpt: dto.excerpt }),
        ...(dto.bodyMd !== undefined && { bodyMd: dto.bodyMd }),
        ...(dto.coverUrl !== undefined && { coverUrl: dto.coverUrl }),
        ...(dto.metaDescription !== undefined && { metaDescription: dto.metaDescription }),
        ...(dto.publishedAt !== undefined && { publishedAt: dto.publishedAt }),
        ...(categoryConnect && { category: categoryConnect }),
        ...(tagsUpdate && { tags: tagsUpdate }),
      },
      include: {
        category: { select: { slug: true, nameTr: true } },
        tags: { select: { slug: true, name: true } },
      },
    });

    return toDetail(updated);
  }

  async deletePost(id: string): Promise<{ ok: true }> {
    const existing = await this.prisma.blogPost.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException(`Yazı bulunamadı: ${id}`);
    await this.prisma.blogPost.delete({ where: { id } });
    return { ok: true };
  }

  // ─── helpers ──────────────────────────────────────────────────────────

  private async resolveCategoryId(slug: string): Promise<string> {
    const cat = await this.prisma.blogCategory.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!cat) throw new NotFoundException(`Kategori bulunamadı: ${slug}`);
    return cat.id;
  }

  private async upsertTagsBySlug(slugs: readonly string[]): Promise<string[]> {
    if (slugs.length === 0) return [];
    const ids: string[] = [];
    for (const slug of slugs) {
      const tag = await this.prisma.tag.upsert({
        where: { slug },
        create: { slug, name: slug },
        update: {},
        select: { id: true },
      });
      ids.push(tag.id);
    }
    return ids;
  }
}

// ─── row → DTO mappers (kept private to the module) ────────────────────

interface PostRowSummary {
  id: string;
  slug: string;
  titleTr: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt: Date | null;
  category: { slug: string; nameTr: string } | null;
}

interface PostRowDetail extends PostRowSummary {
  bodyMd: string;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags?: { slug: string; name: string }[];
}

function toSummary(row: PostRowSummary): BlogPostSummary {
  return {
    id: row.id,
    slug: row.slug,
    titleTr: row.titleTr,
    excerpt: row.excerpt,
    coverUrl: row.coverUrl,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    category: row.category ? { slug: row.category.slug, nameTr: row.category.nameTr } : null,
  };
}

function toDetail(row: PostRowDetail): BlogPostDetail {
  return {
    ...toSummary(row),
    bodyMd: row.bodyMd,
    metaDescription: row.metaDescription,
    tags: (row.tags ?? []).map((t) => ({ slug: t.slug, name: t.name })),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
