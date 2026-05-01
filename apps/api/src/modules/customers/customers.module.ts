import { Module } from '@nestjs/common';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

@Module({
  controllers: [CustomersController, WishlistController],
  providers: [CustomersService, WishlistService],
})
export class CustomersModule {}
