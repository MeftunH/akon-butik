import { Link } from "react-router-dom";

export default function ParallaxBanner() {
  return (
    <div
      className="banner-V06 flat-spacing parallaxie"
      style={{ backgroundImage: 'url("/images/banner/bg-parallax-1.jpg")' }}
    >
      <div className="container">
        <div className="banner_content text-start wow fadeInUp">
          <h2 className="title text-display text-white">SALE UP 70% OFF</h2>
          <p className="sub-title h5 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
          <Link
            to={`/shop-default`}
            className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
          >
            DISCOVER NOW
            <i className="icon icon-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
