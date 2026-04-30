import React, { useState, useMemo, useCallback } from "react";
import { volumeDiscounts } from "@/data/products";
import { useCart } from "@/context/Cart";

interface VolumeDiscount {
  id: number;
  imgSrc: string;
  save: string;
  title: string;
  oldPrice: number;
  price: number;
}

export default function VolumeThumbnail() {
  const [activeId, setActiveId] = useState<number>(volumeDiscounts[0].id);
  const { addProductToCart, isAddedToCartProducts } = useCart();

  const activeItem = useMemo<VolumeDiscount | undefined>(
    () => (volumeDiscounts as VolumeDiscount[]).find((v) => v.id === activeId),
    [activeId]
  );

  // With your current data, the only ID to add is the item's `id`
  const idsToAdd = useMemo<number[]>(
    () => (activeItem ? [activeItem.id] : []),
    [activeItem]
  );

  const allAdded = useMemo(
    () =>
      idsToAdd.length > 0 && idsToAdd.every((id) => isAddedToCartProducts(id)),
    [idsToAdd, isAddedToCartProducts]
  );

  const notAddedCount = useMemo(
    () => idsToAdd.filter((id) => !isAddedToCartProducts(id)).length,
    [idsToAdd, isAddedToCartProducts]
  );

  const handleChoose = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (allAdded) {
        e.preventDefault();
        return;
      }
      idsToAdd.forEach((id) => {
        if (!isAddedToCartProducts(id)) addProductToCart(id);
      });
    },
    [idsToAdd, allAdded, addProductToCart, isAddedToCartProducts]
  );

  return (
    <div className="tf-product-volume-discount overflow-x-auto">
      <div className="product-badge_item flash-sale w-maxcontent heading">
        <i className="icon icon-thunder" />
        Best deal for you
      </div>

      <div className="list-volume-discount-thumbnail flat-check-list">
        {(volumeDiscounts as VolumeDiscount[]).map((item) => (
          <div
            key={item.id}
            className={`check-item volume-discount-thumbnail-item ${
              activeId === item.id ? "active" : ""
            }`}
            onClick={() => setActiveId(item.id)}
          >
            <div className="image-box">
              <img
                className="lazyloaded"
                src={item.imgSrc}
                alt={item.title}
                width={1044}
                height={1392}
              />
              <div className="tags-save h6">{item.save}</div>
            </div>

            <div className="content-discount">
              <h5 className="count fw-6">{item.title}</h5>
              <div className="price-wrap">
                <span className="price-old h6 fw-normal">
                  ${item.oldPrice.toFixed(2)}
                </span>
                <span className="price-new h6 fw-5 text-primary">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        data-bs-target="#shoppingCart"
        data-bs-toggle={allAdded ? undefined : ("offcanvas" as const)}
        onClick={handleChoose}
        disabled={allAdded}
        className={`tf-btn bg-green w-100 animate-btn btn-add-to-cart effect-flash ${
          allAdded ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {allAdded
          ? "Already in cart"
          : `Choose this deal${
              notAddedCount > 1 ? ` (+${notAddedCount})` : ""
            }`}
      </button>
    </div>
  );
}
