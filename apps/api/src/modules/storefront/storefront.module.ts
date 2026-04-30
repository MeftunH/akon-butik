import { Global, Module } from '@nestjs/common';

import { RevalidationService } from './revalidation.service';

/**
 * Global module exposing storefront-side integrations to the rest of the
 * API — currently just the revalidation hook. Lives in its own module so
 * future storefront-facing concerns (sitemap pings, search index
 * updates, etc.) have a natural home.
 */
@Global()
@Module({
  providers: [RevalidationService],
  exports: [RevalidationService],
})
export class StorefrontModule {}
