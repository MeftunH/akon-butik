export default function AvailableProgress() {
  return (
    <div className="product-progress-sale">
      <div className="title">
        <div className="available text">
          Available:
          <span className="number text-primary fw-7">40</span>
        </div>
      </div>
      <div className="progress-cart">
        <div
          className="value bg-primary"
          style={{ width: "70%" }}
          data-progress={70}
        />
      </div>
    </div>
  );
}
