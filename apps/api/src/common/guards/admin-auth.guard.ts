import type { CanActivate } from '@nestjs/common';
import { Injectable, UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { verify, type JwtPayload } from 'jsonwebtoken';

const COOKIE_NAME = 'akon_admin_at';

/**
 * Replaces the legacy `x-admin-token` header guard. Verifies the
 * akon_admin_at JWT cookie issued by AdminAuthService and lets through any
 * caller carrying a valid admin or editor token. Pair with @CurrentAdmin()
 * to read the principal inside the controller.
 *
 * The guard intentionally keeps role policy out of scope — any admin role
 * passes here; per-action enforcement (only `admin` can sync DIA, only
 * `admin` can edit products, etc.) lives at the controller layer once the
 * editor flows arrive.
 */
@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const token = readCookie(req.headers.cookie ?? '', COOKIE_NAME);
    if (!token) throw new UnauthorizedException('Admin oturumu gerekli');
    // The same env value AdminCookieService signs with via ConfigService.
    // Reading it directly here keeps the guard stateless and avoids
    // DI plumbing for a single read. Validated at boot.
    // eslint-disable-next-line no-restricted-syntax
    const secret = process.env['JWT_ACCESS_SECRET'];
    if (!secret) throw new UnauthorizedException('Admin secret missing');
    try {
      const payload = verify(token, secret) as JwtPayload & { role?: string };
      if (payload.role !== 'admin' && payload.role !== 'editor') {
        throw new UnauthorizedException('Yetkisiz');
      }
      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new UnauthorizedException('Geçersiz oturum');
    }
  }
}

function readCookie(header: string, name: string): string | null {
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}
