import ProductCard17 from "@/components/productCards/ProductCard17";
import { travelProducts2 } from "@/data/products";
import { useMemo, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = ["TRENDING", "Best seller", "On sale"];

export default function Products2() {
  const [activeTab, setActiveTab] = useState("TRENDING");

  const filteredProducts = useMemo(
    () =>
      travelProducts2.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );

  return (
    <div className="flat-spacing flat-animate-tab pt-0">
      <div className="container">
        <div className="sect-title wow fadeInUp">
          <div className="h1 title text-center mb-24">Popular Product</div>
          <ul className="tab-product_list" role="tablist">
            {tabItems.map((tab) => (
              <li key={tab} className="nav-tab-item">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`tf-btn-line tf-btn-tab style-gray ${
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
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd130",
              }}
            >
              {filteredProducts.map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard17 product={product} />
                </SwiperSlide>
              ))}

              <div className="sw-dot-default tf-sw-pagination spd130" />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
