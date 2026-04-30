import { Link } from "react-router-dom";

export default function ContactInformations() {
  return (
    <section className="s-contact-information flat-spacing">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-7">
            <div className="image mb-lg-0">
              <img
                loading="lazy"
                width={820}
                height={755}
                alt="Image"
                src="/images/section/contact-information.jpg"
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="infor-content">
              <p className="title h1 fw-medium text-black">
                Contact Infomation
              </p>
              <ul className="infor-store">
                <li>
                  <h5 className="caption fw-semibold">Address</h5>
                  <p className="h6 mb-12">
                    2972 Westheimer Rd. Santa Ana, Illinois 85486
                  </p>
                  <a
                    href="https://www.google.com/maps?q=2972+Westheimer+Rd.+Santa+Ana,Illinois+85486"
                    target="_blank"
                    className="tf-btn-line"
                  >
                    <span className="h6 text-capitalize fw-semibold">
                      Get Direction
                    </span>
                    <i className="icon icon-arrow-top-right fs-20" />
                  </a>
                </li>
                <li>
                  <h5 className="caption fw-semibold">Contact Us</h5>
                  <ul className="store-contact list-ver">
                    <li>
                      <i className="icon icon-phone" />
                      <span className="br-line type-vertical" />
                      <a href="tel:+88001234567" className="h6 link">
                        +8(800) 123 4567
                      </a>
                    </li>
                    <li>
                      <i className="icon icon-envelope-simple" />
                      <span className="br-line type-vertical" />
                      <a
                        href="mailto:themesflat@support.com"
                        className="h6 link"
                      >
                        themesflat@support.com
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <h5 className="caption fw-semibold">Social Media</h5>
                  <ul className="tf-social-icon">
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        className="social-facebook"
                      >
                        <span className="icon">
                          <i className="icon-fb" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="social-instagram"
                      >
                        <span className="icon">
                          <i className="icon-instagram-logo" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://x.com/"
                        target="_blank"
                        className="social-x"
                      >
                        <span className="icon">
                          <i className="icon-x" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.tiktok.com/"
                        target="_blank"
                        className="social-tiktok"
                      >
                        <span className="icon">
                          <i className="icon-tiktok" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
