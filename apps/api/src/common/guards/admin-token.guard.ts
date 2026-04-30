import {
  CanActivate,
  Injectable,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FastifyRequest } from 'fastify';

import type { Env } from '../../config/env';

/**
 * Temporary header guard for admin-only endpoints. Phase 4 replaces this
 * with the real AdminAuth flow (NextAuth / JWT against AdminUser table).
 *
 * Until then: send `x-admin-token: <ADMIN_SYNC_TOKEN>` from the admin UI.
 * The token must be at least 32 chars and lives in `~/private/.env`.
 *
 * TODO(phase-4): replace with AdminAuthGuard.
 */
@Injectable()
export class AdminTokenGuard implements CanActivate {
  constructor(private readonly config: ConfigService<Env, true>) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const provided = req.headers['x-admin-token'];
    const expected = this.config.get('ADMIN_SYNC_TOKEN', { infer: true });
    if (!expected || typeof provided !== 'string' || provided !== expected) {
      throw new UnauthorizedException('Invalid admin token');
    }
    return true;
  }
}
