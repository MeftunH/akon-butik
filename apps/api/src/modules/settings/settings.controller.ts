import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SettingsService, type AnnouncementShape } from './settings.service';

/**
 * Public read endpoints for storefront-visible settings. Cache is set to
 * 60 s so the storefront RSC can hit this every render without flooding
 * the database; admin writes propagate within a minute, which is the
 * acceptable freshness budget for an announcement bar.
 */
@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get('announcement')
  @Header('Cache-Control', 'public, max-age=60')
  @ApiOperation({ summary: 'Current storefront announcement bar contents' })
  async getAnnouncement(): Promise<AnnouncementShape> {
    return this.settings.getAnnouncement();
  }
}
