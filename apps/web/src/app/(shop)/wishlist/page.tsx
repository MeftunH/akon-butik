import Link from 'next/link';

export const metadata = {
  title: 'Favorilerim',
  robots: { index: false, follow: false },
};

/**
 * Wishlist landing page. The Wishlist DB model exists (schema.prisma)
 * but the customer-facing API + add/remove flows haven't been wired
 * yet — this page renders the vendor empty-state until that lands.
 */
export default function WishlistPage() {
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
