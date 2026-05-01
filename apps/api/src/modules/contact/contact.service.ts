import { Inject, Injectable, Logger } from '@nestjs/common';

import { EMAIL_TRANSPORT, type EmailTransport } from '../email/email.port';

import type { ContactMessageDto } from './dto/contact-message.dto';

/**
 * Renders inbound contact-form payloads into a notification email and
 * hands the message to the shared SMTP transport. Sends synchronously
 * (no BullMQ queue) — the volume is low (a handful of submissions per
 * day) and the transport already short-circuits to a logged drop when
 * SMTP is not configured, so the controller can `await` without blocking
 * production checkout traffic.
 *
 * The recipient is configurable via `CONTACT_INBOX_EMAIL`; ops can route
 * a tenant-specific address (e.g. `siparis@akonbutik.com`) without a
 * deploy. Falls back to `info@akonbutik.com`.
 */
@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(@Inject(EMAIL_TRANSPORT) private readonly transport: EmailTransport) {}

  async submit(dto: ContactMessageDto, meta: { ip: string; userAgent: string }): Promise<void> {
    const inbox = this.resolveInbox();
    const subject = `[İletişim Formu] ${dto.subject}`;
    const html = renderContactEmailHtml(dto, meta);
    const text = renderContactEmailText(dto, meta);

    const result = await this.transport.send({
      to: inbox,
      subject,
      html,
      text,
      tag: 'contact_form',
    });

    this.logger.log(`contact-form delivered id=${result.messageId} from=${dto.email}`);
  }

  private resolveInbox(): string {
    // Read raw env at call time — CONTACT_INBOX_EMAIL is intentionally
    // outside the zod-validated Env block so ops can switch the inbox
    // without a code change. Falls back to the canonical address.
    // eslint-disable-next-line no-restricted-syntax
    const raw = process.env['CONTACT_INBOX_EMAIL'];
    if (typeof raw === 'string' && raw.length > 0) return raw;
    return 'info@akonbutik.com';
  }
}

/** Escape user-supplied text for safe interpolation into an HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderContactEmailHtml(
  dto: ContactMessageDto,
  meta: { ip: string; userAgent: string },
): string {
  const rows: [string, string][] = [
    ['Ad Soyad', dto.name],
    ['E-posta', dto.email],
    ['Konu', dto.subject],
  ];
  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const messageHtml = escapeHtml(dto.message).replace(/\r?\n/g, '<br />');
  return `<!doctype html>
<html lang="tr"><body style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#111;background:#f6f5f1;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;padding:24px 28px;border:1px solid #e7e3da;">
    <p style="margin:0 0 4px 0;color:#c8102e;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;font-size:12px;">Akon Butik</p>
    <h1 style="margin:0 0 16px 0;font-size:20px;font-weight:600;">Yeni iletişim formu mesajı</h1>
    <table style="border-collapse:collapse;font-size:14px;margin:0 0 16px 0;">${rowsHtml}</table>
    <h2 style="margin:18px 0 6px 0;font-size:14px;color:#6b6b6b;text-transform:uppercase;letter-spacing:0.04em;">Mesaj</h2>
    <p style="margin:0;line-height:1.55;font-size:15px;white-space:pre-wrap;">${messageHtml}</p>
    <hr style="border:none;border-top:1px solid #e7e3da;margin:24px 0 12px 0;" />
    <p style="margin:0;font-size:12px;color:#888;">IP: ${escapeHtml(meta.ip)} · UA: ${escapeHtml(meta.userAgent)}</p>
    <p style="margin:6px 0 0 0;font-size:12px;color:#888;">KVKK onayı: evet (form gönderiminde alındı)</p>
  </div>
</body></html>`;
}

function renderContactEmailText(
  dto: ContactMessageDto,
  meta: { ip: string; userAgent: string },
): string {
  return [
    'Yeni iletişim formu mesajı',
    '',
    `Ad Soyad: ${dto.name}`,
    `E-posta:  ${dto.email}`,
    `Konu:     ${dto.subject}`,
    '',
    'Mesaj:',
    dto.message,
    '',
    '---',
    `IP: ${meta.ip}`,
    `UA: ${meta.userAgent}`,
    'KVKK onayı: evet',
  ].join('\n');
}
