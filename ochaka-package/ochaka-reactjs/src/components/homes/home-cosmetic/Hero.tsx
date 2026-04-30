import { Link } from "react-router-dom";

import { sliderProducts } from "@/data/products";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow tf-btn-swiper-main">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 30000,
        }}
        loop
        speed={1500}
        spaceBetween={8}
        centeredSlides
        slidesPerGroupAuto
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.2,
          },
          1200: {
            slidesPerView: 1.33,
          },
        }}
        pagination={{
          clickable: true,
          el: ".spd47",
        }}
      >
        {sliderProducts.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload scale-item scale-item-1"
                  width={2160}
                  height={1050}
                />
              </div>
              <div className="sld_content type-2">
                <div className="content-sld_wrap">
                  <h2 className="title_sld type-semibold fade-item fade-item-1">
                    <Link to={`/shop-default`} className="link">
                      {item.title}
                    </Link>
                  </h2>
                  <div className="price-wrap fade-item fade-item-2">
                    <span className="price-old h6 fw-normal">
                      ${item.oldPrice.toFixed(2)}
                    </span>
                    <span className="price-new h6">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="br-line width-item width-item-3" />
                  <div className="fade-item fade-item-4">
                    <Link
                      to={`/shop-default`}
                      className="tf-btn-link link h6 fw-semibold"
                    >
                      Shop now
                      <i className="icon icon-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd47" />
      </Swiper>
    </div>
  );
}
