import { Injectable, Logger } from '@nestjs/common';

import type {
  InitCheckoutInput,
  InitCheckoutResult,
  PaymentProvider,
  VerifyWebhookInput,
  WebhookOutcome,
} from '../ports/payment-provider';

/**
 * Dev-only payment provider. Skips the real iyzico Checkout Form and returns
 * a redirect URL that points back at our success page with `mock=ok`. The
 * callback handler immediately marks the payment captured.
 *
 * Selected automatically when IYZICO_API_KEY is missing — see PaymentsModule.
 */
@Injectable()
export class MockPaymentAdapter implements PaymentProvider {
  readonly name = 'mock' as const;
  private readonly logger = new Logger(MockPaymentAdapter.name);

  async initCheckout(input: InitCheckoutInput): Promise<InitCheckoutResult> {
    this.logger.warn(
      `[MOCK] Init checkout for order ${input.orderNumber} (${(input.amountMinor / 100).toString()} TL)`,
    );
    const url = new URL(input.successCallbackUrl);
    url.searchParams.set('mock', 'ok');
    url.searchParams.set('orderId', input.orderId);
    return Promise.resolve({
      redirectUrl: url.toString(),
      providerTxnId: `mock-${input.orderId}`,
    });
  }

  verifyWebhook(_input: VerifyWebhookInput): WebhookOutcome {
    throw new Error(
      'MockPaymentAdapter does not handle webhooks — checkout/callback marks payments captured directly',
    );
  }
}
