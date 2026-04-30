import { useWishlist } from "@/context/Wishlist";
import type { ProductCardItem } from "@/types/products";
import { useCallback, useMemo } from "react";
interface Props {
  tooltipDirection?: string;
  parentClass?: string;
  product: ProductCardItem;
}
export default function WishlistButton({
  tooltipDirection = "left",
  product,
  parentClass = "hover-tooltip box-icon",
}: Props) {
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
      type="button"
      onClick={handleClick}
      className={`${parentClass} tooltip-${tooltipDirection}`}
    >
      {isWishlisted ? (
        <i className={`icon icon-trash`} />
      ) : (
        <span className={`icon icon-heart`} />
      )}
      <span className="tooltip">
        {isWishlisted ? "Remome Wishlist" : "Add to Wishlist"}
      </span>
    </button>
  );
}
