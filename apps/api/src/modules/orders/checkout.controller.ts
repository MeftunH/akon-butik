import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CartSession } from '../../common/decorators/cart-session.decorator';

import { CheckoutService } from './checkout.service';
import { InitCheckoutDto } from './dto/init-checkout.dto';
import { ORDER_REPOSITORY } from './ports/order.repository';
import { Inject } from '@nestjs/common';
import type { OrderRepository } from './ports/order.repository';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkout: CheckoutService,
    @Inject(ORDER_REPOSITORY) private readonly orders: OrderRepository,
  ) {}

  @Post('init')
  @ApiOperation({
    summary: 'Snapshot the cart into an order and ask the payment provider for a redirect URL',
  })
  async init(
    @CartSession() sessionId: string,
    @Body() dto: InitCheckoutDto,
  ): Promise<{ redirectUrl: string; orderNumber: string }> {
    return this.checkout.init({ sessionId, ...dto });
  }

  @Post('callback/mock')
  @ApiOperation({
    summary:
      'Internal: mock provider success callback (no real iyzico). Marks payment captured + enqueues DIA push.',
  })
  async mockCallback(@Query('orderId') orderId: string) {
    return this.checkout.confirmMockCallback(orderId);
  }

  @Get('orders/:idOrNumber')
  @ApiOperation({ summary: 'Read an order by id or order-number (for the success page)' })
  async readOrder(@Param('idOrNumber') idOrNumber: string) {
    const byNumber = idOrNumber.startsWith('AKB-')
      ? await this.orders.findByOrderNumber(idOrNumber)
      : null;
    return byNumber ?? (await this.orders.findById(idOrNumber));
  }
}
