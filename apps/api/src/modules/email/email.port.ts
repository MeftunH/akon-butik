/**
 * Hexagonal port for transactional email. The default adapter sends
 * via SMTP (Mailhog in dev, real provider in prod). Tests get a noop
 * adapter that records calls without touching the network.
 */
export const EMAIL_TRANSPORT = Symbol('EMAIL_TRANSPORT');

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  /** Plain-text fallback. Optional — derived from html if missing. */
  text?: string;
  /** Inline message tag (order_confirmation, order_shipped, etc.). */
  tag?: string;
}

export interface EmailTransport {
  send(message: EmailMessage): Promise<{ messageId: string }>;
}
