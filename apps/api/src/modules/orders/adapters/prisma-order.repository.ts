import { Injectable, BadRequestException } from '@nestjs/common';
import type { OrderSummary } from '@akonbutik/types';

import { PrismaService } from '../../prisma/prisma.service';
import type {
  CreateOrderInput,
  OrderRepository,
} from '../ports/order.repository';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateOrderInput): Promise<OrderSummary & { id: string }> {
    if (input.cart.items.length === 0) {
      throw new BadRequestException('Sepet boş — sipariş oluşturulamaz');
    }
    const orderNumber = await this.allocateOrderNumber();

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId: input.userId ?? null,
        status: 'pending',
        subtotalMinor: input.cart.subtotalMinor,
        shippingMinor: input.cart.shippingMinor,
        totalMinor: input.cart.totalMinor,
        currency: input.cart.currency,
        billingAddress: input.billingAddress as unknown as object,
        shippingAddress: input.shippingAddress as unknown as object,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        customerName: input.customerName,
        notes: input.notes ?? null,
        items: {
          create: input.cart.items.map((line) => ({
            variantId: line.variant.id,
            productNameSnap: line.product.nameTr,
            variantSku: line.variant.sku,
            size: line.variant.size,
            color: line.variant.color,
            unitPriceMinor: line.variant.priceMinor,
            quantity: line.quantity,
            totalPriceMinor: line.variant.priceMinor * line.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return this.toSummary(order);
  }

  async findById(id: string): Promise<(OrderSummary & { id: string }) | null> {
    const order = await this.prisma.order.findUnique({ where: { id }, include: { items: true } });
    return order ? this.toSummary(order) : null;
  }

  async findByOrderNumber(
    orderNumber: string,
  ): Promise<(OrderSummary & { id: string }) | null> {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });
    return order ? this.toSummary(order) : null;
  }

  async markPaid(orderId: string): Promise<void> {
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'paid', paidAt: new Date() },
    });
  }

  /** Deterministic running counter via the Setting kv store. */
  private async allocateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const key = `order_seq:${year.toString()}`;
    const seq = await this.prisma.$transaction(async (tx) => {
      const row = await tx.setting.upsert({
        where: { key },
        create: { key, value: 1 as unknown as object },
        update: {},
      });
      const next = (Number(row.value as unknown) || 0) + 1;
      await tx.setting.update({
        where: { key },
        data: { value: next as unknown as object },
      });
      return next;
    });
    return `AKB-${year.toString()}-${seq.toString().padStart(5, '0')}`;
  }

  private toSummary(
    order: Awaited<ReturnType<PrismaService['order']['findUnique']>> & {
      items: { quantity: number }[];
    },
  ): OrderSummary & { id: string } {
    if (!order) throw new Error('order is null');
    const itemCount = order.items.reduce((acc, i) => acc + i.quantity, 0);
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      diaSiparisKodu: order.diaSiparisKodu,
      status: order.status,
      totalMinor: order.totalMinor,
      currency: order.currency as 'TRY',
      itemCount,
      createdAt: order.createdAt.toISOString(),
    };
  }
}
