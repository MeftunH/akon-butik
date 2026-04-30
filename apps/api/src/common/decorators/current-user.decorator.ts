import {
  createParamDecorator,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { verify, type JwtPayload } from 'jsonwebtoken';

/**
 * Reads the akon_at cookie and verifies its JWT signature with the access
 * secret. Returns the user id (sub) on success, null otherwise.
 *
 * We deliberately avoid injecting JwtCookieService here so the param
 * decorator stays pure — Nest evaluates param decorators outside of the
 * normal DI graph, which makes injection awkward.
 */
const COOKIE_NAME = 'akon_at';

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null => readUserId(ctx, false),
);

export const RequiredUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const userId = readUserId(ctx, true);
    if (!userId) throw new UnauthorizedException();
    return userId;
  },
);

function readUserId(ctx: ExecutionContext, throwOnInvalid: boolean): string | null {
  const req = ctx.switchToHttp().getRequest<FastifyRequest>();
  const cookieHeader = req.headers.cookie ?? '';
  const token = readCookie(cookieHeader, COOKIE_NAME);
  if (!token) return null;
  const secret = process.env['JWT_ACCESS_SECRET'];
  if (!secret) {
    if (throwOnInvalid) throw new UnauthorizedException('JWT secret missing');
    return null;
  }
  try {
    const payload = verify(token, secret) as JwtPayload;
    if (typeof payload.sub === 'string') return payload.sub;
    return null;
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
