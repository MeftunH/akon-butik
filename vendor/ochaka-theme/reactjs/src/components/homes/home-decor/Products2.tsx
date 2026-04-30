import ProductCard2 from "@/components/productCards/ProductCard2";
import { moreDecorProducts } from "@/data/products";
import { useMemo, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = ["NEW ARRIVALS", "Best seller", "On sale"];

export default function Products2() {
  const [activeTab, setActiveTab] = useState("NEW ARRIVALS");
  const filteredProducts = useMemo(
    () =>
      moreDecorProducts.filter((product) =>
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
                  className={`tf-btn-line tf-btn-tab  fw-normal ${
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
            <div className="tf-pag-swiper tf-btn-swiper-main pst-3">
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
                modules={[Navigation, Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spd57",
                }}
                navigation={{
                  prevEl: ".snbp57",
                  nextEl: ".snbn57",
                }}
              >
                {filteredProducts.map((product, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <ProductCard2 product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="tf-sw-nav style-2 nav-prev-swiper d-xl-flex snbp57">
                <i className="icon icon-caret-left" />
              </div>
              <div className="tf-sw-nav style-2 nav-next-swiper d-xl-flex snbn57">
                <i className="icon icon-caret-right" />
              </div>
              <div className="sw-dot-default tf-sw-pagination d-xl-none spd57" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
