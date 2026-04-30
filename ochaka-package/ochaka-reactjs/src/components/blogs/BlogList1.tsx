import { Link } from "react-router-dom";

import BlogSidebar from "./BlogSidebar";
import { rowStyleBlogs } from "@/data/blogs";

export default function BlogList1() {
  return (
    <div className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tf-grid-layout row-xl-gap-40">
              {rowStyleBlogs.map((item, index) => (
                <div className="article-blog style-row hover-img4" key={index}>
                  <Link to={`/blog-detail`} className="entry_image img-style4">
                    <img
                      src={item.imgSrc}
                      alt=""
                      className="lazyload"
                      width={896}
                      height={968}
                    />
                  </Link>
                  <div className="blog-content">
                    <a href="#" className="entry_date name-tag h6 link">
                      {item.date}
                    </a>
                    <Link to={`/blog-detail`} className="entry_name link h4">
                      {item.title}
                    </Link>
                    <p className="text h6">{item.description}</p>
                    <a href="#" className="tf-btn-line">
                      Read more
                    </a>
                  </div>
                </div>
              ))}

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
          <div className="col-xl-3 col-lg-4 d-none d-lg-block">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
