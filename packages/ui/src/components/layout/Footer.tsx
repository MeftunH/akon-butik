'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { NewsletterForm } from './NewsletterForm';

/**
 * Storefront footer. Direct 1:1 port of vendor `Footer2.tsx` (the footer
 * `home-fashion-2` ships with): `tf-footer` shell, brand block + contact +
 * social, three column blocks, newsletter, and the inner-bottom payment
 * row. Identical class names to vendor SCSS — `_footer.scss` is loaded as
 * part of the Ocaka SCSS bundle in apps/web/src/styles/ocaka.scss, so this
 * picks up the demo's typography and spacing automatically.
 *
 * Variations from vendor:
 *   - Currency / language selectors are gone (Akon Butik is TR-only).
 *   - Logo block uses brand text instead of the demo `logo.svg` until the
 *     Akon Butik logomark lands.
 *   - Mobile collapse keeps vendor's `footer-heading-mobile` toggle.
 *
 * Hard-coded copy on purpose — there's exactly one footer per app and a
 * props-based abstraction was just adding indirection. Edit this file
 * directly when the legal pages or social handles change.
 */
export function Footer() {
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 575);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleBlock = (key: string): void => {
    if (!isMobile) return;
    setOpenBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getContentStyle = (key: string): React.CSSProperties => {
    if (!isMobile) return { height: 'auto' };
    return {
      height: openBlocks[key] ? 'auto' : '0px',
      marginTop: openBlocks[key] ? '10px' : '0px',
      overflow: 'hidden',
      transition: 'height 0.3s ease',
    };
  };

  return (
    <footer className="tf-footer">
      <div className="container d-flex">
        <span className="br-line" />
      </div>
      <div className="footer-body">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb_30 mb-xl-0">
              <div className="footer-infor">
                <Link href="/" className="logo-site">
                  <span className="brand-text fs-3 fw-bold text-emp">AKON BUTİK</span>
                </Link>
                <ul className="footer-contact mb-0">
                  <li>
                    <i className="icon icon-map-pin" />
                    <span className="br-line" />
                    <a
                      href="https://www.google.com/maps?q=Akon+Butik+İstanbul"
                      target="_blank"
                      rel="noreferrer"
                      className="h6 link text-main"
                    >
                      İstanbul, Türkiye
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-phone" />
                    <span className="br-line" />
                    <a href="tel:+908502550000" className="h6 link text-main">
                      +90 (850) 255 00 00
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-envelope-simple" />
                    <span className="br-line" />
                    <a href="mailto:destek@akonbutik.com" className="h6 link text-main">
                      destek@akonbutik.com
                    </a>
                  </li>
                </ul>
                <ul className="tf-social-icon_2">
                  <li>
                    <a
                      href="https://www.instagram.com/akonbutik"
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      aria-label="Instagram"
                    >
                      <i className="icon-instagram-logo" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/akonbutik"
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      aria-label="Facebook"
                    >
                      <i className="icon-fb" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@akonbutik"
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      aria-label="TikTok"
                    >
                      <i className="icon-tiktok" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/908502550000"
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      aria-label="WhatsApp"
                    >
                      <i className="icon-phone" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-sm-6 mb_30 mb-xl-0">
              <div className="footer-col-block">
                <button
                  type="button"
                  className="footer-heading footer-heading-mobile"
                  onClick={() => {
                    toggleBlock('alisveris');
                  }}
                >
                  Alışveriş
                </button>
                <div className="tf-collapse-content" style={getContentStyle('alisveris')}>
                  <ul className="footer-menu-list">
                    <li>
                      <Link href="/shop" className="link h6">
                        Tüm Ürünler
                      </Link>
                    </li>
                    <li>
                      <Link href="/track-order" className="link h6">
                        Sipariş Takibi
                      </Link>
                    </li>
                    <li>
                      <Link href="/iade-degisim" className="link h6">
                        İade ve Değişim
                      </Link>
                    </li>
                    <li>
                      <Link href="/wishlist" className="link h6">
                        Favorilerim
                      </Link>
                    </li>
                    <li>
                      <Link href="/account" className="link h6">
                        Hesabım
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-sm-6 mb_30 mb-sm-0">
              <div className="footer-col-block">
                <button
                  type="button"
                  className="footer-heading footer-heading-mobile"
                  onClick={() => {
                    toggleBlock('kurumsal');
                  }}
                >
                  Kurumsal
                </button>
                <div className="tf-collapse-content" style={getContentStyle('kurumsal')}>
                  <ul className="footer-menu-list">
                    <li>
                      <Link href="/about" className="link h6">
                        Hakkımızda
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="link h6">
                        İletişim
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="link h6">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="link h6">
                        SSS
                      </Link>
                    </li>
                    <li>
                      <Link href="/kvkk" className="link h6">
                        KVKK Aydınlatma
                      </Link>
                    </li>
                    <li>
                      <Link href="/cerezler" className="link h6">
                        Çerez Politikası
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6">
              <div className="footer-col-block">
                <button
                  type="button"
                  className="footer-heading footer-heading-mobile"
                  onClick={() => {
                    toggleBlock('newsletter');
                  }}
                >
                  Bülten
                </button>
                <div className="tf-collapse-content" style={getContentStyle('newsletter')}>
                  <div className="footer-newsletter">
                    <p className="h6 caption">
                      Yeni koleksiyonlar ve özel kampanyalardan ilk siz haberdar olun.
                    </p>
                    <NewsletterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="inner-bottom">
            <ul className="list-hor">
              <li>
                <Link href="/faq" className="h6 link">
                  Yardım &amp; SSS
                </Link>
              </li>
              <li className="br-line type-vertical" />
              <li>
                <Link href="/kullanim-kosullari" className="h6 link">
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
            <div className="list-hor flex-wrap">
              <span className="h6">Ödeme:</span>
              {/* eslint-disable @next/next/no-img-element -- payment icons are static SVG/PNG, next/image overhead isn't worth it here */}
              <ul className="payment-method-list">
                <li>
                  <img alt="Visa" src="/images/payment/visa.png" width={200} height={128} />
                </li>
                <li>
                  <img
                    alt="Mastercard"
                    src="/images/payment/master-card.png"
                    width={200}
                    height={128}
                  />
                </li>
                <li>
                  <img alt="Amex" src="/images/payment/amex.png" width={200} height={128} />
                </li>
                <li>
                  <img alt="Discover" src="/images/payment/discover.png" width={200} height={128} />
                </li>
              </ul>
              {/* eslint-enable @next/next/no-img-element */}
            </div>
            <div className="list-hor">
              <span className="h6 text-main-2">
                © {new Date().getFullYear().toString()} Akon Butik
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
