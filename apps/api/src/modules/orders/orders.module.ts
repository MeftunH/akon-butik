import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { CartModule } from '../cart/cart.module';
import { PaymentsModule } from '../payments/payments.module';

import { PrismaOrderRepository } from './adapters/prisma-order.repository';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { ORDER_REPOSITORY } from './ports/order.repository';
import {
  DIA_PUSH_ORDER_QUEUE,
  DiaPushOrderProcessor,
} from './workers/dia-push-order.processor';

@Module({
  imports: [
    CartModule,
    PaymentsModule,
    BullModule.registerQueue({ name: DIA_PUSH_ORDER_QUEUE }),
  ],
  controllers: [CheckoutController],
  providers: [
    { provide: ORDER_REPOSITORY, useClass: PrismaOrderRepository },
    CheckoutService,
    DiaPushOrderProcessor,
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrdersModule {}
