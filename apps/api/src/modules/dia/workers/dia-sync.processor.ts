import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';

import { DiaSyncService } from '../dia-sync.service';

import { DIA_SYNC_QUEUE, type DiaSyncJobName } from './sync.constants';

@Processor(DIA_SYNC_QUEUE, {
  // The DIA single-user constraint means we must NOT run two sync jobs in parallel.
  // BullMQ's per-worker concurrency=1 enforces this.
  concurrency: 1,
})
export class DiaSyncProcessor extends WorkerHost {
  private readonly logger = new Logger(DiaSyncProcessor.name);

  constructor(private readonly sync: DiaSyncService) {
    super();
  }

  override async process(job: Job<unknown, unknown, DiaSyncJobName>): Promise<unknown> {
    this.logger.log(`Picked up job ${job.name} (id=${job.id ?? 'unknown'})`);
    switch (job.name) {
      case 'products':
        return this.sync.syncProducts();
      case 'stock':
        return this.sync.syncStock();
      case 'categories':
        return this.sync.syncCategories();
      default: {
        const exhaustive: never = job.name;
        throw new Error(`unknown sync job: ${String(exhaustive)}`);
      }
    }
  }
}
