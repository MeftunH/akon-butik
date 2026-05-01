import { Module } from '@nestjs/common';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

/**
 * Public contact-form endpoint. Depends on the global EmailModule for
 * the SMTP transport (EMAIL_TRANSPORT). Wire into AppModule by adding
 * `ContactModule` to its imports — that registration is intentionally
 * left to the parent so this stream stays additive.
 */
@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
