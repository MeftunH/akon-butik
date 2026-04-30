import { ProductGrid } from '@akonbutik/ui';
import type { ProductSummary } from '@akonbutik/types';
import type { Metadata } from 'next';

import { api } from '@/lib/api';

import { ShopFilters } from './_components/ShopFilters';

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

  const result = await api<ProductListResponse>(
    `/catalog/products?${queryString.toString()}`,
  );

  return (
    <main className="container py-5">
      <header className="mb-4">
        <h1 className="h2 fw-bold mb-1">Mağaza</h1>
        <p className="text-muted mb-0">{result.total} ürün</p>
      </header>

      <div className="row gx-4">
        <aside className="col-lg-3 mb-4">
          <ShopFilters />
        </aside>
        <section className="col-lg-9">
          <ProductGrid products={result.items} columns={3} />
        </section>
      </div>
    </main>
  );
}
