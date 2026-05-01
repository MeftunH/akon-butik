import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../../lib/admin-fetch';

import { ProductEditForm } from './ProductEditForm';
import { ProductImagesPanel } from './ProductImagesPanel';

interface AdminProductDetail {
  id: string;
  slug: string;
  nameTr: string;
  descriptionMd: string;
  defaultPriceMinor: number;
  currency: string;
  status: 'visible' | 'hidden' | 'needs_review';
  diaParentKey: string | null;
  diaSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
  brand: { id: string; name: string } | null;
  category: { id: string; nameTr: string } | null;
  variants: {
    id: string;
    sku: string;
    diaStokkartkodu: string;
    size: string | null;
    color: string | null;
    stockQty: number;
    priceOverrideMinor: number | null;
  }[];
  images: {
    id: string;
    url: string;
    sortOrder: number;
    isPrimary: boolean;
    source: 'dia' | 'manual';
  }[];
}

interface BrandOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  nameTr: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: 'Ürün Düzenle' };

const STATUS_LABELS: Record<AdminProductDetail['status'], string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const STATUS_CLASS: Record<AdminProductDetail['status'], string> = {
  visible: 'stt-complete',
  hidden: 'stt-muted',
  needs_review: 'stt-pending',
};

const formatTl = (minor: number): string =>
  `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

export default async function ProductEditPage({ params }: PageProps) {
  const { id } = await params;
  const [product, brands, categories] = await Promise.all([
    fetchAdmin<AdminProductDetail | null>(`/admin/products/${id}`),
    fetchAdmin<BrandOption[]>('/admin/brands'),
    fetchAdmin<CategoryOption[]>('/admin/categories'),
  ]);
  if (
    product === ADMIN_NOT_AUTHENTICATED ||
    brands === ADMIN_NOT_AUTHENTICATED ||
    categories === ADMIN_NOT_AUTHENTICATED
  ) {
    redirect('/login');
  }
  if (!product) notFound();

  return (
    <div className="my-account-content">
      <nav aria-label="breadcrumb" className="mb-3 h6">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/products" className="text-decoration-none link">
              Ürünler
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.nameTr}
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2 className="account-title type-semibold mb-1">{product.nameTr}</h2>
          <div className="d-flex flex-wrap align-items-center gap-2 h6 text-main">
            <code>{product.slug}</code>
            {product.diaParentKey && (
              <span>
                · DIA: <code>{product.diaParentKey}</code>
              </span>
            )}
            {product.diaSyncedAt && (
              <span>· Son senkron: {new Date(product.diaSyncedAt).toLocaleString('tr-TR')}</span>
            )}
          </div>
        </div>
        <div className="d-flex flex-column align-items-end gap-2">
          <span className={`tb-order_status ${STATUS_CLASS[product.status]}`}>
            {STATUS_LABELS[product.status]}
          </span>
          <span className="h5 fw-bold mb-0">{formatTl(product.defaultPriceMinor)}</span>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <ProductEditForm product={product} brands={brands} categories={categories} />

          <section className="dashboard-card mt-4">
            <h3 className="account-title type-semibold h5 mb-2">Variantlar</h3>
            <p className="h6 text-main mb-3">
              Variant verisi DIA senkronundan gelir; admin panelden düzenlenmez.
            </p>
            {product.variants.length === 0 ? (
              <div className="dashboard-empty">
                <i className="icon icon-list mb-2" aria-hidden />
                <h6 className="fw-semibold mb-1">Variant yok</h6>
                <p className="h6 text-main mb-0">
                  DIA senkronu çalıştırarak variantları getirebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="overflow-auto">
                <table className="table-my_order">
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>DIA Stokkart</th>
                      <th>Beden</th>
                      <th>Renk</th>
                      <th>Stok</th>
                      <th>Fiyat Override</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((v) => (
                      <tr key={v.id} className="tb-order-item">
                        <td>
                          <code>{v.sku}</code>
                        </td>
                        <td>
                          <code>{v.diaStokkartkodu}</code>
                        </td>
                        <td className="h6">{v.size ?? '—'}</td>
                        <td className="h6">{v.color ?? '—'}</td>
                        <td className="h6 fw-semibold">{v.stockQty}</td>
                        <td className="h6">
                          {v.priceOverrideMinor !== null ? (
                            formatTl(v.priceOverrideMinor)
                          ) : (
                            <span className="text-main">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <div className="col-lg-5">
          <ProductImagesPanel productId={product.id} initialImages={product.images} />
        </div>
      </div>
    </div>
  );
}
