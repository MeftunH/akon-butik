import ProductCard2 from "@/components/productCards/ProductCard2";
import { cosmeticProducts2 } from "@/data/categories";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LookbookProductCard from "@/components/productCards/LookbookProductCard";
import { Pagination } from "swiper/modules";

export default function Products2() {
  const [currentLookbookHover, setCurrentLookbookHover] = useState<
    null | number
  >(null);

  return (
    <section className="flat-spacing pt-0 tf-lookbook-hover">
      <div className="container">
        <div className="row align-items-center d-flex flex-wrap-reverse">
          <div className="col-lg-6">
            <div className="flat-spacing p-lg-0 pb-0">
              <div className="sect-title wow fadeInUp">
                <h1 className="s-title mb-8">Skincare Essentials</h1>
                <p className="s-subtitle h6">
                  Up to 50% off Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit
                </p>
              </div>
              <Swiper
                dir="ltr"
                className={`swiper tf-sw-lookbook tf-sw-lookbook bundle-hover-wrap  ${
                  currentLookbookHover != null ? "has-hover" : ""
                }`}
                spaceBetween={16}
                breakpoints={{
                  0: { slidesPerView: 2 },
                  575: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 48,
                  },
                }}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spd49",
                }}
              >
                {cosmeticProducts2.map((product, index) => (
                  <SwiperSlide className="swiper-slide" key={product.id}>
                    <ProductCard2
                      addedClass={` ${
                        currentLookbookHover != null &&
                        currentLookbookHover != index
                          ? "no-hover"
                          : ""
                      }`}
                      product={product}
                    />
                  </SwiperSlide>
                ))}
                <div className="sw-dot-default sw-pagination-lookbook spd49" />
              </Swiper>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-lookbook wrap-lookbook_hover">
              <img
                className="lazyload img-banner"
                src="/images/banner/banner-2.jpg"
                alt="Banners"
                width={1044}
                height={1263}
              />
              <div className="lookbook-item position7">
                <div className="dropdown dropup-center dropdown-custom dropstart">
                  <div
                    role="dialog"
                    className="tf-pin-btn bundle-pin-item swiper-button"
                    onMouseOver={() => setCurrentLookbookHover(0)}
                    onMouseOut={() => setCurrentLookbookHover(null)}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span />
                  </div>
                  <div className="dropdown-menu p-0 d-lg-none">
                    <LookbookProductCard
                      product={cosmeticProducts2[0]}
                      hasTag
                      titleClass="link"
                    />
                  </div>
                </div>
              </div>
              <div className="lookbook-item position8">
                <div className="dropdown dropup-center dropdown-custom">
                  <div
                    role="dialog"
                    className="tf-pin-btn bundle-pin-item swiper-button"
                    onMouseOver={() => setCurrentLookbookHover(1)}
                    onMouseOut={() => setCurrentLookbookHover(null)}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span />
                  </div>
                  <div className="dropdown-menu p-0 d-lg-none">
                    <LookbookProductCard
                      product={cosmeticProducts2[1]}
                      hasTag
                      titleClass="link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
