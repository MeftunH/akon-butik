import { features } from "@/data/features";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="flat-spacing pt-0">
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
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd24",
          }}
        >
          {features.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="box-icon_V01 style-2 wow fadeInLeft">
                <span className="icon">
                  <i className={item.iconClass} />
                </span>
                <div className="content">
                  <h4 className="title fw-normal">{item.title}</h4>
                  <p className="text">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd24" />
        </Swiper>
      </div>
    </div>
  );
}
