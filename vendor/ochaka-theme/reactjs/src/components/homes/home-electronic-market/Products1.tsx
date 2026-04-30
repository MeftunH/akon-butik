import { Link } from "react-router-dom";

import ProductCard3 from "@/components/productCards/ProductCard3";
import { products7 } from "@/data/products";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
const tabItems = ["All Product", "Headphone", "Laptop", "Loudspeaker"];

export default function Products1() {
  const [activeTab, setActiveTab] = useState("All Product");

  const filteredProducts = useMemo(
    () =>
      products7.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );
  return (
    <section className="flat-spacing flat-animate-tab">
      <div className="container">
        <div className="sect-title type-3 type-2 flex-wrap wow fadeInUp">
          <h2 className="s-title text-nowrap">Deal of the day</h2>
          <ul className="tab-product_list-2" role="tablist">
            {tabItems.map((tab) => (
              <li key={tab} className="nav-tab-item">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`tf-btn-tab-2 h6 ${
                    activeTab === tab ? "active" : ""
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          <Link
            to={`/shop-default`}
            className="tf-btn-icon h6 fw-medium text-nowrap"
          >
            View All Product
            <i className="icon icon-caret-circle-right" />
          </Link>
        </div>
        <div className="tab-content">
          <div
            className="tab-pane active show"
            id="all-product"
            role="tabpanel"
          >
            <Swiper
              dir="ltr"
              className="swiper tf-swiper wow fadeInUp"
              spaceBetween={12}
              breakpoints={{
                0: { slidesPerView: 2 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 48,
                },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd55",
              }}
            >
              {filteredProducts.map((product, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <ProductCard3 product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-dot-default tf-sw-pagination d-xl-none spd55" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
