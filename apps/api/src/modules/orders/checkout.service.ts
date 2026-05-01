import type { CartSnapshot, OrderSummary } from '@akonbutik/types';
import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';
import type { Queue } from 'bullmq';

import type { Env } from '../../config/env';
import { CART_REPOSITORY, type CartRepository } from '../cart/ports/cart.repository';
import { EMAIL_QUEUE } from '../email/email.processor';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PaymentsService } from '../payments/payments.service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

import {
  ORDER_REPOSITORY,
  type CreateOrderInput,
  type OrderRepository,
} from './ports/order.repository';
import { DIA_PUSH_ORDER_QUEUE } from './workers/dia-push-order.processor';

export interface InitCheckoutCommand {
  sessionId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  billingAddress: CreateOrderInput['billingAddress'];
  shippingAddress: CreateOrderInput['shippingAddress'];
  notes?: string;
}

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    @Inject(CART_REPOSITORY) private readonly carts: CartRepository,
    @Inject(ORDER_REPOSITORY) private readonly orders: OrderRepository,
    private readonly payments: PaymentsService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<Env, true>,
    @InjectQueue(DIA_PUSH_ORDER_QUEUE) private readonly diaPushQueue: Queue,
    @InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue,
  ) {}

  /**
   * The "place order" verb: snapshot the cart into an Order, ask the
   * payment provider for a redirect URL, and clear the cart. The cart is
   * intentionally cleared *before* payment success — the canonical state of
   * what the customer is buying lives on the Order row from this moment on.
   */
  async init(cmd: InitCheckoutCommand): Promise<{ redirectUrl: string; orderNumber: string }> {
    const cart: CartSnapshot = await this.carts.ensure({ sessionId: cmd.sessionId });
    if (cart.items.length === 0) {
      throw new BadRequestException('Sepet boş');
    }

    const order = await this.orders.create({
      cart,
      billingAddress: cmd.billingAddress,
      shippingAddress: cmd.shippingAddress,
      customerEmail: cmd.customerEmail,
      customerName: cmd.customerName,
      customerPhone: cmd.customerPhone,
      ...(cmd.notes && { notes: cmd.notes }),
    });

    const siteUrl = this.config.get('STOREFRONT_URL', { infer: true });
    const successCallbackUrl = `${siteUrl}/checkout/callback`;

    const init = await this.payments.initCheckout({
      orderId: order.id,
      orderNumber: order.orderNumber,
      amountMinor: cart.totalMinor,
      currency: cart.currency,
      customerEmail: cmd.customerEmail,
      customerName: cmd.customerName,
      successCallbackUrl,
    });

    await this.carts.clear({ sessionId: cmd.sessionId });

    return { redirectUrl: init.redirectUrl, orderNumber: order.orderNumber };
  }

  /**
   * Mock-flow callback: marks the payment captured and enqueues the DIA push.
   * Replaced by the iyzico webhook handler when real iyzico is wired in.
   */
  async confirmMockCallback(orderId: string): Promise<OrderSummary & { id: string }> {
    const order = await this.orders.findById(orderId);
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);

    // Re-discover the payment we just initiated. There should be exactly one for a mock flow.
    const payment = await this.prisma.payment.findFirst({
      where: { orderId, status: 'initiated' },
      orderBy: { createdAt: 'desc' },
    });
    if (!payment) {
      this.logger.warn(`No initiated payment found for order ${orderId} — already confirmed?`);
      return order;
    }
    await this.payments.markCaptured(payment.id, { mock: true });
    await this.orders.markPaid(orderId);

    await this.diaPushQueue.add('push', { orderId }, { jobId: `push-${orderId}` });

    await this.emailQueue.add(
      'order-confirmation',
      { orderId },
      { jobId: `email-confirm-${orderId}` },
    );

    const updated = await this.orders.findById(orderId);
    if (!updated) {
      throw new NotFoundException(`Order ${orderId} disappeared after markPaid`);
    }
    return updated;
  }
}
