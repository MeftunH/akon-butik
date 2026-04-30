import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';

const COOKIE_NAME = 'akon_cart_sid';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

/**
 * Extracts (or creates) the guest cart session id.
 *
 * Reads the `akon_cart_sid` cookie. If absent, generates a fresh UUID and
 * sets it on the response with HttpOnly + SameSite=Lax + Secure-in-prod.
 * Phase 4: when a logged-in user owns a cart, the controller layer prefers
 * that user_id over this session id.
 */
export const CartSession = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    const reply = ctx.switchToHttp().getResponse<FastifyReply>();
    const cookieHeader = req.headers.cookie ?? '';
    const existing = parseCookie(cookieHeader, COOKIE_NAME);
    if (existing) return existing;

    const sid = randomUUID();
    const isProd = process.env['NODE_ENV'] === 'production';
    void reply.header(
      'set-cookie',
      `${COOKIE_NAME}=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE.toString()}${
        isProd ? '; Secure' : ''
      }`,
    );
    return sid;
  },
);

function parseCookie(header: string, name: string): string | null {
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}
