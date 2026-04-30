import React from "react";

interface QuantitySelectProps {
  quantity?: number;
  setQuantity?: (value: number) => void;
  styleClass?: string;
}

const QuantitySelect: React.FC<QuantitySelectProps> = ({
  quantity = 1,
  setQuantity = () => {},
  styleClass = "",
}) => {
  const handleDecrease = () => {
    if (setQuantity) {
      setQuantity(quantity > 1 ? quantity - 1 : quantity);
    }
  };

  const handleIncrease = () => {
    if (setQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && setQuantity) {
      setQuantity(value);
    }
  };

  return (
    <div className={`wg-quantity ${styleClass}`}>
      <button className="btn-quantity btn-decrease" onClick={handleDecrease}>
        <i className="icon icon-minus" />
      </button>
      <input
        className="quantity-product"
        type="number"
        name="number"
        value={quantity}
        onChange={handleChange}
      />
      <button
        className="btn-quantity btn-increase"
        onClick={handleIncrease}
        role="button"
        tabIndex={0}
      >
        <i className="icon icon-plus" />
      </button>
    </div>
  );
};

export default QuantitySelect;
