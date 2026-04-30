import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="s-log">
          <div className="col-left">
            <h1 className="heading">Register</h1>
            <form className="form-login" onSubmit={(e) => e.preventDefault()}>
              <div className="list-ver">
                <fieldset>
                  <input
                    type="text"
                    placeholder="Enter your email address *"
                    required
                  />
                </fieldset>
                <fieldset className="password-wrapper">
                  <input
                    className="password-field"
                    type={showPass1 ? "text" : "password"}
                    placeholder="Password *"
                    required
                  />
                  <span
                    onClick={() => setShowPass1((pre) => !pre)}
                    className={`toggle-pass ${
                      showPass1 ? "icon-view" : "icon-show-password"
                    } `}
                  />
                </fieldset>
                <fieldset className="password-wrapper">
                  <input
                    className="password-field"
                    type={showPass2 ? "text" : "password"}
                    placeholder="Confirm password *"
                    required
                  />
                  <span
                    onClick={() => setShowPass2((pre) => !pre)}
                    className={`toggle-pass ${
                      showPass2 ? "icon-view" : "icon-show-password"
                    } `}
                  />
                </fieldset>
              </div>
              <div className="orther-log list-ver">
                <div className="text-social">
                  <span className="br-line" />
                  <p className="h6 text-nowrap">
                    Or continue with social account
                  </p>
                  <span className="br-line" />
                </div>
                <div className="list-hor flex-wrap flex-lg-nowrap">
                  <a href="#" className="tf-btn style-line w-100">
                    <span className="icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_278_6045)">
                          <path
                            d="M21.6696 9.08832L12.696 9.08789C12.2997 9.08789 11.9785 9.40904 11.9785 9.8053V12.672C11.9785 13.0681 12.2997 13.3894 12.6959 13.3894H17.7493C17.196 14.8254 16.1632 16.0281 14.8455 16.7922L17.0002 20.5223C20.4567 18.5233 22.5002 15.0158 22.5002 11.0894C22.5002 10.5303 22.459 10.1307 22.3766 9.68064C22.314 9.33874 22.0171 9.08832 21.6696 9.08832Z"
                            fill="#167EE6"
                          />
                          <path
                            d="M11.4999 17.6964C9.02689 17.6964 6.86797 16.3452 5.70846 14.3457L1.97852 16.4956C3.87666 19.7854 7.4325 22.0007 11.4999 22.0007C13.4953 22.0007 15.378 21.4635 16.9999 20.5272V20.5221L14.8452 16.792C13.8595 17.3637 12.719 17.6964 11.4999 17.6964Z"
                            fill="#12B347"
                          />
                          <path
                            d="M17 20.5262V20.5211L14.8452 16.791C13.8596 17.3626 12.7192 17.6954 11.5 17.6954V21.9997C13.4953 21.9997 15.3782 21.4625 17 20.5262Z"
                            fill="#0F993E"
                          />
                          <path
                            d="M4.80435 11.0007C4.80435 9.78177 5.13702 8.64133 5.70854 7.65576L1.9786 5.50586C1.0372 7.12264 0.5 9.00029 0.5 11.0007C0.5 13.0012 1.0372 14.8788 1.9786 16.4956L5.70854 14.3457C5.13702 13.3602 4.80435 12.2197 4.80435 11.0007Z"
                            fill="#FFD500"
                          />
                          <path
                            d="M11.4999 4.30435C13.1126 4.30435 14.5939 4.87738 15.7509 5.83056C16.0363 6.06568 16.4512 6.04871 16.7127 5.78725L18.7438 3.75611C19.0405 3.45946 19.0193 2.97387 18.7024 2.69895C16.7639 1.0172 14.2416 0 11.4999 0C7.4325 0 3.87666 2.21534 1.97852 5.50511L5.70846 7.65501C6.86797 5.65555 9.02689 4.30435 11.4999 4.30435Z"
                            fill="#FF4B26"
                          />
                          <path
                            d="M15.751 5.83056C16.0364 6.06568 16.4513 6.04871 16.7128 5.78725L18.7439 3.75611C19.0405 3.45946 19.0194 2.97387 18.7025 2.69895C16.764 1.01716 14.2417 0 11.5 0V4.30435C13.1126 4.30435 14.594 4.87738 15.751 5.83056Z"
                            fill="#D93F21"
                          />
                        </g>
                      </svg>
                    </span>
                    Sign in with Google
                  </a>
                  <a href="#" className="tf-btn style-line w-100">
                    <span className="icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_278_6055)">
                          <path
                            d="M22.5 11C22.5 16.4905 18.4773 21.0414 13.2188 21.8664V14.1797H15.7818L16.2695 11H13.2188V8.93664C13.2188 8.06652 13.645 7.21875 15.0114 7.21875H16.3984V4.51172C16.3984 4.51172 15.1395 4.29688 13.9359 4.29688C11.4235 4.29688 9.78125 5.81969 9.78125 8.57656V11H6.98828V14.1797H9.78125V21.8664C4.52273 21.0414 0.5 16.4905 0.5 11C0.5 4.92508 5.42508 0 11.5 0C17.5749 0 22.5 4.92508 22.5 11Z"
                            fill="#1877F2"
                          />
                          <path
                            d="M15.7818 14.1797L16.2695 11H13.2188V8.9366C13.2188 8.0667 13.6449 7.21875 15.0114 7.21875H16.3984V4.51172C16.3984 4.51172 15.1396 4.29688 13.9361 4.29688C11.4235 4.29688 9.78125 5.81969 9.78125 8.57656V11H6.98828V14.1797H9.78125V21.8663C10.3413 21.9542 10.9153 22 11.5 22C12.0847 22 12.6587 21.9542 13.2188 21.8663V14.1797H15.7818Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </span>
                    Sign in with Google
                  </a>
                </div>
              </div>
              <button type="submit" className="tf-btn animate-btn w-100">
                Register
              </button>
            </form>
          </div>
          <div className="col-right">
            <h1 className="heading">Have An Account</h1>
            <p className="h6 text-sub">
              Welcome back, log in to your account to enhance your shopping
              experience, receive coupons, and the best discount codes.
            </p>
            <Link to="/login" className="btn_log tf-btn animate-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
