import { Link } from "react-router-dom";

import { categories2 } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Categories() {
  return (
    <div className="flat-spacing s-category">
      <div className="sect-title text-center wow fadeInUp">
        <p className="s-title h1 fw-medium mb-8">Explore Category</p>
        <p className="s-subtitle h6">
          Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-swiper wow fadeInUp"
        spaceBetween={12}
        breakpoints={{
          0: { slidesPerView: 2 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd65",
        }}
      >
        {categories2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="box-image_category hover-img">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt="Image"
                  width={720}
                  height={940}
                />
              </Link>
              <div className="box-image_content">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-white animate-btn animate-dark"
                >
                  <span className="h5 fw-medium">{item.title}</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd65" />
      </Swiper>
    </div>
  );
}
