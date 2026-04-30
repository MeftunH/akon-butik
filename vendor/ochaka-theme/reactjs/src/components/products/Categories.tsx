import { Link } from "react-router-dom";

import { categories11 } from "@/data/categories";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Categories() {
  return (
    <div className="flat-spacing pb-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spdc1",
          }}
        >
          {categories11.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="box-image_category style-2 hover-img">
                <Link
                  to={`/shop-default`}
                  className="box-image_image img-style"
                >
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt={item.alt}
                    width={512}
                    height={592}
                  />
                </Link>
                <div className="box-image_content">
                  <Link
                    to={`/shop-default`}
                    className="tf-btn btn-white animate-btn animate-dark"
                  >
                    <span className="h5 fw-medium"> {item.label} </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spdc1" />
        </Swiper>
      </div>
    </div>
  );
}
