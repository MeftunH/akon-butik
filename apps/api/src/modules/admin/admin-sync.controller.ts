import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bullmq';

import { AdminTokenGuard } from '../../common/guards/admin-token.guard';
import { PrismaService } from '../prisma/prisma.service';
import {
  DIA_SYNC_QUEUE,
  type DiaSyncJobName,
} from '../dia/workers/sync.constants';

const SYNC_JOB_NAMES: readonly DiaSyncJobName[] = ['products', 'stock', 'categories'];

@ApiTags('admin')
@ApiSecurity('admin-token')
@UseGuards(AdminTokenGuard)
@Controller('admin')
export class AdminSyncController {
  constructor(
    @InjectQueue(DIA_SYNC_QUEUE) private readonly queue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  @Post('sync/:entity')
  @ApiOperation({ summary: 'Manually trigger a one-off DIA sync run' })
  async trigger(
    @Param('entity') entity: string,
  ): Promise<{ enqueued: DiaSyncJobName; jobId: string | undefined }> {
    if (!SYNC_JOB_NAMES.includes(entity as DiaSyncJobName)) {
      throw new Error(`Unknown sync entity: ${entity}`);
    }
    const job = await this.queue.add(entity as DiaSyncJobName, { manual: true });
    return { enqueued: entity as DiaSyncJobName, jobId: job.id };
  }

  @Get('sync/log')
  @ApiOperation({ summary: 'Recent DIA sync log entries (most recent first)' })
  async log(@Query('limit') limit?: string): Promise<unknown[]> {
    const take = Math.min(Number.parseInt(limit ?? '20', 10) || 20, 200);
    return this.prisma.diaSyncLog.findMany({
      orderBy: { startedAt: 'desc' },
      take,
    });
  }
}
