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
  /** Use container-fluid instead of container. */
  containerFull?: boolean;
}

/**
 * Storefront header — Ocaka design language with Next.js routing.
 *
 * Class names mirror vendor `Header1.tsx` and `_header.scss` exactly so the
 * shipped vendor SCSS actually styles this header. The Phase 2 incarnation
 * invented `row-header` / `col-tf-logo` / `col-tf-nav` selectors that the
 * vendor doesn't define, leaving the header unstyled — those are gone.
 *
 * The original Ocaka Header1 supports 14 variants and a deep mega-menu.
 * For the Akon Butik MVP we ship a single layout: brand + nav links +
 * utility icons. Mega-menu lands when the product taxonomy stabilises.
 */
export function Header({
  brandName,
  brandHref = '/',
  links,
  cartSlot,
  wishlistSlot,
  accountSlot,
  parentClass = 'tf-header header-fix header-abs-1',
  containerFull = false,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={clsx(parentClass, scrolled && 'header-sticky')}>
      <div className={containerFull ? 'container-full' : 'container'}>
        <div className="row align-items-center">
          {/* Mobile menu trigger — visible below xl */}
          <div className="col-md-4 col-3 d-xl-none">
            <a href="#mobileMenu" className="btn-mobile-menu" aria-label="Menü">
              <span />
            </a>
          </div>
          {/* Brand */}
          <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center justify-content-xl-start">
            <Link href={brandHref} className="logo-site">
              <span className="brand-text fs-4 fw-bold">{brandName}</span>
            </Link>
          </div>
          {/* Primary nav — hidden below xl, replaced by mobile drawer */}
          <div className="col-xl-6 d-none d-xl-block">
            <nav className="box-navigation">
              <ul className="box-nav-menu">
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
          {/* Utility icons — account / wishlist / cart */}
          <div className="col-xl-3 col-md-4 col-3">
            <ul className="nav-icon-list">
              {accountSlot && (
                <li className="d-none d-lg-flex">
                  <span className="nav-icon-item link">{accountSlot}</span>
                </li>
              )}
              {wishlistSlot && (
                <li>
                  <span className="nav-icon-item link">{wishlistSlot}</span>
                </li>
              )}
              {cartSlot && (
                <li>
                  <span className="nav-icon-item link">{cartSlot}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
