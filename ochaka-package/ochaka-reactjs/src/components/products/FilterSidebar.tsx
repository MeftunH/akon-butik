import { Link } from "react-router-dom";

import { useId } from "react";
import Slider from "rc-slider";
import {
  categories,
  sizes,
  colors,
  availabilityOptions,
  brands,
} from "@/data/productFilterOptions";
import {
  setCategories,
  setPrice,
  setSize,
  setColor,
  setAvailability,
  clearFilter,
  setBrands,
} from "@/reducer/filterActions";
import { products } from "@/data/products";
import type { FilterState } from "@/types/filter-state";
import type { FilterAction } from "@/reducer/filterReducer";
type FilterDropdownProps = {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
};
export default function FilterSidebar({
  state,
  dispatch,
}: FilterDropdownProps) {
  const collapseId = useId(); // unique ID for Bootstrap collapse

  return (
    <div className="canvas-wrapper">
      <div className="canvas-header d-xl-none">
        <span className="title h3 fw-medium">Filter</span>
        <span
          className="icon-close link icon-close-popup fs-24 close-filter"
          data-bs-dismiss="offcanvas"
        />
      </div>

      <div className="canvas-body">
        {/* Category Filter */}
        <div className="widget-facet">
          <div
            className="facet-title"
            role="button"
            data-bs-toggle="collapse"
            data-bs-target={`#cat-${collapseId}`}
            aria-expanded="true"
            aria-controls={`cat-${collapseId}`}
          >
            <span className="h4 fw-semibold">Category</span>
            <span className="icon icon-caret-down fs-20" />
          </div>
          <div id={`cat-${collapseId}`} className="collapse show">
            <ul className="collapse-body filter-group-check group-category">
              {categories.map((cat, i) => (
                <li key={i} className="list-item">
                  <a
                    href="#"
                    className={`link h6 ${
                      state.categories.includes(cat.name)
                        ? "fw-bold text-primary"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCategories(dispatch, cat.name, state.categories);
                    }}
                  >
                    {cat.name}
                    <span className="count">
                      {
                        products.filter((p) =>
                          p.filterCategory.includes(cat.name)
                        ).length
                      }
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Availability Filter */}
        <div className="tf-group-filter">
          <div className="widget-facet">
            <div
              className="facet-title"
              data-bs-target={`#avail-${collapseId}`}
              role="button"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls={`avail-${collapseId}`}
            >
              <span className="h4 fw-semibold">Availability</span>
              <span className="icon icon-caret-down fs-20" />
            </div>
            <div id={`avail-${collapseId}`} className="collapse show">
              <ul className="collapse-body filter-group-check current-scrollbar">
                {availabilityOptions.map((opt, i) => (
                  <li key={i} className="list-item">
                    <input
                      type="radio"
                      className="tf-check"
                      name="availability"
                      id={`avail-${opt.id}`}
                      checked={state.availability === opt.id}
                      onChange={() =>
                        setAvailability(dispatch, opt.id, state.availability)
                      }
                    />
                    <label htmlFor={`avail-${opt.id}`} className="label">
                      <span>{opt.label}</span>
                      <span className="count">
                        (
                        {products.filter((p) => p.inStock === opt.value).length}
                        )
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price Filter */}
          <div className="widget-facet">
            <div
              className="facet-title"
              data-bs-target={`#price-${collapseId}`}
              role="button"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls={`price-${collapseId}`}
            >
              <span className="h4 fw-semibold">Price</span>
              <span className="icon icon-caret-down fs-20" />
            </div>
            <div id={`price-${collapseId}`} className="collapse show">
              <div className="collapse-body widget-price filter-price">
                <div className="px-3">
                  <Slider
                    min={0}
                    max={100}
                    range
                    value={state.price}
                    onChange={(value) => {
                      if (Array.isArray(value) && value.length === 2) {
                        const [min, max] = value as [number, number];
                        setPrice(dispatch, [min, max]);
                      }
                    }}
                  />
                </div>
                <div className="box-value-price mb-3 pb-2">
                  <span className="h6 text-main">Price:</span>
                  <div className="price-box">
                    <div className="price-val">${state.price[0]}</div>
                    <span>-</span>
                    <div className="price-val">${state.price[1]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Brand Filter - Optional checkbox list */}
        <div className="widget-facet">
          <div
            className="facet-title"
            data-bs-target={`#brand-${collapseId}`}
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls={`brand-${collapseId}`}
          >
            <span className="h4 fw-semibold">Brand</span>
            <span className="icon icon-caret-down fs-20" />
          </div>
          <div id={`brand-${collapseId}`} className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
              {brands.map((brand, index) => (
                <li
                  key={index}
                  className="list-item"
                  onClick={() => setBrands(dispatch, brand.label, state.brands)}
                >
                  <input
                    type="checkbox"
                    className="tf-check"
                    readOnly
                    checked={state.brands.includes(brand.label)}
                  />
                  <label>{brand.label} </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Size Filter */}
        <div className="widget-facet">
          <div
            className="facet-title"
            data-bs-target={`#size-${collapseId}`}
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls={`size-${collapseId}`}
          >
            <span className="h4 fw-semibold">Size</span>
            <span className="icon icon-caret-down fs-20" />
          </div>
          <div id={`size-${collapseId}`} className="collapse show">
            <div className="collapse-body filter-size-box flat-check-list d-flex flex-wrap gap-2">
              {[...sizes, "Over size"].map((size, i) => (
                <div
                  key={i}
                  className={`check-item size-item size-check ${
                    state.size === size ? "active" : ""
                  }  ${size == "Over size" ? "over-size" : ""}`}
                  onClick={() => setSize(dispatch, size, state.size)}
                >
                  <span className="size h6">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Filter */}
        <div className="widget-facet">
          <div
            className="facet-title"
            data-bs-target={`#color-${collapseId}`}
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls={`color-${collapseId}`}
          >
            <span className="h4 fw-semibold">Color</span>
            <span className="icon icon-caret-down fs-20" />
          </div>
          <div id={`color-${collapseId}`} className="collapse show">
            <div className="collapse-body filter-color-box flat-check-list d-flex flex-wrap gap-2">
              {colors.map((color, i) => (
                <div
                  key={i}
                  className={`check-item color-item color-check ${
                    state.color === color.name ? "active" : ""
                  }`}
                  onClick={() => setColor(dispatch, color.name, state.color)}
                >
                  <span className={`color ${color.className}`} />
                  <span className="color-text">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="sb-banner hover-img">
          <Link to="/blog-detail" className="image img-style d-inline-flex">
            <img
              src="/images/blog/side-banner.jpg"
              alt="Fall Collection"
              width={648}
              height={950}
              className="img-fluid"
            />
          </Link>
          <div className="content">
            <h5 className="sub-title text-primary">Sale Upto 45%</h5>
            <h2 className="fw-semibold title">
              <a href="#" className="text-white link">
                Fall winter collection
              </a>
            </h2>
            <Link
              to="/shop-default"
              className="tf-btn btn-white animate-btn animate-dark"
            >
              Shop now <i className="icon icon-arrow-right" />
            </Link>
          </div>
        </div>
      </div>

      <div className="canvas-bottom d-xl-none">
        <button
          id="reset-filter"
          className="tf-btn btn-reset"
          onClick={() => clearFilter(dispatch)}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
