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
 * Three-up wide collection swiper — mirrors vendor `home-1/Collections.tsx`
 * (`s-collection` + `wg-cls-2` cards with `tag_cls h3 link` title).
 * Each card is image-left + title/Şimdi Keşfet-right with a vertical
 * divider; click navigates to the relevant /shop?category=... slug.
 */
const COLLECTIONS: readonly CollectionSlide[] = [
  { imgSrc: '/images/collections/cls-1.jpg', title: 'Yeni Sezon', href: '/shop?sort=newest' },
  {
    imgSrc: '/images/collections/cls-2.jpg',
    title: 'Tişört Koleksiyonu',
    href: '/shop?category=kadin',
  },
  {
    imgSrc: '/images/collections/cls-3.jpg',
    title: 'Elbise Koleksiyonu',
    href: '/shop?category=elbise',
  },
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
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt={item.title}
                  width={912}
                  height={704}
                />
              </Link>
              <div className="cls-content_wrap b-16">
                <div className="cls-content">
                  <Link
                    href={item.href}
                    className="tag_cls h5 link fw-medium"
                    style={{ letterSpacing: '0.02em' }}
                  >
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
