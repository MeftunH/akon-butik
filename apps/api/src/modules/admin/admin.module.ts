import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import type { Env } from '../../config/env';
import { DIA_SYNC_QUEUE } from '../dia/workers/sync.constants';

import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminCatalogController } from './admin-catalog.controller';
import { AdminCookieService } from './admin-cookie.service';
import { AdminImagesController } from './admin-images.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminSyncController } from './admin-sync.controller';
import { AdminTaxonomyController } from './admin-taxonomy.controller';

@Module({
  imports: [
    BullModule.registerQueue({ name: DIA_SYNC_QUEUE }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        secret: config.get('JWT_ACCESS_SECRET', { infer: true }),
      }),
    }),
  ],
  controllers: [
    AdminAuthController,
    AdminSyncController,
    AdminCatalogController,
    AdminImagesController,
    AdminTaxonomyController,
    AdminOrdersController,
  ],
  providers: [AdminAuthService, AdminCookieService],
})
export class AdminModule {}
