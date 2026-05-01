import { Pagination } from '@akonbutik/ui';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../lib/admin-fetch';

interface AdminProduct {
  id: string;
  slug: string;
  nameTr: string;
  status: 'visible' | 'hidden' | 'needs_review';
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

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export const metadata = { title: 'Ürünler' };

const STATUS_LABELS: Record<AdminProduct['status'], string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const STATUS_CLASS: Record<AdminProduct['status'], string> = {
  visible: 'stt-complete',
  hidden: 'stt-muted',
  needs_review: 'stt-pending',
};

const formatTl = (minor: number): string =>
  `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const q = sp.q ?? '';
  const qs = new URLSearchParams({ page: page.toString(), pageSize: '25' });
  if (q) qs.set('q', q);

  const resp = await fetchAdmin<ProductListResponse>(`/admin/products?${qs.toString()}`);
  if (resp === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  const lastPage = Math.max(1, Math.ceil(resp.total / resp.pageSize));

  const buildHref = (p: number): string => {
    const next = new URLSearchParams({ page: p.toString() });
    if (q) next.set('q', q);
    return `/products?${next.toString()}`;
  };

  return (
    <div className="my-account-content">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 className="account-title type-semibold mb-0">Ürünler</h2>
        <span className="h6 text-main">{resp.total} kayıt</span>
      </div>

      <form className="d-flex flex-wrap gap-2 mb-4" method="get">
        <div className="flex-grow-1" style={{ minWidth: 220 }}>
          <input
            type="text"
            name="q"
            placeholder="İsim, slug veya DIA parent key ile ara…"
            defaultValue={q}
            aria-label="Ürün ara"
          />
        </div>
        <button type="submit" className="tf-btn animate-btn">
          <i className="icon icon-search me-2" />
          Ara
        </button>
        {q && (
          <Link href="/products" className="tf-btn style-line">
            Temizle
          </Link>
        )}
      </form>

      {resp.items.length === 0 ? (
        <div className="dashboard-empty">
          <i className="icon icon-bag-simple mb-3" aria-hidden />
          <h6 className="fw-semibold mb-1">Eşleşen ürün yok</h6>
          <p className="h6 text-main mb-0">
            Arama kriterini değiştirin veya DIA senkronu ile yeni ürünleri getirin.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="table-my_order">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Marka / Kategori</th>
                <th>Fiyat</th>
                <th>Variant</th>
                <th>Durum</th>
                <th>Son Senkron</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {resp.items.map((p) => (
                <tr key={p.id} className="tb-order-item">
                  <td>
                    <div className="infor-prd">
                      <h6 className="prd_name mb-1">
                        <Link
                          href={`/products/${p.id}`}
                          className="link fw-semibold text-decoration-none"
                        >
                          {p.nameTr}
                        </Link>
                      </h6>
                      <p className="prd_select text-small mb-0">
                        <span>{p.slug}</span>
                        {p.diaParentKey && (
                          <span>
                            DIA: <code>{p.diaParentKey}</code>
                          </span>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="h6">
                    {p.brand?.name ?? <span className="text-main">—</span>}
                    <br />
                    <span className="text-main">{p.category?.nameTr ?? '—'}</span>
                  </td>
                  <td className="tb-order_price">{formatTl(p.defaultPriceMinor)}</td>
                  <td className="h6">{p._count.variants}</td>
                  <td>
                    <div className={`tb-order_status ${STATUS_CLASS[p.status]}`}>
                      {STATUS_LABELS[p.status]}
                    </div>
                  </td>
                  <td className="h6 text-main">
                    {p.diaSyncedAt ? new Date(p.diaSyncedAt).toLocaleDateString('tr-TR') : '—'}
                  </td>
                  <td className="tb-order_action">
                    <Link href={`/products/${p.id}`} className="link fw-semibold">
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lastPage > 1 && (
        <div className="wd-full">
          <Pagination page={page} lastPage={lastPage} buildHref={buildHref} />
        </div>
      )}
    </div>
  );
}
