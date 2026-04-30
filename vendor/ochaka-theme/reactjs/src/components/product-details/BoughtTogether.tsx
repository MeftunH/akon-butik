import { Link } from "react-router-dom";

import { boughtTogetherProducts } from "@/data/products";
import { useCart } from "@/context/Cart";

export default function BoughtTogether() {
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // 💰 Calculate total with reducer
  const totalPrice = boughtTogetherProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const allAdded = boughtTogetherProducts.every((p) =>
    isAddedToCartProducts(p.id)
  );
  const addAll = () => {
    boughtTogetherProducts.forEach((p) => addProductToCart(p.id));
  };
  return (
    <div className="tf-product-fbt">
      <h4 className="title text-xl fw-medium">Frequently Bought Together</h4>

      <form
        className="tf-product-form-bundle"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="tf-bundle-products">
          {boughtTogetherProducts.map((product) => (
            <div key={product.id} className="tf-bundle-product-item">
              <Link
                to={`/product-detail/${product.id}`}
                className="bundle-image"
              >
                <img
                  className="lazyloaded"
                  src={product.imgSrc}
                  alt={product.title}
                  width={1044}
                  height={1392}
                />
              </Link>

              <div className="bundle-info">
                <div className="text-small">{product.category}</div>
                <h6 className="text-black text-line-clamp-1">
                  {product.title}
                </h6>
                <div className="price-wrap">
                  <span className="price-old h6 fw-normal">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="price-new h6">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bundle-check">
                <input type="checkbox" className="tf-check" />
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bundle-total-submit">
            <div className="text">Total price:</div>
            <span className="total-price fw-7 text-black">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#shoppingCart"
            onClick={addAll}
            className="btn-submit-total tf-btn btn-primary w-100"
          >
            {allAdded ? "selected already added" : "Add selected to cart"}

            <i className="icon icon-shopping-cart-simple" />
          </button>
        </div>
      </form>
    </div>
  );
}
