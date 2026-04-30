export const PAYMENT_PROVIDER = Symbol('PAYMENT_PROVIDER');

export interface InitCheckoutInput {
  orderId: string;
  orderNumber: string;
  amountMinor: number;
  currency: 'TRY';
  customerEmail: string;
  customerName: string;
  successCallbackUrl: string;
}

export interface InitCheckoutResult {
  /** URL the browser should be redirected to (iyzico Checkout Form). */
  redirectUrl: string;
  /** Provider-side transaction id for our records. */
  providerTxnId: string;
}

export interface VerifyWebhookInput {
  rawBody: string;
  signatureHeader: string | undefined;
}

export interface WebhookOutcome {
  providerTxnId: string;
  status: 'captured' | 'failed';
  rawPayload: object;
}

export interface PaymentProvider {
  readonly name: 'iyzico' | 'qnbpay' | 'mock';
  initCheckout(input: InitCheckoutInput): Promise<InitCheckoutResult>;
  verifyWebhook(input: VerifyWebhookInput): WebhookOutcome;
}
