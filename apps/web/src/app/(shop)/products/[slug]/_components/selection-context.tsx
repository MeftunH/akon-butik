'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface ProductSelection {
  selectedSize: string | null;
  selectedColor: string | null;
  setSelectedSize: (size: string | null) => void;
  setSelectedColor: (color: string | null) => void;
}

const Ctx = createContext<ProductSelection | undefined>(undefined);

export function ProductSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  return (
    <Ctx.Provider value={{ selectedSize, selectedColor, setSelectedSize, setSelectedColor }}>
      {children}
    </Ctx.Provider>
  );
}

export function useProductSelection(): ProductSelection {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error('useProductSelection must be used within <ProductSelectionProvider>');
  return ctx;
}
