import { Link } from "react-router-dom";

import { recentPosts } from "@/data/blogs";
import { blogGalleryImages } from "@/data/instagramPosts";

export default function BlogSidebar() {
  return (
    <div className="blog-sidebar sidebar-content-wrap sticky-top">
      <div className="sidebar-item">
        <h4 className="sb-title">Search blog</h4>
        <div className="sb-search">
          <form
            className="form-search style-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <input
                type="text"
                placeholder="Search item"
                className="style-stroke"
                name="text"
                tabIndex={0}
                defaultValue=""
                aria-required="true"
                required
              />
            </fieldset>
            <button type="submit" className="link">
              <i className="icon icon-magnifying-glass" />
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-item">
        <h4 className="sb-title">Category</h4>
        <ul className="sb-category">
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Minimalism Style<span>23</span>
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Accessories Design<span>34</span>
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Trend Vintage<span>44</span>
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Layering<span>75</span>
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Elegance<span>33</span>
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Underwear<span>45</span>
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="h6 link">
              Accessories<span>31</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-item">
        <h4 className="sb-title">Recent Post</h4>
        <ul className="sb-recent">
          {recentPosts.map((post, index) => (
            <li className="wg-recent hover-img" key={index}>
              <Link to={`/blog-detail`} className="image img-style">
                <img
                  src={post.imgSrc}
                  alt={post.alt}
                  width={224}
                  height={152}
                />
              </Link>
              <div className="content">
                <Link to={`/blog-detail`} className="entry_name h6 link">
                  {post.title}
                </Link>
                <span className="entry_date text-small">{post.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <h4 className="sb-title">Tags</h4>
        <ul className="sb-tag">
          <li>
            <Link to={`/blog-detail`} className="link">
              Accessories
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="link">
              Layering
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="link">
              Design
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="link">
              Style
            </Link>
          </li>
          <li>
            <Link to={`/blog-detail`} className="link">
              Minimalism
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-item">
        <h4 className="sb-title">Instagram</h4>
        <ul className="sb-gallery tf-grid-layout tf-col-2 lg-col-3">
          {blogGalleryImages.map((src, index) => (
            <li className="hover-img" key={index}>
              <a href="#" className="img-style">
                <img src={src} alt="Gallery" width={206} height={200} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <div className="sb-banner hover-img">
          <Link to={`/shop-default`} className="image img-style">
            <img
              src="/images/blog/side-banner.jpg"
              alt="Banner"
              width={648}
              height={950}
            />
          </Link>
          <div className="content">
            <h5 className="sub-title text-primary">Sale Upto 45%</h5>
            <h2 className="fw-semibold title">
              <a href="#" className="text-white link">
                Fall winter collection
              </a>
            </h2>
            <Link
              to={`/shop-default`}
              className="tf-btn btn-white animate-btn animate-dark"
            >
              Shop now
              <i className="icon icon-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
