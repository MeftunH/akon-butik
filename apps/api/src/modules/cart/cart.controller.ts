import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { CartSnapshot } from '@akonbutik/types';

import { CartSession } from '../../common/decorators/cart-session.decorator';

import { AddItemDto, UpdateItemQuantityDto } from './dto/add-item.dto';
import { CART_REPOSITORY, type CartRepository } from './ports/cart.repository';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(@Inject(CART_REPOSITORY) private readonly cart: CartRepository) {}

  @Get()
  @ApiOperation({ summary: 'Read the current cart (creating one if needed)' })
  async get(@CartSession() sessionId: string): Promise<CartSnapshot> {
    return this.cart.ensure({ sessionId });
  }

  @Post('items')
  @ApiOperation({ summary: 'Add a variant to the cart (or bump its quantity)' })
  async add(
    @CartSession() sessionId: string,
    @Body() dto: AddItemDto,
  ): Promise<CartSnapshot> {
    return this.cart.addItem({ sessionId }, dto.variantId, dto.quantity);
  }

  @Patch('items/:variantId')
  @ApiOperation({ summary: 'Set the quantity of a cart line (0 removes the line)' })
  async update(
    @CartSession() sessionId: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateItemQuantityDto,
  ): Promise<CartSnapshot> {
    return this.cart.updateItemQuantity({ sessionId }, variantId, dto.quantity);
  }

  @Delete('items/:variantId')
  @ApiOperation({ summary: 'Remove a cart line entirely' })
  async remove(
    @CartSession() sessionId: string,
    @Param('variantId') variantId: string,
  ): Promise<CartSnapshot> {
    return this.cart.removeItem({ sessionId }, variantId);
  }

  @Delete()
  @ApiOperation({ summary: 'Empty the cart' })
  async clear(@CartSession() sessionId: string): Promise<CartSnapshot> {
    return this.cart.clear({ sessionId });
  }
}
