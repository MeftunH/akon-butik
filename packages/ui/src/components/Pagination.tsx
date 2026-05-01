import Link from 'next/link';

export interface PaginationProps {
  /** Current 1-indexed page. */
  page: number;
  /** Last (inclusive) page. */
  lastPage: number;
  /** Builds the href for a page number. Receives 1-indexed page. */
  buildHref: (page: number) => string;
}

/**
 * Vendor `products/Pagination.tsx` mirror — `wg-pagination` + `pagination-item h6`
 * with `direct` prev/next chevrons. Link-based (URL-driven) so it works with
 * Next.js server components without a client-side state mirror. Shared by
 * storefront /shop and admin product/order lists.
 *
 * Renders up to ±2 pages around the current page (vendor's typical window),
 * always shows prev + next, disables the chevron when at the bound.
 */
export function Pagination({ page, lastPage, buildHref }: PaginationProps) {
  if (lastPage <= 1) return null;

  const numbers: number[] = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(lastPage, page + 2); i++) {
    numbers.push(i);
  }

  const prevDisabled = page === 1;
  const nextDisabled = page === lastPage;

  return (
    <ul className="wg-pagination justify-content-center mt-5 d-flex gap-2 list-unstyled">
      <li>
        {prevDisabled ? (
          <span
            className="pagination-item h6 direct disabled"
            aria-disabled
            aria-label="Önceki sayfa"
          >
            <i className="icon icon-caret-left" />
          </span>
        ) : (
          <Link
            href={buildHref(page - 1)}
            className="pagination-item h6 direct"
            aria-label="Önceki sayfa"
          >
            <i className="icon icon-caret-left" />
          </Link>
        )}
      </li>

      {numbers.map((n) =>
        n === page ? (
          <li key={n}>
            <span className="pagination-item h6 active" aria-current="page">
              {n.toString()}
            </span>
          </li>
        ) : (
          <li key={n}>
            <Link href={buildHref(n)} className="pagination-item h6">
              {n.toString()}
            </Link>
          </li>
        ),
      )}

      <li>
        {nextDisabled ? (
          <span
            className="pagination-item h6 direct disabled"
            aria-disabled
            aria-label="Sonraki sayfa"
          >
            <i className="icon icon-caret-right" />
          </span>
        ) : (
          <Link
            href={buildHref(page + 1)}
            className="pagination-item h6 direct"
            aria-label="Sonraki sayfa"
          >
            <i className="icon icon-caret-right" />
          </Link>
        )}
      </li>
    </ul>
  );
}
