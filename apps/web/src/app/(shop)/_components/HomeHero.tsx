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
  subtitle: string;
  titleHtml: string;
  description: string;
  contentClass: string;
  columnClass: string;
  wrapClass: string;
  textColorClass: string;
  btnClass: string;
}

/**
 * Mirrors vendor `home-fashion-2/Hero.tsx` (`slider-wrap style-2`). Each
 * slide composes its own content alignment — center, end, white-on-dark —
 * via vendor utility classes. Imagery uses the symlinked vendor stills
 * until campaign photography lands.
 */
const SLIDES: readonly HeroSlide[] = [
  {
    imgSrc: '/images/slider/slider-4.jpg',
    subtitle: 'YENİ SEZON',
    titleHtml: 'Modern &amp; Zarif',
    description:
      'Sezonun yumuşak dokuları ve sade kesimleri.<br class="d-none d-sm-block" />Akon Butik’in seçkisiyle.',
    contentClass: 'type-center text-sm-center',
    columnClass: 'col-sm-8 col-10',
    wrapClass: 'content-sld_wrap',
    textColorClass: 'text-black',
    btnClass: 'tf-btn animate-btn fw-normal',
  },
  {
    imgSrc: '/images/slider/slider-5.jpg',
    subtitle: 'KOLEKSİYON',
    titleHtml: 'Cesur &amp; Klasik',
    description:
      'Zamansız parçalarla tarzınızı tamamlayın.<br class="d-none d-sm-block" />Şehirde her güne uyumlu.',
    contentClass: 'type-center text-end text-sm-center',
    columnClass: 'ms-auto col-sm-8 col-10',
    wrapClass: 'content-sld_wrap ms-sm-auto',
    textColorClass: 'text-black',
    btnClass: 'tf-btn animate-btn fw-normal',
  },
  {
    imgSrc: '/images/slider/slider-6.jpg',
    subtitle: 'YALIN ÇİZGİLER',
    titleHtml: 'Sade &amp; Şık',
    description:
      'Her güne yakışan minimalist seçkiyi keşfedin.<br class="d-none d-sm-block" />Akon Butik kalitesiyle.',
    contentClass: 'text-center',
    columnClass: 'col-sm-12',
    wrapClass: 'content-sld_wrap mx-auto',
    textColorClass: 'text-white',
    btnClass: 'tf-btn btn-white animate-btn animate-dark fw-normal',
  },
];

export function HomeHero() {
  return (
    <div className="tf-slideshow type-abs tf-btn-swiper-main hover-sw-nav">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        loop
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 6000 }}
        effect="fade"
        pagination={{ clickable: true, el: '.akon-hero-pagination' }}
        navigation={{ prevEl: '.akon-hero-prev', nextEl: '.akon-hero-next' }}
      >
        {SLIDES.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-2">
              <div className="sld_image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgSrc}
                  alt="Akon Butik koleksiyonu"
                  className="lazyload scale-item"
                  width={2880}
                  height={1350}
                />
              </div>
              <div className={`sld_content ${item.contentClass}`}>
                <div className="container">
                  <div className="row">
                    <div className={item.columnClass}>
                      <div className={item.wrapClass}>
                        <p className="sub-title_sld h3 text-primary fade-item fade-item-1">
                          {item.subtitle}
                        </p>
                        <h1
                          className="title_sld text-display fade-item fade-item-2"
                          dangerouslySetInnerHTML={{ __html: item.titleHtml }}
                        />
                        <p
                          className={`sub-text_sld h5 ${item.textColorClass} fade-item fade-item-3`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <div className="fade-item fade-item-4">
                          <Link href="/shop" className={item.btnClass}>
                            Mağazaya Git
                            <i className="icon icon-arrow-right" />
                          </Link>
                        </div>
                      </div>
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
