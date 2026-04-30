import { galleryItems3 } from "@/data/instagramPosts";

import { Swiper, SwiperSlide } from "swiper/react";

export default function ShopGram() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title text-center">
          <h1 className="s-title mb-8">Shop Instagram</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
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
      >
        {galleryItems3.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="gallery-item hover-img hover-overlay">
              <div className="image img-style">
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt={item.alt}
                  width={960}
                  height={910}
                />
              </div>
              <a href={"#"} className="box-icon hover-tooltip">
                <span className="icon icon-instagram-logo" />
                <span className="tooltip">View product</span>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
