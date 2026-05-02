import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import type { UpdateAnnouncementDto } from './dto/update-announcement.dto';

const ANNOUNCEMENT_KEY = 'announcement';

export interface AnnouncementShape {
  message: string | null;
  linkUrl: string | null;
  linkLabel: string | null;
  enabled: boolean;
  updatedAt: string;
}

interface StoredAnnouncement {
  message?: string | null;
  linkUrl?: string | null;
  linkLabel?: string | null;
  enabled?: boolean;
}

/**
 * Storefront announcement settings, persisted as a single JSON row on the
 * shared `Setting` table (key='announcement'). The row is created lazily on
 * first PUT so a fresh deploy starts with `enabled=false` regardless of
 * whether the seed touched the table.
 *
 * The shape returned to consumers (public storefront and admin form) is
 * identical so the admin form can reuse the public DTO; the only divergence
 * is the cache header set at the controller layer.
 */
@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAnnouncement(): Promise<AnnouncementShape> {
    const row = await this.prisma.setting.findUnique({ where: { key: ANNOUNCEMENT_KEY } });
    if (!row) {
      return {
        message: null,
        linkUrl: null,
        linkLabel: null,
        enabled: false,
        updatedAt: new Date(0).toISOString(),
      };
    }
    const stored = parseStored(row.value);
    return {
      message: stored.message ?? null,
      linkUrl: stored.linkUrl ?? null,
      linkLabel: stored.linkLabel ?? null,
      enabled: Boolean(stored.enabled),
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  async updateAnnouncement(input: UpdateAnnouncementDto): Promise<AnnouncementShape> {
    const value: StoredAnnouncement = {
      message: input.message?.trim() ? input.message.trim() : null,
      linkUrl: input.linkUrl?.trim() ? input.linkUrl.trim() : null,
      linkLabel: input.linkLabel?.trim() ? input.linkLabel.trim() : null,
      enabled: input.enabled,
    };
    const row = await this.prisma.setting.upsert({
      where: { key: ANNOUNCEMENT_KEY },
      // `value` is a Prisma.JsonValue column; an explicit cast keeps
      // strict-mode TS happy without pulling Prisma's generated namespace
      // into the service surface.
      create: { key: ANNOUNCEMENT_KEY, value: value as unknown as object },
      update: { value: value as unknown as object },
    });
    return {
      message: value.message ?? null,
      linkUrl: value.linkUrl ?? null,
      linkLabel: value.linkLabel ?? null,
      enabled: Boolean(value.enabled),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}

function parseStored(raw: unknown): StoredAnnouncement {
  if (raw === null || typeof raw !== 'object') return {};
  const obj = raw as Record<string, unknown>;
  return {
    message: typeof obj['message'] === 'string' ? (obj['message'] as string) : null,
    linkUrl: typeof obj['linkUrl'] === 'string' ? (obj['linkUrl'] as string) : null,
    linkLabel: typeof obj['linkLabel'] === 'string' ? (obj['linkLabel'] as string) : null,
    enabled: obj['enabled'] === true,
  };
}
