'use client';

import { Price, useCart } from '@akonbutik/ui';
import Link from 'next/link';

export function CartView() {
  const { cart, loading, setQuantity, remove } = useCart();

  if (loading) {
    return <p className="text-center text-muted py-5">Sepetiniz yükleniyor…</p>;
  }
  if (cart.items.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3 mb-3">Sepetiniz boş</h1>
        <p className="text-muted mb-4">Mağazaya göz atıp birkaç parça ekleyin.</p>
        <Link href="/shop" className="btn btn-primary">
          Mağazaya Dön
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="h2 fw-bold mb-4">Sepetim</h1>
      <div className="row gx-5">
        <section className="col-lg-8">
          <div className="cart-list">
            {cart.items.map((line) => (
              <article
                key={line.variantId}
                className="cart-line d-flex gap-3 align-items-center py-3 border-bottom"
              >
                {line.product.primaryImageUrl && (
                  <img
                    src={line.product.primaryImageUrl}
                    alt={line.product.nameTr}
                    width={80}
                    height={100}
                    className="rounded"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className="flex-grow-1">
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="text-decoration-none fw-semibold d-block"
                  >
                    {line.product.nameTr}
                  </Link>
                  <small className="text-muted">
                    {[line.variant.size, line.variant.color].filter(Boolean).join(' · ')}
                  </small>
                </div>
                <input
                  type="number"
                  min={0}
                  max={line.variant.stockQty}
                  value={line.quantity}
                  onChange={(e) =>
                    void setQuantity(line.variantId, Math.max(0, Number(e.target.value)))
                  }
                  className="form-control"
                  style={{ width: 70 }}
                  aria-label="Adet"
                />
                <Price
                  amount={{ amountMinor: line.variant.priceMinor * line.quantity, currency: 'TRY' }}
                />
                <button
                  type="button"
                  className="btn btn-link text-danger"
                  onClick={() => void remove(line.variantId)}
                  aria-label="Sepetten çıkar"
                >
                  ✕
                </button>
              </article>
            ))}
          </div>
        </section>
        <aside className="col-lg-4">
          <div className="cart-summary border rounded p-4">
            <h2 className="h5 fw-bold mb-3">Sipariş Özeti</h2>
            <div className="d-flex justify-content-between mb-2">
              <span>Ara Toplam</span>
              <Price amount={{ amountMinor: cart.subtotalMinor, currency: 'TRY' }} />
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Kargo</span>
              {cart.shippingMinor === 0 ? (
                <span className="text-success">Ücretsiz</span>
              ) : (
                <Price amount={{ amountMinor: cart.shippingMinor, currency: 'TRY' }} />
              )}
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Toplam</span>
              <Price
                amount={{ amountMinor: cart.totalMinor, currency: 'TRY' }}
                size="lg"
              />
            </div>
            <Link href="/checkout" className="btn btn-primary w-100">
              Ödemeye Geç
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
