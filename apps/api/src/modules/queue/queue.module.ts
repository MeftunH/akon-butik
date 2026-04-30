import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { Env } from '../../config/env';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => {
        const url = new URL(config.get('REDIS_URL', { infer: true }));
        return {
          connection: {
            host: url.hostname,
            port: Number.parseInt(url.port || '6379', 10),
            ...(url.password && { password: url.password }),
            ...(url.username && { username: url.username }),
          },
          defaultJobOptions: {
            attempts: 5,
            backoff: { type: 'exponential', delay: 2000 },
            removeOnComplete: { age: 3600, count: 1000 },
            removeOnFail: { age: 24 * 3600 },
          },
        };
      },
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
