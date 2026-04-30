'use client';

import { useCart } from '@akonbutik/ui';
import type { ProductDetail } from '@akonbutik/types';
import { useState } from 'react';

import { useProductSelection } from './selection-context';

/**
 * Posts the chosen variant to /api/cart/items via the cart context.
 * Backend computes totals and clamps stock; we just send (variantId, qty).
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

  const onAdd = async () => {
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

  return (
    <div className="add-to-cart">
      <div className="d-flex gap-3 align-items-center mb-3">
        <label className="form-label fw-semibold mb-0" htmlFor="qty-input">
          Adet
        </label>
        <input
          id="qty-input"
          type="number"
          min={1}
          max={variant?.stockQty ?? 99}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="form-control"
          style={{ maxWidth: 100 }}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg w-100"
        onClick={() => void onAdd()}
        disabled={!variant || variant.stockQty <= 0 || busy}
      >
        {busy ? 'Ekleniyor…' : variant && variant.stockQty <= 0 ? 'Stokta Yok' : 'Sepete Ekle'}
      </button>
      {feedback && <p className="small text-muted mt-2 mb-0">{feedback}</p>}
    </div>
  );
}
