'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

export interface HeaderNavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  brandName: string;
  brandHref?: string;
  links: readonly HeaderNavLink[];
  cartSlot?: ReactNode;
  wishlistSlot?: ReactNode;
  accountSlot?: ReactNode;
  /** Override outer class — defaults to the sticky absolute Ocaka style. */
  parentClass?: string;
}

/**
 * Storefront header — Ocaka design language with Next.js routing.
 *
 * The original Ocaka Header1 supports 14 variants and a deeply nested mega-menu.
 * For Akon Butik MVP we ship a single layout: brand + nav links + utility icons.
 * Mega-menu can be added in Phase 5 when product taxonomy stabilises.
 */
export function Header({
  brandName,
  brandHref = '/',
  links,
  cartSlot,
  wishlistSlot,
  accountSlot,
  parentClass = 'tf-header header-fix header-abs-1',
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={clsx(parentClass, scrolled && 'header-sticky')}>
      <div className="px_15 lg-px_40">
        <div className="row-header align-items-center">
          <div className="col-tf-logo">
            <Link href={brandHref} className="logo-header">
              <span className="brand-text">{brandName}</span>
            </Link>
          </div>
          <div className="col-tf-nav">
            <nav className="box-navigation text-center">
              <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                {links.map((link) => (
                  <li key={link.href} className="menu-item">
                    <Link href={link.href} className="item-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-tf-icon">
            <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
              {accountSlot && <li className="nav-account">{accountSlot}</li>}
              {wishlistSlot && <li className="nav-wishlist">{wishlistSlot}</li>}
              {cartSlot && <li className="nav-cart">{cartSlot}</li>}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
