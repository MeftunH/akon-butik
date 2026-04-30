import { ProductGrid } from '@akonbutik/ui';
import type { ProductSummary } from '@akonbutik/types';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { api } from '@/lib/api';

interface ProductListResponse {
  items: readonly ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export const revalidate = 300;

export default async function HomePage() {
  const t = await getTranslations();
  const featured = await api<ProductListResponse>('/catalog/products?pageSize=8&sort=newest');

  return (
    <main>
      <section className="hero py-5 bg-light">
        <div className="container text-center py-5">
          <h1 className="display-3 fw-bold mb-3">{t('common.brandName')}</h1>
          <p className="lead text-muted mb-4">
            Şıklığın butik adresi — yeni sezonun en çok aranan parçaları seçildi.
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg">
            {t('nav.shop')}
          </Link>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <header className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Öne çıkan ürünler</h2>
              <p className="text-muted mb-0">DIA stoğundan gelen güncel kapsam.</p>
            </div>
            <Link href="/shop" className="text-decoration-none">
              Tümünü gör →
            </Link>
          </header>
          <ProductGrid products={featured.items} columns={4} />
        </div>
      </section>
    </main>
  );
}
