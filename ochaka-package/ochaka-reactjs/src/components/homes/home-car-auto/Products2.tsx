import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { productsStyle5 } from "@/data/products";
import ProductCard20 from "@/components/productCards/ProductCard20";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useMemo } from "react";

type Product = (typeof productsStyle5)[number];

export default function Products2() {
  const groupedProducts = useMemo<Product[][]>(() => {
    const groups: Product[][] = [];
    for (let i = 0; i < productsStyle5.length; i += 2) {
      groups.push(productsStyle5.slice(i, i + 2));
    }
    return groups;
  }, []);

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Deal of the day</h2>
          <Link
            to="/shop-default"
            className="tf-btn-icon h6 fw-medium text-nowrap"
          >
            View All Product
            <i className="icon icon-caret-circle-right" />
          </Link>
        </div>

        <div className="grid-layout-product-2">
          <div className="item-grid-1">
            <SingleProduct />
          </div>

          <div className="item-grid-2">
            <Swiper
              dir="ltr"
              className="swiper tf-swiper wow fadeInUp"
              spaceBetween={4}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd43",
              }}
            >
              {groupedProducts.map((productPair, slideIndex) => (
                <SwiperSlide className="swiper-slide" key={slideIndex}>
                  <div className="list-ver gap-4">
                    {productPair.map((product) => (
                      <ProductCard20 product={product} key={product.id} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}

              <div className="sw-dot-default d-xl-none tf-sw-pagination spd43" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
