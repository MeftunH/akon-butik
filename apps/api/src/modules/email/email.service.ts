import { Inject, Injectable, Logger } from '@nestjs/common';

import type { PrismaService } from '../prisma/prisma.service';

import { EMAIL_TRANSPORT, type EmailTransport } from './email.port';
import { renderOrderConfirmation } from './templates';

/**
 * High-level facade over the EmailTransport. Loads the order from
 * Prisma, renders the appropriate template, and hands the message to
 * the transport. Lives separately from the SMTP adapter so callers
 * (controllers, BullMQ processors) don't need to know about template
 * names or transport details.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(EMAIL_TRANSPORT) private readonly transport: EmailTransport,
  ) {}

  async sendOrderConfirmation(orderId: string): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { orderBy: { id: 'asc' } } },
    });
    if (!order) {
      this.logger.warn(`order ${orderId} vanished — skipping confirmation email`);
      return;
    }

    const { subject, html, text } = renderOrderConfirmation({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalMinor: order.totalMinor,
      subtotalMinor: order.subtotalMinor,
      shippingMinor: order.shippingMinor,
      currency: order.currency,
      createdAt: order.createdAt,
      shippingAddress: order.shippingAddress as {
        adSoyad: string;
        telefon: string;
        il: string;
        ilce: string;
        acikAdres: string;
        postaKodu: string;
      },
      items: order.items.map((i) => ({
        productNameSnap: i.productNameSnap,
        variantSku: i.variantSku,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        totalPriceMinor: i.totalPriceMinor,
      })),
    });

    await this.transport.send({
      to: order.customerEmail,
      subject,
      html,
      text,
      tag: 'order_confirmation',
    });
  }
}
