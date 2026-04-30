import { Link } from "react-router-dom";

import { bookSlides } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React from "react";

export default function Collections() {
  return (
    <div className="themesFlat">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd30",
          }}
        >
          {bookSlides.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`box-image_V06 hover-img wow fadeInLeft`}
                data-wow-delay={item.wowDelay || ""}
              >
                <div className="box-image_image img-style">
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt={item.imgAlt}
                    width={896}
                    height={524}
                  />
                </div>
                <div className="box-image_content">
                  <div>
                    {item.subtitle && (
                      <p className={item.subtitleClass}>{item.subtitle}</p>
                    )}
                    {item.title && (
                      <Link
                        to={`/shop-default`}
                        className="title link text-display-3 fw-semibold"
                      >
                        {item.title.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < item.title.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </Link>
                    )}
                  </div>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn-line letter-space-0"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd30" />
        </Swiper>
      </div>
    </div>
  );
}
