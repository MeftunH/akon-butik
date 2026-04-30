import { Injectable } from '@nestjs/common';
// NestJS DI binds providers by their constructor's `design:paramtypes`
// metadata at runtime — `import type` would tree-shake the class refs.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { JwtService } from '@nestjs/jwt';
import type { FastifyReply } from 'fastify';

import type { Env } from '../../config/env';

const COOKIE_NAME = 'akon_admin_at';
const TTL_SECONDS = 8 * 60 * 60; // 8 hours — admin sessions live longer than customer ones

export interface AdminAccessTokenPayload {
  sub: string; // admin user id
  email: string;
  role: 'admin' | 'editor';
}

@Injectable()
export class AdminCookieService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  signAccessToken(adminId: string, email: string, role: 'admin' | 'editor'): string {
    return this.jwt.sign({ sub: adminId, email, role } satisfies AdminAccessTokenPayload, {
      secret: this.config.get('JWT_ACCESS_SECRET', { infer: true }),
      expiresIn: TTL_SECONDS,
    });
  }

  verifyAccessToken(token: string): AdminAccessTokenPayload {
    return this.jwt.verify<AdminAccessTokenPayload>(token, {
      secret: this.config.get('JWT_ACCESS_SECRET', { infer: true }),
    });
  }

  applyCookie(reply: FastifyReply, accessToken: string): void {
    const isProd = this.config.get('NODE_ENV', { infer: true }) === 'production';
    const flags = `HttpOnly; SameSite=Lax; Path=/${isProd ? '; Secure' : ''}`;
    void reply.header(
      'set-cookie',
      `${COOKIE_NAME}=${accessToken}; ${flags}; Max-Age=${TTL_SECONDS.toString()}`,
    );
  }

  clearCookie(reply: FastifyReply): void {
    const isProd = this.config.get('NODE_ENV', { infer: true }) === 'production';
    const flags = `HttpOnly; SameSite=Lax; Path=/${isProd ? '; Secure' : ''}`;
    void reply.header('set-cookie', `${COOKIE_NAME}=; ${flags}; Max-Age=0`);
  }

  static readCookie(cookieHeader: string): string | null {
    for (const part of cookieHeader.split(';')) {
      const [k, ...rest] = part.trim().split('=');
      if (k === COOKIE_NAME) return rest.join('=');
    }
    return null;
  }
}
