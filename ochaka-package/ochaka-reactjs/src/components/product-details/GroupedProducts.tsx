import { Link } from "react-router-dom";

import { useState } from "react";
import QuantitySelect from "../common/QuantitySelect";

export default function GroupedProducts() {
  const [value, setValue] = useState(1);
  const [value2, setValue2] = useState(1);
  return (
    <div className="tf-product-more-option">
      <div className="more-option-item">
        <h4 className="fw-4 name">
          <Link to={`/product-detail/1`} className="link">
            Women's straight leg pants
          </Link>
        </h4>
        <QuantitySelect quantity={value} setQuantity={setValue} />
        <h4 className="price fw-6">$29.00</h4>
      </div>
      <div className="more-option-item">
        <h4 className="fw-4 name">
          <Link to={`/product-detail/1`} className="link">
            Short sleeve office shirt
          </Link>
        </h4>
        <QuantitySelect quantity={value2} setQuantity={setValue2} />
        <h4 className="price fw-6">$29.00</h4>
      </div>
    </div>
  );
}
