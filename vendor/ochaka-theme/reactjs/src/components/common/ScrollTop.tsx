import { useEffect, useState, type CSSProperties } from "react";

export default function ScrollTop() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [currentAngle, setCurrentAngle] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const progressAngle = (scrollPercent / 100) * 360;

      setScrollY(scrollTop);
      setCurrentAngle(progressAngle);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Style type for the CSS custom property
  const progressStyle: CSSProperties = {
    ["--progress-angle" as any]: `${currentAngle}deg`,
  };

  return (
    <button
      id="goTop"
      onClick={scrollToTop}
      className={scrollY > 200 ? "show" : ""}
    >
      <span className="border-progress" style={progressStyle} />
      <span className="icon icon-caret-up" />
    </button>
  );
}
