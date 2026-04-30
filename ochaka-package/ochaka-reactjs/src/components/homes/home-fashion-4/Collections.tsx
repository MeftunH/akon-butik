import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section>
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <p className="s-title h1 fw-medium mb-8">Our Collection</p>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="box-image_V02 type-space-2 hover-img">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/collections/cls-9.jpg"
                  alt="Collection"
                  className="lazyload"
                  width={1416}
                  height={957}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <h2 className="fw-semibold title">
                  <Link to={`/shop-default`} className="link">
                    Dress Collection
                  </Link>
                </h2>
                <span className="sub-text h5 count-prd">347 product</span>
                <Link to={`/shop-default`} className="tf-btn animate-btn">
                  Shop now
                  <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-collection hover-img4 wow fadeInUp mt-md-0">
              <Link to={`/shop-default`} className="cls_image img-style4">
                <img
                  className="lazyload img-product"
                  src="/images/collections/cls-card.jpg"
                  alt="Product"
                  width={896}
                  height={898}
                />
              </Link>
              <div className="collection_contnet">
                <h2 className="type-semibold">
                  <Link to={`/shop-default`} className="name-cls link">
                    Winter Collection
                  </Link>
                </h2>
                <p className="count-cls h5">347 product</p>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line letter-space-0"
                >
                  Show now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
