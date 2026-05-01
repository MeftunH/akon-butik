import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { DiaModule } from '../dia/dia.module';

import { DiaHealthIndicator } from './dia.health';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './redis.health';

/**
 * The Email module is `@Global()` and exports the BullModule registration
 * for the `email` queue, so we can `@InjectQueue(EMAIL_QUEUE)` from the
 * RedisHealthIndicator without re-registering the queue here. DIA module
 * exports DIA_CLIENT for the DiaHealthIndicator.
 */
@Module({
  imports: [TerminusModule, DiaModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator, DiaHealthIndicator],
})
export class HealthModule {}
