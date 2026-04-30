import { Link } from "react-router-dom";

import { boxImageV05Items } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
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
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd53",
          }}
        >
          {boxImageV05Items.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="box-image_V05 type-space-2 hover-img wow fadeInLeft"
                data-wow-delay={item.wowDelay}
              >
                <Link
                  to={`/shop-default`}
                  className="box-image_image img-style"
                >
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="lazyload"
                    width={896}
                    height={452}
                  />
                </Link>
                <div className="box-image_content">
                  <p className="sub-title text-primary h6 fw-semibold">
                    {item.subTitle}
                  </p>
                  <h4 className="title">
                    <Link to={`/shop-default`} className="link">
                      {item.title}
                    </Link>
                  </h4>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn-line fw-bold letter-space-0"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd53" />
        </Swiper>
      </div>
    </div>
  );
}
