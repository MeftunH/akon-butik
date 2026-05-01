import type { ProductDetail } from '@akonbutik/types';
import { Price } from '@akonbutik/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AddToCart } from './_components/AddToCart';
import { ProductGallery } from './_components/ProductGallery';
import { ProductInfoExtras } from './_components/ProductInfoExtras';
import { ProductSelectionProvider } from './_components/selection-context';
import { VariantPicker } from './_components/VariantPicker';

import { env } from '@/config/env';
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

/**
 * Storefront PDP — vendor `product-details/Details1.tsx` mirror, scoped
 * down to the features Akon Butik ships in Phase 5f:
 *
 *   s-page-title (breadcrumb)
 *     -> flat-single-product flat-spacing-3
 *        -> tf-main-product section-image-zoom
 *           -> col-md-6: ProductGallery (Slider1 thumbs-left)
 *           -> col-md-6: tf-product-info-list
 *                        -> name + price-on-sale + VariantPicker + AddToCart
 *                        -> tf-product-description
 *                        -> ProductInfoExtras (delivery/payment/sku/cat)
 *
 * Vendor's countdown / BoughtTogether / RelatedProducts / sticky panel
 * are deferred to Phase 6.
 */
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');

  const productLd = {
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

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Mağaza', item: `${base}/shop` },
      ...(product.category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: product.category.name,
              item: `${base}/shop?category=${product.category.slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: product.category ? 4 : 3,
        name: product.nameTr,
        item: `${base}/products/${product.slug}`,
      },
    ],
  };

  const firstVariantSku = product.variants[0]?.sku ?? null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">{product.nameTr}</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link href="/" className="h6 link">
                  Ana Sayfa
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <Link href="/shop" className="h6 link">
                  Mağaza
                </Link>
              </li>
              {product.category && (
                <>
                  <li className="d-flex">
                    <i className="icon icon-caret-right" />
                  </li>
                  <li>
                    <Link href={`/shop?category=${product.category.slug}`} className="h6 link">
                      {product.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">{product.nameTr}</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flat-single-product flat-spacing-3">
        <div className="tf-main-product section-image-zoom">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <ProductGallery
                  productSlug={product.slug}
                  productName={product.nameTr}
                  images={product.images}
                />
              </div>

              <div className="col-md-6">
                <div className="tf-product-info-wrap position-relative">
                  <div className="tf-product-info-list other-image-zoom">
                    {product.brand && (
                      <div className="tf-product-info-brand">
                        <span className="text-large">Marka:</span>
                        <Link
                          href={`/shop?brand=${product.brand.slug}`}
                          className="h6 text-primary"
                        >
                          {product.brand.name}
                        </Link>
                      </div>
                    )}

                    <h2 className="product-info-name">{product.nameTr}</h2>

                    <div className="tf-product-heading">
                      <Price
                        amount={{ amountMinor: product.defaultPriceMinor, currency: 'TRY' }}
                        size="lg"
                        className="price-on-sale"
                      />
                    </div>

                    <ProductSelectionProvider>
                      <VariantPicker product={product} />
                      <AddToCart product={product} />
                    </ProductSelectionProvider>

                    <div className="tf-product-description mt-4 pt-4 border-top">
                      <h3 className="h6 fw-bold mb-2">Ürün Açıklaması</h3>
                      <div className="text-main">{product.descriptionMd}</div>
                    </div>

                    <ProductInfoExtras
                      sku={firstVariantSku}
                      {...(product.brand && { brand: product.brand })}
                      {...(product.category && { category: product.category })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
