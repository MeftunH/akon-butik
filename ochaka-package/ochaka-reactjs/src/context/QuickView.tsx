import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { ProductCardItem } from "@/types/products";

type Product = ProductCardItem;

type QuickViewContextValue = {
  quickViewItem: Product | null;
  setQuickViewItem: Dispatch<SetStateAction<Product | null>>;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isOpen: boolean;
};

const QuickViewContext = createContext<QuickViewContextValue | undefined>(
  undefined
);

export const useQuickView = () => {
  const ctx = useContext(QuickViewContext);
  if (!ctx)
    throw new Error("useQuickView must be used within <QuickViewProvider>");
  return ctx;
};

export default function QuickViewProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [quickViewItem, setQuickViewItem] = useState<Product | null>(null);

  // Stable handlers
  const openQuickView = useCallback((product: Product) => {
    setQuickViewItem(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewItem(null);
  }, []);

  const isOpen = !!quickViewItem;

  // Memoized context value; only changes when quickViewItem changes
  const value = useMemo<QuickViewContextValue>(
    () => ({
      quickViewItem,
      setQuickViewItem, // stable from React
      openQuickView,
      closeQuickView,
      isOpen,
    }),
    [quickViewItem, openQuickView, closeQuickView, isOpen]
  );

  return (
    <QuickViewContext.Provider value={value}>
      {children}
    </QuickViewContext.Provider>
  );
}
