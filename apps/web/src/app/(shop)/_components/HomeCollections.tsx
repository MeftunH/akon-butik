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
 * Three-up category showcase. Vendor reference: home-1/Collections.tsx.
 * Linked to /shop?... rather than a real category route until the
 * category taxonomy is curated from the admin panel (Phase 5b).
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
    <section className="s-collection py-5">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1200: { slidesPerView: 3, spaceBetween: 24 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.akon-cls-pagination' }}
        >
          {COLLECTIONS.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls-2 d-flex hover-img">
                <Link href={item.href} className="image img-style">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imgSrc} alt={item.title} width={912} height={704} />
                </Link>
                <div className="cls-content_wrap b-16">
                  <div className="cls-content">
                    <Link href={item.href} className="tag_cls h3 link">
                      {item.title}
                    </Link>
                    <Link href={item.href} className="tf-btn animate-btn fw-normal mt-3">
                      Hemen İncele
                      <i className="icon icon-arrow-right" />
                    </Link>
                  </div>
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
