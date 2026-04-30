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

type CompareContextValue = {
  compareItem: Product[];
  setCompareItem: Dispatch<SetStateAction<Product[]>>;
  addToCompareItem: (product: Product) => void;
  removeFromCompareItem: (product: Product) => void;
  isAddedtoCompareItem: (product: Product) => boolean;
};

const CompareContext = createContext<CompareContextValue | undefined>(
  undefined
);

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within <CompareProvider>");
  return ctx;
};

export default function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItem, setCompareItem] = useState<Product[]>([]);

  // Load once
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("compareList") || "[]");
      if (Array.isArray(stored)) setCompareItem(stored as Product[]);
    } catch {
      setCompareItem([]);
    }
  }, []);

  // Persist (debounced)
  const debounceRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      localStorage.setItem("compareList", JSON.stringify(compareItem));
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [compareItem]);

  // Helpers that compare by id (stable identities)
  const hasId = useCallback(
    (id: ProductID) => compareItem.some((p) => p.id === id),
    [compareItem]
  );

  // Stable handlers
  const addToCompareItem = useCallback((product: Product) => {
    const id = product.id as ProductID;
    setCompareItem((prev) =>
      prev.some((p) => p.id === id) ? prev : [...prev, product]
    );
  }, []);

  const removeFromCompareItem = useCallback((product: Product) => {
    const id = product.id as ProductID;
    setCompareItem((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isAddedtoCompareItem = useCallback(
    (product: Product) => hasId(product.id as ProductID),
    [hasId]
  );

  // Memoized context value (changes only when needed)
  const value = useMemo<CompareContextValue>(
    () => ({
      compareItem,
      setCompareItem, // stable from React
      addToCompareItem,
      removeFromCompareItem,
      isAddedtoCompareItem,
    }),
    [compareItem, addToCompareItem, removeFromCompareItem, isAddedtoCompareItem]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
