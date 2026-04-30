import type { ProductSummary } from '@akonbutik/types';
import { ProductGrid } from '@akonbutik/ui';
import Link from 'next/link';


import { HomeCollections } from './_components/HomeCollections';
import { HomeHero } from './_components/HomeHero';

import { api } from '@/lib/api';

interface ProductListResponse {
  items: readonly ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export const revalidate = 300;

export default async function HomePage() {
  const featured = await api<ProductListResponse>('/catalog/products?pageSize=8&sort=newest');

  return (
    <main>
      <HomeHero />
      <HomeCollections />

      <section className="flat-spacing-7">
        <div className="container">
          <header className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Öne çıkan ürünler</h2>
              <p className="text-muted mb-0">DIA stoğundan gelen güncel kapsam.</p>
            </div>
            <Link href="/shop" className="text-decoration-none fw-semibold">
              Tümünü gör <i className="icon icon-arrow-right" />
            </Link>
          </header>
          <ProductGrid products={featured.items} columns={4} />
        </div>
      </section>

      <section className="flat-spacing-7 bg-light">
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-7">
              <h2 className="fw-bold mb-2">Akon Butik</h2>
              <p className="text-muted mb-4">
                Şıklığın butik adresi — zarif kesimleri, doğal kumaşları ve özenle seçilmiş
                koleksiyonlarıyla. Her parça günün ritmine ayak uydurur, gardırobunuzun temel
                parçası olur.
              </p>
              <Link href="/about" className="tf-btn animate-btn fw-semibold">
                Hikayemiz <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
