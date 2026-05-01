import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { RequiredUserId } from '../../common/decorators/current-user.decorator';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { WishlistService } from './wishlist.service';

class AddWishlistDto {
  @IsString()
  productId!: string;

  @IsOptional()
  @IsString()
  variantId?: string;
}

@ApiTags('customers')
@Controller('customers/me/wishlist')
export class WishlistController {
  constructor(private readonly wishlist: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'List the current user’s wishlist as ProductSummary[]' })
  list(@RequiredUserId() userId: string) {
    return this.wishlist.list(userId);
  }

  @Get('ids')
  @ApiOperation({
    summary:
      'Return only the productId set — used by ProductCard heart toggles to avoid loading the whole catalog twice',
  })
  ids(@RequiredUserId() userId: string) {
    return this.wishlist.productIds(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a product (and optional variant) to the wishlist — idempotent' })
  async add(@RequiredUserId() userId: string, @Body() dto: AddWishlistDto): Promise<{ ok: true }> {
    await this.wishlist.add(userId, dto.productId, dto.variantId);
    return { ok: true };
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a product from the wishlist' })
  async remove(
    @RequiredUserId() userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.wishlist.remove(userId, productId);
  }
}
