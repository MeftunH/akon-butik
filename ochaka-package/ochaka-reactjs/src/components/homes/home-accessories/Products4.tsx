import { Link } from "react-router-dom";

import ProductCard19 from "@/components/productCards/ProductCard19";

import { miniProductsAccreeories } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import SingleProduct from "./SingleProduct";
import { Pagination } from "swiper/modules";

export default function Products4() {
  return (
    <section className="bg-cosmic-purple">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal text-white">Our Best Sellers</h2>
          <Link
            to={`/shop-default`}
            className="tf-btn-icon style-white h6 fw-medium text-nowrap"
          >
            View All Product
            <i className="icon icon-caret-circle-right" />
          </Link>
        </div>
        <div className="grid-layout-product">
          <div className="item-grid-1">
            <SingleProduct />
          </div>
          <div className="item-grid-2">
            <Swiper
              dir="ltr"
              className="swiper tf-swiper wow fadeInUp"
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd21",
              }}
            >
              {miniProductsAccreeories.map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard19 product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-dot-default style-white d-xl-none tf-sw-pagination spd21" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
