import type { ProductSummary } from '@akonbutik/types';
import { Pagination } from '@akonbutik/ui';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CategoriesStrip } from './_components/CategoriesStrip';
import { ShopFilters } from './_components/ShopFilters';
import { ShopProductsIsland } from './_components/ShopProductsIsland';

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

interface Taxonomy {
  id: string;
  slug: string;
  name: string;
  productCount: number;
}

const PRICE_MIN = 0;
const PRICE_MAX = 1_000_000; // 10000.00 TL — sane upper bound for the slider; refine when DB has wider range.

export const metadata: Metadata = {
  title: 'Mağaza',
  description: 'Akon Butik koleksiyonundaki tüm ürünler — DIA stoğuyla canlı.',
};

export const revalidate = 300;

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;

  // Build the catalog query from the URL params (matches API DTO 1:1).
  const queryString = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) v.forEach((x) => queryString.append(k, x));
    else if (typeof v === 'string') queryString.append(k, v);
  }
  if (!queryString.has('pageSize')) queryString.set('pageSize', '24');

  const [result, categories, brands] = await Promise.all([
    api<ProductListResponse>(`/catalog/products?${queryString.toString()}`),
    api<readonly Taxonomy[]>('/catalog/categories'),
    api<readonly Taxonomy[]>('/catalog/brands'),
  ]);

  const page = Number.parseInt(typeof params.page === 'string' ? params.page : '1', 10);
  const pageSize = result.pageSize;
  const lastPage = Math.max(1, Math.ceil(result.total / pageSize));

  // Aggregate sizes + colors across the visible page (cheap; for a global
  // facet count we'd add a dedicated /catalog/facets endpoint in Phase 6).
  const sizes = Array.from(new Set(result.items.flatMap((p) => p.availableSizes))).sort();
  const colors = Array.from(
    new Set(result.items.flatMap((p) => p.availableColors.map((c) => c.name))),
  ).sort();

  const buildPageHref = (p: number): string => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (k === 'page') continue;
      if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
      else if (typeof v === 'string') qs.append(k, v);
    }
    qs.set('page', p.toString());
    return `/shop?${qs.toString()}`;
  };

  return (
    <>
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Mağaza</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link href="/" className="h6 link">
                  Ana Sayfa
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">Mağaza</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CategoriesStrip categories={categories} />

      <section className="flat-spacing-2">
        <div className="container">
          <ShopFilters
            categories={categories}
            brands={brands}
            sizes={sizes}
            colors={colors}
            priceBounds={{ minMinor: PRICE_MIN, maxMinor: PRICE_MAX }}
          />

          <ShopProductsIsland
            products={result.items}
            total={result.total}
            page={page}
            lastPage={lastPage}
          />

          <Pagination page={page} lastPage={lastPage} buildHref={buildPageHref} />
        </div>
      </section>
    </>
  );
}
