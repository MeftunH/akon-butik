/**
 * Inline transactional email templates. Kept simple and dependency-free
 * (no Handlebars / MJML) so the bundle stays small and the templates
 * are searchable by grep. When the marketing team gives us branded
 * versions, swap the strings; the function signatures don't change.
 */

interface OrderLine {
  productNameSnap: string;
  variantSku: string;
  size: string | null;
  color: string | null;
  quantity: number;
  totalPriceMinor: number;
}

interface AddressSnap {
  adSoyad: string;
  telefon: string;
  il: string;
  ilce: string;
  acikAdres: string;
  postaKodu: string;
}

interface OrderForEmail {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalMinor: number;
  subtotalMinor: number;
  shippingMinor: number;
  currency: string;
  items: readonly OrderLine[];
  shippingAddress: AddressSnap;
  createdAt: Date;
}

const tl = (minor: number): string =>
  `${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`;

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function renderOrderConfirmation(order: OrderForEmail): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Siparişiniz alındı — ${order.orderNumber}`;
  const itemsHtml = order.items
    .map(
      (l) => `
        <tr>
          <td style="padding:12px 8px;border-bottom:1px solid #eee;">
            <strong>${escapeHtml(l.productNameSnap)}</strong><br/>
            <small style="color:#888;">
              ${escapeHtml(l.variantSku)}${l.size ? ` · ${escapeHtml(l.size)}` : ''}${
                l.color ? ` · ${escapeHtml(l.color)}` : ''
              }
            </small>
          </td>
          <td style="padding:12px 8px;border-bottom:1px solid #eee;text-align:center;">×${l.quantity}</td>
          <td style="padding:12px 8px;border-bottom:1px solid #eee;text-align:right;">${tl(l.totalPriceMinor)}</td>
        </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#222;background:#f6f7f9;margin:0;padding:24px;">
  <table role="presentation" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
    <tr><td style="padding:32px 32px 16px;text-align:center;border-bottom:1px solid #eee;">
      <h1 style="margin:0;font-size:24px;letter-spacing:0.5px;">AKON BUTİK</h1>
    </td></tr>
    <tr><td style="padding:24px 32px;">
      <h2 style="margin:0 0 8px;font-size:20px;">Merhaba ${escapeHtml(order.customerName)},</h2>
      <p style="margin:0 0 16px;color:#444;">
        Siparişinizi aldık, en kısa sürede hazırlanıp kargoya verilecek.
      </p>
      <p style="margin:0 0 16px;color:#444;">
        Sipariş Numaranız: <strong>${escapeHtml(order.orderNumber)}</strong>
      </p>

      <h3 style="margin:24px 0 12px;font-size:16px;">Sipariş İçeriği</h3>
      <table role="presentation" style="width:100%;border-collapse:collapse;">
        <thead><tr>
          <th style="text-align:left;padding:8px;color:#888;font-weight:normal;border-bottom:2px solid #eee;">Ürün</th>
          <th style="text-align:center;padding:8px;color:#888;font-weight:normal;border-bottom:2px solid #eee;">Adet</th>
          <th style="text-align:right;padding:8px;color:#888;font-weight:normal;border-bottom:2px solid #eee;">Tutar</th>
        </tr></thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr><td colspan="2" style="padding:8px;text-align:right;color:#666;">Ara Toplam</td>
            <td style="padding:8px;text-align:right;">${tl(order.subtotalMinor)}</td></tr>
          <tr><td colspan="2" style="padding:8px;text-align:right;color:#666;">Kargo</td>
            <td style="padding:8px;text-align:right;">${
              order.shippingMinor === 0
                ? '<span style="color:#28a745;">Ücretsiz</span>'
                : tl(order.shippingMinor)
            }</td></tr>
          <tr><td colspan="2" style="padding:12px 8px;text-align:right;font-weight:bold;border-top:2px solid #eee;">Toplam</td>
            <td style="padding:12px 8px;text-align:right;font-weight:bold;font-size:18px;border-top:2px solid #eee;">${tl(order.totalMinor)}</td></tr>
        </tfoot>
      </table>

      <h3 style="margin:24px 0 12px;font-size:16px;">Teslimat Adresi</h3>
      <p style="margin:0;line-height:1.6;color:#444;">
        <strong>${escapeHtml(order.shippingAddress.adSoyad)}</strong><br/>
        ${escapeHtml(order.shippingAddress.acikAdres)}<br/>
        ${escapeHtml(order.shippingAddress.ilce)} / ${escapeHtml(order.shippingAddress.il)} ${escapeHtml(order.shippingAddress.postaKodu)}<br/>
        ${escapeHtml(order.shippingAddress.telefon)}
      </p>

      <p style="margin:32px 0 0;color:#666;font-size:14px;">
        Sorularınız için <a href="mailto:destek@akonbutik.com" style="color:#222;">destek@akonbutik.com</a>.
      </p>
    </td></tr>
    <tr><td style="padding:16px 32px;text-align:center;border-top:1px solid #eee;color:#999;font-size:12px;">
      © ${order.createdAt.getFullYear().toString()} Akon Butik. Tüm hakları saklıdır.
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Merhaba ${order.customerName},`,
    '',
    'Siparişinizi aldık.',
    `Sipariş No: ${order.orderNumber}`,
    `Toplam: ${tl(order.totalMinor)}`,
    '',
    'Ürünler:',
    ...order.items.map(
      (l) => `  ${l.productNameSnap} ×${l.quantity.toString()} — ${tl(l.totalPriceMinor)}`,
    ),
    '',
    'Teslimat:',
    `  ${order.shippingAddress.adSoyad}`,
    `  ${order.shippingAddress.acikAdres}`,
    `  ${order.shippingAddress.ilce} / ${order.shippingAddress.il} ${order.shippingAddress.postaKodu}`,
    `  ${order.shippingAddress.telefon}`,
  ].join('\n');

  return { subject, html, text };
}

export type { OrderForEmail };
