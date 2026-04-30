import { Link } from "react-router-dom";

import { useState } from "react";
import { singleStyleProducts } from "@/data/products";
import Slider from "./Slider";
import { useCart } from "@/context/Cart";
import QuantitySelect from "@/components/common/QuantitySelect";
import WishlistButton from "@/components/productActionButtons/WishlistButton";
import CompareButton from "@/components/productActionButtons/CompareButton";
const colorOptions = [
  { label: "Gold", value: "gold", img: "/images/products/jewelry/gold.jpg" },
  {
    label: "Titanium",
    value: "titanium",
    img: "/images/products/jewelry/titanium.jpg",
  },
  { label: "Rose", value: "rose", img: "/images/products/jewelry/rose.jpg" },
];

export default function SingleProduct() {
  const product = singleStyleProducts[3];
  const [activeColor, setActiveColor] = useState("rose"); // Default active color
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, isAddedToCartProducts } = useCart();
  return (
    <section className="flat-spacing bg-rose-white s-banner-shop">
      <div className="container">
        <div className="row section-image-zoom">
          <div className="col-lg-6">
            <div className="tf-product-media-wrap sticky-top">
              <div className="product-thumbs-slider thumbs-abs">
                <Slider
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <div className="tf-product-info-wrap position-relative mt-lg-0">
              <div className="tf-zoom-main sticky-top" />
              <div className="tf-product-info-list other-image-zoom">
                <h1 className="product-info-name fw-medium">
                  <Link to={`/product-detail/${product.id}`} className="link">
                    {product.title}
                  </Link>
                </h1>
                <div className="product-info-meta">
                  <div className="rating">
                    <div className="rate_wrap">
                      <i className="icon-star text-star" />
                      <i className="icon-star text-star" />
                      <i className="icon-star text-star" />
                      <i className="icon-star text-star" />
                      <i className="icon-star text-star" />
                    </div>
                    <div className="reviews text-main">(3.671 review)</div>
                  </div>
                </div>
                <div className="tf-product-heading p-0 border-0">
                  <div className="product-info-price price-wrap">
                    <span className="price-new price-on-sale h2 fw-4">
                      $ {product.price.toFixed(2)}
                    </span>
                    {product.oldPrice ? (
                      <span className="price-old compare-at-price h6">
                        $ {product.oldPrice.toFixed(2)}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="tf-prduct-desc">
                  <p className="h6">
                    Product weights and dimensions are approximate. Our total
                    diamond weight may have a +/-5% tolerance. All prices on
                    this website are subject to change without notice
                  </p>
                </div>
                <div className="tf-product-variant">
                  <div className="variant-picker-item variant-color">
                    <div className="variant-picker-label mb-24">
                      <div className="h6">
                        Metal Type:{" "}
                        <span className="variant-picker-label-value value-currentColor d-inline-flex text-capitalize">
                          {activeColor}
                        </span>
                      </div>
                    </div>
                    <div className="variant-picker-values">
                      {colorOptions.map((color) => (
                        <div
                          key={color.value}
                          className={`hover-tooltip tooltip-bot color-btn style-image style-small ${
                            activeColor === color.value ? "active" : ""
                          }`}
                          data-color={color.value}
                          onClick={() => setActiveColor(color.value)}
                        >
                          <div className="img">
                            <img
                              className="lazyloaded"
                              src={color.img}
                              alt={color.label}
                              width={100}
                              height={100}
                            />
                          </div>
                          <span className="tooltip">{color.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tf-product-total-quantity mb-0">
                  <div className="group-btn">
                    <QuantitySelect
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                    <p className="h6">15 products available</p>
                  </div>
                  <div className="group-btn flex-sm-nowrap">
                    <a
                      href="#shoppingCart"
                      onClick={() => addProductToCart(product.id, quantity)}
                      data-bs-toggle="offcanvas"
                      className="tf-btn animate-btn btn-add-to-cart"
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already added"
                        : "Add to cart"}
                      <i className="icon icon-shopping-cart-simple" />
                    </a>

                    <WishlistButton
                      tooltipDirection="top"
                      parentClass="hover-tooltip box-icon btn-add-wishlist flex-sm-shrink-0"
                      product={product}
                    />
                    <CompareButton
                      parentClass="hover-tooltip tooltip-top box-icon flex-sm-shrink-0"
                      tooltipDirection="top"
                      product={product}
                    />
                  </div>
                  <Link
                    to={`/checkout`}
                    className="tf-btn btn-primary w-100 border-0"
                  >
                    BUY IT NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
