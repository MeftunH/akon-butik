import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

interface BannerParallaxProps {
  speed?: number;
}

export default function BannerParallax({ speed = -0.5 }: BannerParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;
    const yPos = (scrollTop - offsetTop) * speed;

    el.style.backgroundPosition = `center ${yPos}px`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className="banner-V06 flat-spacing parallaxie"
      style={{
        backgroundImage: 'url("/images/section/banner-gym.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center -0.45px",
      }}
    >
      <div className="container">
        <div className="banner_content wow fadeInUp">
          <h2 className="title text-display text-white">SALE UP 70% OFF</h2>
          <p className="sub-title h5 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
          <Link to="/shop-default" className="tf-btn btn-primary rounded-0">
            DISCOVER NOW
            <i className="icon icon-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
