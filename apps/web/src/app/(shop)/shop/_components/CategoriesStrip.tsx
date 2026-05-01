'use client';

import Link from 'next/link';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface Category {
  id: string;
  slug: string;
  name: string;
  productCount: number;
}

interface CategoriesStripProps {
  categories: readonly Category[];
}

const FALLBACK_IMAGES = [
  '/images/category/cate-1.jpg',
  '/images/category/cate-2.jpg',
  '/images/category/cate-3.jpg',
  '/images/category/cate-4.jpg',
  '/images/category/cate-5.jpg',
  '/images/category/cate-6.jpg',
];

const FALLBACK_DEFAULT = '/images/category/cate-1.jpg';

function pickImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length] ?? FALLBACK_DEFAULT;
}

/**
 * Top-of-shop kategori şeridi — vendor `products/Categories.tsx` mirror.
 * Swiper karuseli + `widget-collection style-circle` daire görsel +
 * kategori adı + ürün sayısı. Tıklamada `/shop?category=<slug>` URL'ine
 * yönlendirir; mevcut filter param'larıyla birlikte URL-driven kategori
 * seçimi olarak çalışır.
 *
 * Kategori cover photo'ları admin'in resim yüklemesine kadar vendor demo
 * görsellerine deterministik fallback (slug seed'iyle).
 */
export function CategoriesStrip({ categories }: CategoriesStripProps) {
  if (categories.length === 0) return null;

  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: { slidesPerView: 3 },
            768: { slidesPerView: 4, spaceBetween: 24 },
            1200: { slidesPerView: 6, spaceBetween: 40 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.akon-shop-cat-pagination' }}
        >
          {categories.map((cat) => (
            <SwiperSlide className="swiper-slide" key={cat.id}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="widget-collection style-circle hover-img"
              >
                <div className="collection_image img-style">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="lazyload"
                    src={pickImage(cat.slug)}
                    alt={cat.name}
                    width={400}
                    height={400}
                  />
                </div>
                <p className="collection_name h5 link">
                  {cat.name} <span className="count text-main-2">({cat.productCount})</span>
                </p>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination akon-shop-cat-pagination" />
        </Swiper>
      </div>
    </section>
  );
}
