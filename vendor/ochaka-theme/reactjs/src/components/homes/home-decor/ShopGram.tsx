import { galleryImagesSet4 } from "@/data/instagramPosts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function ShopGram() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Shop Instagram</h1>
          <p className="s-subtitle h6">
            Follow our Instagram channel to get a
            <span className="fw-bold">50% discount</span> on your first order.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd49",
          }}
        >
          {galleryImagesSet4.map((imgSrc, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="gallery-item hover-img hover-overlay">
                <div className="image img-style">
                  <img
                    className="lazyload"
                    src={imgSrc}
                    alt=""
                    width={576}
                    height={576}
                  />
                </div>
                <a href="#" className="box-icon hover-tooltip">
                  <span className="icon icon-instagram-logo" />
                  <span className="tooltip">View product</span>
                </a>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd49" />
        </Swiper>
      </div>
    </section>
  );
}
