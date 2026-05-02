import { Module } from '@nestjs/common';

import { AdminSettingsController } from './admin-settings.controller';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

/**
 * Storefront-visible settings (announcement bar today; site-wide flags
 * and contact metadata in future). Reads are public + cached; writes
 * sit behind AdminAuthGuard. Storage is the shared `Setting` JSON table.
 */
@Module({
  controllers: [SettingsController, AdminSettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
