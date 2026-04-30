import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { JwtCookieService } from './jwt-cookie.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly cookies: JwtCookieService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new customer account' })
  async register(
    @Body() dto: RegisterDto,
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ id: string; email: string }> {
    const session = await this.auth.register(dto);
    this.cookies.applyCookies(reply, session.tokens.accessToken, session.tokens.refreshToken);
    await this.mergeGuestCart(session.userId, req);
    return { id: session.userId, email: session.email };
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign in with email + password' })
  async login(
    @Body() dto: LoginDto,
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ id: string; email: string }> {
    const session = await this.auth.login(dto.email, dto.password);
    this.cookies.applyCookies(reply, session.tokens.accessToken, session.tokens.refreshToken);
    await this.mergeGuestCart(session.userId, req);
    return { id: session.userId, email: session.email };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Rotate the refresh token + issue a new access token' })
  async refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ id: string; email: string }> {
    const cookie = req.headers.cookie ?? '';
    const refreshToken = JwtCookieService.readRefreshCookie(cookie);
    if (!refreshToken) throw new UnauthorizedException();
    const session = await this.auth.refresh(
      refreshToken,
      req.headers['user-agent'],
      req.ip,
    );
    this.cookies.applyCookies(reply, session.tokens.accessToken, session.tokens.refreshToken);
    return { id: session.userId, email: session.email };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Revoke the refresh token + clear cookies' })
  async logout(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ ok: true }> {
    const cookie = req.headers.cookie ?? '';
    const refreshToken = JwtCookieService.readRefreshCookie(cookie);
    await this.auth.logout(refreshToken);
    this.cookies.clearCookies(reply);
    return { ok: true };
  }

  private async mergeGuestCart(userId: string, req: FastifyRequest): Promise<void> {
    const cookie = req.headers.cookie ?? '';
    const sessionId = readCookie(cookie, 'akon_cart_sid');
    if (sessionId) await this.auth.mergeGuestCart(userId, sessionId);
  }
}

function readCookie(header: string, name: string): string | null {
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}
