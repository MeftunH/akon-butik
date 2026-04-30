import { Link } from "react-router-dom";

import { collections } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <section className="themesFlat">
      <div className="container-full">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">Collection The Day</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd120",
          }}
        >
          {collections.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="box-image_V02 type-space-2 type-space-5 hover-img">
                <Link
                  to={`/shop-default`}
                  className="box-image_image img-style"
                >
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="lazyload"
                    width={864}
                    height={1173}
                  />
                </Link>
                <div className="box-image_content wow fadeInUp">
                  <h2 className="type-semibold">
                    <Link to={`/shop-default`} className="title link mb-8">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="sub-text h6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link to={`/shop-default`} className="tf-btn animate-btn">
                    Shop now
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd120" />
        </Swiper>
      </div>
    </section>
  );
}
