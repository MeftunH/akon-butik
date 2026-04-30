import { features } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <section>
      <div className="container">
        <div className="sect-border">
          <div className="s-head">
            <h3 className="s-title fw-normal">The Fresh Clothes</h3>
          </div>
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
              el: ".spd144",
            }}
          >
            {features.map((feature, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="box-icon_V01">
                  <span className="icon">
                    <i className={feature.iconClass} />
                  </span>
                  <div className="content">
                    <h4 className="title fw-normal">{feature.title}</h4>
                    <p className="text">{feature.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-dot-default tf-sw-pagination spd144" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
