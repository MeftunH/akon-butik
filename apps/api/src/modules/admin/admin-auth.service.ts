// NestJS reads constructor metadata at runtime for DI; the value imports
// below MUST stay value imports. eslint's consistent-type-imports
// auto-fixer keeps demoting them — pin and document why.
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';
import { argon2id, hash, verify } from 'argon2';

import type { Env } from '../../config/env';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AdminCookieService } from './admin-cookie.service';

/**
 * The first time the API boots against a freshly-seeded DB, the admin user
 * carries a placeholder hash that argon2 cannot verify. To avoid a
 * chicken-and-egg with no working migration path in dev, we accept the
 * password configured in `ADMIN_BOOTSTRAP_PASSWORD` (read once at startup)
 * and rewrite the stored hash on first successful login. After that the
 * placeholder is gone and the password lives only in the DB hash.
 */
const PLACEHOLDER_HASH_PREFIX = '$argon2id$v=19$m=19456,t=2,p=1$DEVELOPMENT$';

interface AuthenticatedAdmin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  accessToken: string;
}

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cookies: AdminCookieService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async login(email: string, password: string): Promise<AuthenticatedAdmin> {
    const admin = await this.prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, name: true, role: true, passwordHash: true },
    });
    if (!admin) {
      // constant-time-ish dummy verify so timing doesn't leak admin existence
      await verify(
        '$argon2id$v=19$m=19456,t=2,p=1$ZmFrZQAAAAAAAAA$ZmFrZWZha2VmYWtlZmFrZWZha2VmYWtlZmFrZWZha2U',
        password,
      ).catch(() => false);
      throw new UnauthorizedException('E-posta veya şifre hatalı');
    }

    const isPlaceholder = admin.passwordHash.startsWith(PLACEHOLDER_HASH_PREFIX);
    let ok = false;
    if (isPlaceholder) {
      const bootstrap = this.config.get('ADMIN_BOOTSTRAP_PASSWORD', { infer: true });
      if (bootstrap && bootstrap === password) {
        // First-login bootstrap: replace the placeholder hash so the next
        // call hits the real verify path and the bootstrap env can be
        // unset.
        const real = await hash(password, {
          type: argon2id,
          memoryCost: 19_456,
          timeCost: 2,
          parallelism: 1,
        });
        await this.prisma.adminUser.update({
          where: { id: admin.id },
          data: { passwordHash: real, lastLoginAt: new Date() },
        });
        this.logger.warn(
          `Admin ${admin.email} hash bootstrapped from ADMIN_BOOTSTRAP_PASSWORD; rotate the env var now.`,
        );
        ok = true;
      }
    } else {
      ok = await verify(admin.passwordHash, password);
      if (ok) {
        await this.prisma.adminUser.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        });
      }
    }

    if (!ok) throw new UnauthorizedException('E-posta veya şifre hatalı');

    const accessToken = this.cookies.signAccessToken(admin.id, admin.email, admin.role);
    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      accessToken,
    };
  }

  async loadAdminFromAccessToken(
    accessToken: string,
  ): Promise<{ id: string; email: string; name: string; role: 'admin' | 'editor' }> {
    const payload = this.cookies.verifyAccessToken(accessToken);
    return this.loadById(payload.sub);
  }

  async loadById(
    id: string,
  ): Promise<{ id: string; email: string; name: string; role: 'admin' | 'editor' }> {
    const admin = await this.prisma.adminUser.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!admin) throw new UnauthorizedException();
    return admin;
  }
}
