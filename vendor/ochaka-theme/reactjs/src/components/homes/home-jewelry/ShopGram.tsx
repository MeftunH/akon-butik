import { galleryImagesStyle2Set4 } from "@/data/instagramPosts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function ShopGram() {
  return (
    <section className="flat-spacing pb-xl-0">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Shop Instagram</h1>
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
          el: ".spd90",
        }}
      >
        {galleryImagesStyle2Set4.map((imgSrc, index) => (
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
        <div className="sw-dot-default tf-sw-pagination spd90" />
      </Swiper>
    </section>
  );
}
