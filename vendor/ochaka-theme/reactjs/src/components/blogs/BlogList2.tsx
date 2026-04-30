import { Link } from "react-router-dom";

import BlogSidebar from "./BlogSidebar";
import { mixedStyleBlogs } from "@/data/blogs";

export default function BlogList2() {
  return (
    <div className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 d-none d-xl-block">
            <BlogSidebar />
          </div>
          <div className="col-xl-9 col-lg-12">
            <div className="tf-grid-layout sm-col-2 lg-col-3 row-xl-gap-56">
              {mixedStyleBlogs.map((item, index) => {
                if (item.type === "large") {
                  return (
                    <div
                      className="article-blog style-large hover-img"
                      key={index}
                    >
                      <Link
                        to={`/blog-detail`}
                        className="entry_image img-style position-relative"
                      >
                        <img
                          src={item.imgSrc}
                          alt="Blog"
                          className="lazyload"
                          width={1068}
                          height={601}
                        />
                        <div className="entry_tag">
                          <p className="name-tag h6 link">{item.tag}</p>
                        </div>
                      </Link>
                      <div className="blog-content">
                        <Link
                          to={`/blog-detail`}
                          className="entry_name link h4"
                        >
                          {item.title}
                        </Link>
                        <p className="text h6">{item.description}</p>
                        <Link to={`/blog-detail`} className="tf-btn-line">
                          Read more
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    className="article-blog style-small hover-img4"
                    key={index}
                  >
                    <div className="blog-image">
                      <Link
                        to={`/blog-detail`}
                        className="entry_image img-style4"
                      >
                        <img
                          src={item.imgSrc}
                          alt=""
                          className="lazyload"
                          width={972}
                          height={546}
                        />
                      </Link>
                      <div className="entry_tag">
                        <a href="#" className="name-tag h6 link">
                          {item.tag}
                        </a>
                      </div>
                    </div>
                    <div className="blog-content">
                      <Link to={`/blog-detail`} className="entry_name link h4">
                        {item.title}
                      </Link>
                      <p className="entry_date">{item.date}</p>
                    </div>
                  </div>
                );
              })}

              <div className="wd-full wg-pagination">
                <a href="#" className="pagination-item h6 direct">
                  <i className="icon icon-caret-left" />
                </a>
                <a href="#" className="pagination-item h6">
                  1
                </a>
                <span className="pagination-item h6 active">2</span>
                <a href="#" className="pagination-item h6">
                  3
                </a>
                <a href="#" className="pagination-item h6">
                  4
                </a>
                <a href="#" className="pagination-item h6">
                  5
                </a>
                <a href="#" className="pagination-item h6 direct">
                  <i className="icon icon-caret-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
