import { DiaClient } from '@akonbutik/dia-client';
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { Env } from '../../config/env';

import { DiaSyncService } from './dia-sync.service';
import { DIA_CLIENT } from './dia.tokens';
import { CronSchedulerService } from './workers/cron-scheduler.service';
import { DiaSyncProcessor } from './workers/dia-sync.processor';
import { DIA_SYNC_QUEUE } from './workers/sync.constants';

// Re-export for backwards compat with existing importers.
export { DIA_CLIENT } from './dia.tokens';

@Global()
@Module({
  imports: [ConfigModule, BullModule.registerQueue({ name: DIA_SYNC_QUEUE })],
  providers: [
    {
      provide: DIA_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): DiaClient =>
        new DiaClient({
          baseUrl: config.get('DIA_BASE_URL', { infer: true }),
          username: config.get('DIA_USERNAME', { infer: true }),
          password: config.get('DIA_PASSWORD', { infer: true }),
          apiKey: config.get('DIA_API_KEY', { infer: true }),
          firmaKodu: config.get('DIA_FIRMA_KODU', { infer: true }),
          donemKodu: config.get('DIA_DONEM_KODU', { infer: true }),
          disconnectSameUser: true,
        }),
    },
    DiaSyncService,
    DiaSyncProcessor,
    CronSchedulerService,
  ],
  exports: [DIA_CLIENT, DiaSyncService],
})
export class DiaModule {}
