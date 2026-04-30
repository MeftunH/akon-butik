'use client';

import Link from 'next/link';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroSlide {
  imgSrc: string;
  titleHtml: string;
  description: string;
  cta: { label: string; href: string };
}

/**
 * Mirrors the structure of vendor `home-1/Hero.tsx` but with the Akon
 * Butik copy and Next.js routing. Imagery is pulled from the symlinked
 * vendor public/images tree (apps/web/public/images → vendor/.../public/
 * images), so changing the array below to point at /images/products/...
 * once real campaign photography lands won't require any code edits
 * elsewhere.
 */
const SLIDES: readonly HeroSlide[] = [
  {
    imgSrc: '/images/slider/slider-1.jpg',
    titleHtml: 'Yeni Sezon<br class="d-sm-none" /> Koleksiyonu',
    description: 'Yumuşak dokular ve zarif kesimlerle yeni sezonu keşfedin.',
    cta: { label: 'Mağazaya Git', href: '/shop' },
  },
  {
    imgSrc: '/images/slider/slider-2.jpg',
    titleHtml: 'İlkbahar Yaz<br class="d-sm-none" /> Esintileri',
    description: 'Pastel tonlar ve hafif kumaşlarla yaz hazırlıklı.',
    cta: { label: 'Koleksiyonu İncele', href: '/shop' },
  },
  {
    imgSrc: '/images/slider/slider-3.jpg',
    titleHtml: 'Şehir<br class="d-sm-none" /> Şıklığı',
    description: 'Her güne uyan minimalist parçalar.',
    cta: { label: 'Şimdi Keşfet', href: '/shop' },
  },
];

export function HomeHero() {
  return (
    <div className="tf-slideshow type-abs tf-btn-swiper-main hover-sw-nav">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        loop
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        autoplay={{ delay: 6000 }}
        effect="fade"
        pagination={{ clickable: true, el: '.akon-hero-pagination' }}
        navigation={{
          prevEl: '.akon-hero-prev',
          nextEl: '.akon-hero-next',
        }}
      >
        {SLIDES.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="sld_image">
                {/* Static hero photography served from the vendor public
                    tree via symlink — Next/Image isn't worth the config
                    cost at this stage. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imgSrc} alt="Akon Butik koleksiyonu" width={2880} height={1380} />
              </div>
              <div className="sld_content">
                <div className="container">
                  <div className="content-sld_wrap">
                    <h1
                      className="title_sld text-display fade-item fade-item-1"
                      dangerouslySetInnerHTML={{ __html: item.titleHtml }}
                    />
                    <p className="sub-text_sld h5 text-black fade-item fade-item-2">
                      {item.description}
                    </p>
                    <div className="fade-item fade-item-3">
                      <Link href={item.cta.href} className="tf-btn animate-btn fw-semibold">
                        {item.cta.label}
                        <i className="icon icon-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination akon-hero-pagination" />
      </Swiper>
      <button
        type="button"
        className="tf-sw-nav nav-prev-swiper akon-hero-prev"
        aria-label="Önceki slayt"
      >
        <i className="icon icon-caret-left" />
      </button>
      <button
        type="button"
        className="tf-sw-nav nav-next-swiper akon-hero-next"
        aria-label="Sonraki slayt"
      >
        <i className="icon icon-caret-right" />
      </button>
    </div>
  );
}
