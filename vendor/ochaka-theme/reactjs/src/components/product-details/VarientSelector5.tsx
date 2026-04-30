import SizeSelectDropdown from "./SizeSelectDropdown";
interface VarientSelectorProps {
  /** The currently selected color */
  selectedColor: string;
  /** Callback to set the selected color */
  setSelectedColor: (color: string) => void;
}
export default function VarientSelector5({
  selectedColor,
  setSelectedColor,
}: VarientSelectorProps) {
  const colors = [
    { name: "blue", label: "Blue", colorClass: "bg-blue-1" },
    { name: "green", label: "Green", colorClass: "bg-dark-jade" },
    { name: "pink", label: "Pink", colorClass: "bg-hot-pink" },
    { name: "gray", label: "Gray", colorClass: "bg-caramel" },
    { name: "white", label: "White", colorClass: "bg-white" },
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
          className="tf-variant-dropdown has-color full"
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
                <span className={`box-color ${color.colorClass}`} />
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
