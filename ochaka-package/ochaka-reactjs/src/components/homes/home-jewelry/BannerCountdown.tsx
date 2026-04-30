import { Link } from "react-router-dom";

import CountdownTimer from "@/components/common/Countdown";

export default function BannerCountdown() {
  return (
    <section className="themesFlat">
      <div className="banner-cd_v01 flex-md-nowrap">
        <div className="banner_content wow fadeInUp">
          <h1 className="title">On sale!</h1>
          <p className="sub-title">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
          <div className="count-down_v01">
            <div className="js-countdown cd-custom-element cd-has-zero">
              <CountdownTimer style={2} />
            </div>
          </div>
          <Link
            to={`/shop-default`}
            className="tf-btn animate-btn type-small-2"
          >
            Get voucher 25%
            <i className="icon icon-arrow-right" />
          </Link>
        </div>
        <div className="banner_img">
          <img
            className="lazyload"
            src="/images/banner/banner-cd-V01.jpg"
            alt=""
            width={1440}
            height={1194}
          />
        </div>
      </div>
    </section>
  );
}
