import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { IsEmail, IsString } from 'class-validator';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';
import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';

// NestJS DI needs the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AdminAuthService } from './admin-auth.service';
import { AdminCookieService } from './admin-cookie.service';

class AdminLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@ApiTags('admin-auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(
    private readonly auth: AdminAuthService,
    private readonly cookies: AdminCookieService,
  ) {}

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Sign in as an admin user' })
  async login(
    @Body() dto: AdminLoginDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ id: string; email: string; name: string; role: 'admin' | 'editor' }> {
    const session = await this.auth.login(dto.email, dto.password);
    this.cookies.applyCookie(reply, session.accessToken);
    return {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Clear the admin auth cookie' })
  logout(@Res({ passthrough: true }) reply: FastifyReply): { ok: true } {
    this.cookies.clearCookie(reply);
    return { ok: true };
  }

  @Get('me')
  @ApiOperation({ summary: 'Return the currently signed-in admin profile' })
  @UseGuards(AdminAuthGuard)
  me(
    @CurrentAdmin()
    admin: { id: string; email: string; name: string; role: 'admin' | 'editor' } | null,
  ) {
    if (!admin) throw new UnauthorizedException();
    return admin;
  }

  @Get('whoami')
  @ApiOperation({ summary: 'Echo the cookie state without 401 (used for SSR auth-check)' })
  whoami(@Req() req: FastifyRequest): { authenticated: boolean } {
    const token = AdminCookieService.readCookie(req.headers.cookie ?? '');
    return { authenticated: Boolean(token) };
  }
}
