import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, type HealthIndicatorResult } from '@nestjs/terminus';
import type { Queue } from 'bullmq';

import { EMAIL_QUEUE } from '../email/email.processor';

/**
 * Liveness check for the Redis connection that backs every BullMQ queue.
 *
 * BullMQ's `Queue` exposes the underlying ioredis `Client` via
 * `client` (a Promise). We `PING` it directly — if Redis is unreachable
 * the connect/ping rejects and Terminus turns that into the typical
 * `{ status: 'down' }` response shape.
 */
@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly queue: Queue) {
    super();
  }

  async ping(key: string): Promise<HealthIndicatorResult> {
    try {
      const client = await this.queue.client;
      const reply = await client.ping();
      const ok = reply === 'PONG';
      const result = this.getStatus(key, ok, { reply });
      if (!ok) {
        throw new HealthCheckError('Redis ping failed', result);
      }
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new HealthCheckError(
        'Redis ping failed',
        this.getStatus(key, false, { error: message }),
      );
    }
  }
}
