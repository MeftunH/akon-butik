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

const STATUS_TONE: Record<AdminProduct['status'], string> = {
  visible: 'bg-success-subtle text-success',
  hidden: 'bg-secondary-subtle text-secondary',
  needs_review: 'bg-warning-subtle text-warning',
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const q = sp.q ?? '';
  const qs = new URLSearchParams({ page: page.toString(), pageSize: '25' });
  if (q) qs.set('q', q);

  const resp = await fetchAdmin<ProductListResponse>(`/admin/products?${qs.toString()}`);
  if (resp === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  const lastPage = Math.max(1, Math.ceil(resp.total / resp.pageSize));

  return (
    <article>
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h3 fw-bold mb-0">Ürünler</h1>
        <span className="text-muted small">{resp.total} kayıt</span>
      </div>

      <form className="mb-3 d-flex gap-2" method="get">
        <input
          type="text"
          name="q"
          className="form-control"
          placeholder="İsim, slug veya DIA parent key ile ara…"
          defaultValue={q}
        />
        <button type="submit" className="btn btn-outline-primary">
          Ara
        </button>
        {q && (
          <Link href="/products" className="btn btn-outline-secondary">
            Temizle
          </Link>
        )}
      </form>

      <div className="table-responsive">
        <table className="table align-middle bg-white">
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Marka / Kategori</th>
              <th>Fiyat</th>
              <th>Variant</th>
              <th>Durum</th>
              <th>Son Senkron</th>
            </tr>
          </thead>
          <tbody>
            {resp.items.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  Eşleşen ürün yok.
                </td>
              </tr>
            )}
            {resp.items.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/products/${p.id}`} className="fw-semibold text-decoration-none">
                    {p.nameTr}
                  </Link>
                  <div className="small text-muted">
                    {p.slug}
                    {p.diaParentKey && (
                      <>
                        {' · '}
                        <code>{p.diaParentKey}</code>
                      </>
                    )}
                  </div>
                </td>
                <td className="small">
                  {p.brand?.name ?? <span className="text-muted">—</span>}
                  {' / '}
                  {p.category?.nameTr ?? <span className="text-muted">—</span>}
                </td>
                <td>
                  ₺
                  {(p.defaultPriceMinor / 100).toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>{p._count.variants}</td>
                <td>
                  <span className={`badge ${STATUS_TONE[p.status]}`}>{p.status}</span>
                </td>
                <td className="small text-muted">
                  {p.diaSyncedAt ? new Date(p.diaSyncedAt).toLocaleString('tr-TR') : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} lastPage={lastPage} q={q} />
    </article>
  );
}

function Pagination({ page, lastPage, q }: { page: number; lastPage: number; q: string }) {
  if (lastPage <= 1) return null;
  const buildHref = (p: number): string => {
    const sp = new URLSearchParams({ page: p.toString() });
    if (q) sp.set('q', q);
    return `/products?${sp.toString()}`;
  };
  return (
    <nav className="d-flex align-items-center justify-content-between mt-3">
      <span className="text-muted small">
        Sayfa {page} / {lastPage}
      </span>
      <div className="d-flex gap-2">
        <Link
          href={page > 1 ? buildHref(page - 1) : '/products'}
          className={`btn btn-sm btn-outline-secondary${page === 1 ? ' disabled' : ''}`}
          aria-disabled={page === 1}
        >
          ← Önceki
        </Link>
        <Link
          href={page < lastPage ? buildHref(page + 1) : '/products'}
          className={`btn btn-sm btn-outline-secondary${page === lastPage ? ' disabled' : ''}`}
          aria-disabled={page === lastPage}
        >
          Sonraki →
        </Link>
      </div>
    </nav>
  );
}
