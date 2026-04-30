import { useEffect, useReducer, useState } from "react";
import FilterMeta from "./FilterMeta";
import Pagination from "./Pagination";
import ProductCard1 from "../productCards/ProductCard1";
import { initialState, reducer } from "@/reducer/filterReducer";
import { products } from "@/data/products";
import Sorting from "./Sorting";
import LayoutHandler2 from "./LayoutHandler2";
import FilterSidebar from "./FilterSidebar";
import { setCurrentPage } from "@/reducer/filterActions";
import ProductCardList from "../productCards/ProductCardList";

export default function Products2({
  parentClass = "flat-spacing",
  defaultActiveLayout = 3,
  maxLayout = 6,
  isFullLayout = false,
  gridCardStyle = 1,
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
            <div className="tf-control-filter">
              <button
                type="button"
                id="filterShop"
                data-bs-toggle="offcanvas"
                data-bs-target="#myOffcanvas"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </button>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler2
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
                <ProductCard1 style={gridCardStyle} key={i} product={product} />
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
      <div className="offcanvas offcanvas-start canvas-filter" id="myOffcanvas">
        <FilterSidebar state={state} dispatch={dispatch} />
      </div>
    </>
  );
}

/**
 * Products2 Component
 * -------------------
 * A dynamic product listing interface with grid/list views, filters, sorting, and pagination.
 * Optimized for eCommerce UIs with full control layout and offcanvas filtering (Bootstrap-based).
 *
 * ✅ Features:
 * - Toggle between grid and list views using `LayoutHandler2`
 * - Offcanvas sidebar for mobile/desktop filters (`FilterSidebar`)
 * - Filtering by price, brand, size, color, availability, category, and on-sale flag
 * - Sorting functionality via dropdown (`Sorting`)
 * - Paginated product display with dynamic items per page based on layout
 *
 * 🔧 Props:
 * @param {string} parentClass - Outer wrapper CSS class for spacing and layout control
 * @param {number} defaultActiveLayout - Initial grid layout column count (1 = list, 3/4/5 = columns)
 * @param {number} maxLayout - Maximum columns allowed in grid view
 * @param {boolean} isFullLayout - Determines whether to use `container` or `container-full`
 *
 * 🧠 Internal Logic:
 * - Uses `useReducer` to handle complex filter state and actions via `filterReducer`
 * - `FILTER_PRODUCTS` triggered when filters change
 * - `SORT_PRODUCTS` runs after filtering is complete
 * - Layout switching resets pagination to page 1
 *
 * 📦 Dependencies:
 * - `ProductCard1`, `ProductCardList`: for rendering products in grid or list view
 * - `Pagination`, `FilterMeta`, `LayoutHandler2`, `Sorting`, `FilterSidebar`
 * - Product data from `@/data/products` and reducer logic from `@/reducer/filterReducer`
 *
 * 🧩 Notes:
 * - `#myOffcanvas` sidebar is Bootstrap-controlled for responsive filter UI
 * - Entire component is wrapped in `"use client"` and fully client-rendered
 * - Logs filtered product IDs to console for debug purposes
 */
