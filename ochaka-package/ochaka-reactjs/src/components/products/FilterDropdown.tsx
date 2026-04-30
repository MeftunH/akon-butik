import Slider from "rc-slider";
import {
  sizes,
  colors,
  availabilityOptions,
  brands,
} from "@/data/productFilterOptions";
import {
  setPrice,
  setSize,
  setColor,
  setAvailability,
  setBrands,
} from "@/reducer/filterActions";
import { products } from "@/data/products";
import type { FilterAction } from "@/reducer/filterReducer";
import type { FilterState } from "@/types/filter-state";

type FilterDropdownProps = {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
};
export default function FilterDropdown({
  state,
  dispatch,
}: FilterDropdownProps) {
  return (
    <div className="tf-filter-dropdown">
      <div className="tf-btn-filter border-0 px-0 min-w-unset">
        <span className="icon icon-filter text-black" />
        <span className="text text-black">Filter:</span>
      </div>
      <div className="meta-dropdown-filter">
        <div className="dropup dropdown-filter">
          <div
            className="dropdown-toggle"
            id="availability"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
            role="button"
          >
            <span className="text-value">Availability</span>
            {/* <span class="icon icon-caret-down"></span> */}
          </div>
          <div className="dropdown-menu" aria-labelledby="availability">
            <ul className="filter-group-check">
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
                      ({products.filter((p) => p.inStock === opt.value).length})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dropup dropdown-filter">
          <div
            className="dropdown-toggle"
            id="price"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
            role="button"
          >
            <span className="text-value">Price</span>
            {/* <span class="icon icon-caret-down"></span> */}
          </div>
          <div className="dropdown-menu" aria-labelledby="price">
            <div className="widget-price filter-price">
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
              <div className="box-value-price mb-3">
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
        <div className="dropup dropdown-filter">
          <div
            className="dropdown-toggle"
            id="color"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
            role="button"
          >
            <span className="text-value">Color</span>
            {/* <span class="icon icon-caret-down"></span> */}
          </div>
          <div className="dropdown-menu" aria-labelledby="color" style={{}}>
            <div className="filter-color-box flat-check-list">
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
        <div className="dropup dropdown-filter">
          <div
            className="dropdown-toggle"
            id="size"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
            role="button"
          >
            <span className="text-value">Size</span>
            {/* <span class="icon icon-caret-down"></span> */}
          </div>
          <div className="dropdown-menu" aria-labelledby="size" style={{}}>
            <div className="filter-size-box flat-check-list">
              {[...sizes, "Over size"].map((size, i) => (
                <div
                  key={i}
                  className={`check-item size-item size-check ${
                    state.size === size ? "active" : ""
                  } ${size == "Over size" ? "over-size" : ""}`}
                  onClick={() => setSize(dispatch, size, state.size)}
                >
                  <span className="size h6">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dropup dropdown-filter">
          <div
            className="dropdown-toggle"
            id="brand"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
            role="button"
          >
            <span className="text-value">Brand</span>
            {/* <span class="icon icon-caret-down"></span> */}
          </div>
          <div
            className="dropdown-menu drop-menu-brand"
            aria-labelledby="brand"
            style={{}}
          >
            <ul className="filter-group-check">
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
      </div>
    </div>
  );
}
