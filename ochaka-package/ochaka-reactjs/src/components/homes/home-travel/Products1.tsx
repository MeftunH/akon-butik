import ProductCard17 from "@/components/productCards/ProductCard17";
import { travelProducts } from "@/data/products";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="s-title h1 fw-medium mb-8">Our Best Sellers</h2>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd129",
          }}
        >
          {travelProducts.map((product, i) => (
            <SwiperSlide className="swiper-slide" key={i}>
              <ProductCard17 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd129" />
        </Swiper>
      </div>
    </section>
  );
}
