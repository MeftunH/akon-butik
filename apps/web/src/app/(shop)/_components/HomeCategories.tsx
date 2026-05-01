'use client';

import Link from 'next/link';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface CategoryCircle {
  imgSrc: string;
  title: string;
  count: number;
  href: string;
}

/**
 * Popular Categories. Mirrors vendor `home-fashion-2/Categories.tsx`
 * (`widget-collection style-circle` swiper with up to 6 circles per row).
 * Tied to demo imagery until the team uploads category cover photos —
 * the data shape matches the eventual catalog response so the swap is
 * a one-line change.
 */
const CATEGORIES: readonly CategoryCircle[] = [
  { imgSrc: '/images/category/cate-1.jpg', title: 'Hırka', count: 46, href: '/shop' },
  { imgSrc: '/images/category/cate-2.jpg', title: 'Elbise', count: 38, href: '/shop' },
  { imgSrc: '/images/category/cate-3.jpg', title: 'Aksesuar', count: 85, href: '/shop' },
  { imgSrc: '/images/category/cate-4.jpg', title: 'Sweat', count: 71, href: '/shop' },
  { imgSrc: '/images/category/cate-5.jpg', title: 'Kazak', count: 42, href: '/shop' },
  { imgSrc: '/images/category/cate-6.jpg', title: 'Gömlek', count: 60, href: '/shop' },
];

export function HomeCategories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Popüler Kategoriler</h1>
          <p className="s-subtitle h6">Sezonun en çok tercih edilen parçaları</p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: { slidesPerView: 3 },
            768: { slidesPerView: 4, spaceBetween: 24 },
            1200: { slidesPerView: 6, spaceBetween: 48 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.akon-cat-pagination' }}
        >
          {CATEGORIES.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link href={item.href} className="widget-collection style-circle hover-img">
                <div className="collection_image img-style">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt={item.title}
                    width={400}
                    height={400}
                  />
                </div>
                <p className="collection_name h5 link">
                  {item.title} <span className="count text-main-2">({item.count})</span>
                </p>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination akon-cat-pagination" />
        </Swiper>
      </div>
    </section>
  );
}
