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
}

/**
 * Mirrors vendor `home-1/Hero.tsx` (`slider-wrap` — no `style-2` modifier;
 * single centered `content-sld_wrap` with `title_sld text-display` heading).
 *
 * The home-fashion-2 variant we used in Phase 5c had per-slide content
 * alignment classes (`type-center text-end`, `ms-sm-auto`, white-on-dark);
 * that's overkill for a butik landing where every hero CTA is the same
 * "Mağazaya Git" button. Reverting to home-1's simpler, type-display-led
 * layout.
 */
const SLIDES: readonly HeroSlide[] = [
  {
    imgSrc: '/images/slider/slider-1.jpg',
    titleHtml: 'Sonbahar Kış<br class="d-sm-none" /> Koleksiyonu',
    description: 'Yumuşak dokular ve zarif kesimlerle yeni sezonu keşfedin.',
  },
  {
    imgSrc: '/images/slider/slider-2.jpg',
    titleHtml: 'İlkbahar Yaz<br class="d-sm-none" /> Esintileri',
    description: 'Pastel tonlar ve hafif kumaşlarla yaza hazır parçalar.',
  },
  {
    imgSrc: '/images/slider/slider-3.jpg',
    titleHtml: 'Şehir<br class="d-sm-none" /> Şıklığı',
    description: 'Her güne yakışan minimalist çizgiler. Akon Butik seçkisi.',
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
        navigation={{ prevEl: '.akon-hero-prev', nextEl: '.akon-hero-next' }}
      >
        {SLIDES.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="sld_image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgSrc}
                  alt="Akon Butik koleksiyonu"
                  className="lazyload"
                  width={2880}
                  height={1380}
                />
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
                      <Link href="/shop" className="tf-btn animate-btn fw-semibold">
                        Mağazaya Git
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
