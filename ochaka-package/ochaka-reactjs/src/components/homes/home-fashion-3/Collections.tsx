import { Link } from "react-router-dom";

import { boxImagesV02 } from "@/data/collections";
import React from "react";

export default function Collections() {
  return (
    <div className="tf-grid-layout lg-col-2 gap-0">
      {boxImagesV02.map((item, index) => (
        <div className="box-image_V02 hover-img" key={index}>
          <Link to={`/shop-default`} className="box-image_image img-style">
            <img
              src={item.imgSrc}
              alt={item.alt}
              className="lazyload"
              width={1440}
              height={1035}
            />
          </Link>
          <div className="box-image_content wow fadeInUp">
            <span className="sub-text h4 text-primary">{item.subText}</span>
            <h1 className="fw-normal title">
              <Link to={`/shop-default`} className="link">
                {item.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Link>
            </h1>
            <Link to={`/shop-default`} className="tf-btn animate-btn">
              Shop now
              <i className="icon icon-arrow-right" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
