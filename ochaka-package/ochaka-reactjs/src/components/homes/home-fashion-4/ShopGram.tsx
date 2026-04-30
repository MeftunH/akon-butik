import { Link } from "react-router-dom";

import { galleryImagesStyle2Set2 } from "@/data/instagramPosts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function ShopGram() {
  return (
    <div className="themesFlat flat-spacing pt-0 pb-xl-0">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <p className="s-title h1 fw-medium mb-8">Shop Instagram</p>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-swiper wow fadeInUp"
        breakpoints={{
          0: { slidesPerView: 2 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd76",
        }}
      >
        {galleryImagesStyle2Set2.map((imgSrc, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="gallery-item style-2 hover-img hover-overlay">
              <div className="image img-style">
                <img
                  className="lazyload"
                  src={imgSrc}
                  alt=""
                  width={960}
                  height={910}
                />
              </div>
              <Link to={`/product-detail/1`} className="box-icon hover-tooltip">
                <span className="icon icon-instagram-logo" />
                <span className="tooltip">View product</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd76" />
      </Swiper>
    </div>
  );
}
