import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Prisma } from '@akonbutik/database';

import { PrismaService } from '../prisma/prisma.service';

import {
  PAYMENT_PROVIDER,
  type InitCheckoutInput,
  type PaymentProvider,
} from './ports/payment-provider';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @Inject(PAYMENT_PROVIDER) private readonly provider: PaymentProvider,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create a Payment row in `initiated` and ask the provider for a redirect URL.
   * Returns both so the controller can persist + redirect in one round-trip.
   */
  async initCheckout(input: InitCheckoutInput): Promise<{
    redirectUrl: string;
    paymentId: string;
  }> {
    const payment = await this.prisma.payment.create({
      data: {
        orderId: input.orderId,
        provider: this.provider.name === 'iyzico' ? 'iyzico' : 'iyzico', // schema only knows iyzico/qnbpay
        amountMinor: input.amountMinor,
        currency: input.currency,
        status: 'initiated',
      },
    });
    const result = await this.provider.initCheckout(input);
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: { providerTxnId: result.providerTxnId },
    });
    return { redirectUrl: result.redirectUrl, paymentId: payment.id };
  }

  /**
   * Mark a Payment captured. Called from either the iyzico webhook handler
   * (real provider) or the /checkout/callback route (mock provider).
   */
  async markCaptured(paymentId: string, rawPayload: object): Promise<{ orderId: string }> {
    const payment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'captured',
        capturedAt: new Date(),
        rawPayload: rawPayload as unknown as Prisma.InputJsonValue,
      },
      select: { orderId: true },
    });
    this.logger.log(`Payment ${paymentId} captured for order ${payment.orderId}`);
    return payment;
  }
}
