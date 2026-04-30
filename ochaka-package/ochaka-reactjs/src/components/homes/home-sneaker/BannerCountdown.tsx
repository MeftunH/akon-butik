import { Link } from "react-router-dom";

import CountdownTimer from "@/components/common/Countdown";

export default function BannerCountdown() {
  return (
    <section className="themesFlat">
      <div className="container-full-2">
        <div className="banner-cd_v01 style-2">
          <div className="banner_content wow fadeInUp">
            <h1 className="title">On Sale!</h1>
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
          <div className="img-item item-1">
            <img
              className="lazyload"
              src="/images/section/item-1.png"
              alt=""
              width={744}
              height={744}
            />
          </div>
          <div className="img-item item-2">
            <img
              className="lazyload"
              src="/images/section/item-2.png"
              alt=""
              width={644}
              height={785}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
