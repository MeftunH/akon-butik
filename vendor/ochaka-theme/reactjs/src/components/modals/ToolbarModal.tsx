import { Link } from "react-router-dom";

import CartLength from "../header/CartLength";
import WishlistLength from "../header/WishlistLength";

export default function ToolbarModal() {
  return (
    <div className="tf-toolbar-bottom">
      <div className="toolbar-item">
        <Link to={`/shop-default`}>
          <span className="toolbar-icon">
            <i className="icon icon-storefront" />
          </span>
          <span className="toolbar-label">Shop</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <a href="#search" data-bs-toggle="modal">
          <span className="toolbar-icon">
            <i className="icon icon-magnifying-glass" />
          </span>
          <span className="toolbar-label">Search</span>
        </a>
      </div>
      <div className="toolbar-item">
        <Link to={`/account-page`}>
          <span className="toolbar-icon">
            <i className="icon icon-user" />
          </span>
          <span className="toolbar-label">Account</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <Link to={`/wishlist`}>
          <span className="toolbar-icon">
            <i className="icon icon-heart" />
            <span className="toolbar-count">
              <WishlistLength />
            </span>
          </span>
          <span className="toolbar-label">Wishlist</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <Link to={`/view-cart`}>
          <span className="toolbar-icon">
            <i className="icon icon-shopping-cart-simple" />
            <span className="toolbar-count">
              <CartLength />
            </span>
          </span>
          <span className="toolbar-label">Cart</span>
        </Link>
      </div>
    </div>
  );
}
