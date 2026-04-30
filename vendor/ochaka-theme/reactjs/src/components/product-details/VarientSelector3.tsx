interface VarientSelectorProps {
  /** The currently selected color */
  selectedColor: string;
  /** Callback to set the selected color */
  setSelectedColor: (color: string) => void;
}

import SizeSelector from "./SizeSelector";

export default function VarientSelector2({
  selectedColor,
  setSelectedColor,
}: VarientSelectorProps) {
  const colors = [
    {
      name: "blue",
      label: "Blue",
      image: "/images/products/fashion/product-1.jpg",
      width: 952,
      height: 1512,
    },
    {
      name: "green",
      label: "Green",
      image: "/images/products/fashion/product-8.jpg",
      width: 952,
      height: 1215,
    },
    {
      name: "gray",
      label: "Gray",
      image: "/images/products/fashion/product-9.jpg",
      width: 952,
      height: 1215,
    },
  ];

  return (
    <div className="tf-product-variant">
      <div className="variant-picker-item variant-color">
        <div className="variant-picker-label">
          <div className="h4 fw-semibold">
            Colors:
            <span className="variant-picker-label-value value-currentColor d-inline-flex text-capitalize">
              {selectedColor}
            </span>
          </div>
        </div>

        <div className="variant-picker-values gap24">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className={`hover-tooltip tooltip-bot color-btn style-image-square ${
                selectedColor === color.name ? "active" : ""
              }`}
              data-color={color.name}
              onClick={() => setSelectedColor(color.name)}
            >
              <div className="img">
                <img
                  className="lazyloaded"
                  data-src={color.image}
                  src={color.image}
                  alt={color.label}
                  width={color.width}
                  height={color.height}
                />
              </div>
              <span className="tooltip">{color.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="variant-picker-item variant-size">
        <SizeSelector />
      </div>
    </div>
  );
}
