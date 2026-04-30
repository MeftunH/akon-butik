import { Link } from "react-router-dom";

export default function Collections2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="box-image_V06 type-space-2 hover-img rounded-0">
            <ul className="product-badge_list">
              <li className="product-badge_item h6 sale rounded-0">20% OFF</li>
            </ul>
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                src="/images/section/box-image-39.jpg"
                alt="IMG"
                className="lazyload"
                width={1392}
                height={524}
              />
            </Link>
            <div className="box-image_content wow fadeInUp">
              <h3 className="title">
                <Link to={`/shop-default`} className="link text-white">
                  WITZMAN Carry on Travel <br />
                  Backpack
                </Link>
              </h3>
              <Link
                to={`/shop-default`}
                className="tf-btn-line style-white letter-space-0"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className="box-image_V06 type-space-2 hover-img rounded-0">
            <ul className="product-badge_list">
              <li className="product-badge_item trend h6 rounded-0">
                Trending
              </li>
            </ul>
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                src="/images/section/box-image-40.jpg"
                alt="IMG"
                className="lazyload"
                width={1392}
                height={524}
              />
            </Link>
            <div className="box-image_content wow fadeInUp">
              <h3 className="title">
                <Link to={`/shop-default`} className="link text-white">
                  VELEZ Brown Top Grain <br />
                  Leather Backpack
                </Link>
              </h3>
              <Link
                to={`/shop-default`}
                className="tf-btn-line style-white letter-space-0"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
