import type { ProductSummary } from '@akonbutik/types';
import { ProductGrid } from '@akonbutik/ui';
import type { Metadata } from 'next';
import Link from 'next/link';

import { api } from '@/lib/api';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

interface ProductListResponse {
  items: readonly ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export const metadata: Metadata = {
  title: 'Mağaza',
  description: 'Akon Butik koleksiyonundaki tüm ürünler — DIA stoğuyla canlı.',
};

export const revalidate = 300;

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const queryString = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) v.forEach((x) => queryString.append(k, x));
    else if (typeof v === 'string') queryString.append(k, v);
  }
  if (!queryString.has('pageSize')) queryString.set('pageSize', '24');

  const result = await api<ProductListResponse>(`/catalog/products?${queryString.toString()}`);

  const page = Number.parseInt(typeof params.page === 'string' ? params.page : '1', 10);
  const pageSize = result.pageSize;
  const lastPage = Math.max(1, Math.ceil(result.total / pageSize));

  return (
    <>
      <section className="tf-page-title">
        <div className="container">
          <div className="text-center">
            <h2 className="page-title">Mağaza</h2>
            <p className="text-muted mb-0">{result.total} ürün — DIA stoğundan güncel</p>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <p className="text-muted small mb-0">
              Sayfa {page} / {lastPage}
            </p>
            <p className="text-muted small mb-0">
              {result.items.length} / {result.total} ürün gösteriliyor
            </p>
          </div>

          <ProductGrid
            products={result.items}
            columns={4}
            emptyMessage="Bu filtre için ürün bulunamadı."
          />

          {lastPage > 1 && <ShopPagination page={page} lastPage={lastPage} params={params} />}
        </div>
      </section>
    </>
  );
}

function ShopPagination({
  page,
  lastPage,
  params,
}: {
  page: number;
  lastPage: number;
  params: Record<string, string | string[] | undefined>;
}) {
  const buildHref = (p: number): string => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (k === 'page') continue;
      if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
      else if (typeof v === 'string') qs.append(k, v);
    }
    qs.set('page', p.toString());
    return `/shop?${qs.toString()}`;
  };

  const numbers: number[] = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(lastPage, page + 2); i++) {
    numbers.push(i);
  }

  return (
    <nav aria-label="Sayfalama" className="wg-pagination justify-content-center mt-5 d-flex gap-2">
      <Link
        href={page > 1 ? buildHref(page - 1) : '/shop'}
        className={`pagination-item ${page === 1 ? 'disabled' : ''}`}
        aria-disabled={page === 1}
      >
        <i className="icon icon-arrow-left" />
      </Link>
      {numbers.map((n) => (
        <Link
          key={n}
          href={buildHref(n)}
          className={`pagination-item ${n === page ? 'active' : ''}`}
        >
          {n}
        </Link>
      ))}
      <Link
        href={page < lastPage ? buildHref(page + 1) : '/shop'}
        className={`pagination-item ${page === lastPage ? 'disabled' : ''}`}
        aria-disabled={page === lastPage}
      >
        <i className="icon icon-arrow-right" />
      </Link>
    </nav>
  );
}
