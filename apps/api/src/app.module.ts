import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';

import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { validateEnv, type Env } from './config/env';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DiaModule } from './modules/dia/dia.module';
import { HealthModule } from './modules/health/health.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: () => randomUUID(),
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env['LOG_LEVEL'] ?? 'info',
        customProps: () => ({ context: 'HTTP' }),
        ...(process.env['NODE_ENV'] === 'production'
          ? {}
          : { transport: { target: 'pino-pretty', options: { singleLine: true } } }),
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    PrismaModule,
    QueueModule,
    HealthModule,
    DiaModule,
    AuthModule,
    CustomersModule,
    CatalogModule,
    CartModule,
    PaymentsModule,
    OrdersModule,
    AdminModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}

// Re-export so other modules don't need to know the source of truth.
export type { Env };
