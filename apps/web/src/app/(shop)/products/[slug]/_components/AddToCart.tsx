'use client';

import type { ProductDetail } from '@akonbutik/types';
import { useCart } from '@akonbutik/ui';
import { useState } from 'react';

import { useProductSelection } from './selection-context';

/**
 * Vendor PDP add-to-cart strip — `wg-quantity` quantity stepper +
 * `tf-btn animate-btn type-large w-100` action button. Resolves the
 * matching `ProductVariantSummary` from the current size/color selection
 * and clamps quantity to its `stockQty`. Backend computes totals; we
 * just send (variantId, qty).
 */
export function AddToCart({ product }: { product: ProductDetail }) {
  const { add } = useCart();
  const { selectedSize, selectedColor } = useProductSelection();
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const variant = product.variants.find(
    (v) =>
      (v.size === null || v.size === selectedSize) &&
      (v.color === null || v.color === selectedColor),
  );

  const stockCap = variant?.stockQty ?? 1;
  const outOfStock = variant !== undefined && variant.stockQty <= 0;
  const noSelection = variant === undefined;

  const onAdd = async (): Promise<void> => {
    if (!variant) {
      setFeedback('Lütfen beden ve renk seçin.');
      return;
    }
    if (variant.stockQty <= 0) {
      setFeedback('Bu varyant şu an stokta yok.');
      return;
    }
    setBusy(true);
    try {
      await add(variant.id, quantity);
      setFeedback('Sepete eklendi.');
    } catch {
      setFeedback('Sepete eklenirken bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  };

  const dec = (): void => {
    setQuantity((q) => Math.max(1, q - 1));
  };
  const inc = (): void => {
    setQuantity((q) => Math.min(stockCap, q + 1));
  };

  return (
    <div className="tf-product-info-quantity">
      <div className="quantity-title fw-medium mb-2">Adet</div>
      <div className="wg-quantity d-inline-flex align-items-center gap-2">
        <button
          type="button"
          className="btn-quantity"
          onClick={dec}
          aria-label="Azalt"
          disabled={busy || quantity <= 1}
        >
          −
        </button>
        <span className="quantity-product fw-bold" style={{ minWidth: 32, textAlign: 'center' }}>
          {quantity}
        </span>
        <button
          type="button"
          className="btn-quantity"
          onClick={inc}
          aria-label="Arttır"
          disabled={busy || quantity >= stockCap}
        >
          +
        </button>
      </div>

      <div className="tf-product-info-buy-button mt-3">
        <button
          type="button"
          className="tf-btn animate-btn type-large w-100 fw-semibold"
          onClick={() => void onAdd()}
          disabled={noSelection || outOfStock || busy}
        >
          {busy ? 'Ekleniyor…' : outOfStock ? 'Stokta Yok' : 'Sepete Ekle'}
          {!busy && !outOfStock && <i className="icon icon-arrow-right ms-2" />}
        </button>
      </div>

      {feedback && <p className="small text-muted mt-2 mb-0">{feedback}</p>}
    </div>
  );
}
