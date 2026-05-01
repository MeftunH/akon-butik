import type { ProductSummary } from '@akonbutik/types';
import { ProductGrid } from '@akonbutik/ui';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { fetchAccount, NOT_AUTHENTICATED } from '../../../lib/account';

export const metadata = {
  title: 'Favorilerim',
  robots: { index: false, follow: false },
};

export default async function WishlistPage() {
  const items = await fetchAccount<readonly ProductSummary[]>('/customers/me/wishlist');
  if (items === NOT_AUTHENTICATED) redirect('/login?next=/wishlist');

  if (items.length === 0) {
    return (
      <main className="flat-spacing">
        <div className="container">
          <div className="row justify-content-center">
            <div className="box-text_empty type-shop_cart col-12 col-md-7 col-lg-5 text-center">
              <div className="shop-empty_top">
                <span className="icon">
                  <i className="icon-heart" />
                </span>
                <h3 className="text-emp fw-normal mt-3">Favoriler listeniz boş</h3>
                <p className="h6 text-main">
                  Beğendiğiniz ürünleri kalp ikonuyla buraya ekleyin. Favorileriniz hesabınızla
                  ilişkilendirilir; cihaz değiştirseniz dahi kaybolmaz.
                </p>
              </div>
              <div className="shop-empty_bot mt-4 d-flex flex-column gap-2">
                <Link href="/shop" className="tf-btn animate-btn">
                  Mağazaya Git
                </Link>
                <Link href="/" className="tf-btn style-line">
                  Anasayfaya Dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Favorilerim</h1>
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
                <h6 className="current-page fw-normal">Favorilerim</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <main className="flat-spacing">
        <div className="container">
          <p className="text-main-2 mb-4">
            {items.length} ürün listenizde. Kalp ikonuna tekrar tıklayarak çıkarabilirsiniz.
          </p>
          <ProductGrid products={items} columns={4} />
        </div>
      </main>
    </>
  );
}
