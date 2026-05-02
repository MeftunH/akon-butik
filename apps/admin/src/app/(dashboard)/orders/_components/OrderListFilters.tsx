'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import styles from './orders.module.scss';
import type { OrderStatus } from './status';

export interface OrderListFilters {
  status: OrderStatus | 'all';
  q: string;
  from: string;
  to: string;
  diaPending: boolean;
}

interface OrderListFiltersProps {
  initial: OrderListFilters;
}

/**
 * Filter strip for the orders list. Mounts as a `<form>` so non-JS
 * users (and manual ?param= edits) still work; on submit / change we
 * push the next URL through the App Router so the RSC page re-fetches.
 *
 * `q`, `from`, `to`, `diaPending` are accepted into the URL but the
 * backend `/admin/orders` endpoint currently only honours `status` —
 * the page applies q/from/to/diaPending as a *post-filter* on the
 * fetched window. See the report for the backend gaps to close so this
 * scales beyond the first page.
 */
export function OrderListFiltersBar({ initial }: OrderListFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initial.q);
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);

  // Re-sync local state with URL changes that were not driven by this
  // form (e.g. a status pill click navigating).
  useEffect(() => {
    setQ(initial.q);
    setFrom(initial.from);
    setTo(initial.to);
  }, [initial.q, initial.from, initial.to]);

  const pushNext = useCallback(
    (mutate: (params: URLSearchParams) => void): void => {
      const next = new URLSearchParams(searchParams.toString());
      mutate(next);
      next.delete('page');
      const qs = next.toString();
      router.push(qs ? `/orders?${qs}` : '/orders');
    },
    [router, searchParams],
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    pushNext((p) => {
      if (q.trim()) p.set('q', q.trim());
      else p.delete('q');
      if (from) p.set('from', from);
      else p.delete('from');
      if (to) p.set('to', to);
      else p.delete('to');
    });
  };

  const toggleDia = (): void => {
    pushNext((p) => {
      if (initial.diaPending) p.delete('diaPending');
      else p.set('diaPending', '1');
    });
  };

  const clearAll = (): void => {
    pushNext((p) => {
      p.delete('q');
      p.delete('from');
      p.delete('to');
      p.delete('diaPending');
    });
  };

  const hasActiveExtras = Boolean(initial.q || initial.from || initial.to || initial.diaPending);

  return (
    <>
      <form className={styles.filterBar} onSubmit={onSubmit} role="search" aria-label="Sipariş ara">
        <input
          type="search"
          inputMode="search"
          name="q"
          placeholder="Müşteri adı, e-posta veya sipariş # ara"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          aria-label="Müşteri veya sipariş ara"
        />
        <input
          type="date"
          name="from"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          aria-label="Başlangıç tarihi"
        />
        <input
          type="date"
          name="to"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
          }}
          aria-label="Bitiş tarihi"
        />
        <label className={styles.filterCheckbox} data-active={initial.diaPending}>
          <input
            type="checkbox"
            checked={initial.diaPending}
            onChange={toggleDia}
            aria-label="Yalnızca DIA'ya iletilmemiş"
          />
          DIA bekliyor
        </label>
      </form>

      {hasActiveExtras && (
        <div className={styles.filterTagRow} aria-live="polite">
          {initial.q && (
            <span className={styles.filterTag}>
              <span>Arama: {initial.q}</span>
              <button
                type="button"
                aria-label="Aramayı temizle"
                onClick={() => {
                  setQ('');
                  pushNext((p) => p.delete('q'));
                }}
              >
                ×
              </button>
            </span>
          )}
          {(initial.from || initial.to) && (
            <span className={styles.filterTag}>
              <span>
                {initial.from || '…'} → {initial.to || '…'}
              </span>
              <button
                type="button"
                aria-label="Tarih aralığını temizle"
                onClick={() => {
                  setFrom('');
                  setTo('');
                  pushNext((p) => {
                    p.delete('from');
                    p.delete('to');
                  });
                }}
              >
                ×
              </button>
            </span>
          )}
          <button
            type="button"
            className={styles.filterTag}
            onClick={clearAll}
            style={{ cursor: 'pointer' }}
          >
            Tümünü temizle
          </button>
        </div>
      )}
    </>
  );
}
