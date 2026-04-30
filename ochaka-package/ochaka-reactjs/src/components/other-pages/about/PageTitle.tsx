import { Link } from "react-router-dom";

export default function PageTitle() {
  return (
    <section className="page-title-image">
      <div className="page_image overflow-hidden">
        <img
          className="lazyload ani-zoom"
          src="/images/section/about-us.jpg"
          alt="Banner"
          width={2880}
          height={1350}
        />
      </div>
      <div className="page_content">
        <div className="container">
          <div className="content">
            <h1 className="heading fw-bold">
              WE PRIORITIZE SUSTAINABLE &amp;{" "}
              <br className="d-none d-sm-block" />
              ENVIRONMENTALLY FRIENDLY <br className="d-none d-sm-block" />
              DEVELOPMENT
            </h1>
            <Link to={`/shop-default`} className="tf-btn animate-btn">
              Our shop
              <i className="icon icon-caret-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
