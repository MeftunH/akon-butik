import type { DiaClient, Stokkart } from '@akonbutik/dia-client';
import { PrismaClient } from '@akonbutik/database';

import { PrismaService } from '../prisma/prisma.service';

import { DiaSyncService } from './dia-sync.service';

/**
 * Integration test for DiaSyncService against the **local dev Postgres**.
 *
 * Pre-req: docker compose -f infra/docker/docker-compose.dev.yml up -d
 *          and migrations applied (`pnpm --filter @akonbutik/database db:migrate dev`).
 *
 * The DiaClient is mocked at the boundary (no network) — we control the stokkart
 * stream and assert the resulting Postgres state. This validates the full
 * mapper → upsert → DiaSyncLog pipeline end-to-end.
 */
describe('DiaSyncService (integration)', () => {
  let prisma: PrismaService;
  let svc: DiaSyncService;

  const stokkarts: Stokkart[] = [
    {
      stokkartkodu: 'IT-A-XS-RED',
      aciklama: 'Test Bluz — XS Kırmızı',
      urungrubu: 'IT-A',
      markakodu: 'TESTBR',
      kategorikodu: 'TESTCAT',
      satisfiyati1: 89.9,
      durum: 'A',
      b2c_durum: 'E',
      b2c_depomiktari: 4,
      beden: 'XS',
      renk: 'Kırmızı',
    },
    {
      stokkartkodu: 'IT-A-S-RED',
      aciklama: 'Test Bluz — S Kırmızı',
      urungrubu: 'IT-A',
      markakodu: 'TESTBR',
      kategorikodu: 'TESTCAT',
      satisfiyati1: 89.9,
      durum: 'A',
      b2c_durum: 'E',
      b2c_depomiktari: 7,
      beden: 'S',
      renk: 'Kırmızı',
    },
  ];

  const fakeDia: Pick<DiaClient, 'scf'> = {
    scf: {
      stokkartIterate: () => {
        async function* gen(): AsyncGenerator<readonly Stokkart[], void, undefined> {
          yield stokkarts;
        }
        return gen();
      },
      kategoriListele: async () => [
        { _key: '1', kategorikodu: 'TESTCAT', aciklama: 'Test Kategori' },
      ],
      markaListele: async () => [
        { _key: '1', markakodu: 'TESTBR', aciklama: 'Test Marka' },
      ],
    } as unknown as DiaClient['scf'],
  };

  beforeAll(async () => {
    prisma = new PrismaClient() as unknown as PrismaService;
    await (prisma as unknown as PrismaClient).$connect();
    svc = new DiaSyncService(fakeDia as DiaClient, prisma);

    // Reset only the rows this test owns
    await prisma.productVariant.deleteMany({
      where: { diaStokkartkodu: { in: stokkarts.map((s) => s.stokkartkodu) } },
    });
    await prisma.product.deleteMany({ where: { diaParentKey: 'IT-A' } });
    await prisma.brand.deleteMany({ where: { diaMarkaKodu: 'TESTBR' } });
    await prisma.category.deleteMany({ where: { diaKategoriKodu: 'TESTCAT' } });
    await prisma.diaSyncLog.deleteMany({ where: { entity: { in: ['products', 'categories'] } } });

    // Pre-seed brand and category so the product can connect them
    await prisma.brand.create({
      data: { diaMarkaKodu: 'TESTBR', slug: 'testbr', name: 'Test Marka' },
    });
    await prisma.category.create({
      data: { diaKategoriKodu: 'TESTCAT', slug: 'testcat', nameTr: 'Test Kategori' },
    });
  });

  afterAll(async () => {
    await prisma.productVariant.deleteMany({
      where: { diaStokkartkodu: { in: stokkarts.map((s) => s.stokkartkodu) } },
    });
    await prisma.product.deleteMany({ where: { diaParentKey: 'IT-A' } });
    await prisma.brand.deleteMany({ where: { diaMarkaKodu: 'TESTBR' } });
    await prisma.category.deleteMany({ where: { diaKategoriKodu: 'TESTCAT' } });
    await prisma.diaSyncLog.deleteMany({ where: { entity: { in: ['products', 'categories'] } } });
    await (prisma as unknown as PrismaClient).$disconnect();
  });

  it('upserts a Product + 2 Variants from a 2-stokkart group and writes a success DiaSyncLog row', async () => {
    const result = await svc.syncProducts();

    expect(result.inserted + result.updated).toBe(1);
    expect(result.unmatched).toBe(0);

    const product = await prisma.product.findFirst({
      where: { diaParentKey: 'IT-A' },
      include: { variants: true, brand: true, category: true },
    });
    expect(product).not.toBeNull();
    expect(product?.nameTr).toBe('Test Bluz');
    expect(product?.defaultPriceMinor).toBe(8990);
    expect(product?.brand?.diaMarkaKodu).toBe('TESTBR');
    expect(product?.category?.diaKategoriKodu).toBe('TESTCAT');
    expect(product?.variants).toHaveLength(2);
    const sizes = product!.variants.map((v) => v.size).sort();
    expect(sizes).toEqual(['S', 'XS']);

    const log = await prisma.diaSyncLog.findFirst({
      where: { entity: 'products' },
      orderBy: { startedAt: 'desc' },
    });
    expect(log?.status).toBe('success');
  });

  it('is idempotent — a second run only updates and does not duplicate variants', async () => {
    await svc.syncProducts();
    const variantCount = await prisma.productVariant.count({
      where: { diaStokkartkodu: { in: stokkarts.map((s) => s.stokkartkodu) } },
    });
    expect(variantCount).toBe(2);
  });
});
