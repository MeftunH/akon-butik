import SizeSelectDropdown from "./SizeSelectDropdown";
interface VarientSelectorProps {
  /** The currently selected color */
  selectedColor: string;
  /** Callback to set the selected color */
  setSelectedColor: (color: string) => void;
}

export default function VarientSelector2({
  selectedColor,
  setSelectedColor,
}: VarientSelectorProps) {
  const colors = [
    { name: "blue", label: "Blue" },
    { name: "green", label: "Green" },
    { name: "pink", label: "Pink" },
    { name: "gray", label: "Gray" },
    { name: "white", label: "White" },
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

        <div
          className="tf-variant-dropdown full"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="btn-select">
            <span className="text-sort-value value-currentColor text-capitalize">
              {selectedColor}
            </span>
            <span className="icon icon-caret-down" />
          </div>

          <div className="dropdown-menu">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className={`select-item color-btn ${
                  selectedColor === color.name ? "active" : ""
                }`}
                data-color={color.name}
                onClick={() => setSelectedColor(color.name)}
              >
                <span className="text-value-item">{color.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SizeSelectDropdown />
    </div>
  );
}
