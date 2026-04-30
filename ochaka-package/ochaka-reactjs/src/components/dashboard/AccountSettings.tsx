import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AccountSettings() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 d-none d-xl-block">
            <Sidebar />
          </div>
          <div className="col-xl-9">
            <div className="my-account-content">
              <form
                className="form-change_pass"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="">
                  <h2 className="account-title type-semibold">
                    Account Setting
                  </h2>
                  <div className="form_content">
                    <div className="cols tf-grid-layout sm-col-2">
                      <fieldset>
                        <input
                          type="text"
                          placeholder="First name *"
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <input type="text" placeholder="Last name *" required />
                      </fieldset>
                    </div>
                    <fieldset>
                      <input type="email" placeholder="Email *" required />
                    </fieldset>
                  </div>
                </div>
                <div className="">
                  <h2 className="account-title type-semibold">
                    Change Password
                  </h2>
                  <div className="form_content site-change">
                    <fieldset className="password-wrapper">
                      <input
                        className="password-field"
                        type={showPass1 ? "text" : "password"}
                        placeholder="Current password *"
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
                        placeholder="New password *"
                        required
                      />
                      <span
                        onClick={() => setShowPass2((pre) => !pre)}
                        className={`toggle-pass ${
                          showPass2 ? "icon-view" : "icon-show-password"
                        } `}
                      />
                    </fieldset>
                    <fieldset className="password-wrapper">
                      <input
                        className="password-field"
                        type={showPass3 ? "text" : "password"}
                        placeholder="Confirm password *"
                        required
                      />
                      <span
                        onClick={() => setShowPass3((pre) => !pre)}
                        className={`toggle-pass ${
                          showPass3 ? "icon-view" : "icon-show-password"
                        } `}
                      />
                    </fieldset>
                  </div>
                  <button
                    type="submit"
                    className="btn-submit_form tf-btn animate-btn w-100 fw-bold"
                  >
                    Save change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
