'use client';

import { Price, useCart } from '@akonbutik/ui';
import Link from 'next/link';
import { useState } from 'react';

const FREE_SHIPPING_THRESHOLD_MINOR = 150_000; // 1500.00 TL

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

function formatTLDelta(minor: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

export function CartView() {
  const { cart, loading, setQuantity, remove } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const onApplyCoupon = (): void => {
    if (!couponCode.trim()) return;
    setCouponMessage('Bu kod şu anda geçerli değil.');
  };

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

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_MINOR - cart.subtotalMinor);
  const progressPct = Math.min(
    100,
    Math.round((cart.subtotalMinor / FREE_SHIPPING_THRESHOLD_MINOR) * 100),
  );
  const earnedFreeShipping = remaining === 0;

  return (
    <>
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Sepetim</h1>
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
                <h6 className="current-page fw-normal">Sepetim</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <main className="flat-spacing each-list-prd">
        <div className="container">
          <div className="row gx-5">
            <div className="col-xxl-9 col-xl-8">
              <div className="tf-cart-sold">
                <div className="notification-progress">
                  <div className="text">
                    <i className="icon icon-truck" />
                    {earnedFreeShipping ? (
                      <p className="h6 mb-0 text-success fw-semibold">
                        Tebrikler — ücretsiz kargo kazandınız.
                      </p>
                    ) : (
                      <p className="h6 mb-0">
                        Ücretsiz kargo için{' '}
                        <span className="text-primary fw-bold">{formatTLDelta(remaining)}</span>{' '}
                        daha ekleyin.
                      </p>
                    )}
                  </div>
                  <div className="progress-cart">
                    <div className="value" style={{ width: `${progressPct.toString()}%` }}>
                      <span className="round" />
                    </div>
                  </div>
                </div>
              </div>

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
                          <Price
                            amount={{ amountMinor: line.variant.priceMinor, currency: 'TRY' }}
                          />
                        </td>
                        <td className="text-center">
                          <div className="wg-quantity d-inline-flex align-items-center gap-2">
                            <button
                              type="button"
                              className="btn-quantity"
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
                              className="btn-quantity"
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
                            className="btn btn-link text-danger p-0 cart_remove"
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

              <div className="tf-cart-bottom mt-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <Link href="/shop" className="tf-btn style-line">
                  <i className="icon icon-arrow-left me-2" /> Alışverişe Devam Et
                </Link>

                <div className="ip-discount-code d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="İndirim kodu"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponMessage(null);
                    }}
                  />
                  <button
                    type="button"
                    className="tf-btn coupon-copy-wrap"
                    onClick={onApplyCoupon}
                    disabled={!couponCode.trim()}
                  >
                    Kodu Uygula
                  </button>
                </div>
              </div>
              {couponMessage && <p className="small text-danger mt-2 mb-0">{couponMessage}</p>}
            </div>

            <aside className="col-xxl-3 col-xl-4">
              <div className="fl-sidebar-cart bg-white-smoke sticky-top">
                <div className="box-order-summary">
                  <h4 className="title fw-semibold">Sipariş Özeti</h4>
                  <div className="subtotal d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold">Ara Toplam</h6>
                    <span className="total h6">
                      <Price amount={{ amountMinor: cart.subtotalMinor, currency: 'TRY' }} />
                    </span>
                  </div>
                  <div className="ship d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold">Kargo</h6>
                    <span className="h6">
                      {cart.shippingMinor === 0 ? (
                        <span className="text-success fw-semibold">Ücretsiz</span>
                      ) : (
                        <Price amount={{ amountMinor: cart.shippingMinor, currency: 'TRY' }} />
                      )}
                    </span>
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Toplam</span>
                    <span className="total">
                      <Price amount={{ amountMinor: cart.totalMinor, currency: 'TRY' }} size="lg" />
                    </span>
                  </h5>
                  <div className="list-ver">
                    <Link href="/checkout" className="tf-btn animate-btn w-100 fw-semibold">
                      Ödemeye Geç <i className="icon icon-arrow-right ms-2" />
                    </Link>
                    <Link href="/shop" className="tf-btn btn-white animate-btn animate-dark w-100">
                      Alışverişe Devam Et <i className="icon icon-arrow-right ms-2" />
                    </Link>
                  </div>
                  <p className="text-main small mt-3 mb-0 text-center">
                    Vergi ve indirimler ödeme adımında hesaplanır.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
