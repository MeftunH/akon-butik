import { useCart } from "@/context/Cart";

export default function CartTotal() {
  const { totalPrice } = useCart();
  return <>${totalPrice.toFixed(2)}</>;
}
