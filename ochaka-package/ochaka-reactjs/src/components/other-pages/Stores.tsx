import TextCircle from "../common/TextCircle";

export default function Stores() {
  return (
    <section className="flat-spacing s-our-store">
      <div className="container">
        <div className="heading flat-spacing pt-0">
          <div className="wg-curve-text">
            <span className="icon">
              <svg
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.0001 8V21C25.0001 21.2652 24.8947 21.5196 24.7072 21.7071C24.5196 21.8946 24.2653 22 24.0001 22C23.7349 22 23.4805 21.8946 23.293 21.7071C23.1054 21.5196 23.0001 21.2652 23.0001 21V10.4137L8.70757 24.7075C8.51993 24.8951 8.26543 25.0006 8.00007 25.0006C7.7347 25.0006 7.48021 24.8951 7.29257 24.7075C7.10493 24.5199 6.99951 24.2654 6.99951 24C6.99951 23.7346 7.10493 23.4801 7.29257 23.2925L21.5863 9H11.0001C10.7349 9 10.4805 8.89464 10.293 8.70711C10.1054 8.51957 10.0001 8.26522 10.0001 8C10.0001 7.73478 10.1054 7.48043 10.293 7.29289C10.4805 7.10536 10.7349 7 11.0001 7H24.0001C24.2653 7 24.5196 7.10536 24.7072 7.29289C24.8947 7.48043 25.0001 7.73478 25.0001 8Z"
                  fill="black"
                />
              </svg>
            </span>
            <div className="text-rotate">
              <div className="circle">
                <TextCircle />
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="s-title mb-8">Ochaka. Store</h1>
            <p className="s-subtitle h6-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              porta purus scelerisque felis condimentum, a lobortis mauris
              viverra. Sed et nisl maximus, gravida purus et, condimentum libero
            </p>
          </div>
        </div>
      </div>
      <div className="store-list">
        <div className="store-item">
          <div className="image">
            <img
              className="lazyload ani-zoom"
              src="/images/section/store-1.jpg"
              alt=""
              width={1440}
              height={1133}
            />
          </div>
          <div className="content type-right">
            <h2 className="name-store type-semibold">New York</h2>
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
                    <a href="mailto:themesflat@support.com" className="h6 link">
                      themesflat@support.com
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <h5 className="caption fw-semibold">We're Open</h5>
                <p className="h6">
                  Our store has reopened for shopping, exchanges Every day 8AM
                  to 7PM
                </p>
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
        <div className="store-item flex-wrap-reverse">
          <div className="content">
            <h2 className="name-store type-semibold">Los Angeles</h2>
            <ul className="infor-store">
              <li>
                <h5 className="caption fw-semibold">Address</h5>
                <p className="h6 mb-12">
                  8500 Sunset Blvd. Los Angeles, California 90069
                </p>
                <a
                  href="https://www.google.com/maps?q=8500+Sunset+Blvd.+Los+Angeles,+California+90069"
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
                      +1 (800) 987 6543
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-envelope-simple" />
                    <span className="br-line type-vertical" />
                    <a
                      href="mailto:themesflat.la@support.com"
                      className="h6 link"
                    >
                      themesflat.la@support.com
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <h5 className="caption fw-semibold">We're Open</h5>
                <p className="h6">
                  Our store is now open for shopping and exchanges every day
                  from 8AM to 7PM.
                </p>
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
          <div className="image">
            <img
              className="lazyload ani-zoom"
              src="/images/section/store-2.jpg"
              alt=""
              width={1440}
              height={1133}
            />
          </div>
        </div>
        <div className="store-item">
          <div className="image">
            <img
              className="lazyload ani-zoom"
              src="/images/section/store-3.jpg"
              alt=""
              width={1440}
              height={1133}
            />
          </div>
          <div className="content type-right">
            <h2 className="name-store type-semibold">Chicago</h2>
            <ul className="infor-store">
              <li>
                <h5 className="caption fw-semibold">Address</h5>
                <p className="h6 mb-12">
                  1234 Michigan Ave. Chicago, Illinois 60611
                </p>
                <a
                  href="https://www.google.com/maps?q=1234+Michigan+Ave.+Chicago,+Illinois+60611"
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
                      +1 (800) 456 7890
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-envelope-simple" />
                    <span className="br-line type-vertical" />
                    <a href="mailto:themesflat@support.com" className="h6 link">
                      themesflat.chi@support.com
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <h5 className="caption fw-semibold">We're Open</h5>
                <p className="h6">
                  Our store has reopened for shopping, exchanges Every day 08 am
                  to 7pm
                </p>
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
    </section>
  );
}
