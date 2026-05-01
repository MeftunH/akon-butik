interface ProductInfoExtrasProps {
  sku: string | null;
  brand?: { name: string; slug: string } | null;
  category?: { name: string; slug: string } | null;
}

/**
 * The trailing block of the PDP info column — vendor's
 * `DeliveryPolicy` + `PaymentMethods` + `ProductSkuCategories` rolled into
 * one component, since they're all static-ish info panels for a butik.
 *
 * Copy is hard-coded TR for Akon Butik (1500 TL kargo eşiği, 14-day return,
 * iyzico/havale/EFT). When the legal/operations team wants to change these,
 * edit this file directly — there's exactly one PDP per app and a CMS
 * abstraction is not justified.
 */
export function ProductInfoExtras({ sku, brand, category }: ProductInfoExtrasProps) {
  return (
    <>
      <div className="tf-product-delivery-return">
        <div className="product-delivery">
          <div className="icon icon-clock-cd" />
          <p className="h6 mb-0">
            Tahmini teslimat: <span className="fw-7 text-black">2-4 iş günü</span> (kargo şirketi
            yoğunluğuna göre değişebilir).
          </p>
        </div>
        <div className="product-delivery return">
          <div className="icon icon-compare" />
          <p className="h6 mb-0">
            Satın alma tarihinden itibaren <span className="fw-7 text-black">14 gün</span> içinde
            koşulsuz iade. İade kargo ücreti müşteriye aittir.
          </p>
        </div>
      </div>

      <div className="tf-product-trust-seal">
        <p className="h6 text-seal mb-2">Güvenli Ödeme:</p>
        <ul className="list-card">
          <li className="card-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Visa" src="/images/payment/visa.png" width={200} height={128} />
          </li>
          <li className="card-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Mastercard" src="/images/payment/master-card.png" width={200} height={128} />
          </li>
          <li className="card-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Amex" src="/images/payment/amex.png" width={200} height={128} />
          </li>
          <li className="card-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Discover" src="/images/payment/discover.png" width={200} height={128} />
          </li>
        </ul>
      </div>

      <div className="tf-product-info-by-categori mt-3">
        {sku && (
          <div className="info">
            <p className="h6 mb-0">
              <span className="text-main-2">SKU:</span> <span className="fw-semibold">{sku}</span>
            </p>
          </div>
        )}
        {category && (
          <div className="info">
            <p className="h6 mb-0">
              <span className="text-main-2">Kategori:</span>{' '}
              <span className="fw-semibold">{category.name}</span>
            </p>
          </div>
        )}
        {brand && (
          <div className="info">
            <p className="h6 mb-0">
              <span className="text-main-2">Marka:</span>{' '}
              <span className="fw-semibold">{brand.name}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
