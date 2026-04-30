export default function PaymentMethods() {
  return (
    <div className="tf-product-trust-seal">
      <p className="h6 text-seal">Guarantee Safe Checkout:</p>
      <ul className="list-card">
        <li className="card-item">
          <img
            alt="card"
            src="/images/payment/visa.png"
            width={200}
            height={128}
          />
        </li>
        <li className="card-item">
          <img
            alt="card"
            src="/images/payment/master-card.png"
            width={200}
            height={128}
          />
        </li>
        <li className="card-item">
          <img
            alt="card"
            src="/images/payment/amex.png"
            width={200}
            height={128}
          />
        </li>
        <li className="card-item">
          <img
            alt="card"
            src="/images/payment/discover.png"
            width={200}
            height={128}
          />
        </li>
        <li className="card-item">
          <img
            alt="card"
            src="/images/payment/paypal.png"
            width={200}
            height={128}
          />
        </li>
      </ul>
    </div>
  );
}
