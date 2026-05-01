import { randomUUID } from 'node:crypto';

import { Injectable, Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { createTransport, type Transporter } from 'nodemailer';

import type { Env } from '../../config/env';

import type { EmailMessage, EmailTransport } from './email.port';

/**
 * Nodemailer-backed transport. Same code path runs against Mailhog in
 * dev (smtp://localhost:1025, no auth) and a production SMTP provider
 * (SendGrid, SES, SMTP2GO, …) in prod — only env values change.
 *
 * If SMTP_HOST is missing in the env, every send is logged and dropped
 * (returns a synthetic message id). Keeps tests + fresh checkouts free
 * of transport churn without forcing the controller layer to know
 * whether email is configured.
 */
@Injectable()
export class SmtpEmailTransport implements EmailTransport {
  private readonly logger = new Logger(SmtpEmailTransport.name);
  private transporter: Transporter | null = null;

  constructor(private readonly config: ConfigService<Env, true>) {}

  async send(message: EmailMessage): Promise<{ messageId: string }> {
    const transporter = this.getTransporter();
    if (!transporter) {
      // No SMTP configured — log + drop. Avoids breaking tests / fresh
      // dev envs where Mailhog isn't even running. Caller treats the
      // synthetic id as a successful delivery.
      this.logger.warn(
        `SMTP not configured; dropping email to=${message.to} tag=${message.tag ?? '-'}`,
      );
      return { messageId: `noop-${randomUUID()}` };
    }

    const from = this.config.get('EMAIL_FROM', { infer: true });
    const info = (await transporter.sendMail({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      ...(message.text ? { text: message.text } : {}),
      ...(message.tag ? { headers: { 'X-Akon-Email-Tag': message.tag } } : {}),
    })) as { messageId: string };
    this.logger.log(`email sent id=${info.messageId} to=${message.to} tag=${message.tag ?? '-'}`);
    return { messageId: info.messageId };
  }

  private getTransporter(): Transporter | null {
    if (this.transporter) return this.transporter;

    const host = this.config.get('SMTP_HOST', { infer: true });
    if (!host) return null;

    const port = this.config.get('SMTP_PORT', { infer: true });
    const user = this.config.get('SMTP_USER', { infer: true });
    const pass = this.config.get('SMTP_PASS', { infer: true });
    const secure = this.config.get('SMTP_SECURE', { infer: true });

    this.transporter = createTransport({
      host,
      port,
      secure,
      ...(user && pass ? { auth: { user, pass } } : {}),
    });
    return this.transporter;
  }
}
