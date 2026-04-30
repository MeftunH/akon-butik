export default function Topbar5({ parentClass = "themesFlat bg-black" }) {
  const messages = [
    "Free shipping on all orders over $150",
    "Skechers Men's Go Walk Max Effort",
    "ZGR Womens High Top Canvas Sneakers",
    "2% off for weekends",
  ];

  const clones = 6; // adjust for how many loops you want in the marquee

  const repeatedItems = Array.from({ length: clones }).flatMap(
    (_, cloneIndex) =>
      messages.flatMap((msg, i) => [
        <p
          key={`text-${cloneIndex}-${i}`}
          className={`h6 text-white ${
            cloneIndex > 0 ? "infiniteslide_clone" : ""
          }`}
          style={{ flex: "0 0 auto", display: "block" }}
        >
          {msg}
        </p>,
        <i
          key={`icon-${cloneIndex}-${i}`}
          className={`icon icon-thunder-2 text-white fs-24 ${
            cloneIndex > 0 ? "infiniteslide_clone" : ""
          }`}
          style={{ flex: "0 0 auto", display: "block" }}
        />,
      ])
  );

  return (
    <div className={parentClass}>
      <div className="tf-marquee style-4">
        <div className="infiniteslide_wrap" style={{ overflow: "hidden" }}>
          <div className="marquee-wrap infiniteSlide infiniteSlider">
            {repeatedItems}
          </div>
        </div>
      </div>
    </div>
  );
}
