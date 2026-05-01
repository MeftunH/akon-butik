'use client';

import Link from 'next/link';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface CollectionSlide {
  imgSrc: string;
  title: string;
  href: string;
}

/**
 * Two-up wide collection swiper — mirrors vendor
 * `home-fashion-2/Collections.tsx` (`s-collection` + `wg-cls-2 type-space-2`).
 * Each card is image-left + title/Shop now-right with a vertical divider.
 */
const COLLECTIONS: readonly CollectionSlide[] = [
  { imgSrc: '/images/collections/cls-4.jpg', title: 'Elbise Koleksiyonu', href: '/shop' },
  { imgSrc: '/images/collections/cls-5.jpg', title: 'Sezon Vitrini', href: '/shop' },
];

export function HomeCollections() {
  return (
    <div className="s-collection">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: { slidesPerView: 2 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1200: { slidesPerView: 2, spaceBetween: 24 },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true, el: '.akon-cls-pagination' }}
      >
        {COLLECTIONS.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls-2 type-space-2 d-flex hover-img">
              <Link href={item.href} className="image img-style">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt={item.title}
                  width={1386}
                  height={945}
                />
              </Link>
              <div className="cls-content_wrap">
                <div className="cls-content">
                  <Link href={item.href} className="tag_cls h2 type-semibold link">
                    {item.title}
                  </Link>
                  <span className="br-line type-vertical" />
                  <Link href={item.href} className="tf-btn-line text-nowrap">
                    Şimdi Keşfet
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination akon-cls-pagination" />
      </Swiper>
    </div>
  );
}
