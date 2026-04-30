import ProductCard11 from "@/components/productCards/ProductCard11";
import { organicProducts } from "@/data/products";
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
      organicProducts.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );
  return (
    <section className="flat-animate-tab flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="title h1 mb-8">Our Best Sellers</h2>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <ul className="tab-product_list-2 style-2 wow fadeInUp" role="tablist">
          {tabItems.map((tab) => (
            <li key={tab} className="nav-tab-item">
              <a
                onClick={() => setActiveTab(tab)}
                className={`tf-btn-tab-2 style-primary primary-2 h6 ${
                  activeTab === tab ? "active" : ""
                }`}
              >
                {tab}
              </a>
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
                el: ".spd103",
              }}
            >
              {filteredProducts.map((product) => (
                <SwiperSlide className="swiper-slide" key={product.id}>
                  <ProductCard11 product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-dot-default tf-sw-pagination d-xl-none spd103" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
