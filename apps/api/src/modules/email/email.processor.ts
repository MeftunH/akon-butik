import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';

import type { EmailService } from './email.service';

export const EMAIL_QUEUE = 'email';

export type EmailJobName = 'order-confirmation';

interface OrderConfirmationJobData {
  orderId: string;
}

/**
 * Background email worker. Same retry policy as DIA push — BullMQ's
 * default 5 attempts with exponential backoff. Failures don't block
 * the originating request (checkout → order paid).
 */
@Processor(EMAIL_QUEUE, { concurrency: 4 })
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly email: EmailService) {
    super();
  }

  override async process(job: Job<unknown, unknown, EmailJobName>): Promise<unknown> {
    this.logger.log(`processing ${job.name} (id=${job.id ?? 'unknown'})`);
    const data = job.data as OrderConfirmationJobData;
    await this.email.sendOrderConfirmation(data.orderId);
    return { ok: true };
  }
}
