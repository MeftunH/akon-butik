import ProductCard1 from "@/components/productCards/ProductCard1";
import { products } from "@/data/products";
import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section>
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Best Seller</h1>
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
          modules={[Grid, Pagination]}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
            el: ".spd64",
          }}
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd64" />
        </Swiper>
      </div>
    </section>
  );
}
