import { Link } from "react-router-dom";

import { decorBundleProducts } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import CartButton from "@/components/productActionButtons/CartButton";
import WishlistButton from "@/components/productActionButtons/WishlistButton";
import CompareButton from "@/components/productActionButtons/CompareButton";
import QuickViewButton from "@/components/productActionButtons/QuickViewButton";
import LookbookProductCard from "@/components/productCards/LookbookProductCard";
import { useState } from "react";
import { Pagination } from "swiper/modules";

export default function Products3() {
  const [currentLookbookHover, setCurrentLookbookHover] = useState<
    null | number
  >(null);
  return (
    <section className="flat-spacing pt-0 tf-lookbook-hover">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-6">
            <div className="banner-lookbook wrap-lookbook_hover">
              <img
                className="lazyload img-banner"
                src="/images/banner/banner-lookbook-2.jpg"
                alt="Banners"
                width={1044}
                height={1263}
              />
              <div className="lookbook-item position3">
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
                      product={decorBundleProducts[0]}
                      hasTag
                      titleClass="link"
                    />
                  </div>
                </div>
              </div>
              <div className="lookbook-item position4">
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
                      product={decorBundleProducts[0]}
                      hasTag
                      titleClass="link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-lg-0 pt-30">
              <div className="sect-title wow fadeInUp">
                <h1 className="s-title mb-8">Shop This Look</h1>
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
                  el: ".spd48",
                }}
              >
                {decorBundleProducts.map((product, index) => (
                  <SwiperSlide className="swiper-slide" key={product.id}>
                    <div className="wow fadeInUp">
                      <div
                        className={`card-product bundle-hover-item  ${
                          currentLookbookHover != null &&
                          currentLookbookHover != index
                            ? "no-hover"
                            : ""
                        } ${product.pinClass}`}
                      >
                        <div className="card-product_wrapper d-flex">
                          <Link
                            to={`/product-detail/${product.id}`}
                            className="product-img"
                          >
                            <img
                              className="lazyload img-product"
                              src={product.imgSrc}
                              alt="Product"
                              width={product.width}
                              height={product.height}
                            />
                            <img
                              className="lazyload img-hover"
                              src={product.imgHoverSrc}
                              alt="Product"
                              width={product.width}
                              height={product.height}
                            />
                          </Link>
                          <ul className="product-action_list">
                            <li>
                              <CartButton product={product} />
                            </li>
                            <li className="wishlist">
                              <WishlistButton product={product} />
                            </li>
                            <li className="compare">
                              <CompareButton product={product} />
                            </li>
                            <li>
                              <QuickViewButton product={product} />
                            </li>
                          </ul>
                        </div>
                        <div className="card-product_info d-flex flex-column">
                          <Link
                            to={`/product-detail/${product.id}`}
                            className="name-product h4 link"
                          >
                            {product.title}
                          </Link>
                          <div className="price-wrap mb-0">
                            <span className="price-old h6 fw-normal">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                            <span className="price-new h6">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="sw-dot-default sw-pagination-lookbook spd48" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
