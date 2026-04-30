import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiaClient } from '@akonbutik/dia-client';

import type { Env } from '../../config/env.js';

export const DIA_CLIENT = Symbol('DIA_CLIENT');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DIA_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): DiaClient =>
        new DiaClient({
          baseUrl: config.get('DIA_BASE_URL', { infer: true }),
          username: config.get('DIA_USERNAME', { infer: true }),
          password: config.get('DIA_PASSWORD', { infer: true }),
          apiKey: config.get('DIA_API_KEY', { infer: true }),
          firmaKodu: config.get('DIA_FIRMA_KODU', { infer: true }),
          donemKodu: config.get('DIA_DONEM_KODU', { infer: true }),
          disconnectSameUser: true,
        }),
    },
  ],
  exports: [DIA_CLIENT],
})
export class DiaModule {}
