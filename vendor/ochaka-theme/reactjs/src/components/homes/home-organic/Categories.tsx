import { Link } from "react-router-dom";

import { categories6 } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="s-title h1 fw-medium">Shop By Category</h2>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
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
              slidesPerView: 6,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd100",
          }}
        >
          {categories6.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                to={`/shop-default`}
                className={`widget-collection style-2 hover-img ${item.className}`}
              >
                <div className="collection_image img-style overflow-visible">
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt="Collection"
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <div className="collection_content">
                  <h4 className="collection_name link fw-normal primary-2">
                    {item.name}
                  </h4>
                  <span className="collection_count h6">{item.count}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd100" />
        </Swiper>
      </div>
    </section>
  );
}
