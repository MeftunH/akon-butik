import Link from 'next/link';

interface TrendingBanner {
  imgSrc: string;
  title: string;
  href: string;
}

const BANNERS: readonly TrendingBanner[] = [
  {
    imgSrc: '/images/section/box-image-2.jpg',
    title: 'Yeni Sezon Vitrini',
    href: '/shop',
  },
  {
    imgSrc: '/images/section/box-image-3.jpg',
    title: 'Bahar Yenilikleri',
    href: '/shop',
  },
];

/**
 * "Product Trending" — vendor `home-fashion-2/Collections2`. Two large
 * banner panels in a 2-column tf-grid-layout. Uses vendor section imagery
 * until campaign photography lands.
 */
export function HomeTrending() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Trend Olan Ürünler</h1>
          <p className="s-subtitle h6">Sezonun öne çıkan koleksiyonları</p>
        </div>
        <div className="tf-grid-layout md-col-2">
          {BANNERS.map((item, index) => (
            <div className="box-image_V05 hover-img wow fadeInUp" key={index}>
              <Link href={item.href} className="box-image_image img-style">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="lazyload"
                  width={1392}
                  height={540}
                />
              </Link>
              <div className="box-image_content">
                <h2 className="title">
                  <Link href={item.href} className="link fw-normal">
                    {item.title}
                  </Link>
                </h2>
                <Link href={item.href} className="tf-btn-line text-nowrap">
                  Şimdi Keşfet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
