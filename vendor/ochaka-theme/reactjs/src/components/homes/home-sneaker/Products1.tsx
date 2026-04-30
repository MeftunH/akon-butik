import ProductCard1 from "@/components/productCards/ProductCard1";
import { productsSneakers } from "@/data/products";
import { useMemo, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = ["new arrivals", "best seller", "on sale"];

export default function Products1() {
  const [activeTab, setActiveTab] = useState("new arrivals");
  const filteredProducts = useMemo(
    () =>
      productsSneakers.filter((product) =>
        product.tabFilterOptions?.includes(activeTab)
      ),
    [activeTab]
  );
  return (
    <section className="flat-spacing flat-animate-tab">
      <div className="container">
        <div className="sect-title wow fadeInUp">
          <h1 className="title text-center mb-24">Trending Shop</h1>
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
                el: ".spd122",
              }}
            >
              {filteredProducts.map((product, i) => (
                <SwiperSlide key={i}>
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}

              <div className="sw-dot-default tf-sw-pagination spd122" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
