'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

interface Taxonomy {
  id: string;
  slug: string;
  name: string;
  productCount: number;
}

export interface FilterSidebarProps {
  categories: readonly Taxonomy[];
  brands: readonly Taxonomy[];
  sizes: readonly string[];
  colors: readonly string[];
  priceBounds: { minMinor: number; maxMinor: number };
}

function formatTL(minor: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

/**
 * Vendor `products/FilterSidebar.tsx` mirror — full left-rail filter
 * stack with `widget-facet > facet-title + collapse > filter-group-check`
 * sections. Each `widget-facet` is independently collapsible (React
 * `useState`-driven; we don't pull Bootstrap collapse JS in).
 *
 * Stack (top → bottom):
 *   Kategori (single-select link list, count per row)
 *   Stok Durumu (radio: hepsi / sadece stoktakiler)
 *   Fiyat (min/max number inputs + Uygula button — range slider Phase 6)
 *   Marka (single-select link list, count per row)
 *   Beden (chip grid)
 *   Renk (chip grid)
 *
 * URL params mirror `apps/api/.../list-products.query.ts` exactly:
 *   category, brand, size, color, minPriceMinor, maxPriceMinor, inStock.
 *
 * "Filtreleri Temizle" button at the bottom resets every URL param in
 * one click.
 */
export function FilterSidebar({
  categories,
  brands,
  sizes,
  colors,
  priceBounds,
}: FilterSidebarProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    availability: true,
    price: true,
    brand: true,
    size: true,
    color: true,
  });

  const [minPrice, setMinPrice] = useState(
    params.get('minPriceMinor') ?? String(priceBounds.minMinor),
  );
  const [maxPrice, setMaxPrice] = useState(
    params.get('maxPriceMinor') ?? String(priceBounds.maxMinor),
  );

  useEffect(() => {
    setMinPrice(params.get('minPriceMinor') ?? String(priceBounds.minMinor));
    setMaxPrice(params.get('maxPriceMinor') ?? String(priceBounds.maxMinor));
  }, [params, priceBounds.minMinor, priceBounds.maxMinor]);

  const setParam = (key: string, value: string | null): void => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === '') next.delete(key);
    else next.set(key, value);
    next.delete('page');
    router.push(`/shop?${next.toString()}`);
  };

  const toggleParam = (key: string, value: string): void => {
    setParam(key, params.get(key) === value ? null : value);
  };

  const applyPrice = (): void => {
    const next = new URLSearchParams(params.toString());
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (!Number.isNaN(min) && min > priceBounds.minMinor) next.set('minPriceMinor', String(min));
    else next.delete('minPriceMinor');
    if (!Number.isNaN(max) && max < priceBounds.maxMinor) next.set('maxPriceMinor', String(max));
    else next.delete('maxPriceMinor');
    next.delete('page');
    router.push(`/shop?${next.toString()}`);
  };

  const clearAll = (): void => {
    router.push('/shop');
  };

  const toggle = (key: string): void => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCategory = params.get('category');
  const activeBrand = params.get('brand');
  const activeSize = params.get('size');
  const activeColor = params.get('color');
  const activeStock = params.get('inStock');

  const filterCount =
    [activeCategory, activeBrand, activeSize, activeColor, activeStock].filter(Boolean).length +
    (params.get('minPriceMinor') ? 1 : 0) +
    (params.get('maxPriceMinor') ? 1 : 0);

  return (
    <div className="canvas-wrapper">
      <div className="canvas-body d-flex flex-column gap-3">
        <Facet
          id="category"
          label="Kategori"
          open={openSections.category ?? true}
          onToggle={() => {
            toggle('category');
          }}
        >
          <ul className="collapse-body filter-group-check group-category list-unstyled mb-0">
            {categories.map((c) => (
              <li key={c.id} className="list-item d-flex justify-content-between py-1">
                <button
                  type="button"
                  className={`link h6 text-start border-0 bg-transparent p-0 ${
                    activeCategory === c.slug ? 'fw-bold text-primary' : ''
                  }`}
                  onClick={() => {
                    toggleParam('category', c.slug);
                  }}
                >
                  {c.name}
                </button>
                <span className="count text-main-2">{c.productCount.toString()}</span>
              </li>
            ))}
          </ul>
        </Facet>

        <Facet
          id="availability"
          label="Stok Durumu"
          open={openSections.availability ?? true}
          onToggle={() => {
            toggle('availability');
          }}
        >
          <ul className="collapse-body filter-group-check list-unstyled mb-0">
            <li className="list-item d-flex align-items-center gap-2 py-1">
              <input
                type="radio"
                className="tf-check form-check-input"
                name="availability"
                id="avail-all"
                checked={!activeStock}
                onChange={() => {
                  setParam('inStock', null);
                }}
              />
              <label htmlFor="avail-all" className="label h6 mb-0">
                Tümü
              </label>
            </li>
            <li className="list-item d-flex align-items-center gap-2 py-1">
              <input
                type="radio"
                className="tf-check form-check-input"
                name="availability"
                id="avail-instock"
                checked={activeStock === 'true'}
                onChange={() => {
                  setParam('inStock', 'true');
                }}
              />
              <label htmlFor="avail-instock" className="label h6 mb-0">
                Sadece Stoktakiler
              </label>
            </li>
          </ul>
        </Facet>

        <Facet
          id="price"
          label="Fiyat"
          open={openSections.price ?? true}
          onToggle={() => {
            toggle('price');
          }}
        >
          <div className="collapse-body widget-price filter-price">
            <div className="d-flex gap-2 mb-2">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Min"
                value={minPrice}
                min={priceBounds.minMinor}
                max={priceBounds.maxMinor}
                step={1000}
                aria-label="Minimum fiyat (kuruş)"
                onChange={(e) => {
                  setMinPrice(e.target.value);
                }}
              />
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max"
                value={maxPrice}
                min={priceBounds.minMinor}
                max={priceBounds.maxMinor}
                step={1000}
                aria-label="Maksimum fiyat (kuruş)"
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                }}
              />
            </div>
            <button type="button" className="tf-btn animate-btn w-100" onClick={applyPrice}>
              Uygula
            </button>
            <p className="text-main-2 small mt-2 mb-0">
              {formatTL(Number(minPrice))} – {formatTL(Number(maxPrice))}
            </p>
          </div>
        </Facet>

        <Facet
          id="brand"
          label="Marka"
          open={openSections.brand ?? true}
          onToggle={() => {
            toggle('brand');
          }}
        >
          <ul className="collapse-body filter-group-check list-unstyled mb-0">
            {brands.map((b) => (
              <li key={b.id} className="list-item d-flex justify-content-between py-1">
                <button
                  type="button"
                  className={`link h6 text-start border-0 bg-transparent p-0 ${
                    activeBrand === b.slug ? 'fw-bold text-primary' : ''
                  }`}
                  onClick={() => {
                    toggleParam('brand', b.slug);
                  }}
                >
                  {b.name}
                </button>
                <span className="count text-main-2">{b.productCount.toString()}</span>
              </li>
            ))}
          </ul>
        </Facet>

        {sizes.length > 0 && (
          <Facet
            id="size"
            label="Beden"
            open={openSections.size ?? true}
            onToggle={() => {
              toggle('size');
            }}
          >
            <div className="collapse-body filter-size-box flat-check-list d-flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-btn h6 ${activeSize === s ? 'active' : ''}`}
                  onClick={() => {
                    toggleParam('size', s);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Facet>
        )}

        {colors.length > 0 && (
          <Facet
            id="color"
            label="Renk"
            open={openSections.color ?? true}
            onToggle={() => {
              toggle('color');
            }}
          >
            <div className="collapse-body filter-color-box flat-check-list d-flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-btn px-3 py-1 ${activeColor === c ? 'active' : ''}`}
                  onClick={() => {
                    toggleParam('color', c);
                  }}
                >
                  <span className="color-text">{c}</span>
                </button>
              ))}
            </div>
          </Facet>
        )}

        {filterCount > 0 && (
          <button type="button" className="tf-btn btn-reset w-100 mt-2" onClick={clearAll}>
            Filtreleri Temizle ({filterCount.toString()})
          </button>
        )}
      </div>
    </div>
  );
}

interface FacetProps {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function Facet({ id, label, open, onToggle, children }: FacetProps) {
  return (
    <div className="widget-facet">
      <button
        type="button"
        className="facet-title d-flex justify-content-between align-items-center w-100 border-0 bg-transparent p-0 mb-2"
        aria-expanded={open}
        aria-controls={`facet-${id}`}
        onClick={onToggle}
      >
        <span className="h4 fw-semibold mb-0">{label}</span>
        <span className={`icon icon-caret-${open ? 'up' : 'down'} fs-20`} />
      </button>
      <div
        id={`facet-${id}`}
        className={`collapse ${open ? 'show' : ''}`}
        style={{ display: open ? 'block' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
}
