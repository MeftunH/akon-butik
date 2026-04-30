import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="banner-V07 flat-spacing">
      <div className="container">
        <div className="row d-flex align-items-center flex-wrap-reverse">
          <div className="col-lg-5">
            <div className="content-left wow fadeInUp">
              <h4 className="sub-title text-primary">UNLOCK YOUR POTENTIAL</h4>
              <h2 className="title text-display">PREMIUM GYM SUPPORT</h2>
              <p className="desc h5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent scelerisque auctor libero, sit amet ultrices tortor.
                Duis condimentum dui urna, eget malesuada tellus pharetra
                finibus. Phasellus ante tellus, ultrices ut metus eget, luctus
                lacinia nisl. Morbi viverra laoreet lorem vitae placerat.
              </p>
              <Link
                to={`/shop-default`}
                className="tf-btn btn-primary rounded-0 type-small-2"
              >
                SHOP NOW
                <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="image-right hover-img mb-lg-0">
              <div className="image img-1 ms-auto me-0">
                <img
                  className="lazyload"
                  src="/images/banner/banner-gym-2.jpg"
                  alt="IMG"
                  width={930}
                  height={930}
                />
              </div>
              <div className="image img-2 img-style">
                <img
                  className="lazyload"
                  src="/images/banner/banner-gym-3.jpg"
                  alt="IMG"
                  width={672}
                  height={672}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
