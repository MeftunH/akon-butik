import type { CartSnapshot } from '@akonbutik/types';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CartSession } from '../../common/decorators/cart-session.decorator';
import { CurrentUserId } from '../../common/decorators/current-user.decorator';

// NestJS reads the @Body() parameter's decorator-emitted metadata to pick
// the DTO class for `class-validator`. That requires a runtime value
// import; `import type` would tree-shake the class away.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AddItemDto, UpdateItemQuantityDto } from './dto/add-item.dto';
import type { CartIdentity, CartRepository } from './ports/cart.repository';
import { CART_REPOSITORY } from './ports/cart.repository';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(@Inject(CART_REPOSITORY) private readonly cart: CartRepository) {}

  @Get()
  @ApiOperation({ summary: 'Read the current cart (creating one if needed)' })
  async get(
    @CurrentUserId() userId: string | null,
    @CartSession() sessionId: string,
  ): Promise<CartSnapshot> {
    return this.cart.ensure(resolveIdentity(userId, sessionId));
  }

  @Post('items')
  @ApiOperation({ summary: 'Add a variant to the cart (or bump its quantity)' })
  async add(
    @CurrentUserId() userId: string | null,
    @CartSession() sessionId: string,
    @Body() dto: AddItemDto,
  ): Promise<CartSnapshot> {
    return this.cart.addItem(resolveIdentity(userId, sessionId), dto.variantId, dto.quantity);
  }

  @Patch('items/:variantId')
  @ApiOperation({ summary: 'Set the quantity of a cart line (0 removes the line)' })
  async update(
    @CurrentUserId() userId: string | null,
    @CartSession() sessionId: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateItemQuantityDto,
  ): Promise<CartSnapshot> {
    return this.cart.updateItemQuantity(
      resolveIdentity(userId, sessionId),
      variantId,
      dto.quantity,
    );
  }

  @Delete('items/:variantId')
  @ApiOperation({ summary: 'Remove a cart line entirely' })
  async remove(
    @CurrentUserId() userId: string | null,
    @CartSession() sessionId: string,
    @Param('variantId') variantId: string,
  ): Promise<CartSnapshot> {
    return this.cart.removeItem(resolveIdentity(userId, sessionId), variantId);
  }

  @Delete()
  @ApiOperation({ summary: 'Empty the cart' })
  async clear(
    @CurrentUserId() userId: string | null,
    @CartSession() sessionId: string,
  ): Promise<CartSnapshot> {
    return this.cart.clear(resolveIdentity(userId, sessionId));
  }
}

/**
 * A logged-in user owns their cart by `userId`; the guest cookie is ignored
 * for resolution so we don't accidentally write or look up a session-bound
 * cart for an authenticated request. Guest carts merge into the user cart
 * at login/register time (see AuthService.mergeGuestCart).
 */
function resolveIdentity(userId: string | null, sessionId: string): CartIdentity {
  return userId ? { userId } : { sessionId };
}
