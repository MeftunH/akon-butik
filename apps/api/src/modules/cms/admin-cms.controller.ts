import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';

// NestJS DI requires the runtime class — `import type` would silently break startup.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { BlogPostDetail, PaginatedPosts } from './cms.service';
import type { CmsService } from './cms.service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AdminListPostsQuery } from './dto/admin-list-posts.query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreatePostDto } from './dto/create-post.dto';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * Editor-only blog CRUD. Mounted under `/admin/cms` and gated by the
 * AdminAuthGuard cookie. Drafts (publishedAt = null) and scheduled posts
 * (publishedAt > now) are visible here; the public controller hides both.
 */
@ApiTags('admin-cms')
@UseGuards(AdminAuthGuard)
@Controller('admin/cms')
export class AdminCmsController {
  constructor(private readonly cms: CmsService) {}

  @Get('posts')
  @ApiOperation({ summary: 'List all blog posts including drafts (admin)' })
  async list(@Query() query: AdminListPostsQuery): Promise<PaginatedPosts<BlogPostDetail>> {
    return this.cms.adminListPosts(query);
  }

  @Get('posts/:id')
  @ApiOperation({ summary: 'Single blog post by id (admin)' })
  async getOne(@Param('id') id: string): Promise<BlogPostDetail> {
    return this.cms.adminGetById(id);
  }

  @Post('posts')
  @ApiOperation({ summary: 'Create a new blog post' })
  async create(@Body() dto: CreatePostDto): Promise<BlogPostDetail> {
    return this.cms.createPost(dto);
  }

  @Patch('posts/:id')
  @ApiOperation({ summary: 'Update an existing blog post' })
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<BlogPostDetail> {
    return this.cms.updatePost(id, dto);
  }

  @Delete('posts/:id')
  @ApiOperation({ summary: 'Delete a blog post' })
  async delete(@Param('id') id: string): Promise<{ ok: true }> {
    return this.cms.deletePost(id);
  }
}
