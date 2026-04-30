import { Link } from "react-router-dom";

import { widgetCollections } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Top Collection</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
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
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd114",
          }}
        >
          {widgetCollections.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                to={`/shop-default`}
                className="widget-collection hover-img type-space-2"
              >
                <div className="collection_image img-style rounded-0">
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt="CLS"
                    width={512}
                    height={444}
                  />
                </div>
                <h5 className="collection_name fw-semibold link">
                  {item.title}
                </h5>
              </Link>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd114" />
        </Swiper>
      </div>
    </section>
  );
}
