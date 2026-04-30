export default function ExptaLink() {
  return (
    <div className="tf-product-extra-link">
      <a
        href="#compareColor"
        data-bs-toggle="modal"
        className="product-extra-icon link"
      >
        <i className="icon icon-swatches" />
        Compare color
      </a>
      <a
        href="#askQuestion"
        data-bs-toggle="modal"
        className="product-extra-icon link"
      >
        <i className="icon icon-ques" />
        Ask a question
      </a>
      <a
        href="#shipAndDelivery"
        data-bs-toggle="modal"
        className="product-extra-icon link"
      >
        <i className="icon icon-truck" />
        Delivery &amp; Return
      </a>
      <a
        href="#shareWith"
        data-bs-toggle="modal"
        className="product-extra-icon link"
      >
        <i className="icon icon-share" />
        Share
      </a>
    </div>
  );
}
