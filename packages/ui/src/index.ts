// Atoms
export { Button, type ButtonProps } from './components/Button';
export { Price, type PriceProps } from './components/Price';

// Layout chrome
export { Topbar, type TopbarProps } from './components/layout/Topbar';
export { Header, type HeaderProps, type HeaderNavLink } from './components/layout/Header';
export { Footer, type FooterProps, type FooterColumn } from './components/layout/Footer';
export { NewsletterForm, type NewsletterFormProps } from './components/layout/NewsletterForm';

// Cart
export {
  CartProvider,
  useCart,
  type CartLine,
} from './components/cart/CartContext';
export { CartBadge, type CartBadgeProps } from './components/cart/CartBadge';

// Product
export { ProductCard, type ProductCardProps } from './components/product/ProductCard';
export { ProductGrid, type ProductGridProps } from './components/product/ProductGrid';
