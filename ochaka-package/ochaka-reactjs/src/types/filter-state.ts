import type { ProductCardItem } from "./products";

export interface FilterState {
  price: [number, number];
  availability: string;
  color: string; // "All" or specific color
  size: string; // "All" | "Free Size" | size code
  activeFilterOnSale: boolean;
  brands: string[];
  categories: string[];
  filtered: ProductCardItem[];
  sortingOption: string;
  sorted: ProductCardItem[];
  currentPage: number;
  itemPerPage: number;
}
