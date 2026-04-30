import { useState } from "react";

const currencies = [
  {
    code: "USD",
    image: "/images/country/us.png",
  },
  {
    code: "VND",
    image: "/images/country/vie.png",
  },
];

export default function CurrencySelect({
  placement = "bottom-start",
  textBlack = false,
  textColor = "color-white",
}) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleSelect = (currency: (typeof currencies)[0]) => {
    setSelectedCurrency(currency);
  };

  return (
    <div
      className={`dropdown bootstrap-select tf-dropdown-select style-default ${
        textBlack ? "" : textColor
      }  type-currencies`}
      onClick={() => {}}
    >
      <button
        type="button"
        className="btn dropdown-toggle btn-light"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title={selectedCurrency.code}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              <img src={selectedCurrency.image} alt="Country" />
              {selectedCurrency.code}
            </div>
          </div>
        </div>
      </button>

      <div className="dropdown-menu" data-popper-placement={placement}>
        <ul className="dropdown-menu inner show">
          {currencies.map((currency) => (
            <li
              key={currency.code}
              className={
                selectedCurrency.code === currency.code ? "selected active" : ""
              }
            >
              <a
                className={`dropdown-item ${
                  selectedCurrency.code === currency.code
                    ? "active selected"
                    : ""
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default if needed
                  handleSelect(currency); // Call your function
                }}
              >
                <span className="text">
                  <img src={currency.image} alt="Country" /> {currency.code}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
