import { colors } from "@/data/productFilterOptions";
import {
  clearFilter,
  removeBrand,
  removeCategories,
  setAvailability,
  setColor,
  setSize,
  toggleFilterWithOnSale,
} from "@/reducer/filterActions";
import type { FilterAction } from "@/reducer/filterReducer";
import type { FilterState } from "@/types/filter-state";
import React from "react";
type FilterDropdownProps = {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
};
export default function FilterMeta({ state, dispatch }: FilterDropdownProps) {
  const hasFiltered =
    state.availability !== "All" ||
    state.size !== "All" ||
    state.color !== "All" ||
    state.activeFilterOnSale ||
    state.brands.length > 0 ||
    state.categories.length > 0;
  return (
    <>
      <div
        className="meta-filter-shop"
        style={hasFiltered ? { display: "flex" } : { display: "none" }}
      >
        <div id="product-count-grid" className="count-text">
          <span className="count">{state.sorted.length}</span> Products Found
        </div>

        <div id="applied-filters">
          {state.availability !== "All" ? (
            <span
              className="filter-tag"
              onClick={() =>
                setAvailability(dispatch, "All", state.availability)
              }
            >
              {typeof state.availability === "object"
                ? state.availability
                : state.availability}
              <span className="remove-tag icon-close" />
            </span>
          ) : null}
          {state.activeFilterOnSale ? (
            <span
              className="filter-tag"
              onClick={() => toggleFilterWithOnSale(dispatch)}
            >
              On Sale
              <span className="remove-tag icon-close" />
            </span>
          ) : null}

          {state.size !== "All" ? (
            <span
              className="filter-tag"
              onClick={() => setSize(dispatch, "All", state.size)}
            >
              {state.size}
              <span className="remove-tag icon-close" />
            </span>
          ) : null}

          {state.color !== "All" ? (
            <span
              className="filter-tag color-tag"
              onClick={() => setColor(dispatch, "All", state.color)}
            >
              <span
                className={`color ${
                  colors.filter((el) => el.name == state.color)[0].className
                }`}
              />

              {typeof state.color === "object" ? state.color : state.color}
              <span className="remove-tag icon-close" />
            </span>
          ) : null}

          {state.brands.length > 0 ? (
            <React.Fragment>
              {state.brands.map((brand, i) => (
                <span
                  key={i}
                  className="filter-tag"
                  onClick={() => removeBrand(dispatch, brand, state.brands)}
                >
                  {brand}
                  <span className="remove-tag icon-close" />
                </span>
              ))}
            </React.Fragment>
          ) : null}
          {state.categories.length > 0 ? (
            <React.Fragment>
              {state.categories.map((category, i) => (
                <span
                  key={i}
                  className="filter-tag"
                  onClick={() =>
                    removeCategories(dispatch, category, state.categories)
                  }
                >
                  {category}
                  <span className="remove-tag icon-close" />
                </span>
              ))}
            </React.Fragment>
          ) : null}
        </div>

        {hasFiltered ? (
          <button
            id="remove-all"
            className="remove-all-filters text-btn-uppercase"
            onClick={() => clearFilter(dispatch)}
          >
            REMOVE ALL <i className="icon icon-close" />
          </button>
        ) : null}
      </div>
    </>
  );
}
