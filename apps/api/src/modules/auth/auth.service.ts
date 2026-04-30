import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify, argon2id } from 'argon2';
import { createHash } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service';

import { JwtCookieService } from './jwt-cookie.service';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedSession {
  userId: string;
  email: string;
  tokens: AuthTokens;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cookies: JwtCookieService,
  ) {}

  async register(input: {
    email: string;
    password: string;
    adSoyad: string;
    telefon: string;
    kvkkAccepted: boolean;
  }): Promise<AuthenticatedSession> {
    if (!input.kvkkAccepted) {
      throw new BadRequestException('KVKK aydınlatma metnini onaylamalısınız');
    }
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
      select: { id: true },
    });
    if (existing) {
      throw new ConflictException('Bu e-posta ile zaten bir hesap var');
    }
    const passwordHash = await hash(input.password, {
      type: argon2id,
      memoryCost: 19_456,
      timeCost: 2,
      parallelism: 1,
    });
    const user = await this.prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        adSoyad: input.adSoyad,
        telefon: input.telefon,
      },
      select: { id: true, email: true },
    });
    this.logger.log(`Registered new user ${user.id} (${user.email})`);
    return this.issueTokens(user.id, user.email);
  }

  async login(email: string, password: string): Promise<AuthenticatedSession> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, passwordHash: true },
    });
    if (!user) {
      // do constant-time-ish dummy verify so timing doesn't leak existence
      await verify(
        '$argon2id$v=19$m=19456,t=2,p=1$ZmFrZQAAAAAAAAA$ZmFrZWZha2VmYWtlZmFrZWZha2VmYWtlZmFrZWZha2U',
        password,
      ).catch(() => false);
      throw new UnauthorizedException('E-posta veya şifre hatalı');
    }
    const ok = await verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException('E-posta veya şifre hatalı');
    return this.issueTokens(user.id, user.email);
  }

  async refresh(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<AuthenticatedSession> {
    const hashed = hashRefresh(refreshToken);
    const session = await this.prisma.session.findUnique({
      where: { refreshToken: hashed },
      include: { user: { select: { id: true, email: true } } },
    });
    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Oturumun süresi doldu, lütfen tekrar giriş yapın');
    }
    // rotate
    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });
    const meta: { userAgent?: string; ipAddress?: string } = {};
    if (userAgent) meta.userAgent = userAgent;
    if (ipAddress) meta.ipAddress = ipAddress;
    return this.issueTokens(session.user.id, session.user.email, meta);
  }

  async logout(refreshToken: string | null): Promise<void> {
    if (!refreshToken) return;
    const hashed = hashRefresh(refreshToken);
    await this.prisma.session.updateMany({
      where: { refreshToken: hashed, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /** Used by the @CurrentUser decorator. Public so guards can call it too. */
  async loadUserFromAccessToken(accessToken: string): Promise<{ id: string; email: string }> {
    const payload = this.cookies.verifyAccessToken(accessToken);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  /** Move any guest-cart line items into the user's cart on login, then drop the guest cart. */
  async mergeGuestCart(userId: string, sessionId: string | null): Promise<void> {
    if (!sessionId) return;
    const guest = await this.prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });
    if (!guest || guest.items.length === 0) return;
    const userCart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    for (const line of guest.items) {
      await this.prisma.cartItem.upsert({
        where: { cartId_variantId: { cartId: userCart.id, variantId: line.variantId } },
        create: {
          cartId: userCart.id,
          productId: line.productId,
          variantId: line.variantId,
          quantity: line.quantity,
        },
        update: { quantity: { increment: line.quantity } },
      });
    }
    await this.prisma.cart.delete({ where: { id: guest.id } });
  }

  private async issueTokens(
    userId: string,
    email: string,
    meta: { userAgent?: string; ipAddress?: string } = {},
  ): Promise<AuthenticatedSession> {
    const accessToken = this.cookies.signAccessToken(userId, email);
    const refreshToken = this.cookies.generateRefreshToken();
    await this.prisma.session.create({
      data: {
        userId,
        refreshToken: hashRefresh(refreshToken),
        ...(meta.userAgent && { userAgent: meta.userAgent }),
        ...(meta.ipAddress && { ipAddress: meta.ipAddress }),
        expiresAt: new Date(Date.now() + JwtCookieService.refreshTtlSeconds * 1000),
      },
    });
    return { userId, email, tokens: { accessToken, refreshToken } };
  }
}

function hashRefresh(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
