import { useState } from "react";

const sizes = ["XS", "S", "M", "L"];

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <>
      {/* Label Section */}
      <div className="variant-picker-label">
        <div className="h4 fw-semibold">
          Size{" "}
          <span className="variant-picker-label-value value-currentSize">
            {" "}
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

      {/* Sizes Map */}
      <div className="variant-picker-values">
        {sizes.map((size) => (
          <span
            key={size}
            className={`size-btn ${selectedSize === size ? "active" : ""}`}
            data-size={size}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </span>
        ))}
      </div>
    </>
  );
}
