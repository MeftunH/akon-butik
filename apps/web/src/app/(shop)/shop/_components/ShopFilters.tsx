'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Taxonomy {
  id: string;
  slug: string;
  name: string;
  productCount: number;
}

interface ShopFiltersProps {
  categories: readonly Taxonomy[];
  brands: readonly Taxonomy[];
  sizes: readonly string[];
  colors: readonly string[];
  priceBounds: { minMinor: number; maxMinor: number };
}

const SORT_OPTIONS = [
  { value: '', label: 'Önerilenler' },
  { value: 'newest', label: 'En Yeniler' },
  { value: 'price_asc', label: 'Fiyat — Artan' },
  { value: 'price_desc', label: 'Fiyat — Azalan' },
  { value: 'popularity', label: 'Popülerlik' },
];

function formatTL(minor: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

/**
 * Shop filter rail — vendor `products/FilterDropdown.tsx` markup adapted
 * to URL-driven state. Vendor relies on Bootstrap's dropdown JS bundle;
 * we keep our own open/closed state in `useState` so apps/web doesn't
 * need bootstrap-bundle-with-popper.js loaded.
 *
 * Filters: kategori (single), marka (single), beden (single), renk
 * (single), fiyat (min/max number inputs — range slider Phase 6).
 * URL params mirror `apps/api/.../list-products.query.ts` exactly:
 *   category, brand, size, color, minPriceMinor, maxPriceMinor, sort.
 */
export function ShopFilters({ categories, brands, sizes, colors, priceBounds }: ShopFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const [minPrice, setMinPrice] = useState(
    params.get('minPriceMinor') ?? String(priceBounds.minMinor),
  );
  const [maxPrice, setMaxPrice] = useState(
    params.get('maxPriceMinor') ?? String(priceBounds.maxMinor),
  );

  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const setParam = (key: string, value: string | null): void => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === '') next.delete(key);
    else next.set(key, value);
    next.delete('page');
    router.push(`/shop?${next.toString()}`);
    setOpen(null);
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
    setOpen(null);
  };

  const clearAll = (): void => {
    router.push('/shop');
    setMinPrice(String(priceBounds.minMinor));
    setMaxPrice(String(priceBounds.maxMinor));
  };

  const activeCategory = params.get('category');
  const activeBrand = params.get('brand');
  const activeSize = params.get('size');
  const activeColor = params.get('color');
  const activeSort = params.get('sort') ?? '';

  const filterCount =
    [activeCategory, activeBrand, activeSize, activeColor].filter(Boolean).length +
    (params.get('minPriceMinor') ? 1 : 0) +
    (params.get('maxPriceMinor') ? 1 : 0);

  return (
    <div
      className="tf-shop-control d-flex flex-wrap align-items-center gap-3 mb-4"
      ref={containerRef}
    >
      <div className="tf-filter-dropdown d-flex align-items-center gap-2 flex-wrap">
        <div className="tf-btn-filter border-0 px-0 d-flex align-items-center gap-1">
          <span className="icon icon-filter text-black" />
          <span className="text text-black fw-semibold">Filtrele:</span>
        </div>

        <div className="meta-dropdown-filter d-flex align-items-center gap-2 flex-wrap">
          <FilterDropdown
            id="category"
            label="Kategori"
            value={
              activeCategory
                ? (categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory)
                : null
            }
            open={open === 'category'}
            onToggle={() => {
              setOpen(open === 'category' ? null : 'category');
            }}
          >
            <ul className="filter-group-check list-unstyled mb-0">
              {categories.map((c) => (
                <li key={c.id} className="list-item">
                  <button
                    type="button"
                    className={`text-start w-100 border-0 bg-transparent py-1 px-2 ${
                      activeCategory === c.slug ? 'fw-semibold text-primary' : ''
                    }`}
                    onClick={() => {
                      toggleParam('category', c.slug);
                    }}
                  >
                    {c.name}{' '}
                    <span className="count text-main-2">({c.productCount.toString()})</span>
                  </button>
                </li>
              ))}
            </ul>
          </FilterDropdown>

          <FilterDropdown
            id="brand"
            label="Marka"
            value={
              activeBrand ? (brands.find((b) => b.slug === activeBrand)?.name ?? activeBrand) : null
            }
            open={open === 'brand'}
            onToggle={() => {
              setOpen(open === 'brand' ? null : 'brand');
            }}
          >
            <ul className="filter-group-check list-unstyled mb-0">
              {brands.map((b) => (
                <li key={b.id} className="list-item">
                  <button
                    type="button"
                    className={`text-start w-100 border-0 bg-transparent py-1 px-2 ${
                      activeBrand === b.slug ? 'fw-semibold text-primary' : ''
                    }`}
                    onClick={() => {
                      toggleParam('brand', b.slug);
                    }}
                  >
                    {b.name}{' '}
                    <span className="count text-main-2">({b.productCount.toString()})</span>
                  </button>
                </li>
              ))}
            </ul>
          </FilterDropdown>

          {sizes.length > 0 && (
            <FilterDropdown
              id="size"
              label="Beden"
              value={activeSize}
              open={open === 'size'}
              onToggle={() => {
                setOpen(open === 'size' ? null : 'size');
              }}
            >
              <div className="filter-size-box flat-check-list d-flex flex-wrap gap-2">
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
            </FilterDropdown>
          )}

          {colors.length > 0 && (
            <FilterDropdown
              id="color"
              label="Renk"
              value={activeColor}
              open={open === 'color'}
              onToggle={() => {
                setOpen(open === 'color' ? null : 'color');
              }}
            >
              <div className="filter-color-box flat-check-list d-flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`color-btn px-2 py-1 ${activeColor === c ? 'active' : ''}`}
                    onClick={() => {
                      toggleParam('color', c);
                    }}
                  >
                    <span className="color-text">{c}</span>
                  </button>
                ))}
              </div>
            </FilterDropdown>
          )}

          <FilterDropdown
            id="price"
            label="Fiyat"
            value={
              (params.get('minPriceMinor') ?? params.get('maxPriceMinor'))
                ? `${formatTL(Number(minPrice))} – ${formatTL(Number(maxPrice))}`
                : null
            }
            open={open === 'price'}
            onToggle={() => {
              setOpen(open === 'price' ? null : 'price');
            }}
          >
            <div className="widget-price filter-price">
              <div className="d-flex gap-2 mb-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Min"
                  value={minPrice}
                  min={priceBounds.minMinor}
                  max={priceBounds.maxMinor}
                  step={1000}
                  aria-label="Minimum fiyat"
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
                  aria-label="Maksimum fiyat"
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                />
              </div>
              <button type="button" className="tf-btn animate-btn w-100" onClick={applyPrice}>
                Uygula
              </button>
              <p className="text-main-2 small mt-2 mb-0">
                {formatTL(priceBounds.minMinor)} – {formatTL(priceBounds.maxMinor)} arası
              </p>
            </div>
          </FilterDropdown>
        </div>
      </div>

      <div className="ms-auto d-flex align-items-center gap-2">
        {filterCount > 0 && (
          <button type="button" className="btn btn-link text-danger p-0 small" onClick={clearAll}>
            Temizle ({filterCount.toString()})
          </button>
        )}

        <label htmlFor="shop-sort" className="form-label mb-0 text-main-2 small">
          Sırala:
        </label>
        <select
          id="shop-sort"
          className="form-select form-select-sm w-auto"
          value={activeSort}
          onChange={(e) => {
            setParam('sort', e.target.value);
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  id: string;
  label: string;
  value: string | null;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function FilterDropdown({ id, label, value, open, onToggle, children }: FilterDropdownProps) {
  return (
    <div className={`dropup dropdown-filter position-relative ${open ? 'show' : ''}`}>
      <button
        type="button"
        className="dropdown-toggle bg-transparent border d-flex align-items-center gap-1 px-3 py-2 rounded"
        id={id}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="text-value">
          {label}
          {value && <span className="ms-1 text-primary fw-semibold">: {value}</span>}
        </span>
        <i className={`icon icon-caret-${open ? 'up' : 'down'} ms-1`} />
      </button>
      <div
        className="dropdown-menu p-3"
        aria-labelledby={id}
        style={{
          minWidth: 240,
          display: open ? 'block' : 'none',
          position: 'absolute',
          zIndex: 100,
          marginTop: 4,
          background: 'var(--white, #fff)',
          border: '1px solid var(--line-1, #e1e4e8)',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
