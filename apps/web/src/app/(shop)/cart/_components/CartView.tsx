'use client';

import { Price, useCart } from '@akonbutik/ui';
import Link from 'next/link';

const FALLBACK_IMAGES = [
  '/images/products/fashion/product-1.jpg',
  '/images/products/fashion/product-2.jpg',
  '/images/products/fashion/product-3.jpg',
  '/images/products/fashion/product-4.jpg',
  '/images/products/fashion/product-5.jpg',
  '/images/products/fashion/product-6.jpg',
  '/images/products/fashion/product-7.jpg',
  '/images/products/fashion/product-8.jpg',
  '/images/products/fashion/product-9.jpg',
  '/images/products/fashion/product-10.jpg',
  '/images/products/fashion/product-11.jpg',
];

const FALLBACK_DEFAULT = '/images/products/fashion/product-1.jpg';

function pickImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length] ?? FALLBACK_DEFAULT;
}

export function CartView() {
  const { cart, loading, setQuantity, remove } = useCart();

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <p className="text-muted">Sepetiniz yükleniyor…</p>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="flat-spacing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="box-text_empty type-shop_cart col-12 col-md-7 col-lg-5 text-center">
              <div className="shop-empty_top">
                <span className="icon">
                  <i className="icon-shopping-cart-simple" />
                </span>
                <h3 className="text-emp fw-normal mt-3">Sepetiniz boş</h3>
                <p className="h6 text-main">
                  Mağazaya göz atıp beğendiğiniz parçaları sepete ekleyin.
                </p>
              </div>
              <div className="shop-empty_bot mt-4 d-flex flex-column gap-2">
                <Link href="/shop" className="tf-btn animate-btn">
                  Mağazaya Git
                </Link>
                <Link href="/" className="tf-btn style-line">
                  Anasayfaya Dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flat-spacing each-list-prd">
      <div className="container">
        <div className="row gx-5">
          <div className="col-xxl-9 col-xl-8">
            <table className="tf-table-page-cart w-100">
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th className="text-center">Birim</th>
                  <th className="text-center">Adet</th>
                  <th className="text-end">Tutar</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart.items.map((line) => {
                  const img = line.product.primaryImageUrl ?? pickImage(line.product.slug);
                  return (
                    <tr key={line.variantId} className="tf-cart-item">
                      <td>
                        <div className="d-flex gap-3 align-items-center">
                          <Link
                            href={`/products/${line.product.slug}`}
                            className="d-block flex-shrink-0"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img}
                              alt={line.product.nameTr}
                              width={100}
                              height={130}
                              className="rounded"
                              style={{ objectFit: 'cover' }}
                            />
                          </Link>
                          <div>
                            <Link
                              href={`/products/${line.product.slug}`}
                              className="cart-name_product fw-semibold text-decoration-none d-block"
                            >
                              {line.product.nameTr}
                            </Link>
                            <small className="text-muted">
                              {[line.variant.size, line.variant.color]
                                .filter(Boolean)
                                .join(' · ') || line.variant.sku}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <Price amount={{ amountMinor: line.variant.priceMinor, currency: 'TRY' }} />
                      </td>
                      <td className="text-center">
                        <div className="wg-quantity d-inline-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn-quantity btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              void setQuantity(line.variantId, Math.max(0, line.quantity - 1))
                            }
                            aria-label="Azalt"
                          >
                            −
                          </button>
                          <span className="quantity-product fw-bold" style={{ minWidth: 30 }}>
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="btn-quantity btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              void setQuantity(
                                line.variantId,
                                Math.min(line.variant.stockQty, line.quantity + 1),
                              )
                            }
                            disabled={line.quantity >= line.variant.stockQty}
                            aria-label="Arttır"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-end fw-semibold">
                        <Price
                          amount={{
                            amountMinor: line.variant.priceMinor * line.quantity,
                            currency: 'TRY',
                          }}
                        />
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0"
                          onClick={() => void remove(line.variantId)}
                          aria-label="Sepetten çıkar"
                        >
                          <i className="icon icon-close" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-3">
              <Link href="/shop" className="tf-btn style-line">
                <i className="icon icon-arrow-left me-2" /> Alışverişe Devam Et
              </Link>
            </div>
          </div>

          <aside className="col-xxl-3 col-xl-4">
            <div className="tf-page-cart_sidebar bg-surface p-4 rounded">
              <h2 className="h5 fw-bold mb-3">Sipariş Özeti</h2>
              <div className="d-flex justify-content-between mb-2">
                <span>Ara Toplam</span>
                <Price amount={{ amountMinor: cart.subtotalMinor, currency: 'TRY' }} />
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Kargo</span>
                {cart.shippingMinor === 0 ? (
                  <span className="text-success fw-semibold">Ücretsiz</span>
                ) : (
                  <Price amount={{ amountMinor: cart.shippingMinor, currency: 'TRY' }} />
                )}
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-4 fs-5">
                <span>Toplam</span>
                <Price amount={{ amountMinor: cart.totalMinor, currency: 'TRY' }} size="lg" />
              </div>
              <Link
                href="/checkout"
                className="tf-btn animate-btn w-100 justify-content-center fw-semibold"
              >
                Ödemeye Geç <i className="icon icon-arrow-right ms-2" />
              </Link>
              <p className="text-muted small mt-3 mb-0 text-center">
                Vergi ve indirimler ödeme adımında hesaplanır.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
