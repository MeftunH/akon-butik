import type { Dispatch } from "react";
import type { FilterAction } from "./filterReducer";

// Domain types

// Reducer action union

// Helpers
export const setPrice = (
  dispatch: Dispatch<FilterAction>,
  value: [number, number]
): void => {
  dispatch({ type: "SET_PRICE", payload: value });
};

export const setColor = (
  dispatch: Dispatch<FilterAction>,
  value: string,
  currentColor: string
): void => {
  const payload = value === currentColor ? "All" : value;
  dispatch({ type: "SET_COLOR", payload });
};

export const setSize = (
  dispatch: Dispatch<FilterAction>,
  value: string,
  currentSize: string
): void => {
  const payload = value === currentSize ? "All" : value;
  dispatch({ type: "SET_SIZE", payload });
};

export const setAvailability = (
  dispatch: Dispatch<FilterAction>,
  value: string,
  current: string
): void => {
  const payload: string = value === current ? "All" : value;
  dispatch({ type: "SET_AVAILABILITY", payload });
};

export const setBrands = (
  dispatch: Dispatch<FilterAction>,
  newBrand: string,
  brands: string[]
): void => {
  const updated = brands.includes(newBrand)
    ? brands.filter((b) => b !== newBrand)
    : [...brands, newBrand];
  dispatch({ type: "SET_BRANDS", payload: updated });
};

export const removeBrand = (
  dispatch: Dispatch<FilterAction>,
  brandToRemove: string,
  brands: string[]
): void => {
  const updated = brands.filter((b) => b !== brandToRemove);
  dispatch({ type: "SET_BRANDS", payload: updated });
};

export const setCategories = (
  dispatch: Dispatch<FilterAction>,
  newItem: string,
  categories: string[]
): void => {
  const updated = categories.includes(newItem)
    ? categories.filter((c) => c !== newItem)
    : [...categories, newItem];
  dispatch({ type: "SET_CATEGORIES", payload: updated });
};

export const removeCategories = (
  dispatch: Dispatch<FilterAction>,
  categoryToRemove: string,
  categories: string[]
): void => {
  const updated = categories.filter((c) => c !== categoryToRemove);
  dispatch({ type: "SET_CATEGORIES", payload: updated });
};

export const setSortingOption = (
  dispatch: Dispatch<FilterAction>,
  value: string
): void => {
  dispatch({ type: "SET_SORTING_OPTION", payload: value });
};

export const toggleFilterWithOnSale = (
  dispatch: Dispatch<FilterAction>
): void => {
  dispatch({ type: "TOGGLE_FILTER_ON_SALE" });
};

export const setCurrentPage = (
  dispatch: Dispatch<FilterAction>,
  value: number
): void => {
  dispatch({ type: "SET_CURRENT_PAGE", payload: value });
};

export const setItemPerPage = (
  dispatch: Dispatch<FilterAction>,
  value: number
): void => {
  dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
};

export const clearFilter = (dispatch: Dispatch<FilterAction>): void => {
  dispatch({ type: "CLEAR_FILTER" });
};
