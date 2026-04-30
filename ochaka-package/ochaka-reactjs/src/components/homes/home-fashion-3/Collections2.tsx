import { Link } from "react-router-dom";

import { boxImagesV03 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections2() {
  return (
    <div className="flat-spacing">
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
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd66",
          }}
        >
          {boxImagesV03.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="box-image_V03 hover-img wow fadeInUp"
                data-wow-delay={item.wowDelay}
              >
                <Link
                  to={`/shop-default`}
                  className="box-image_image img-style"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    className="lazyload"
                    width={928}
                    height={1176}
                  />
                </Link>
                <div className="box-image_content align-items-center text-center">
                  <span className="sub-text h6 text-primary fw-semibold">
                    {item.subText}
                  </span>
                  <h2 className="fw-normal title">
                    <Link to={`/shop-default`} className="link">
                      {item.title}
                    </Link>
                  </h2>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn btn-white animate-btn animate-dark"
                  >
                    Shop now
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd66" />
        </Swiper>
      </div>
    </div>
  );
}
