'use client';

import type { ProductDetail } from '@akonbutik/types';
import { useEffect } from 'react';

import { useProductSelection } from './selection-context';

export function VariantPicker({ product }: { product: ProductDetail }) {
  const { selectedSize, selectedColor, setSelectedSize, setSelectedColor } =
    useProductSelection();

  useEffect(() => {
    if (!selectedSize && product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0] ?? null);
    }
    if (!selectedColor && product.availableColors.length > 0) {
      setSelectedColor(product.availableColors[0]?.name ?? null);
    }
  }, [product, selectedSize, selectedColor, setSelectedSize, setSelectedColor]);

  return (
    <div className="variant-picker">
      {product.availableSizes.length > 0 && (
        <fieldset className="mb-3">
          <legend className="form-label fw-semibold">Beden</legend>
          <div className="d-flex flex-wrap gap-2">
            {product.availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`btn btn-sm ${
                  size === selectedSize ? 'btn-dark' : 'btn-outline-dark'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.availableColors.length > 0 && (
        <fieldset className="mb-3">
          <legend className="form-label fw-semibold">Renk</legend>
          <div className="d-flex flex-wrap gap-2">
            {product.availableColors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`btn btn-sm ${
                  color.name === selectedColor ? 'btn-dark' : 'btn-outline-dark'
                }`}
                onClick={() => setSelectedColor(color.name)}
              >
                {color.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
