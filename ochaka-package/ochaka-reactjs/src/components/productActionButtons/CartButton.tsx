import { useCart } from "@/context/Cart";
import type { ProductCardItem } from "@/types/products";
import { useCallback, useMemo } from "react";
interface Props {
  tooltipDirection?: string;
  parentClass?: string;
  product: ProductCardItem;
}
export default function CartButton({
  tooltipDirection = "left",
  product,
  parentClass = "hover-tooltip box-icon",
}: Props) {
  const { addProductToCart, isAddedToCartProducts } = useCart();

  const isInCart = useMemo(
    () => isAddedToCartProducts(product.id),
    [product.id, isAddedToCartProducts]
  );

  const handleAddToCart = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!isInCart) addProductToCart(product.id);
    },
    [addProductToCart, product.id, isInCart]
  );

  return (
    <button
      data-bs-target="#shoppingCart"
      data-bs-toggle="offcanvas"
      className={`${parentClass} tooltip-${tooltipDirection}`}
      onClick={handleAddToCart}
    >
      <span className="icon icon-shopping-cart-simple" />
      <span className="tooltip">
        {isInCart ? "Already Added" : "Add to cart"}
      </span>
    </button>
  );
}
