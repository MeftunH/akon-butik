import ProductCard17 from "@/components/productCards/ProductCard17";
import { gymProducts } from "@/data/products";
import { useMemo, useState } from "react";
import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = ["TRENDING", "Best seller", "On sale"];

export default function Products1() {
  const [activeTab, setActiveTab] = useState("TRENDING");

  const filteredProducts = useMemo(
    () =>
      gymProducts.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );

  return (
    <div className="flat-spacing flat-animate-tab">
      <div className="container">
        <div className="sect-title wow fadeInUp">
          <div className="h1 title text-center mb-24">New Arrivals</div>
          <ul className="tab-product_list" role="tablist">
            {tabItems.map((tab) => (
              <li key={tab} className="nav-tab-item">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`tf-btn-line tf-btn-tab ${
                    activeTab === tab ? "active" : ""
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane active show" id="trending" role="tabpanel">
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
                el: ".spd80",
              }}
            >
              {filteredProducts.map((product) => (
                <SwiperSlide className="swiper-slide" key={product.id}>
                  <ProductCard17 product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-dot-default tf-sw-pagination spd80" />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
