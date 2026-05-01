'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface Feature {
  iconClass: string;
  title: string;
  text: string;
}

const FEATURES: readonly Feature[] = [
  {
    iconClass: 'icon-package',
    title: '14 Gün İçinde İade',
    text: '14 gün içinde koşulsuz iade hakkı',
  },
  { iconClass: 'icon-calender', title: 'Güvenli Ödeme', text: '256-bit SSL ile şifrelenmiş ödeme' },
  { iconClass: 'icon-boat', title: 'Ücretsiz Kargo', text: '1.500₺ üzeri siparişlerde ücretsiz' },
  { iconClass: 'icon-headset', title: 'WhatsApp Destek', text: 'Hafta içi 09:00 – 18:00 arası' },
];

/**
 * Features strip — mirrors vendor `common/Features`. Lives at the bottom
 * of the home page (and footer of most other pages) to communicate
 * shipping / return / support guarantees.
 */
export function HomeFeatures() {
  return (
    <div className="flat-spacing pt-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={13}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 3, spaceBetween: 33 },
            1200: { slidesPerView: 4, spaceBetween: 97 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.akon-feat-pagination' }}
        >
          {FEATURES.map(({ iconClass, title, text }, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="box-icon_V01 wow fadeInLeft">
                <span className="icon">
                  <i className={iconClass} />
                </span>
                <div className="content">
                  <h4 className="title fw-normal">{title}</h4>
                  <p className="text">{text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination akon-feat-pagination" />
        </Swiper>
      </div>
    </div>
  );
}
