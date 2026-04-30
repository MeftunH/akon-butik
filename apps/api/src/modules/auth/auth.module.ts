import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCookieService } from './jwt-cookie.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtCookieService],
  exports: [AuthService, JwtCookieService],
})
export class AuthModule {}
