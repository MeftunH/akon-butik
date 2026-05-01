import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';

import { EMAIL_TRANSPORT } from './email.port';
import { EMAIL_QUEUE, EmailProcessor } from './email.processor';
import { EmailService } from './email.service';
import { SmtpEmailTransport } from './smtp-email.adapter';

/**
 * Global email module — wires the EMAIL_TRANSPORT port to nodemailer +
 * SMTP, exports EmailService for direct callers, and registers a
 * BullMQ queue+processor for retryable background sending.
 */
@Global()
@Module({
  imports: [BullModule.registerQueue({ name: EMAIL_QUEUE })],
  providers: [
    {
      provide: EMAIL_TRANSPORT,
      useClass: SmtpEmailTransport,
    },
    SmtpEmailTransport,
    EmailService,
    EmailProcessor,
  ],
  exports: [EmailService, BullModule],
})
export class EmailModule {}
