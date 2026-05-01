'use client';

import type { ProductDetail } from '@akonbutik/types';
import { useEffect } from 'react';

import { useProductSelection } from './selection-context';

/**
 * Vendor `product-details/{ColorSelector, SizeSelector}.tsx` mirror —
 * `tf-product-variant > variant-picker-item` markup with `variant-picker-label`
 * (heading + value readout) + `variant-picker-values` (size/color buttons).
 *
 * Color swatches: when the catalog provides a hex value we render an
 * inline-styled `check-color` swatch dot; otherwise we fall back to a
 * named chip so admins can ship product data without a swatch column.
 */
export function VariantPicker({ product }: { product: ProductDetail }) {
  const { selectedSize, selectedColor, setSelectedSize, setSelectedColor } = useProductSelection();

  useEffect(() => {
    if (!selectedSize && product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0] ?? null);
    }
    if (!selectedColor && product.availableColors.length > 0) {
      setSelectedColor(product.availableColors[0]?.name ?? null);
    }
  }, [product, selectedSize, selectedColor, setSelectedSize, setSelectedColor]);

  return (
    <div className="tf-product-variant">
      {product.availableColors.length > 0 && (
        <div className="variant-picker-item variant-color">
          <div className="variant-picker-label">
            <div className="h4 fw-semibold">
              Renk <span className="variant-picker-label-value">{selectedColor ?? '—'}</span>
            </div>
          </div>
          <div className="variant-picker-values color-list">
            {product.availableColors.map((color) => {
              const isActive = color.name === selectedColor;
              const swatchStyle = color.hex ? { backgroundColor: color.hex } : undefined;
              return (
                <button
                  key={color.name}
                  type="button"
                  className={`color-btn hover-tooltip tooltip-bot ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedColor(color.name);
                  }}
                  aria-label={color.name}
                  aria-pressed={isActive}
                >
                  <span className="check-color" {...(swatchStyle && { style: swatchStyle })} />
                  <span className="tooltip">{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {product.availableSizes.length > 0 && (
        <div className="variant-picker-item variant-size">
          <div className="variant-picker-label">
            <div className="h4 fw-semibold">
              Beden <span className="variant-picker-label-value">{selectedSize ?? '—'}</span>
            </div>
          </div>
          <div className="variant-picker-values size-list">
            {product.availableSizes.map((size) => {
              const isActive = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  className={`size-btn h6 ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSize(size);
                  }}
                  aria-pressed={isActive}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
