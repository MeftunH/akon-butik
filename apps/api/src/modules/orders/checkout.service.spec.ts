import { PrismaClient } from '@akonbutik/database';
import type { ConfigService } from '@nestjs/config';
import type { Queue } from 'bullmq';

import type { Env } from '../../config/env';
import { PrismaCartRepository } from '../cart/adapters/prisma-cart.repository';
import { MockPaymentAdapter } from '../payments/adapters/mock-payment.adapter';
import { PaymentsService } from '../payments/payments.service';
import type { PrismaService } from '../prisma/prisma.service';

import { PrismaOrderRepository } from './adapters/prisma-order.repository';
import { CheckoutService } from './checkout.service';

/**
 * Integration test for the full checkout pipeline against the **local dev
 * Postgres**. Walks the same path the customer-facing API takes:
 *
 *   guest cart → CheckoutService.init → mock provider → confirmMockCallback
 *
 * and asserts the order rolls to `paid` *and* both background queues
 * (DIA push + email confirmation) receive a job. The queues are mocked at
 * the BullMQ boundary — we don't need Redis up to verify the contract.
 *
 * Pre-req: docker compose -f infra/docker/docker-compose.dev.yml up -d
 *          and migrations applied.
 */
describe('CheckoutService (integration)', () => {
  let prisma: PrismaService;
  let checkout: CheckoutService;
  let cartRepo: PrismaCartRepository;
  let diaPushQueue: { add: jest.Mock };
  let emailQueue: { add: jest.Mock };
  let testVariantId: string;

  const TEST_BRAND_KEY = 'CHK-BR';
  const TEST_CAT_KEY = 'CHK-CAT';
  const TEST_PRODUCT_KEY = 'CHK-IT-A';
  const TEST_SKU = 'CHK-A-M-BLUE';
  const TEST_EMAIL = 'checkout-spec@akonbutik.test';

  const address = {
    adSoyad: 'Test Buyer',
    telefon: '+90 555 000 0000',
    il: 'Istanbul',
    ilce: 'Kadikoy',
    acikAdres: 'Test Sk. No: 1 D: 2',
    postaKodu: '34710',
  };

  async function cleanup(): Promise<void> {
    const variant = await prisma.productVariant.findUnique({ where: { sku: TEST_SKU } });
    if (variant) {
      await prisma.cartItem.deleteMany({ where: { variantId: variant.id } });
      await prisma.orderItem.deleteMany({ where: { variantId: variant.id } });
    }
    const orders = await prisma.order.findMany({
      where: { customerEmail: TEST_EMAIL },
      select: { id: true },
    });
    if (orders.length > 0) {
      const ids = orders.map((o) => o.id);
      await prisma.payment.deleteMany({ where: { orderId: { in: ids } } });
      await prisma.orderItem.deleteMany({ where: { orderId: { in: ids } } });
      await prisma.order.deleteMany({ where: { id: { in: ids } } });
    }
    await prisma.cart.deleteMany({ where: { sessionId: { startsWith: 'chk-spec-' } } });
    await prisma.productVariant.deleteMany({ where: { sku: TEST_SKU } });
    await prisma.product.deleteMany({ where: { diaParentKey: TEST_PRODUCT_KEY } });
    await prisma.brand.deleteMany({ where: { diaMarkaKodu: TEST_BRAND_KEY } });
    await prisma.category.deleteMany({ where: { diaKategoriKodu: TEST_CAT_KEY } });
  }

  beforeAll(async () => {
    prisma = new PrismaClient() as unknown as PrismaService;
    await (prisma as unknown as PrismaClient).$connect();

    await cleanup();

    const brand = await prisma.brand.create({
      data: { diaMarkaKodu: TEST_BRAND_KEY, slug: 'chk-br', name: 'Checkout Brand' },
    });
    const category = await prisma.category.create({
      data: { diaKategoriKodu: TEST_CAT_KEY, slug: 'chk-cat', nameTr: 'Checkout Kategori' },
    });
    const product = await prisma.product.create({
      data: {
        slug: 'chk-product',
        nameTr: 'Checkout Test Bluz',
        descriptionMd: 'Integration test product',
        defaultPriceMinor: 19990,
        diaParentKey: TEST_PRODUCT_KEY,
        status: 'visible',
        brandId: brand.id,
        categoryId: category.id,
        variants: {
          create: [
            {
              sku: TEST_SKU,
              diaStokkartkodu: TEST_SKU,
              size: 'M',
              color: 'Mavi',
              stockQty: 10,
            },
          ],
        },
      },
      include: { variants: true },
    });
    const seededVariant = product.variants.at(0);
    if (!seededVariant) throw new Error('Test variant was not seeded');
    testVariantId = seededVariant.id;

    cartRepo = new PrismaCartRepository(prisma);
    const orderRepo = new PrismaOrderRepository(prisma);
    const provider = new MockPaymentAdapter();
    const payments = new PaymentsService(provider, prisma);
    diaPushQueue = { add: jest.fn().mockResolvedValue({ id: 'dia-job' }) };
    emailQueue = { add: jest.fn().mockResolvedValue({ id: 'email-job' }) };
    const config = {
      get: (key: keyof Env): unknown => {
        if (key === 'STOREFRONT_URL') return 'http://localhost:3001';
        return undefined;
      },
    } as unknown as ConfigService<Env, true>;

    checkout = new CheckoutService(
      cartRepo,
      orderRepo,
      payments,
      prisma,
      config,
      diaPushQueue as unknown as Queue,
      emailQueue as unknown as Queue,
    );
  });

  afterAll(async () => {
    await cleanup();
    await (prisma as unknown as PrismaClient).$disconnect();
  });

  it('runs cart → init → mock callback and enqueues DIA push + email confirmation', async () => {
    const sessionId = `chk-spec-${Date.now().toString()}`;

    await cartRepo.addItem({ sessionId }, testVariantId, 2);

    const init = await checkout.init({
      sessionId,
      customerEmail: TEST_EMAIL,
      customerName: 'Test Buyer',
      customerPhone: '+90 555 000 0000',
      billingAddress: address,
      shippingAddress: address,
    });

    expect(init.orderNumber).toMatch(/^AKB-\d{4}-\d+$/);
    expect(init.redirectUrl).toContain('mock=ok');

    const order = await prisma.order.findUnique({
      where: { orderNumber: init.orderNumber },
      include: { items: true },
    });
    if (!order) throw new Error('Order missing after init');
    expect(order.status).toBe('pending');
    expect(order.items).toHaveLength(1);
    const firstItem = order.items.at(0);
    if (!firstItem) throw new Error('OrderItem missing');
    expect(firstItem.quantity).toBe(2);
    expect(order.totalMinor).toBe(19990 * 2 + 4990);

    const cart = await prisma.cart.findFirst({ where: { sessionId } });
    if (!cart) throw new Error('Cart missing after init');
    const cartItems = await prisma.cartItem.findMany({ where: { cartId: cart.id } });
    expect(cartItems).toHaveLength(0);

    const result = await checkout.confirmMockCallback(order.id);
    expect(result.status).toBe('paid');

    expect(diaPushQueue.add).toHaveBeenCalledTimes(1);
    expect(diaPushQueue.add).toHaveBeenCalledWith(
      'push',
      { orderId: order.id },
      expect.objectContaining({ jobId: `push-${order.id}` }),
    );

    expect(emailQueue.add).toHaveBeenCalledTimes(1);
    expect(emailQueue.add).toHaveBeenCalledWith(
      'order-confirmation',
      { orderId: order.id },
      expect.objectContaining({ jobId: `email-confirm-${order.id}` }),
    );

    const payment = await prisma.payment.findFirst({
      where: { orderId: order.id },
      orderBy: { createdAt: 'desc' },
    });
    expect(payment?.status).toBe('captured');
    expect(payment?.capturedAt).not.toBeNull();
  });

  it('confirmMockCallback is idempotent — second call does not double-enqueue', async () => {
    const order = await prisma.order.findFirst({
      where: { customerEmail: TEST_EMAIL },
      orderBy: { createdAt: 'desc' },
    });
    if (!order) throw new Error('No order to confirm');

    diaPushQueue.add.mockClear();
    emailQueue.add.mockClear();

    const result = await checkout.confirmMockCallback(order.id);
    expect(result.status).toBe('paid');
    expect(diaPushQueue.add).not.toHaveBeenCalled();
    expect(emailQueue.add).not.toHaveBeenCalled();
  });
});
