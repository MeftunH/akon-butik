import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Env } from '../../config/env';

import { IyzicoPaymentAdapter } from './adapters/iyzico-payment.adapter';
import { MockPaymentAdapter } from './adapters/mock-payment.adapter';
import { PaymentsService } from './payments.service';
import { PAYMENT_PROVIDER, type PaymentProvider } from './ports/payment-provider';

@Module({
  providers: [
    {
      provide: PAYMENT_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): PaymentProvider => {
        const apiKey = config.get('IYZICO_API_KEY', { infer: true });
        const secretKey = config.get('IYZICO_SECRET_KEY', { infer: true });
        if (!apiKey || !secretKey) {
          // Dev fallback — no real iyzico account configured.
          return new MockPaymentAdapter();
        }
        return new IyzicoPaymentAdapter({
          apiKey,
          secretKey,
          baseUrl: config.get('IYZICO_BASE_URL', { infer: true }),
        });
      },
    },
    PaymentsService,
  ],
  exports: [PAYMENT_PROVIDER, PaymentsService],
})
export class PaymentsModule {}
