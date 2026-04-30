import { features } from "@/data/features";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({
  lineTop = false,
  parentClass = "flat-spacing pt-0",
}) {
  return (
    <div className={parentClass}>
      <div className="container">
        {lineTop ? (
          <div className="flat-spacing pt-0">
            <span className="br-line d-flex"></span>
          </div>
        ) : (
          ""
        )}
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={13}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 33,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 97,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd2",
          }}
        >
          {features.map(({ iconClass, title, text, wowDelay }, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div
                className="box-icon_V01 wow fadeInLeft"
                {...(wowDelay ? { "data-wow-delay": wowDelay } : {})}
              >
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
          <div className="sw-dot-default tf-sw-pagination spd2" />
        </Swiper>
      </div>
    </div>
  );
}
