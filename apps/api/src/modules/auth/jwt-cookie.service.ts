import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';
import type { FastifyReply } from 'fastify';

import type { Env } from '../../config/env';

const ACCESS_COOKIE = 'akon_at';
const REFRESH_COOKIE = 'akon_rt';
const ACCESS_TTL_SECONDS = 15 * 60; // 15 min
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface AccessTokenPayload {
  sub: string; // user id
  email: string;
}

@Injectable()
export class JwtCookieService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  signAccessToken(userId: string, email: string): string {
    return this.jwt.sign(
      { sub: userId, email } satisfies AccessTokenPayload,
      {
        secret: this.config.get('JWT_ACCESS_SECRET', { infer: true }),
        expiresIn: ACCESS_TTL_SECONDS,
      },
    );
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.jwt.verify<AccessTokenPayload>(token, {
      secret: this.config.get('JWT_ACCESS_SECRET', { infer: true }),
    });
  }

  generateRefreshToken(): string {
    return randomBytes(48).toString('base64url');
  }

  /** Set both cookies on the response. */
  applyCookies(reply: FastifyReply, accessToken: string, refreshToken: string): void {
    const isProd = process.env['NODE_ENV'] === 'production';
    const flags = `HttpOnly; SameSite=Lax; Path=/${isProd ? '; Secure' : ''}`;
    void reply.header('set-cookie', [
      `${ACCESS_COOKIE}=${accessToken}; ${flags}; Max-Age=${ACCESS_TTL_SECONDS.toString()}`,
      `${REFRESH_COOKIE}=${refreshToken}; ${flags}; Max-Age=${REFRESH_TTL_SECONDS.toString()}`,
    ]);
  }

  clearCookies(reply: FastifyReply): void {
    const isProd = process.env['NODE_ENV'] === 'production';
    const flags = `HttpOnly; SameSite=Lax; Path=/${isProd ? '; Secure' : ''}`;
    void reply.header('set-cookie', [
      `${ACCESS_COOKIE}=; ${flags}; Max-Age=0`,
      `${REFRESH_COOKIE}=; ${flags}; Max-Age=0`,
    ]);
  }

  static readACCessCookie(cookieHeader: string): string | null {
    return readCookie(cookieHeader, ACCESS_COOKIE);
  }

  static readRefreshCookie(cookieHeader: string): string | null {
    return readCookie(cookieHeader, REFRESH_COOKIE);
  }

  static get refreshTtlSeconds(): number {
    return REFRESH_TTL_SECONDS;
  }
}

function readCookie(header: string, name: string): string | null {
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}
