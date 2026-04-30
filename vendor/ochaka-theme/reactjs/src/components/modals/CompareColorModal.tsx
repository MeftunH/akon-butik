import { useCart } from "@/context/Cart";
import { useCompare } from "@/context/Compare";

export default function CompareColorModal() {
  const { addProductToCart, isAddedToCartProducts } = useCart();

  const { compareItem, removeFromCompareItem } = useCompare();
  return (
    <div
      className="modal modalCentered fade modal-compare_color"
      id="compareColor"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="fw-normal">Compare color</h2>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="compare-color_list list-empty tf-grid-layout tf-col-4 gap-0">
            {compareItem.length ? (
              <>
                {compareItem.map((product, i) => (
                  <div key={i} className="compare-color_item file-delete">
                    <div className="compare_image">
                      <img
                        className="lazyload"
                        src={product.imgSrc}
                        alt="Image"
                        width={1044}
                        height={1392}
                      />
                      <span
                        className="remove"
                        onClick={() => removeFromCompareItem(product)}
                      >
                        <i className="icon icon-trash" />
                      </span>
                    </div>
                    <div className="compare_colour">
                      <span className="color bg-teal-blue" />
                      <span className="fw-medium text-black">Teal Blue</span>
                    </div>
                    <div className="compare_bot">
                      <div className="tf-select style-border">
                        <select className="h6">
                          <option>XS - $49,99</option>
                          <option>S - $69,99</option>
                          <option>M - $79,99</option>
                          <option>XL - $89,99</option>
                        </select>
                      </div>
                      <a
                        href="#shoppingCart"
                        className="tf-btn style-transparent w-100 rounded-0"
                        data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product.id)}
                      >
                        {isAddedToCartProducts(product.id)
                          ? "ALREADY ADDED"
                          : "ADD TO CART"}
                        <i className="icon icon-shopping-cart-simple" />
                      </a>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="box-text_empty h6 text-main">
                Your compare is curently empty
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
