import React from "react";

const marqueeItems = [
  "Skechers Men's Go Walk Max Effort",
  "ZGR Womens High Top Canvas Sneakers",
  "Free shipping on all orders over $150",
  "2% off for weekends",
];

export default function MarqueeSlider({ parentClass = "themesFlat bg-black" }) {
  // Repeat 4 times: 1 original + 3 clones (adjust for smooth infinite effect)
  const repeatCount = 4;
  const fullList = Array.from({ length: repeatCount }, (_, i) =>
    marqueeItems.map((text, idx) => ({
      text,
      isClone: i !== 0,
      key: `${text}-${i}-${idx}`,
    }))
  ).flat();

  return (
    <div className={parentClass}>
      <div className="tf-marquee style-3">
        <div className="infiniteslide_wrap" style={{ overflow: "hidden" }}>
          <div className="marquee-wrap infiniteSlide infiniteSlider">
            {fullList.map(({ text, isClone, key }) => (
              <React.Fragment key={key}>
                <p
                  className={`h6 text-white ${
                    isClone ? "infiniteslide_clone" : ""
                  }`}
                  style={{ flex: "0 0 auto", display: "block" }}
                >
                  {text}
                </p>
                <i
                  className={`icon icon-thunder-2 text-white ${
                    isClone ? "infiniteslide_clone" : ""
                  }`}
                  style={{ flex: "0 0 auto", display: "block" }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
