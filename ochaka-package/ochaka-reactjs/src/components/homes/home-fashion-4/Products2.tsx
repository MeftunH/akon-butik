import ProductCard1 from "@/components/productCards/ProductCard1";
import { products6 } from "@/data/products";
import { useMemo, useState } from "react";
import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = ["new arrivals", "best seller", "on sale"];

export default function Products2() {
  const [activeTab, setActiveTab] = useState("new arrivals");
  const filteredProducts = useMemo(
    () =>
      products6.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );
  return (
    <div className="flat-spacing flat-animate-tab">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <p className="s-title h1 fw-medium mb-24">Trending Shop</p>
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
          <div className="tab-pane active show" id="trending2" role="tabpanel">
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
                el: ".spd75",
              }}
            >
              {filteredProducts.map((product, i) => (
                <SwiperSlide className="swiper-slide" key={i}>
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}

              <div className="sw-dot-default tf-sw-pagination spd75" />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
