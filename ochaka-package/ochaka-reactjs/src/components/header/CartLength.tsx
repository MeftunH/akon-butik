import { useCart } from "@/context/Cart";

export default function CartLength() {
  const { cartProducts } = useCart();
  return <>{cartProducts.length}</>;
}
