import React, { useState, useMemo, useCallback } from "react";
import { volumeDiscounts } from "@/data/products";
import { useCart } from "@/context/Cart";

// Describe the shape of each discount item
interface VolumeDiscountItem {
  id: number;
  imgSrc: string;
  save: string;
  title: string;
  oldPrice: number;
  price: number;
}

export default function VolumeDiscount() {
  const [activeId, setActiveId] = useState<number>(volumeDiscounts[0].id);
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // Get the currently active discount
  const activeItem = useMemo<VolumeDiscountItem | undefined>(
    () =>
      (volumeDiscounts as VolumeDiscountItem[]).find((v) => v.id === activeId),
    [activeId]
  );

  // With your data, only the item's own id is used for adding
  const idsToAdd = useMemo<number[]>(
    () => (activeItem ? [activeItem.id] : []),
    [activeItem]
  );

  const allAdded = useMemo(
    () =>
      idsToAdd.length > 0 && idsToAdd.every((id) => isAddedToCartProducts(id)),
    [idsToAdd, isAddedToCartProducts]
  );

  const handleChoose = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (allAdded) {
        e.preventDefault(); // don’t open cart if everything is already in it
        return;
      }
      idsToAdd.forEach((id) => {
        if (!isAddedToCartProducts(id)) addProductToCart(id);
      });
    },
    [idsToAdd, allAdded, addProductToCart, isAddedToCartProducts]
  );

  return (
    <div className="tf-product-volume-discount">
      <div className="product-badge_item flash-sale w-maxcontent heading">
        <i className="icon icon-thunder" />
        Best deal for you
      </div>

      <div className="flat-check-list list-volume-discount">
        {(volumeDiscounts as VolumeDiscountItem[]).map((item) => (
          <div
            key={item.id}
            className={`check-item volume-discount-item ${
              activeId === item.id ? "active" : ""
            }`}
            onClick={() => setActiveId(item.id)}
          >
            <div className="content">
              <div className="check">
                <span />
              </div>
              <h5 className="name fw-6">{item.title}</h5>
              <div className="tags-save h6">{item.save}</div>
            </div>
            <h5 className="fw-4 text-end">
              Total price:
              <span className="fw-7 price-total">${item.price.toFixed(2)}</span>
            </h5>
          </div>
        ))}
      </div>

      <button
        type="button"
        data-bs-target="#shoppingCart"
        data-bs-toggle={allAdded ? undefined : ("offcanvas" as const)}
        onClick={handleChoose}
        disabled={allAdded}
        aria-disabled={allAdded}
        className={`tf-btn animate-btn btn-add-to-cart ${
          allAdded ? "opacity-60 pointer-events-none" : "btn-primary primary-6"
        }`}
      >
        {allAdded ? "Already in cart" : "Choose this deal"}
      </button>
    </div>
  );
}
