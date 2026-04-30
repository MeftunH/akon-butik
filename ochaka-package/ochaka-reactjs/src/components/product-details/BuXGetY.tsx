import { useState, Fragment } from "react";
import QuantitySelect from "../common/QuantitySelect";
import { useCart } from "@/context/Cart";
import { getXproducts } from "@/data/products";

const PlusCircle = () => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <path
      d="M20 4.375C16.9097 4.375 13.8887 5.29139 11.3192 7.00829C8.7497 8.72518 6.74701 11.1655 5.56439 14.0206C4.38177 16.8757 4.07234 20.0173 4.67524 23.0483C5.27813 26.0792 6.76627 28.8633 8.95146 31.0485C11.1367 33.2337 13.9208 34.7219 16.9517 35.3248C19.9827 35.9277 23.1243 35.6182 25.9794 34.4356C28.8345 33.253 31.2748 31.2503 32.9917 28.6808C34.7086 26.1113 35.625 23.0903 35.625 20C35.6205 15.8574 33.9728 11.8858 31.0435 8.95648C28.1143 6.02721 24.1426 4.37955 20 4.375ZM20 34.375C17.1569 34.375 14.3776 33.5319 12.0137 31.9524C9.64973 30.3728 7.80725 28.1278 6.71924 25.5011C5.63123 22.8744 5.34656 19.9841 5.90122 17.1956C6.45588 14.4071 7.82497 11.8457 9.83535 9.83534C11.8457 7.82496 14.4071 6.45587 17.1956 5.90121C19.9841 5.34655 22.8744 5.63122 25.5011 6.71923C28.1278 7.80724 30.3728 9.64972 31.9524 12.0137C33.5319 14.3776 34.375 17.1569 34.375 20C34.3709 23.8112 32.855 27.4652 30.1601 30.1601C27.4652 32.855 23.8112 34.3709 20 34.375ZM26.875 20C26.875 20.1658 26.8092 20.3247 26.6919 20.4419C26.5747 20.5592 26.4158 20.625 26.25 20.625H20.625V26.25C20.625 26.4158 20.5592 26.5747 20.4419 26.6919C20.3247 26.8092 20.1658 26.875 20 26.875C19.8342 26.875 19.6753 26.8092 19.5581 26.6919C19.4409 26.5747 19.375 26.4158 19.375 26.25V20.625H13.75C13.5842 20.625 13.4253 20.5592 13.3081 20.4419C13.1909 20.3247 13.125 20.1658 13.125 20C13.125 19.8342 13.1909 19.6753 13.3081 19.5581C13.4253 19.4408 13.5842 19.375 13.75 19.375H19.375V13.75C19.375 13.5842 19.4409 13.4253 19.5581 13.3081C19.6753 13.1908 19.8342 13.125 20 13.125C20.1658 13.125 20.3247 13.1908 20.4419 13.3081C20.5592 13.4253 20.625 13.5842 20.625 13.75V19.375H26.25C26.4158 19.375 26.5747 19.4408 26.6919 19.5581C26.8092 19.6753 26.875 19.8342 26.875 20Z"
      fill="#C8102E"
    />
  </svg>
);

export default function BuXGetY() {
  const { addProductToCart } = useCart();

  const [quantities, setQuantities] = useState(getXproducts.map(() => 1));
  const setQtyByIndex = (idx: number, next: number) =>
    setQuantities((prev) => prev.map((q, i) => (i === idx ? next : q)));

  const handleAddAllToCart = () => {
    getXproducts.forEach((item, idx) => {
      const qty = quantities[idx] ?? 1;
      if (qty <= 0) return;

      addProductToCart(item.id, qty);
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form-buyX-getY">
      <div className="buyX-getY-wrap">
        {getXproducts.map((item, idx) => (
          <Fragment key={item.id}>
            <div className="volume-discount-thumbnail-item p-0 border-0">
              <div className="image-box type-1">
                <img
                  className="ls-is-cached lazyloaded"
                  data-src={item.imgSrc}
                  alt={item.title}
                  src={item.imgSrc}
                  width={1044}
                  height={1392}
                />
                <div className="tags-save h6">{item.tag}</div>
              </div>

              <div className="content-discount text-start">
                <h5 className="name fw-4">{item.title}</h5>

                <div className="size">
                  <div className="text-small text-main-2 sub">
                    Size: {item.size}
                  </div>
                  <div className="text-small text-main-2 sub">Color:</div>
                  <div className={`dot-color ${item.colorClass}`} />
                </div>

                <div className="mt-2 d-flex align-items-center gap-3">
                  <span className="h6 mb-0">${item.price.toFixed(2)}</span>
                  <QuantitySelect
                    quantity={quantities[idx]}
                    setQuantity={(n) => setQtyByIndex(idx, n)}
                  />
                </div>
              </div>
            </div>

            {idx < getXproducts.length - 1 && <PlusCircle />}
          </Fragment>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddAllToCart}
        data-bs-target="#shoppingCart"
        data-bs-toggle="offcanvas"
        className="tf-btn bg-green w-100 animate-btn btn-add-to-cart effect-flash"
      >
        Choose this deal (Add all to cart)
      </button>
    </form>
  );
}
