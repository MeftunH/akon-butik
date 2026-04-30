import { Link } from "react-router-dom";

import { boxImages } from "@/data/collections";

export default function Collections2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Product Trending</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="tf-grid-layout md-col-2">
          {boxImages.map((item, index) => (
            <div
              className="box-image_V05 hover-img wow fadeInUp"
              data-wow-delay={item.wowDelay}
              key={index}
            >
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src={item.imgSrc}
                  alt=""
                  className="lazyload"
                  width={1392}
                  height={540}
                />
              </Link>
              <div className="box-image_content">
                <h2 className="title">
                  <Link to={`/shop-default`} className="link fw-normal">
                    {item.title}
                  </Link>
                </h2>
                <Link to={`/shop-default`} className="tf-btn-line text-nowrap">
                  Shop now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
