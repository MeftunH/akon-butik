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

import FilterSidebar from "./FilterSidebar";

export default function Products4({
  parentClass = "flat-spacing",
  defaultActiveLayout = 4,
  maxLayout = 6,
  isFullLayout = false,
}) {
  const [activeLayout, setActiveLayout] = useState(defaultActiveLayout);
  const [showDrawer, setShowDrawer] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setShowDrawer(false);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler once initially (optional)
    handleResize();

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className={parentClass}>
        <div className={isFullLayout ? "container-full" : "container"}>
          <div className="tf-shop-control wrapper-filter-dropdown position-relative">
            <div className="tf-control-filter">
              <button
                type="button"
                id="filterShop"
                data-bs-toggle="offcanvas"
                data-bs-target="#myOffcanvas"
                className="tf-btn-filter d-xl-none"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </button>
              <button
                type="button"
                className={`tf-btn-filter d-none d-xl-flex ${
                  showDrawer ? "active" : ""
                }`}
                onClick={() => setShowDrawer((pre) => !pre)}
              >
                <span
                  className={`icon icon-${showDrawer ? "close" : "filter"}`}
                />
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
            </div>{" "}
            <div
              className={`filter-drawer-wrap canvas-sidebar sidebar-filter canvas-filter left ${
                showDrawer ? "show" : ""
              }`}
              id="myOffcanvas"
            >
              <FilterSidebar state={state} dispatch={dispatch} />
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
 * Products4 Component
 * -------------------
 * A fully client-side product listing component featuring a toggleable drawer-style filter panel,
 * responsive layout switching, sorting, and pagination. Ideal for modern eCommerce pages.
 *
 * ✅ Features:
 * - Grid/List layout switching with `LayoutHandler`
 * - Custom drawer-based filter sidebar (controlled by `showDrawer` state)
 * - Responsive behavior: hides drawer on window resize
 * - Sorting options via `Sorting` component
 * - Filter metadata display via `FilterMeta`
 * - Paginated product display based on current layout
 *
 * 🔧 Props:
 * @param {string} parentClass - Optional custom CSS class for the layout wrapper
 * @param {number} defaultActiveLayout - Initial layout view (1 = list, 3–6 = grid columns)
 * @param {number} maxLayout - Maximum columns allowed in grid view
 * @param {boolean} isFullLayout - If true, uses `container-full` layout; otherwise `container`
 *
 * 🧠 Internal Logic:
 * - Uses `useReducer` with `filterReducer` to manage filtering and sorting logic
 * - Automatically filters and sorts products when dependencies change
 * - Layout switching resets the current page to 1
 * - Responsive drawer visibility (`showDrawer`) reset on window resize using `useEffect`
 *
 * 📦 Dependencies:
 * - Components: `ProductCard1`, `ProductCardList`, `Pagination`, `FilterSidebar`, `FilterMeta`, `Sorting`, `LayoutHandler`
 * - Data: Product list from `@/data/products`
 * - Reducer logic and actions from `@/reducer/filterReducer`
 *
 * 🧩 Notes:
 * - Fully client-rendered (`"use client"`)
 * - Drawer-style filter sidebar shows/hides via custom state, not Bootstrap offcanvas
 * - Bootstrap-based offcanvas is still present for smaller breakpoints (`d-xl-none`)
 * - Console logs filtered product IDs for debugging
 */
