import { Injectable, Logger } from '@nestjs/common';

import type {
  InitCheckoutInput,
  InitCheckoutResult,
  PaymentProvider,
  VerifyWebhookInput,
  WebhookOutcome,
} from '../ports/payment-provider';

export interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
}

/**
 * iyzico Checkout Form adapter — scaffold.
 *
 * The full implementation calls iyzipay-node's `checkoutFormInitialize.create`
 * with basket items, buyer, shipping/billing address, and a callbackUrl. The
 * webhook verification HMAC-SHA1s `apiKey + randomString + secretKey`.
 *
 * For now the methods throw "not implemented" so we never silently process a
 * real charge with placeholder credentials. Wire-up when the iyzico merchant
 * account is provisioned and IYZICO_API_KEY/SECRET_KEY are set in `.env`.
 */
@Injectable()
export class IyzicoPaymentAdapter implements PaymentProvider {
  readonly name = 'iyzico' as const;
  private readonly logger = new Logger(IyzicoPaymentAdapter.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_config: IyzicoConfig) {
    // config will be used once we wire up the iyzipay-node SDK
  }

  async initCheckout(_input: InitCheckoutInput): Promise<InitCheckoutResult> {
    this.logger.error(
      'IyzicoPaymentAdapter.initCheckout is not implemented yet — see Phase 3 follow-up. ' +
        'Set IYZICO_API_KEY="" to fall back to MockPaymentAdapter for local testing.',
    );
    throw new Error('iyzico checkout init not implemented');
  }

  verifyWebhook(_input: VerifyWebhookInput): WebhookOutcome {
    this.logger.error('IyzicoPaymentAdapter.verifyWebhook not implemented yet');
    throw new Error('iyzico webhook verify not implemented');
  }
}
