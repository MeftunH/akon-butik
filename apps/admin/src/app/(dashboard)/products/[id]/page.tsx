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
    <article>
      <nav aria-label="breadcrumb" className="mb-3 small">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/products" className="text-muted text-decoration-none">
              Ürünler
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.nameTr}
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-2">
        <div>
          <h1 className="h3 fw-bold mb-1">{product.nameTr}</h1>
          <p className="small text-muted mb-0">
            <code>{product.slug}</code>
            {product.diaParentKey && (
              <>
                {' · DIA: '}
                <code>{product.diaParentKey}</code>
              </>
            )}
            {product.diaSyncedAt && (
              <> · Son senkron: {new Date(product.diaSyncedAt).toLocaleString('tr-TR')}</>
            )}
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <ProductEditForm product={product} brands={brands} categories={categories} />

          <section className="mt-5">
            <h2 className="h6 fw-bold mb-3">Variantlar</h2>
            <p className="small text-muted">
              Variant verisi DIA senkronundan gelir; admin panelden düzenlenmez.
            </p>
            <div className="table-responsive">
              <table className="table align-middle bg-white">
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
                    <tr key={v.id}>
                      <td>
                        <code>{v.sku}</code>
                      </td>
                      <td>
                        <code>{v.diaStokkartkodu}</code>
                      </td>
                      <td>{v.size ?? '—'}</td>
                      <td>{v.color ?? '—'}</td>
                      <td>{v.stockQty}</td>
                      <td>
                        {v.priceOverrideMinor !== null
                          ? `₺${(v.priceOverrideMinor / 100).toLocaleString('tr-TR', {
                              minimumFractionDigits: 2,
                            })}`
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="col-lg-5">
          <ProductImagesPanel productId={product.id} initialImages={product.images} />
        </div>
      </div>
    </article>
  );
}
