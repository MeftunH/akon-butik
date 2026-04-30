import { products } from "@/data/products";
import type { FilterState } from "@/types/filter-state";
import type { ProductCardItem } from "@/types/products";

/* ---------- Types ---------- */

export type FilterAction =
  | { type: "SET_PRICE"; payload: [number, number] }
  | { type: "SET_COLOR"; payload: string }
  | { type: "SET_SIZE"; payload: string }
  | { type: "SET_AVAILABILITY"; payload: string }
  | { type: "SET_BRANDS"; payload: string[] }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "FILTER_PRODUCTS"; payload: ProductCardItem[] } // product list to filter
  | { type: "SET_SORTING_OPTION"; payload: string }
  | { type: "SORT_PRODUCTS" }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_ITEM_PER_PAGE"; payload: number }
  | { type: "TOGGLE_FILTER_ON_SALE" }
  | { type: "CLEAR_FILTER" };

/* ---------- Initial State ---------- */

const productsTyped = products as ProductCardItem[];

export const initialState: FilterState = {
  price: [0, 100],
  availability: "All",
  color: "All",
  size: "All",
  activeFilterOnSale: false,
  brands: [],
  categories: [],
  filtered: productsTyped,
  sortingOption: "Sort by (Default)",
  sorted: productsTyped,
  currentPage: 1,
  itemPerPage: 6,
};

/* ---------- Helpers ---------- */

function matchesAllFilters(
  product: ProductCardItem,
  state: FilterState
): boolean {
  // brands (every selected brand must be in product.filterBrands)
  if (
    state.brands.length > 0 &&
    !state.brands.every((b) => product.filterBrands?.includes(b))
  )
    return false;

  // categories (every selected category must be in product.filterCategory)
  if (
    state.categories.length > 0 &&
    !state.categories.every((c) => product.filterCategory?.includes(c))
  )
    return false;

  // availability
  if (state.availability !== "All") {
    if (state.availability === "InStock" && !product.inStock) return false;
    if (state.availability === "OutOfStock" && product.inStock) return false;
  }

  // color
  if (state.color !== "All" && !product.filterColor?.includes(state.color))
    return false;

  // size
  if (
    state.size !== "All" &&
    state.size !== "Free Size" &&
    !product.filterSizes?.includes(state.size)
  )
    return false;

  // on sale only
  if (state.activeFilterOnSale && typeof product.oldPrice !== "number")
    return false;

  // price range
  if (product.price < state.price[0] || product.price > state.price[1])
    return false;

  return true;
}

/* ---------- Reducer ---------- */

export function reducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };

    case "SET_COLOR":
      return { ...state, color: action.payload };

    case "SET_SIZE":
      return { ...state, size: action.payload };

    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload };

    case "SET_BRANDS":
      return { ...state, brands: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "FILTER_PRODUCTS": {
      const productsToFilter = [...action.payload];
      const filtered = productsToFilter.filter((p) =>
        matchesAllFilters(p, state)
      );
      return { ...state, filtered, currentPage: 1 };
    }

    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };

    case "SORT_PRODUCTS": {
      const sorted = [...state.filtered];
      switch (state.sortingOption) {
        case "Price Ascending":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "Price Descending":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "Title Ascending":
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Title Descending":
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "Sort by (Default)":
        default:
          // keep filtered order
          break;
      }
      return { ...state, sorted, currentPage: 1 };
    }

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };

    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload, currentPage: 1 };

    case "TOGGLE_FILTER_ON_SALE":
      return { ...state, activeFilterOnSale: !state.activeFilterOnSale };

    case "CLEAR_FILTER":
      return {
        ...state,
        price: [0, 100],
        availability: "All",
        color: "All",
        size: "All",
        brands: [],
        categories: [],
        activeFilterOnSale: false,
      };

    default:
      return state;
  }
}
