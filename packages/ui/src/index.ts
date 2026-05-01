// Atoms
export { Button, type ButtonProps } from './components/Button';
export { Pagination, type PaginationProps } from './components/Pagination';
export { Price, type PriceProps } from './components/Price';

// Layout chrome
export { Footer } from './components/layout/Footer';
export { Header, type HeaderNavLink, type HeaderProps } from './components/layout/Header';
export { NewsletterForm, type NewsletterFormProps } from './components/layout/NewsletterForm';
export { Topbar, type TopbarProps } from './components/layout/Topbar';

// Cart
export { CartBadge, type CartBadgeProps } from './components/cart/CartBadge';
export { CartProvider, useCart, type CartLine } from './components/cart/CartContext';

// Wishlist
export {
  WishlistProvider,
  useWishlist,
  type WishlistProviderProps,
} from './components/cart/WishlistContext';
export { WishlistButton, type WishlistButtonProps } from './components/product/WishlistButton';

// Product
export { ProductCard, type ProductCardProps } from './components/product/ProductCard';
export { ProductGrid, type ProductGridProps } from './components/product/ProductGrid';

// Order
export {
  OrderTimeline,
  type OrderTimelineProps,
  type OrderTimelineStep,
} from './components/order/OrderTimeline';
