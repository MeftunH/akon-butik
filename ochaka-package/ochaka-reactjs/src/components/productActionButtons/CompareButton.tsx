import { useCompare } from "@/context/Compare";
import type { ProductCardItem } from "@/types/products";
import { useCallback, useMemo } from "react";
interface Props {
  tooltipDirection?: string;
  parentClass?: string;
  product: ProductCardItem;
}
export default function CompareButton({
  tooltipDirection = "left",
  product,
  parentClass = "hover-tooltip box-icon",
}: Props) {
  const { addToCompareItem, isAddedtoCompareItem } = useCompare();

  const isCompared = useMemo(
    () => isAddedtoCompareItem(product),
    [isAddedtoCompareItem, product]
  );

  const handleClick = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!isCompared) addToCompareItem(product);
    },
    [addToCompareItem, product, isCompared]
  );

  return (
    <button
      data-bs-target="#compare"
      data-bs-toggle="offcanvas"
      className={`${parentClass} tooltip-${tooltipDirection}`}
      onClick={handleClick}
    >
      <span className="icon icon-compare" />
      <span className="tooltip">{isCompared ? "Compared" : "Compare"}</span>
    </button>
  );
}
