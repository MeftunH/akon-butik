import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { allProducts } from "@/data/products";
import type { ProductCardItem } from "@/types/products";

type Product = ProductCardItem;
type ProductID = Product["id"];
export type CartItem = Product & { quantity: number };

type CartContextValue = {
  cartProducts: CartItem[];
  setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
  totalPrice: number;
  addProductToCart: (id: ProductID, qty?: number) => void;
  isAddedToCartProducts: (id: ProductID) => boolean;
  removeProductFromCart: (id: ProductID) => void;
  updateQuantity: (id: ProductID, qty: number) => void;
  quantityInCart: (id: ProductID) => number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  // Load from localStorage once
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cartList") || "[]");
      if (Array.isArray(stored)) setCartProducts(stored as CartItem[]);
    } catch {
      setCartProducts([]);
    }
  }, []);

  // Persist (debounced)
  const debounceRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [cartProducts]);

  // Derived subtotal (no extra state or render)
  const totalPrice = useMemo(
    () =>
      cartProducts.reduce(
        (acc, p) => acc + p.quantity * Number(p.price ?? 0),
        0
      ),
    [cartProducts]
  );

  // Stable handlers
  const addProductToCart = useCallback((id: ProductID, qty = 1) => {
    setCartProducts((prev) => {
      if (prev.some((p) => p.id === id)) return prev;
      const product = allProducts.find((p) => p.id === id);
      if (!product) return prev;
      const item: CartItem = { ...product, quantity: qty };
      return [...prev, item];
    });
  }, []);

  const removeProductFromCart = useCallback((id: ProductID) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: ProductID, qty: number) => {
    if (qty < 1) return;
    setCartProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  }, []);

  // Read helpers depend on cart state; still memoized so identity only changes when cart changes
  const isAddedToCartProducts = useCallback(
    (id: ProductID) => cartProducts.some((p) => p.id === id),
    [cartProducts]
  );

  const quantityInCart = useCallback(
    (id: ProductID) => cartProducts.find((p) => p.id === id)?.quantity ?? 0,
    [cartProducts]
  );

  // Context value only changes when its deps truly change
  const value = useMemo<CartContextValue>(
    () => ({
      cartProducts,
      setCartProducts, // stable from React
      totalPrice,
      addProductToCart,
      isAddedToCartProducts,
      removeProductFromCart,
      updateQuantity,
      quantityInCart,
    }),
    [
      cartProducts,
      totalPrice,
      addProductToCart,
      isAddedToCartProducts,
      removeProductFromCart,
      updateQuantity,
      quantityInCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
