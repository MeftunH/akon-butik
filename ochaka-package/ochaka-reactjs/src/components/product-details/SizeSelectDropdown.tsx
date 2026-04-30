import { useState } from "react";

export default function SizeSelectDropdown({
  sizes = ["XS", "S", "M", "L"],
  defaultSize = "XS",
  onSizeChange = (value: string) => {
    console.log(value);
  },
}) {
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  return (
    <div className="variant-picker-item variant-size">
      <div className="variant-picker-label">
        <div className="h4 fw-semibold">
          Size{" "}
          <span className="variant-picker-label-value value-currentSize">
            {selectedSize}
          </span>
        </div>
        <a
          href="#size-guide"
          data-bs-toggle="modal"
          className="size-guide link h6 fw-medium"
        >
          <i className="icon icon-ruler" />
          Size Guide
        </a>
      </div>

      <div
        className="tf-variant-dropdown full"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="btn-select">
          <span className="text-sort-value value-currentSize">
            {selectedSize}
          </span>
          <span className="icon icon-caret-down" />
        </div>

        <div className="dropdown-menu">
          {sizes.map((size, i) => (
            <div
              key={i}
              className={`select-item size-btn ${
                selectedSize === size ? "active" : ""
              }`}
              data-size={size}
              onClick={() => {
                setSelectedSize(size);
                if (onSizeChange) onSizeChange(size);
              }}
            >
              <span className="text-value-item">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
