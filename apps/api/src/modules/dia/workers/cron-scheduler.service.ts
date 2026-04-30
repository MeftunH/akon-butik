import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bullmq';

import {
  DIA_SYNC_QUEUE,
  DIA_SYNC_REPEAT_PATTERNS,
  type DiaSyncJobName,
} from './sync.constants';

/**
 * Registers BullMQ repeatable jobs on app boot. Idempotent —
 * re-running adds no duplicates because each repeat is keyed by name+pattern.
 */
@Injectable()
export class CronSchedulerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CronSchedulerService.name);

  constructor(@InjectQueue(DIA_SYNC_QUEUE) private readonly queue: Queue) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env['DISABLE_DIA_CRON'] === 'true') {
      this.logger.warn('DISABLE_DIA_CRON=true — skipping repeatable job registration');
      return;
    }
    const entries: [DiaSyncJobName, string][] = Object.entries(
      DIA_SYNC_REPEAT_PATTERNS,
    ) as [DiaSyncJobName, string][];
    for (const [name, pattern] of entries) {
      await this.queue.add(
        name,
        {},
        {
          repeat: { pattern },
          jobId: `repeat:${name}`, // stable so we can de-dupe
        },
      );
      this.logger.log(`Scheduled dia-sync:${name} (cron=${pattern})`);
    }
  }
}
