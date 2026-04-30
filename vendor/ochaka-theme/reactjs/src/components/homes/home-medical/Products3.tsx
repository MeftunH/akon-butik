import { Link } from "react-router-dom";

import ProductCard16 from "@/components/productCards/ProductCard16";
import { productsSwiperStyle4 } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products3() {
  return (
    <section className="flat-spacing bg-primary primary-3">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal text-white">Our Best Sellers</h2>
          <Link
            to={`/shop-default`}
            className="tf-btn-line style-white primary"
          >
            View All
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper swiper-medical wow fadeInUp"
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
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd98",
          }}
        >
          {productsSwiperStyle4.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard16 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default style-white tf-sw-pagination spd98" />
        </Swiper>
      </div>
    </section>
  );
}
