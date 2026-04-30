import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { useCart } from "@/context/Cart";
import QuantitySelect from "../common/QuantitySelect";
import CompareButton from "../productActionButtons/CompareButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import { useQuickView } from "@/context/QuickView";

type Size = "XS" | "S" | "M" | "L";
type Color = "beige" | "pink" | "green" | "blue" | "black";

interface SlideItem {
  id: number;
  size: Size;
  color: Color;
  src: string;
}

export default function QuickViewModal() {
  const { addProductToCart, isAddedToCartProducts } = useCart();
  const { quickViewItem } = useQuickView();
  const slides: SlideItem[] = [
    {
      id: 1,
      size: "XS",
      color: "beige",
      src: quickViewItem?.imgSrc ?? "/images/products/product-9.jpg",
    },
    { id: 2, size: "L", color: "pink", src: "/images/products/product-39.jpg" },
    { id: 3, size: "M", color: "green", src: "/images/products/product-1.jpg" },
    { id: 4, size: "S", color: "blue", src: "/images/products/product-4.jpg" },
    {
      id: 5,
      size: "L",
      color: "black",
      src: "/images/products/product-47.jpg",
    },
  ];

  const sizes: Size[] = ["XS", "S", "M", "L"];

  const colors: Array<{ value: Color; label: string; bgClass: string }> = [
    { value: "beige", label: "Beige", bgClass: "bg-light-beige" },
    { value: "pink", label: "Pink", bgClass: "bg-hot-pink" },
    { value: "green", label: "Green", bgClass: "bg-sage-green" },
    { value: "blue", label: "Blue", bgClass: "bg-baby-blue" },
    { value: "black", label: "Dark", bgClass: "bg-dark-charcoal" },
  ];

  const [activeSize, setActiveSize] = useState<Size>("XS");
  const [activeColor, setActiveColor] = useState<Color>("beige");
  const [quantity, setQuantity] = useState<number>(1);

  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    const target = slides.find((elm) => elm.color === activeColor);
    if (target && swiperRef.current) {
      swiperRef.current.slideTo((target.id ?? 1) - 1);
    }
  }, [activeColor, slides]);

  return (
    <div className="modal modalCentered fade modal-quick-view" id="quickView">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <i
            className="icon icon-close icon-close-popup"
            data-bs-dismiss="modal"
          />
          <div className="tf-product-media-wrap tf-btn-swiper-item">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              dir="ltr"
              className="swiper tf-single-slide"
              onSlideChange={(swiper) => {
                const current = slides[swiper.activeIndex];
                if (current) setActiveColor(current.color);
              }}
            >
              {slides.map((product, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper-slide"
                  data-size={product.size}
                  data-color={product.color}
                >
                  <div className="item">
                    <img
                      className="lazyload"
                      data-src={product.src}
                      alt=""
                      src={product.src}
                      width={1044}
                      height={1392}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="tf-product-info-wrap">
            <div className="tf-product-info-inner tf-product-info-list">
              <div className="tf-product-info-heading">
                <Link
                  to={`/product-detail/${quickViewItem?.id}`}
                  className="link product-info-name fw-medium h1"
                >
                  {quickViewItem?.title ?? "Casual Round Neck T-Shirt"}
                </Link>

                <div className="product-info-meta">
                  <div className="rating">
                    <div className="d-flex gap-4">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg
                          key={i}
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 5.4091L8.913 5.07466L6.99721 0.261719L5.08143 5.07466L0 5.4091L3.89741 8.7184L2.61849 13.7384L6.99721 10.9707L11.376 13.7384L10.097 8.7184L14 5.4091Z"
                            fill="#EF9122"
                          />
                        </svg>
                      ))}
                    </div>
                    <div className="reviews text-main">(3.671 review)</div>
                  </div>

                  <div className="people-add text-primary">
                    <i className="icon icon-shopping-cart-simple" />
                    <span className="h6">
                      9 people just added this product to their cart
                    </span>
                  </div>
                </div>

                <div className="product-info-price">
                  <div className="price-wrap">
                    <span className="price-new price-on-sale h2">
                      ${" "}
                      {typeof quickViewItem?.price === "number"
                        ? quickViewItem.price.toFixed(2)
                        : "0.00"}
                    </span>

                    <p className="badges-on-sale h6 fw-semibold">
                      <span className="number-sale" data-person-sale={29}>
                        -29 %
                      </span>
                    </p>
                  </div>
                </div>

                <p className="product-infor-sub text-main h6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse justo dolor, consectetur vel metus vitae,
                  tincidunt finibus dui fusce tellus enim.
                </p>
              </div>

              <div className="tf-product-variant w-100">
                <div className="variant-picker-item variant-size">
                  <div className="variant-picker-label">
                    <div className="h4 fw-semibold">
                      Size{" "}
                      <span className="variant-picker-label-value value-currentSize">
                        {activeSize}
                      </span>
                    </div>
                    <a
                      href="#size-guide"
                      data-bs-toggle="modal"
                      className="size-guide link h6 fw-medium"
                    >
                      <i className="icon icon-ruler" />
                      Size Guide
                    </a>
                  </div>

                  <div className="variant-picker-values">
                    {sizes.map((size) => (
                      <span
                        key={size}
                        className={`size-btn ${
                          activeSize === size ? "active" : ""
                        }`}
                        onClick={() => setActiveSize(size)}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="variant-picker-item variant-color">
                  <div className="variant-picker-label">
                    <div className="h4 fw-semibold">
                      Colors{" "}
                      <span className="variant-picker-label-value value-currentColor">
                        {activeColor}
                      </span>
                    </div>
                  </div>

                  <div className="variant-picker-values">
                    {colors.map(({ value, label, bgClass }) => (
                      <div
                        key={value}
                        className={`hover-tooltip tooltip-bot color-btn ${
                          activeColor === value ? "active" : ""
                        }`}
                        data-color={value}
                        onClick={() => setActiveColor(value)}
                      >
                        <span className={`check-color ${bgClass}`} />
                        <span className="tooltip">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {quickViewItem ? (
                <div className="tf-product-total-quantity w-100">
                  <div className="group-btn">
                    <QuantitySelect
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                    <p className="h6 d-none d-sm-block">
                      15 products available
                    </p>

                    <WishlistButton
                      tooltipDirection="top"
                      parentClass="d-sm-none hover-tooltip box-icon btn-add-wishlist flex-sm-shrink-0"
                      product={quickViewItem}
                    />
                    <CompareButton
                      parentClass="d-sm-none hover-tooltip tooltip-top box-icon flex-sm-shrink-0"
                      tooltipDirection="top"
                      product={quickViewItem}
                    />
                  </div>

                  <div className="group-btn flex-sm-nowrap">
                    <a
                      href="#shoppingCart"
                      onClick={(e) => {
                        e.preventDefault();
                        addProductToCart(quickViewItem.id as any, quantity);
                      }}
                      data-bs-toggle="offcanvas"
                      className="tf-btn animate-btn btn-add-to-cart"
                    >
                      {isAddedToCartProducts(quickViewItem.id as any)
                        ? "ALREADY ADDED"
                        : "ADD TO CART"}
                      <i className="icon icon-shopping-cart-simple" />
                    </a>

                    <WishlistButton
                      tooltipDirection="top"
                      parentClass="d-none d-sm-flex hover-tooltip box-icon btn-add-wishlist flex-sm-shrink-0"
                      product={quickViewItem}
                    />
                    <CompareButton
                      parentClass="d-none d-sm-flex hover-tooltip tooltip-top box-icon flex-sm-shrink-0"
                      tooltipDirection="top"
                      product={quickViewItem}
                    />
                  </div>

                  <div className="group-btn">
                    <Link
                      to="/checkout"
                      className="tf-btn btn-yellow w-100 animate-btn animate-dark"
                    >
                      Pay with
                      <span className="icon">
                        {/* (SVG left as-is) */}
                        <svg
                          width={68}
                          height={18}
                          viewBox="0 0 68 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* …paths… */}
                          <path
                            d="M45.7745 0H40.609C40.3052 0 40.0013 0.30254 39.8494 0.605081L37.7224 13.9169C37.7224 14.2194 37.8743 14.3707 38.1782 14.3707H40.9129C41.2167 14.3707 41.3687 14.2194 41.3687 13.9169L41.9764 10.1351C41.9764 9.83258 42.2802 9.53004 42.736 9.53004H44.4072C47.9015 9.53004 49.8766 7.86606 50.3323 4.53811C50.6362 3.17668 50.3323 1.96652 49.7246 1.21017C48.8131 0.453813 47.4457 0 45.7745 0Z"
                            fill="#139AD6"
                          />
                          {/* …rest of SVG omitted for brevity… */}
                        </svg>
                      </span>
                    </Link>
                  </div>
                  <div className="group-btn justify-content-center">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="tf-btn-line text-normal letter-space-0 fw-normal"
                    >
                      More payment options
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}

              <Link
                to={`/product-detail/${quickViewItem?.id}`}
                className="tf-btn-line text-normal letter-space-0 fw-normal"
              >
                <span className="h5">View full details</span>
                <i className="icon icon-arrow-top-right fs-24" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
