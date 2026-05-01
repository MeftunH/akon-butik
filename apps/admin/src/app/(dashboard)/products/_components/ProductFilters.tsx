'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

import styles from './ProductFilters.module.scss';

export type ProductStatusKey = 'visible' | 'hidden' | 'needs_review';

export interface FilterBrandOption {
  id: string;
  name: string;
}

export interface FilterCategoryOption {
  id: string;
  nameTr: string;
}

export interface ProductFiltersProps {
  /** Active filter state (echoed by the server page). */
  current: {
    q: string;
    status: ProductStatusKey | 'all';
    brandId: string;
    categoryId: string;
  };
  brands: readonly FilterBrandOption[];
  categories: readonly FilterCategoryOption[];
}

const STATUS_TABS: { key: ProductFiltersProps['current']['status']; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'visible', label: 'Görünür' },
  { key: 'needs_review', label: 'İncelemede' },
  { key: 'hidden', label: 'Gizli' },
];

/**
 * URL-driven filter rail for the admin product list. Status is rendered
 * as a segmented underline tab strip (vendor account-order_tab spirit,
 * but in our local module so the underline accent reads as editorial
 * rather than the vendor pill chip). Brand + category are quiet
 * `<select>` controls; auto-submitting on change so managers don't need
 * a separate "Apply" button. Search uses a small form to debounce on
 * Enter, matching the existing GET pattern.
 *
 * Active filters surface below the strip as removable pills, so a
 * manager scanning the page knows exactly what subset they're seeing
 * without reading each control.
 */
export function ProductFilters({ current, brands, categories }: ProductFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [draftQ, setDraftQ] = useState(current.q);
  const formRef = useRef<HTMLFormElement>(null);

  // Keep local input in sync if the URL changes via "Temizle" or pill X.
  useEffect(() => {
    setDraftQ(current.q);
  }, [current.q]);

  const buildQuery = (overrides: Partial<typeof current>): string => {
    const next = new URLSearchParams(params.toString());
    next.delete('page');
    const merged = { ...current, ...overrides };
    if (merged.q) next.set('q', merged.q);
    else next.delete('q');
    if (merged.status && merged.status !== 'all') next.set('status', merged.status);
    else next.delete('status');
    if (merged.brandId) next.set('brandId', merged.brandId);
    else next.delete('brandId');
    if (merged.categoryId) next.set('categoryId', merged.categoryId);
    else next.delete('categoryId');
    const qs = next.toString();
    return qs ? `/products?${qs}` : '/products';
  };

  const navigate = (overrides: Partial<typeof current>): void => {
    router.push(buildQuery(overrides));
  };

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate({ q: draftQ.trim() });
  };

  const onBrandChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    navigate({ brandId: e.target.value });
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    navigate({ categoryId: e.target.value });
  };

  const hasFilters =
    Boolean(current.q) ||
    current.status !== 'all' ||
    Boolean(current.brandId) ||
    Boolean(current.categoryId);

  const activeBrand = brands.find((b) => b.id === current.brandId);
  const activeCategory = categories.find((c) => c.id === current.categoryId);

  return (
    <>
      <ul className={styles.statusTabs} role="tablist" aria-label="Ürün durumuna göre filtrele">
        {STATUS_TABS.map((tab) => {
          const active = current.status === tab.key;
          return (
            <li key={tab.key} role="presentation">
              <Link
                href={buildQuery({ status: tab.key })}
                role="tab"
                aria-current={active ? 'page' : undefined}
                className={styles.statusTab}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <form
        ref={formRef}
        className={styles.filterStrip}
        onSubmit={onSearchSubmit}
        role="search"
        aria-label="Ürün filtreleri"
      >
        <div className={styles.searchField}>
          <i className={`icon icon-search ${styles.searchIcon}`} aria-hidden />
          <input
            type="search"
            value={draftQ}
            onChange={(e) => {
              setDraftQ(e.target.value);
            }}
            placeholder="İsim, slug veya DIA parent key ile ara"
            aria-label="Ürün ara"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="filter-brand">Marka</label>
          <select
            id="filter-brand"
            value={current.brandId}
            onChange={onBrandChange}
            aria-label="Markaya göre filtrele"
          >
            <option value="">Tüm markalar</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="filter-category">Kategori</label>
          <select
            id="filter-category"
            value={current.categoryId}
            onChange={onCategoryChange}
            aria-label="Kategoriye göre filtrele"
          >
            <option value="">Tüm kategoriler</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameTr}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.resetButton}>
          Aramayı Uygula
        </button>
      </form>

      {hasFilters && (
        <div className={styles.activeFilters} aria-live="polite">
          <span className={styles.activeLabel}>Etkin filtreler</span>
          {current.status !== 'all' && (
            <span className={styles.pill}>
              {STATUS_TABS.find((t) => t.key === current.status)?.label ?? current.status}
              <button
                type="button"
                aria-label="Durum filtresini kaldır"
                onClick={() => {
                  navigate({ status: 'all' });
                }}
              >
                ×
              </button>
            </span>
          )}
          {activeBrand && (
            <span className={styles.pill}>
              Marka: {activeBrand.name}
              <button
                type="button"
                aria-label="Marka filtresini kaldır"
                onClick={() => {
                  navigate({ brandId: '' });
                }}
              >
                ×
              </button>
            </span>
          )}
          {activeCategory && (
            <span className={styles.pill}>
              Kategori: {activeCategory.nameTr}
              <button
                type="button"
                aria-label="Kategori filtresini kaldır"
                onClick={() => {
                  navigate({ categoryId: '' });
                }}
              >
                ×
              </button>
            </span>
          )}
          {current.q && (
            <span className={styles.pill}>
              &ldquo;{current.q}&rdquo;
              <button
                type="button"
                aria-label="Aramayı temizle"
                onClick={() => {
                  setDraftQ('');
                  navigate({ q: '' });
                }}
              >
                ×
              </button>
            </span>
          )}
          <Link href="/products" className={styles.resetButton} style={{ marginLeft: 'auto' }}>
            Hepsini Temizle
          </Link>
        </div>
      )}
    </>
  );
}
