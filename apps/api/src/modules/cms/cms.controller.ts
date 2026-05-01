import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

// NestJS DI requires the runtime class — `import type` would silently break startup.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type {
  BlogCategoryWithCount,
  BlogPostDetail,
  BlogPostSummary,
  PaginatedPosts,
} from './cms.service';
import type { CmsService } from './cms.service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ListPostsQuery } from './dto/list-posts.query';

/**
 * Public storefront endpoints. Only published posts (publishedAt <= now) are
 * surfaced; drafts and scheduled posts are hidden.
 */
@ApiTags('cms')
@Controller('cms')
export class CmsController {
  constructor(private readonly cms: CmsService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Paginated list of published blog posts' })
  async listPosts(@Query() query: ListPostsQuery): Promise<PaginatedPosts<BlogPostSummary>> {
    return this.cms.listPublishedPosts(query);
  }

  @Get('posts/:slug')
  @ApiOperation({ summary: 'Full published post by slug — 404 for drafts' })
  @ApiParam({ name: 'slug' })
  async getPost(@Param('slug') slug: string): Promise<BlogPostDetail> {
    return this.cms.getPublishedBySlug(slug);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Blog categories with published-post counts' })
  async listCategories(): Promise<readonly BlogCategoryWithCount[]> {
    return this.cms.listCategories();
  }
}
