import { createParamDecorator, UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { verify, type JwtPayload } from 'jsonwebtoken';

const COOKIE_NAME = 'akon_admin_at';

export interface AdminPrincipal {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

/**
 * Reads the akon_admin_at cookie and verifies its JWT signature with the
 * access secret. Returns the admin principal on success, null otherwise.
 *
 * Mirrors current-user.decorator for the customer auth surface but reads
 * a different cookie + payload. AdminAuthGuard rejects requests when the
 * cookie is missing/invalid; this decorator keeps the principal accessible
 * inside the controller without re-running the verify.
 */
export const CurrentAdmin = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AdminPrincipal | null => readAdmin(ctx, false),
);

export const RequiredAdmin = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AdminPrincipal => {
    const admin = readAdmin(ctx, true);
    if (!admin) throw new UnauthorizedException();
    return admin;
  },
);

function readAdmin(ctx: ExecutionContext, throwOnInvalid: boolean): AdminPrincipal | null {
  const req = ctx.switchToHttp().getRequest<FastifyRequest>();
  const token = readCookie(req.headers.cookie ?? '', COOKIE_NAME);
  if (!token) return null;
  // Param decorators run outside Nest's DI graph — there is no clean way
  // to inject ConfigService here. Read the secret directly; the env is
  // already validated at boot via ConfigModule.forRoot({ validate }).
  // eslint-disable-next-line no-restricted-syntax
  const secret = process.env['JWT_ACCESS_SECRET'];
  if (!secret) {
    if (throwOnInvalid) throw new UnauthorizedException('JWT secret missing');
    return null;
  }
  try {
    const payload = verify(token, secret) as JwtPayload & { email?: string; role?: string };
    if (typeof payload.sub !== 'string') return null;
    if (payload.role !== 'admin' && payload.role !== 'editor') return null;
    return {
      id: payload.sub,
      email: typeof payload.email === 'string' ? payload.email : '',
      role: payload.role,
    };
  } catch {
    if (throwOnInvalid) throw new UnauthorizedException('Invalid token');
    return null;
  }
}

function readCookie(header: string, name: string): string | null {
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}
