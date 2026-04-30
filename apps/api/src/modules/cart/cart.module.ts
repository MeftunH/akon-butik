import { Module } from '@nestjs/common';

import { PrismaCartRepository } from './adapters/prisma-cart.repository';
import { CartController } from './cart.controller';
import { CART_REPOSITORY } from './ports/cart.repository';

@Module({
  controllers: [CartController],
  providers: [{ provide: CART_REPOSITORY, useClass: PrismaCartRepository }],
  exports: [CART_REPOSITORY],
})
export class CartModule {}
