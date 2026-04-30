/**
 * Seed script — populates a local dev database with a realistic but small dataset
 * pulled from the Ocaka theme's sample data, so the storefront has something to render
 * before DIA sync is wired in (Phase 1).
 *
 * Run: pnpm --filter @akonbutik/database db:seed
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding…');

  // Brands
  const brands = await Promise.all(
    ['Akon', 'Zalando', 'Adidas', 'Nike'].map((name) =>
      prisma.brand.upsert({
        where: { slug: name.toLowerCase() },
        create: { name, slug: name.toLowerCase() },
        update: {},
      }),
    ),
  );

  // Categories
  const categories = await Promise.all(
    [
      { slug: 'kadin', nameTr: 'Kadın' },
      { slug: 'erkek', nameTr: 'Erkek' },
      { slug: 'ayakkabi', nameTr: 'Ayakkabı' },
      { slug: 'canta', nameTr: 'Çanta' },
    ].map((c) =>
      prisma.category.upsert({
        where: { slug: c.slug },
        create: c,
        update: {},
      }),
    ),
  );

  // One sample product with variants
  const sample = await prisma.product.upsert({
    where: { slug: 'zarif-yazlik-iki-parca-takim' },
    create: {
      slug: 'zarif-yazlik-iki-parca-takim',
      nameTr: 'Zarif Yazlık İki Parça Takım',
      descriptionMd: 'Yumuşak dokulu, hafif kumaştan zarif yazlık takım.',
      defaultPriceMinor: 6500_00,
      brandId: brands[0]!.id,
      categoryId: categories[0]!.id,
      status: 'visible',
      images: {
        create: [
          {
            url: '/images/products/product-1.jpg',
            sortOrder: 0,
            isPrimary: true,
            source: 'manual',
          },
          { url: '/images/products/product-2.jpg', sortOrder: 1, source: 'manual' },
        ],
      },
      variants: {
        create: [
          {
            diaStokkartkodu: 'AKB-001-XS-BROWN',
            sku: 'AKB-001-XS-BROWN',
            size: 'XS',
            color: 'Kahverengi',
            stockQty: 3,
          },
          {
            diaStokkartkodu: 'AKB-001-S-BROWN',
            sku: 'AKB-001-S-BROWN',
            size: 'S',
            color: 'Kahverengi',
            stockQty: 5,
          },
          {
            diaStokkartkodu: 'AKB-001-M-BROWN',
            sku: 'AKB-001-M-BROWN',
            size: 'M',
            color: 'Kahverengi',
            stockQty: 8,
          },
        ],
      },
    },
    update: {},
  });

  // Admin user
  await prisma.adminUser.upsert({
    where: { email: 'admin@akonbutik.com' },
    create: {
      email: 'admin@akonbutik.com',
      // dev-only argon2 of "ChangeMeAtFirstLogin!" — replaced by real flow in Phase 4
      passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$DEVELOPMENT$DEVELOPMENT_REPLACE_AT_BOOT',
      name: 'Akon Admin',
      role: 'admin',
    },
    update: {},
  });

  console.log(`Seeded ${brands.length} brands, ${categories.length} categories, 1 product (${sample.id}), 1 admin.`);
}

main()
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
