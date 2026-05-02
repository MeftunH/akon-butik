import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';

import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { SettingsService, type AnnouncementShape } from './settings.service';

/**
 * Admin-side read+write surface for storefront settings. The GET mirrors
 * the public endpoint so the admin form can hydrate from the same shape;
 * the PUT replaces the announcement row in full (no partial updates) to
 * keep the JSON column simple and prevent stale-field bugs.
 */
@ApiTags('admin-settings')
@UseGuards(AdminAuthGuard)
@Controller('admin/settings')
export class AdminSettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get('announcement')
  @ApiOperation({ summary: 'Current announcement (admin view)' })
  async getAnnouncement(): Promise<AnnouncementShape> {
    return this.settings.getAnnouncement();
  }

  @Put('announcement')
  @ApiOperation({ summary: 'Replace the announcement bar settings' })
  async updateAnnouncement(@Body() dto: UpdateAnnouncementDto): Promise<AnnouncementShape> {
    return this.settings.updateAnnouncement(dto);
  }
}
