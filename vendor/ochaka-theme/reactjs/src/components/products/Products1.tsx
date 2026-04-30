import { useEffect, useReducer, useState } from "react";
import FilterMeta from "./FilterMeta";
import Pagination from "./Pagination";
import ProductCard1 from "../productCards/ProductCard1";
import { initialState, reducer } from "@/reducer/filterReducer";
import { products } from "@/data/products";
import Sorting from "./Sorting";
import LayoutHandler from "./LayoutHandler";
import FilterSidebar from "./FilterSidebar";
import {
  setCurrentPage,
  toggleFilterWithOnSale,
} from "@/reducer/filterActions";
import ProductCardList from "../productCards/ProductCardList";

export default function Products1({
  parentClass = "flat-spacing-3 pb-0",
  defaultActiveLayout = 3,
  maxLayout = 6,
  isFullLayout = false,
  hasRightSidebar = false,
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
    <div className={parentClass}>
      <div className={isFullLayout ? "container-full" : "container"}>
        <div className="row">
          <div className={`col-xl-3  ${hasRightSidebar ? "order-2" : ""} `}>
            <div
              className={`canvas-sidebar sidebar-filter canvas-filter ${
                hasRightSidebar ? "right" : "left"
              } `}
              id="myOffcanvas"
            >
              <FilterSidebar state={state} dispatch={dispatch} />
            </div>
          </div>
          <div className="col-xl-9">
            <div className="tf-shop-control">
              <div
                className={`shop-sale-text d-none d-xl-flex ${
                  activeFilterOnSale ? "active" : ""
                }`}
                onClick={() => toggleFilterWithOnSale(dispatch)}
              >
                <input
                  type="checkbox"
                  className="tf-check"
                  readOnly
                  checked={activeFilterOnSale}
                />
                <label className="label">Show only products on sale</label>
              </div>
              <div className="tf-control-filter d-xl-none">
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
      </div>
    </div>
  );
}

/**
 * Products1 Component
 * -------------------
 * A flexible, filterable, and paginated product grid/list layout for eCommerce UIs.
 *
 * ✅ Features:
 * - Toggle between grid and list views (via `LayoutHandler`)
 * - Filter products by price, color, availability, size, brand, category, on-sale
 * - Sort by user-selected options (handled via `Sorting`)
 * - Paginate products using `Pagination`
 * - Sidebar filter with Bootstrap offcanvas behavior (mobile-ready)
 *
 * 🔧 Props:
 * @param {string} parentClass - Wrapper CSS class for outer spacing/layout
 * @param {number} defaultActiveLayout - Default grid layout (1 = list, 3/4/5 = columns)
 * @param {number} maxLayout - Maximum allowed columns for grid view
 * @param {boolean} isFullLayout - If true, uses a full-width container
 * @param {boolean} hasRightSidebar - If true, filter sidebar appears on the right
 *
 * 🧠 Internal Logic:
 * - Uses `useReducer` with `filterReducer` to manage filtering, sorting, pagination
 * - `FILTER_PRODUCTS` dispatch triggers filtering based on state changes
 * - `SORT_PRODUCTS` dispatch sorts filtered products based on selected criteria
 * - Layout toggle resets pagination to page 1
 *
 * 📦 Dependencies:
 * - `ProductCard1` & `ProductCardList` for different product layouts
 * - `FilterSidebar`, `Sorting`, `FilterMeta`, `LayoutHandler`, `Pagination`
 * - `products` data and `filterReducer` logic from local project files
 *
 * 🧩 Notes:
 * - Offcanvas filter is controlled by Bootstrap (via `data-bs-toggle`)
 * - Component is fully client-side (`"use client"`)
 */
