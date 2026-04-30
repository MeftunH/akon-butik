import { Injectable, Logger } from '@nestjs/common';
// NestJS DI needs the runtime class.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';

import type { Env } from '../../config/env';

/**
 * Best-effort cache-busting hook to the storefront. Called from admin
 * write paths (product edit, image upload, sync trigger) so visitors
 * see fresh data immediately. Failures are logged but never propagated
 * — a stale storefront for 5 minutes is preferable to a 500 in the
 * admin write path.
 *
 * Configuration:
 *   STOREFRONT_REVALIDATE_URL  — e.g. https://akonbutik.com/api/revalidate
 *   REVALIDATE_TOKEN           — shared secret, forwarded as
 *                                x-revalidate-token header.
 *
 * If either is missing in the env (typical in tests / fresh checkouts),
 * `revalidate()` no-ops with a debug log.
 */
@Injectable()
export class RevalidationService {
  private readonly logger = new Logger(RevalidationService.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  async revalidate(targets: { paths?: string[]; tags?: string[] }): Promise<void> {
    const url = this.config.get('STOREFRONT_REVALIDATE_URL', { infer: true });
    const token = this.config.get('REVALIDATE_TOKEN', { infer: true });
    if (!url || !token) {
      this.logger.debug(
        `skip revalidate (url=${String(Boolean(url))} token=${String(Boolean(token))})`,
      );
      return;
    }
    if ((targets.paths?.length ?? 0) === 0 && (targets.tags?.length ?? 0) === 0) {
      return;
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-revalidate-token': token,
        },
        body: JSON.stringify(targets),
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) {
        this.logger.warn(
          `storefront revalidate ${res.status.toString()} for ${JSON.stringify(targets)}`,
        );
        return;
      }
      this.logger.log(`revalidated ${JSON.stringify(targets)}`);
    } catch (err) {
      // Network blips or storefront downtime — never let this throw.
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`storefront revalidate failed: ${msg}`);
    }
  }
}
