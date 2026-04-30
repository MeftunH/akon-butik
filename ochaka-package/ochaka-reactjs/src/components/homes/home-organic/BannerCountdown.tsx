import { Link } from "react-router-dom";

import CountdownTimer from "@/components/common/Countdown";

export default function BannerCountdown() {
  return (
    <section className="themesFlat">
      <div className="banner-cd_v01 style-3">
        <div className="img-item_bg">
          <img
            className="lazyload"
            src="/images/section/bg-1.png"
            alt=""
            width={1920}
            height={813}
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="position-relative">
                <div className="banner_img">
                  <img
                    className="lazyload"
                    src="/images/section/item/grape-min.png"
                    alt="Grape"
                    width={696}
                    height={628}
                  />
                </div>
                <div className="img-item_leaves item-1">
                  <img
                    className="lazyload"
                    src="/images/section/item/leaves-1.png"
                    alt="Leaves"
                    width={47}
                    height={68}
                  />
                </div>
                <div className="img-item_leaves item-2">
                  <img
                    className="lazyload"
                    src="/images/section/item/leaves-2.png"
                    alt="Leaves"
                    width={96}
                    height={54}
                  />
                </div>
                <div className="img-item_leaves item-3">
                  <img
                    className="lazyload"
                    src="/images/section/item/leaves-3.png"
                    alt="Leaves"
                    width={51}
                    height={79}
                  />
                </div>
                <div className="img-item_leaves item-4">
                  <img
                    className="lazyload"
                    src="/images/section/item/leaves-4.png"
                    alt="Leaves"
                    width={107}
                    height={122}
                  />
                </div>
                <div className="img-item_leaves item-5">
                  <img
                    className="lazyload"
                    src="/images/section/item/leaves-dou.png"
                    alt="Leaves"
                    width={184}
                    height={171}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="banner_content wow fadeInUp p-0 animated">
                <h2 className="title h1 fw-medium">On sale!</h2>
                <p className="sub-title">
                  Up to 50% off Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit
                </p>
                <div className="count-down_v01">
                  <div className="js-countdown cd-custom-element cd-has-zero">
                    <CountdownTimer style={2} />
                  </div>
                </div>
                <Link
                  to={`/shop-default`}
                  className="tf-btn bg-primary primary-2 animate-btn type-small-2"
                >
                  Get voucher 25%
                  <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
