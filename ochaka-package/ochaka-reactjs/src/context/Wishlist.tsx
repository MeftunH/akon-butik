import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ProductCardItem } from "@/types/products";

type Product = ProductCardItem;
type ProductID = Product["id"];

type WishlistContextValue = {
  wishList: Product[];
  setWishList: Dispatch<SetStateAction<Product[]>>;
  addToWishlist: (product: Product) => void; // toggles: add if missing, remove if present
  removeFromWishlist: (product: Product) => void;
  isAddedtoWishlist: (product: Product) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
};

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishList, setWishList] = useState<Product[]>([]);

  // Load once
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (Array.isArray(stored)) setWishList(stored as Product[]);
    } catch {
      setWishList([]);
    }
  }, []);

  // Persist (debounced)
  const debounceRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [wishList]);

  // ID helpers
  const hasId = useCallback(
    (id: ProductID) => wishList.some((p) => p.id === id),
    [wishList]
  );

  // Stable handlers
  // Toggle behavior preserved: add if not present, otherwise remove
  const addToWishlist = useCallback((product: Product) => {
    const id = product.id as ProductID;
    setWishList((prev) =>
      prev.some((p) => p.id === id)
        ? prev.filter((p) => p.id !== id)
        : [...prev, product]
    );
  }, []);

  const removeFromWishlist = useCallback((product: Product) => {
    const id = product.id as ProductID;
    setWishList((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isAddedtoWishlist = useCallback(
    (product: Product) => hasId(product.id as ProductID),
    [hasId]
  );

  // Memoized context value
  const value = useMemo<WishlistContextValue>(
    () => ({
      wishList,
      setWishList, // stable from React
      addToWishlist,
      removeFromWishlist,
      isAddedtoWishlist,
    }),
    [wishList, addToWishlist, removeFromWishlist, isAddedtoWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
