import { Link } from "react-router-dom";

import { useCompare } from "@/context/Compare";

export default function CompareModal() {
  const { removeFromCompareItem, compareItem, setCompareItem } = useCompare();
  return (
    <div className="offcanvas offcanvas-bottom canvas-compare" id="compare">
      <div className="canvas-wrapper">
        <div className="canvas-body">
          <div className="container">
            <div className="tf-compare-list main-list-clear wrap-empty_text">
              <div className="tf-compare-head">
                <h4 className="title">Compare products</h4>
              </div>
              <div className="tf-compare-offcanvas list-empty">
                {compareItem.length ? (
                  <>
                    {compareItem.map((product, i) => (
                      <div key={i} className="tf-compare-item file-delete">
                        <Link to={`/product-detail/${product.id}`}>
                          <div
                            className="icon remove"
                            onClick={() => removeFromCompareItem(product)}
                          >
                            <i className="icon-close" />
                          </div>
                          <img
                            className="radius-3 lazyload"
                            alt=""
                            src={product.imgSrc}
                            width={1044}
                            height={1392}
                          />
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="box-text_empty h6 text-main">
                    Your Compare is curently empty
                  </p>
                )}
              </div>
              <div className="tf-compare-buttons">
                <Link
                  to={`/compare`}
                  className="tf-btn animate-btn d-inline-flex bg-dark-2 justify-content-center"
                >
                  Compare
                </Link>
                <div
                  onClick={() => setCompareItem([])}
                  className="tf-btn btn-white animate-btn animate-dark line clear-list-empty tf-compare-button-clear-all"
                >
                  Clear All
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
