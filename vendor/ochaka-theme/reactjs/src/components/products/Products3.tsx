import { useEffect, useReducer, useState } from "react";
import FilterMeta from "./FilterMeta";
import Pagination from "./Pagination";
import ProductCard1 from "../productCards/ProductCard1";
import { initialState, reducer } from "@/reducer/filterReducer";
import { products } from "@/data/products";
import Sorting from "./Sorting";
import LayoutHandler from "./LayoutHandler";

import { setCurrentPage } from "@/reducer/filterActions";
import ProductCardList from "../productCards/ProductCardList";
import FilterDropdown from "./FilterDropdown";

export default function Products3({
  parentClass = "flat-spacing",
  defaultActiveLayout = 4,
  maxLayout = 6,
  isFullLayout = false,
}) {
  const [activeLayout, setActiveLayout] = useState(defaultActiveLayout);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    availability,
    color,
    size,
    brands,
    categories,
    price,
    sortingOption,
    filtered,
    sorted,
    activeFilterOnSale,
  } = state;

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS", payload: products });
  }, [
    price,
    availability,
    color,
    size,
    brands,
    categories,
    activeFilterOnSale,
  ]);

  useEffect(() => {
    dispatch({ type: "SORT_PRODUCTS" });
  }, [filtered, sortingOption]);

  const itemPerPage = activeLayout == 1 ? 6 : activeLayout * 3;
  const totalPages = Math.ceil(sorted.length / itemPerPage);
  const startIndex = (state.currentPage - 1) * itemPerPage;
  const endIndex = state.currentPage * itemPerPage;
  const pageContent = sorted.slice(startIndex, endIndex);
  return (
    <>
      <div className={parentClass}>
        <div className={isFullLayout ? "container-full" : "container"}>
          <div className="tf-shop-control">
            <FilterDropdown state={state} dispatch={dispatch} />
            <div className="tf-shop-change">
              <ul className="tf-control-layout">
                <LayoutHandler
                  activeLayout={activeLayout}
                  setActiveLayout={(value) => {
                    setCurrentPage(dispatch, 1);
                    setActiveLayout(value);
                  }}
                  maxLayout={maxLayout}
                />
              </ul>
              <div className="tf-control-sorting">
                <p className="h6 d-none d-lg-block">Sort by:</p>
                <Sorting state={state} dispatch={dispatch} />
              </div>{" "}
            </div>
          </div>
          <div className="wrapper-control-shop gridLayout-wrapper">
            <FilterMeta state={state} dispatch={dispatch} />
            <div
              className="tf-list-layout wrapper-shop"
              style={activeLayout == 1 ? {} : { display: "none" }}
            >
              {/* Product 1 */}
              {pageContent.map((product, i) => (
                <ProductCardList key={i} product={product} />
              ))}

              {/* Pagination */}
              <div className="wd-full wg-pagination">
                <Pagination
                  setCurrentPage={(value) => {
                    setCurrentPage(dispatch, value);
                  }}
                  currentPage={state.currentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
            <div
              className={`wrapper-shop tf-grid-layout tf-col-${activeLayout}`}
              style={activeLayout != 1 ? {} : { display: "none" }}
            >
              {pageContent.map((product, i) => (
                <ProductCard1 key={i} product={product} />
              ))}
              {/* Pagination */}
              <div className="wd-full wg-pagination m-0 justify-content-center">
                <Pagination
                  setCurrentPage={(value) => {
                    setCurrentPage(dispatch, value);
                  }}
                  currentPage={state.currentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Products3 Component
 * -------------------
 * An advanced product listing component with dropdown filter options, layout switching,
 * sorting, and pagination. Designed for flexible eCommerce UIs using client-side state.
 *
 * ✅ Features:
 * - Supports grid and list views with dynamic layout (`LayoutHandler`)
 * - Dropdown filter panel using `FilterDropdown` (instead of sidebar or offcanvas)
 * - Sorting options (`Sorting`) and filter metadata (`FilterMeta`) included
 * - Paginated product display with responsive item-per-page logic
 *
 * 🔧 Props:
 * @param {string} parentClass - CSS class to wrap outer layout spacing
 * @param {number} defaultActiveLayout - Initial layout column count (1 = list view)
 * @param {number} maxLayout - Max columns allowed in grid layout
 * @param {boolean} isFullLayout - Uses `container-full` if true, otherwise `container`
 *
 * 🧠 Internal Logic:
 * - Uses `useReducer` for managing filter state and reducer actions from `filterReducer`
 * - `FILTER_PRODUCTS` dispatches when filters change (color, size, price, etc.)
 * - `SORT_PRODUCTS` runs after filtering to sort visible results
 * - Layout switching resets the pagination to page 1
 *
 * 📦 Dependencies:
 * - Product cards: `ProductCard1` (grid) and `ProductCardList` (list)
 * - Filter tools: `FilterDropdown`, `FilterMeta`, `Sorting`, `LayoutHandler`
 * - Pagination: `Pagination` component
 * - Data and reducer from `@/data/products` and `@/reducer/filterReducer`
 *
 * 🧩 Notes:
 * - Fully client-rendered (`"use client"`)
 * - Uses inline conditional rendering to toggle between list and grid views
 * - Logs filtered product IDs for development/debugging
 */
