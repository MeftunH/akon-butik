import { useCart } from "@/context/Cart";
import type { ProductCardItem } from "@/types/products";
import { useCallback, useMemo } from "react";
interface Props {
  parentClass?: string;
  product: ProductCardItem;
}
export default function CartButton2({
  parentClass = "tf-btn animate-btn",
  product,
}: Props) {
  const { addProductToCart, isAddedToCartProducts } = useCart();

  const isInCart = useMemo(
    () => isAddedToCartProducts(product.id),
    [isAddedToCartProducts, product.id]
  );

  const handleClick = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!isInCart) addProductToCart(product.id);
    },
    [addProductToCart, product.id, isInCart]
  );

  return (
    <button
      data-bs-target="#shoppingCart"
      onClick={handleClick}
      data-bs-toggle="offcanvas"
      className={parentClass}
    >
      {isInCart ? "Already Added" : "Add to cart"}
      <i className="icon icon-arrow-right" />
    </button>
  );
}
