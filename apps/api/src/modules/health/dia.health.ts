import type { DiaClient } from '@akonbutik/dia-client';
import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, type HealthIndicatorResult } from '@nestjs/terminus';

import { DIA_CLIENT } from '../dia/dia.tokens';

/**
 * Liveness check for the DIA ERP integration. Calls `DiaClient.login()`,
 * which is cheap when a session is already cached (just returns) and
 * exercises the full HTTP path on a cold cache. Failures here should
 * not 5xx the API itself — the storefront keeps working from the local
 * Postgres mirror; the deep health endpoint surfaces the issue so an
 * operator can act on it.
 */
@Injectable()
export class DiaHealthIndicator extends HealthIndicator {
  constructor(@Inject(DIA_CLIENT) private readonly dia: DiaClient) {
    super();
  }

  async ping(key: string): Promise<HealthIndicatorResult> {
    const start = Date.now();
    try {
      await this.dia.login();
      return this.getStatus(key, true, { latencyMs: Date.now() - start });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new HealthCheckError(
        'DIA login failed',
        this.getStatus(key, false, { error: message, latencyMs: Date.now() - start }),
      );
    }
  }
}
