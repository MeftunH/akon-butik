import { useWishlist } from "@/context/Wishlist";
import type { ProductCardItem } from "@/types/products";
import { useCallback, useMemo } from "react";
interface Props {
  product: ProductCardItem;
}
export default function WishlistButton2({ product }: Props) {
  const { addToWishlist, isAddedtoWishlist } = useWishlist();

  const isWishlisted = useMemo(
    () => isAddedtoWishlist(product),
    [isAddedtoWishlist, product]
  );

  const handleClick = useCallback(() => {
    addToWishlist(product);
  }, [addToWishlist, product]);

  return (
    <button
      onClick={handleClick}
      className="tf-btn style-line btn-add-wishlist2"
    >
      <span className="text">
        {" "}
        {isWishlisted ? "Remome list" : "Add to list"}
      </span>
      {isWishlisted ? (
        <i className={`icon icon-trash`} />
      ) : (
        <span className={`icon icon-heart`} />
      )}
    </button>
  );
}
