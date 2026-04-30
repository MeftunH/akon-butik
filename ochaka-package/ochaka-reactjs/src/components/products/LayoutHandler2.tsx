import { useEffect, type Dispatch, type SetStateAction } from "react";

type LayoutHandler2Props = {
  activeLayout: number;
  setActiveLayout: Dispatch<SetStateAction<number>>;
  maxLayout: number;
};

export default function LayoutHandler2({
  activeLayout,
  setActiveLayout,
  maxLayout,
}: LayoutHandler2Props) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && window.innerWidth > 767) {
        setActiveLayout((prev) => (prev > 3 ? 3 : prev));
      } else if (window.innerWidth < 768) {
        setActiveLayout((prev) => (prev > 2 ? 2 : prev));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibilityMap: Partial<Record<number, string>> = {
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  };

  const layoutOptions = Array.from(
    { length: Math.max(0, maxLayout - 1) },
    (_, i) => i + 2
  );

  return (
    <>
      {layoutOptions.map((num) => (
        <li
          key={num}
          onClick={() => setActiveLayout(num)}
          className={`tf-view-layout-switch sw-layout-${num} ${
            visibilityMap[num] ?? ""
          } ${activeLayout === num ? "active" : ""}`}
          data-value-layout={`tf-col-${num}`}
        >
          <i className={`icon-grid-${num}`} />
        </li>
      ))}
      <li className="br-line type-vertical" />
      <li
        className={`tf-view-layout-switch sw-layout-list list-layout ${
          activeLayout === 1 ? "active" : ""
        }`}
        data-value-layout="list"
        onClick={() => setActiveLayout(1)}
      >
        <i className="icon-list" />
      </li>
    </>
  );
}
