import { Link } from "react-router-dom";

import ProductCard13 from "@/components/productCards/ProductCard13";
import { productsListMini } from "@/data/products";

import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products3() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="title h1 mb-8">Deal Of The Day</h2>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="box-image_V01 type-2 hover-img mb-xl-0">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/banner/banner-5.jpg"
                  alt="Image"
                  className="lazyload"
                  width={672}
                  height={837}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <Link
                  to={`/shop-default`}
                  className="title h1 fw-bold text-white link primary-2"
                >
                  FRESH FRUITS
                </Link>
                <span className="sub-title h4 text-white fw-semibold">
                  100% NATURE
                </span>
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-white animate-btn animate-dark"
                >
                  Shop now
                  <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <Swiper
              dir="ltr"
              className="swiper tf-swiper grid-colum-3 wow fadeInUp"
              spaceBetween={12}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  grid: { rows: 3, fill: "row" },
                },
                575: {
                  slidesPerView: 2,
                  grid: { rows: 3, fill: "row" },
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                  grid: { rows: 3, fill: "row" },
                },
                1200: {
                  slidesPerView: 2,
                  spaceBetween: 48,
                  grid: { rows: 3, fill: "row" }, // ⬅️ switch to 3 rows at ≥1200
                },
              }}
              /* (Optional) helps when Swiper sits in a hidden tab/container */
              observer
              observeParents
              onResize={(swiper) => swiper.update()}
              modules={[Grid, Pagination]}
              pagination={{
                clickable: true,
                el: ".spd105",
              }}
            >
              {productsListMini.map((product) => (
                <SwiperSlide className="swiper-slide" key={product.id}>
                  <ProductCard13 product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-dot-default tf-sw-pagination spd105" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
