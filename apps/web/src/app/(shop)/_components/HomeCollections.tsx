'use client';

import Link from 'next/link';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface Collection {
  imgSrc: string;
  title: string;
  href: string;
}

/**
 * Three-up category showcase mirroring vendor `Categories.tsx`. The
 * `box-image_category style-2` block puts the photo full-bleed with a
 * bottom-aligned action button overlay, which is what the demo
 * actually looks like — the prior `wg-cls-2` layout I had rendered
 * the title + button as a sidebar next to the image, which is not
 * the demo style.
 */
const COLLECTIONS: readonly Collection[] = [
  {
    imgSrc: '/images/collections/cls-1.jpg',
    title: 'Elbiseler',
    href: '/shop',
  },
  {
    imgSrc: '/images/collections/cls-2.jpg',
    title: 'Yeni Sezon',
    href: '/shop',
  },
  {
    imgSrc: '/images/collections/cls-3.jpg',
    title: 'Üstler',
    href: '/shop',
  },
];

export function HomeCollections() {
  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1200: { slidesPerView: 3, spaceBetween: 24 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.akon-cls-pagination' }}
        >
          {COLLECTIONS.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="box-image_category style-2 hover-img">
                <Link href={item.href} className="box-image_image img-style">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imgSrc} alt={item.title} width={512} height={592} />
                </Link>
                <div className="box-image_content">
                  <Link href={item.href} className="tf-btn btn-white animate-btn animate-dark">
                    <span className="h5 fw-medium">{item.title}</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sw-dot-default tf-sw-pagination text-center mt-3 akon-cls-pagination" />
      </div>
    </section>
  );
}
