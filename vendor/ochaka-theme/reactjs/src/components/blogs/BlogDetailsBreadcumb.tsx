import { useEffect, useRef } from "react";

interface BlogDetailsBreadcumbProps {
  speed?: number;
}

export default function BlogDetailsBreadcumb({
  speed = -0.5,
}: BlogDetailsBreadcumbProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleScroll = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;

    const yPos = (scrollTop - offsetTop) * speed;
    ref.current.style.backgroundPosition = `center ${yPos}px`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="page-title-blog parallaxie"
      ref={ref}
      style={{
        backgroundImage: 'url("/images/section/blog-2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center -0.45px",
      }}
    >
      <div className="container position-relative z-5">
        <div className="content">
          <div className="entry_tag name-tag h6">Elegance</div>
          <h1 className="heading">
            Experience the 90s style of <br className="d-none d-sm-block" />
            mixing and matching
          </h1>
          <div className="entry_author">
            <span className="h6">Written by:</span>
            <h6 className="name-author">Ronald Richards</h6>
          </div>
        </div>
      </div>
    </section>
  );
}
