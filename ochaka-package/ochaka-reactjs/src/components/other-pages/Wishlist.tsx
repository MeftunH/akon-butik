import ProductCard1 from "../productCards/ProductCard1";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/Wishlist";

export default function Wishlist() {
  const { wishList } = useWishlist();
  return (
    <div className="flat-spacing">
      <div className="container">
        {wishList.length ? (
          <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4 wrapper-wishlist">
            {wishList.map((product, i) => (
              <ProductCard1 key={i} product={product} style={9} />
            ))}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="box-text_empty type-shop_cart col-12 col-md-6 col-lg-4">
              <div className="shop-empty_top">
                <span className="icon">
                  <i className="icon-heart" />
                </span>
                <h3 className="text-emp fw-normal">Your wishlist is empty</h3>
                <p className="h6 text-main">
                  Your wishlist is currently empty. Let us assist you in finding
                  the right product
                </p>
              </div>
              <div className="shop-empty_bot">
                <Link to={`/shop-default`} className="tf-btn animate-btn">
                  Shopping
                </Link>
                <Link to={`/`} className="tf-btn style-line">
                  Back to home
                </Link>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
