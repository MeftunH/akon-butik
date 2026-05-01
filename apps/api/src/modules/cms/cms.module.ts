import { Module } from '@nestjs/common';

import { AdminCmsController } from './admin-cms.controller';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

/**
 * Blog / CMS bounded context.
 *
 * Surface:
 *   - Public:  GET /cms/posts, GET /cms/posts/:slug, GET /cms/categories
 *   - Admin:   GET|POST|PATCH|DELETE /admin/cms/posts(/:id)
 *
 * v1 is intentionally minimal — search, comments moderation, and related
 * posts are deferred. The service-only shape (controller → service → Prisma)
 * matches the team's "thin controller, query logic in service" rule for
 * read-mostly modules; the catalog module's full hexagonal split is overkill
 * here.
 */
@Module({
  controllers: [CmsController, AdminCmsController],
  providers: [CmsService],
})
export class CmsModule {}
