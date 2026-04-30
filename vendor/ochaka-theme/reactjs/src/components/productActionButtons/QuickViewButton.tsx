import { useQuickView } from "@/context/QuickView";
import type { ProductCardItem } from "@/types/products";
import { useCallback } from "react";
interface Props {
  tooltipDirection?: string;
  parentClass?: string;
  product: ProductCardItem;
}
export default function QuickViewButton({
  tooltipDirection = "left",
  product,
  parentClass = "hover-tooltip box-icon",
}: Props) {
  const { setQuickViewItem } = useQuickView();

  const handleClick = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();

      setQuickViewItem(product); // For displaying full modal data
    },
    [product, setQuickViewItem]
  );

  return (
    <button
      data-bs-target="#quickView"
      data-bs-toggle="modal"
      onClick={handleClick}
      className={`${parentClass} tooltip-${tooltipDirection}`}
    >
      <span className="icon icon-view" />
      <span className="tooltip">Quick view</span>
    </button>
  );
}
