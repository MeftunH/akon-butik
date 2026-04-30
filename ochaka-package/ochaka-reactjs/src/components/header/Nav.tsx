import {
  bannerItems,
  blogMenuItems,
  demoItems,
  infoPages,
  productMenuColumns,
  shopPages,
} from "@/data/menu";
import { recentProducts } from "@/data/products";
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <li className="menu-item">
        <a href="#" className="item-link">
          HOME
          <i className="icon icon-caret-down" />
        </a>
        <div className="sub-menu mega-menu mega-home">
          <div className="container">
            <div className="row-demo">
              {demoItems.slice(0, 12).map((item, index) => (
                <div className="demo-item" key={index}>
                  <Link to={item.href} className="demo-img">
                    <img
                      alt="Demo"
                      src={item.src}
                      width={item.width || 401}
                      height={item.height || 520}
                      className="lazyload"
                    />
                    {item.isNew && (
                      <div className="demo-label">
                        <span>New</span>
                      </div>
                    )}
                  </Link>
                  <Link
                    to={item.href}
                    className={`demo-name ${item.isNew ? "link" : ""}`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="#modalDemo"
                data-bs-toggle="modal"
                className="tf-btn animate-btn"
              >
                View all demos (20)
              </a>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a href="#" className="item-link">
          SHOP
          <i className="icon icon-caret-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {shopPages.map((col, index) => (
                <div className="col-2" key={index}>
                  <div className="mega-menu-item">
                    <h4 className="menu-heading">{col.heading}</h4>
                    <ul className="sub-menu_list">
                      {col.items.map((item, i) => (
                        <li key={i}>
                          <Link to={item.href} className="sub-menu_link">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div className="col-6">
                <ul className="list-hor">
                  {bannerItems.map((banner, i) => (
                    <li className="wg-cls hover-img" key={i}>
                      <Link to={banner.href} className="image img-style">
                        <img
                          src={banner.imgSrc}
                          alt="Collection"
                          className="lazyload"
                          width={672}
                          height={952}
                        />
                      </Link>
                      <div className="cls-content">
                        <h4 className="tag_cls">{banner.tag}</h4>
                        <span className="br-line type-vertical" />
                        <Link to={banner.href} className="tf-btn-line">
                          Shop now
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a href="#" className="item-link">
          PRODUCT
          <i className="icon icon-caret-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {productMenuColumns.map((col, i) => (
                <div className="col-2" key={i}>
                  <div className="mega-menu-item">
                    <h4 className="menu-heading">{col.heading}</h4>
                    <ul className="sub-menu_list">
                      {col.items.map((item, j) => (
                        <li key={j}>
                          <Link to={item.href} className="sub-menu_link">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Recent Products Column */}
              <div className="col-4">
                <div className="mega-menu-item mn-none">
                  <h4 className="menu-heading">Recent Products</h4>
                  <ul className="list-ver">
                    {recentProducts.map((prd, idx) => (
                      <React.Fragment key={idx}>
                        <li className="prd-recent hover-img">
                          <Link
                            to={`/product-detail/${prd.id}`}
                            className="image img-style"
                          >
                            <img
                              src={prd.imgSrc}
                              alt="Image"
                              width={244}
                              height={244}
                              className="lazyload"
                            />
                          </Link>
                          <div className="content">
                            <span className="badge-tag">{prd.tag}</span>
                            <Link
                              to={`/product-detail/${prd.id}`}
                              className="name-prd h6 fw-medium link"
                            >
                              {prd.title}
                            </Link>
                            <span className="price-wrap h6 fw-semibold text-black">
                              ${prd.price.toFixed(2)}
                            </span>
                          </div>
                        </li>
                        {idx < recentProducts.length - 1 && (
                          <li className="br-line" />
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a href="#" className="item-link">
          PAGE
          <i className="icon icon-caret-down" />
        </a>
        <div className="sub-menu">
          <ul className="sub-menu_list">
            {infoPages.map((page, index) => (
              <li key={index}>
                <Link to={page.href} className="sub-menu_link">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a href="#" className="item-link">
          BLOG
          <i className="icon icon-caret-down" />
        </a>
        <div className="sub-menu">
          <ul className="sub-menu_list">
            {blogMenuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href} className="sub-menu_link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );
}
