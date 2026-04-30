export default function ShipAndDaliveryModal() {
  return (
    <div
      className="modal modalCentered fade modal-ship_delivery"
      id="shipAndDelivery"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="fw-normal">Shipping &amp; Delivery</h2>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="legal-list">
            <div className="legal-item">
              <h5 className="legal_title">Returns &amp; Refunds:</h5>
              <p className="legal_label h6">
                Enjoy free standard shipping on all orders over 50! For orders
                under $50, a flat rate of $5 applies. We want you to love your
                purchase! If you're not completely satisfied, you can return
                unworn and unwashed items within 30 days for a full refund or
                exchange. Please see our full policy for details.
              </p>
            </div>
            <div className="legal-item">
              <h5 className="legal_title">Shipping:</h5>
              <p className="legal_label h6">
                Enjoy swift and reliable delivery! We offer free standard
                shipping on all orders over $50 within Vietnam. For orders under
                $50, a flat shipping fee of $5 will apply. Express shipping
                options are also available at checkout. Please allow 1-3
                business days for order processing and 2-5 business days for
                delivery, depending on your location.
              </p>
            </div>
            <div className="legal-item">
              <h5 className="legal_title">Help</h5>
              <p className="legal_label h6">
                If you have any questions regarding our services, please contact
                us using the information below.
              </p>
              <ul className="contact-list">
                <li>
                  <i className="icon icon-map-pin" />
                  <span className="br-line" />
                  <a
                    href="https://www.google.com/maps?q=8500+Lorem+Street+Chicago,+IL+55030+Dolor+sit+amet"
                    target="_blank"
                    className="h6 link text-main"
                  >
                    8500 Lorem Street Chicago, IL 55030 Dolor sit amet
                  </a>
                </li>
                <li>
                  <i className="icon icon-phone" />
                  <span className="br-line" />
                  <a href="tel:+88001234567" className="h6 link text-main">
                    +8(800) 123 4567
                  </a>
                </li>
                <li>
                  <i className="icon icon-envelope-simple" />
                  <span className="br-line" />
                  <a
                    href="mailto:themesflat@support.com"
                    className="h6 link text-main"
                  >
                    themesflat@support.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
