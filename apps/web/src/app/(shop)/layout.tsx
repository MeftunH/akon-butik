import { CartBadge, CartProvider, Footer, Header, WishlistProvider } from '@akonbutik/ui';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Topbar } from './_components/Topbar';

const navLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Mağaza', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hakkımızda', href: '/about' },
  { label: 'İletişim', href: '/contact' },
];

const topbarCategories = [
  { label: 'Kadın', href: '/shop?category=kadin' },
  { label: 'Yeni Sezon', href: '/shop?sort=newest' },
];

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Topbar categoryLinks={topbarCategories} />
        <Header
          brandName="AKON BUTİK"
          brandHref="/"
          links={navLinks}
          accountSlot={
            <Link href="/account" aria-label="Hesabım" className="nav-icon-item">
              <i className="icon icon-user" aria-hidden />
            </Link>
          }
          wishlistSlot={
            <Link href="/wishlist" aria-label="Favoriler" className="nav-icon-item">
              <i className="icon icon-heart" aria-hidden />
            </Link>
          }
          cartSlot={<CartBadge />}
        />
        {children}
        <Footer />
      </WishlistProvider>
    </CartProvider>
  );
}
