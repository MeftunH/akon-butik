import { Link } from "react-router-dom";

export default function TrackOrder() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="s-log">
          <div className="col-left">
            <div className="heading">
              <h1 className="mb-8">Track Your Order</h1>
              <p className="text-subhead">
                To track your order, please enter your order ID in the box below
                and press the "Track" button. The ID has been sent to you on
                your receipt and in the confirmation email you received.
              </p>
            </div>
            <form className="form-login" onSubmit={(e) => e.preventDefault()}>
              <div className="list-ver">
                <fieldset>
                  <input type="text" placeholder="Email address*" required />
                </fieldset>
                <fieldset>
                  <input type="text" placeholder="Billing email*" required />
                </fieldset>
              </div>
              <button type="submit" className="tf-btn animate-btn w-100">
                Track
              </button>
            </form>
          </div>
          <div className="col-right">
            <h1 className="heading">Have An Account</h1>
            <p className="h6 text-sub">
              Welcome back, log in to your account to enhance your shopping
              experience, receive coupons, and the best discount codes.
            </p>
            <Link to={`/login`} className="btn_log tf-btn animate-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
