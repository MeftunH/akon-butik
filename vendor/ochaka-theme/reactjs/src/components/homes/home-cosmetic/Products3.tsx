import ProductCard2 from "@/components/productCards/ProductCard2";
import { products7 } from "@/data/categories";
import { useMemo, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = ["NEW ARRIVALS", "Best seller", "On sale"];

export default function Products3() {
  const [activeTab, setActiveTab] = useState("NEW ARRIVALS");
  const filteredProducts = useMemo(
    () =>
      products7.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );

  return (
    <section className="flat-spacing flat-animate-tab pt-0">
      <div className="container">
        <div className="sect-title wow fadeInUp">
          <h1 className="title text-center mb-24">Shop By Departments</h1>
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
          <div className="tab-pane active show" id="new-arr" role="tabpanel">
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
                el: ".spd50",
              }}
            >
              {filteredProducts.map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard2 product={product} key={i} />
                </SwiperSlide>
              ))}

              <div className="sw-dot-default tf-sw-pagination spd50" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
