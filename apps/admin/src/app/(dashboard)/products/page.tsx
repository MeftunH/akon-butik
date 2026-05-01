import { Pagination } from '@akonbutik/ui';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../lib/admin-fetch';

import {
  ProductFilters,
  type FilterBrandOption,
  type FilterCategoryOption,
  type ProductStatusKey,
} from './_components/ProductFilters';
import filterStyles from './_components/ProductFilters.module.scss';
import { ProductEmpty, ProductList, type ProductRowData } from './_components/ProductRow';

interface AdminProduct {
  id: string;
  slug: string;
  nameTr: string;
  status: ProductStatusKey;
  defaultPriceMinor: number;
  currency: string;
  diaParentKey: string | null;
  diaSyncedAt: string | null;
  updatedAt: string;
  brand: { id: string; name: string } | null;
  category: { id: string; nameTr: string } | null;
  _count: { variants: number };
}

interface ProductListResponse {
  items: AdminProduct[];
  total: number;
  page: number;
  pageSize: number;
}

interface BrandResponse {
  id: string;
  name: string;
  _count: { products: number };
}

interface CategoryResponse {
  id: string;
  nameTr: string;
  _count: { products: number };
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    status?: string;
    brandId?: string;
    categoryId?: string;
  }>;
}

export const metadata = { title: 'Ürünler' };

const PRODUCT_STATUSES: readonly ProductStatusKey[] = ['visible', 'hidden', 'needs_review'];
const isProductStatus = (s: string | undefined): s is ProductStatusKey =>
  PRODUCT_STATUSES.includes(s as ProductStatusKey);

const PAGE_SIZE = 25;

/**
 * Admin product catalog — list view.
 *
 * Layout reads as an editorial buyer's room rather than a SaaS dashboard:
 *
 *   1. Eyebrow + count summary (total products / categories / brands).
 *   2. Status segmented underline tabs (Tümü / Görünür / İncelemede / Gizli).
 *   3. Quiet filter strip: search, brand, category.
 *   4. Active-filter pill row (when any filter is set) for at-a-glance
 *      awareness of the current subset, with single-click chip removal.
 *   5. Editorial row list (ProductList) — thumbnail + identity + price +
 *      stock + status + action — separated by hairlines, not stacked cards.
 *   6. URL-param-driven pagination (vendor `wg-pagination`).
 *
 * Filter parameters: only `q` is currently accepted by `/admin/products`;
 * `status`, `brandId`, `categoryId` are supplied for forward-compatibility
 * and applied client-side here as a stop-gap. Once the API accepts those
 * query params, the client-side fallback becomes a no-op.
 */
export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const q = (sp.q ?? '').trim();
  const statusParam = isProductStatus(sp.status) ? sp.status : 'all';
  const brandIdParam = sp.brandId ?? '';
  const categoryIdParam = sp.categoryId ?? '';

  const qs = new URLSearchParams({ page: page.toString(), pageSize: PAGE_SIZE.toString() });
  if (q) qs.set('q', q);
  // Forward-compatible — backend ignores unknown params today.
  if (statusParam !== 'all') qs.set('status', statusParam);
  if (brandIdParam) qs.set('brandId', brandIdParam);
  if (categoryIdParam) qs.set('categoryId', categoryIdParam);

  const [resp, brands, categories] = await Promise.all([
    fetchAdmin<ProductListResponse>(`/admin/products?${qs.toString()}`),
    fetchAdmin<BrandResponse[]>('/admin/brands'),
    fetchAdmin<CategoryResponse[]>('/admin/categories'),
  ]);
  if (
    resp === ADMIN_NOT_AUTHENTICATED ||
    brands === ADMIN_NOT_AUTHENTICATED ||
    categories === ADMIN_NOT_AUTHENTICATED
  ) {
    redirect('/login');
  }

  // Apply non-`q` filters client-side until backend support lands.
  const filteredItems = resp.items.filter((p) => {
    if (statusParam !== 'all' && p.status !== statusParam) return false;
    if (brandIdParam && p.brand?.id !== brandIdParam) return false;
    if (categoryIdParam && p.category?.id !== categoryIdParam) return false;
    return true;
  });

  const lastPage = Math.max(1, Math.ceil(resp.total / resp.pageSize));

  const buildHref = (p: number): string => {
    const next = new URLSearchParams();
    next.set('page', p.toString());
    if (q) next.set('q', q);
    if (statusParam !== 'all') next.set('status', statusParam);
    if (brandIdParam) next.set('brandId', brandIdParam);
    if (categoryIdParam) next.set('categoryId', categoryIdParam);
    return `/products?${next.toString()}`;
  };

  const brandOptions: FilterBrandOption[] = brands.map((b) => ({ id: b.id, name: b.name }));
  const categoryOptions: FilterCategoryOption[] = categories.map((c) => ({
    id: c.id,
    nameTr: c.nameTr,
  }));

  // Counts derive from the master taxonomy lists, not the current page —
  // managers see the full catalog scope at a glance even while filtered.
  const categoriesWithProducts = categories.filter((c) => c._count.products > 0).length;
  const brandsWithProducts = brands.filter((b) => b._count.products > 0).length;

  const rows: ProductRowData[] = filteredItems.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameTr: p.nameTr,
    status: p.status,
    defaultPriceMinor: p.defaultPriceMinor,
    currency: p.currency,
    diaParentKey: p.diaParentKey,
    diaSyncedAt: p.diaSyncedAt,
    brand: p.brand,
    category: p.category,
    variantCount: p._count.variants,
    // Backend does not yet aggregate variant stock or include images —
    // see ProductRowData for the gap explanation. Surface as null /
    // fallback so the row renders correctly today.
    totalStock: null,
    primaryImageUrl: null,
  }));

  const hasFilters =
    q !== '' || statusParam !== 'all' || brandIdParam !== '' || categoryIdParam !== '';

  return (
    <div className="my-account-content">
      <header className={filterStyles.summary}>
        <div className={filterStyles.summaryHeading}>
          <span className={filterStyles.summaryEyebrow}>Katalog</span>
          <h1 className={filterStyles.summaryTitle}>Ürünler</h1>
        </div>
        <div className={filterStyles.summaryCounts} aria-label="Katalog özeti">
          <span>
            <strong>{resp.total.toLocaleString('tr-TR')}</strong> ürün
          </span>
          <span className={filterStyles.countDivider}>·</span>
          <span>
            <strong>{categoriesWithProducts.toLocaleString('tr-TR')}</strong> kategori
          </span>
          <span className={filterStyles.countDivider}>·</span>
          <span>
            <strong>{brandsWithProducts.toLocaleString('tr-TR')}</strong> marka
          </span>
        </div>
      </header>

      <ProductFilters
        current={{
          q,
          status: statusParam,
          brandId: brandIdParam,
          categoryId: categoryIdParam,
        }}
        brands={brandOptions}
        categories={categoryOptions}
      />

      {rows.length === 0 ? <ProductEmpty hasFilters={hasFilters} /> : <ProductList items={rows} />}

      {lastPage > 1 && (
        <div className="wd-full">
          <Pagination page={page} lastPage={lastPage} buildHref={buildHref} />
        </div>
      )}
    </div>
  );
}
