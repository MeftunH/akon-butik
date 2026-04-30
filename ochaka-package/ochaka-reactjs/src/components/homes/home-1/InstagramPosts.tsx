import { Link } from "react-router-dom";

import { galleryImages } from "@/data/instagramPosts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function InstagramPosts() {
  return (
    <section className="flat-spacing pt-0 pb-xl-0">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <div className="h1 title mb-16">Follow Us On Instagram</div>
          <h6>
            @ochaka:
            <span className="text-main fw-normal">Follow us and get</span> 20%
            off coupon
          </h6>
        </div>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-swiper wow fadeInUp"
        breakpoints={{
          0: { slidesPerView: 2, slidesPerGroup: 2 },
          575: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd10",
        }}
      >
        {galleryImages.map((imgSrc, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="gallery-item hover-img hover-overlay">
              <div className="image img-style">
                <img
                  className="lazyload"
                  src={imgSrc}
                  alt="Image"
                  width={640}
                  height={640}
                />
              </div>
              <Link to={`/product-detail/1`} className="box-icon hover-tooltip">
                <span className="icon icon-instagram-logo" />
                <span className="tooltip">View product</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd10" />
      </Swiper>
    </section>
  );
}
