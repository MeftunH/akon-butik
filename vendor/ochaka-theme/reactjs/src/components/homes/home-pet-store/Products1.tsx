import ProductCard7 from "@/components/productCards/ProductCard7";
import { petProducts } from "@/data/products";
import { useMemo, useState } from "react";
import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = [
  "All Product",
  "New Available",
  "Supplemental Food",
  "Organic Food",
];

export default function Products1() {
  const [activeTab, setActiveTab] = useState("All Product");

  const filteredProducts = useMemo(
    () =>
      petProducts.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );
  return (
    <section className="flat-animate-tab flat-spacing pt-0">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Best Selling Products Of The Week</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <ul className="tab-product_list-2 style-2 wow fadeInUp" role="tablist">
          {tabItems.map((tab) => (
            <li key={tab} className="nav-tab-item">
              <button
                onClick={() => setActiveTab(tab)}
                className={`tf-btn-tab-2 style-2 h6  ${
                  activeTab === tab ? "active" : ""
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
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
              modules={[Grid, Pagination]}
              grid={{
                rows: 2,
                fill: "row",
              }}
              pagination={{
                clickable: true,
                el: ".spd109",
              }}
            >
              {filteredProducts.map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard7 product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-dot-default tf-sw-pagination d-xl-none spd109" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
