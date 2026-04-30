import type { ProductDetail } from '@akonbutik/types';
import { Price } from '@akonbutik/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AddToCart } from './_components/AddToCart';
import { ProductSelectionProvider } from './_components/selection-context';
import { VariantPicker } from './_components/VariantPicker';

import { api, ApiError } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

async function loadProduct(slug: string): Promise<ProductDetail | null> {
  try {
    return await api<ProductDetail>(`/catalog/products/${slug}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return { title: 'Ürün bulunamadı' };
  return {
    title: product.nameTr,
    description: product.descriptionMd.slice(0, 160),
    openGraph: {
      title: product.nameTr,
      description: product.descriptionMd.slice(0, 160),
      ...(product.primaryImageUrl && { images: [product.primaryImageUrl] }),
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameTr,
    description: product.descriptionMd,
    image: product.primaryImageUrl ?? undefined,
    sku: product.variants[0]?.sku,
    brand: product.brand?.name,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TRY',
      lowPrice: Math.min(...product.variants.map((v) => v.priceMinor)) / 100,
      highPrice: Math.max(...product.variants.map((v) => v.priceMinor)) / 100,
      offerCount: product.variants.length,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <main className="container py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" className="mb-4 small text-muted">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-muted">
              Ana Sayfa
            </Link>
          </li>
          {product.category && (
            <li className="breadcrumb-item">
              <Link href={`/category/${product.category.slug}`} className="text-muted">
                {product.category.name}
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {product.nameTr}
          </li>
        </ol>
      </nav>

      <div className="row gx-5">
        <div className="col-lg-7">
          <div className="product-gallery">
            {product.primaryImageUrl ? (
              // PDP gallery uses static product photos served from the
              // theme's /images directory. next/image is a Phase 6 task
              // (CDN domains aren't configured yet); keep the plain tag.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.primaryImageUrl}
                alt={product.nameTr}
                className="img-fluid rounded"
              />
            ) : (
              <div className="placeholder-image rounded bg-light" style={{ aspectRatio: '4/5' }} />
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <h1 className="h2 fw-bold mb-3">{product.nameTr}</h1>
          {product.brand && (
            <p className="text-muted mb-3">
              Marka:{' '}
              <Link href={`/brand/${product.brand.slug}`} className="text-decoration-none">
                {product.brand.name}
              </Link>
            </p>
          )}
          <Price
            amount={{ amountMinor: product.defaultPriceMinor, currency: 'TRY' }}
            size="lg"
            className="mb-4 d-block"
          />

          <ProductSelectionProvider>
            <VariantPicker product={product} />
            <AddToCart product={product} />
          </ProductSelectionProvider>

          <div className="mt-4 pt-4 border-top">
            <h2 className="h6 fw-bold">Ürün Açıklaması</h2>
            <div className="text-muted">{product.descriptionMd}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
