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
      {/*
        Component-scoped style block. Vendor _form.scss flips `.f-content`
        to `flex-direction: column` at `@include res(lg)` (≤991px) which
        wraps the newsletter input under the button — too eager for the
        Akon Butik footer. Override that so the input + submit stay on a
        single row down to 480px, and only stack on true narrow phones.
        Also tightens the social row spacing so Instagram/Facebook/
        Pinterest read as one group, distinct from the contact stack.
      */}
      <style>{FOOTER_INLINE_CSS}</style>
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
                      href="https://www.google.com/maps/search/?api=1&query=Akon+Butik+%C3%87ark+Caddesi+Sakarya"
                      target="_blank"
                      rel="noreferrer"
                      className="h6 link text-main"
                    >
                      Çark Cd. No:13, Adapazarı / Sakarya
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-phone" />
                    <span className="br-line" />
                    <a href="tel:+905335196988" className="h6 link text-main">
                      +90 533 519 69 88
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
                {/*
                  Social row sits in its own labelled block below the
                  contact list so phone/address/email stay vertical and
                  the icons read as a separate cluster (vendor mixed them
                  flush against the phone row, looked awkward).
                */}
                <div className="footer-social">
                  <p className="h6 text-main-2 fw-medium mb-2 footer-social__label">
                    Bizi Takip Edin
                  </p>
                  <ul className="tf-social-icon_2">
                    <li>
                      <a
                        href="https://www.instagram.com/akonbutik/"
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
                        href="https://www.facebook.com/akon.butik/"
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
                        href="https://tr.pinterest.com/akonbutik/"
                        target="_blank"
                        rel="noreferrer"
                        className="link"
                        aria-label="Pinterest"
                      >
                        <i className="icon-pinterest" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/905335196988"
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
      {/*
        Payment row sits in its own band above the inner-bottom legal
        line. Vendor stuck the payment icons flush with copyright; we
        give them an isolated row with subdued grayscale so the row
        reads as a trust signal without shouting.
      */}
      <div className="footer-payment">
        <div className="container">
          <ul className="footer-payment__list" aria-label="Kabul edilen ödeme yöntemleri">
            {/* eslint-disable @next/next/no-img-element -- static brand SVGs, next/image overhead unjustified */}
            <li>
              <img alt="Visa" src="/images/payment/visa-2.svg" width={56} height={36} />
            </li>
            <li>
              <img
                alt="Mastercard"
                src="/images/payment/master-card-2.svg"
                width={56}
                height={36}
              />
            </li>
            <li>
              <img alt="American Express" src="/images/payment/amex-2.svg" width={56} height={36} />
            </li>
            <li>
              <img alt="PayPal" src="/images/payment/paypal-2.svg" width={56} height={36} />
            </li>
            <li>
              <img alt="Discover" src="/images/payment/discover-2.svg" width={56} height={36} />
            </li>
            {/* eslint-enable @next/next/no-img-element */}
          </ul>
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

/**
 * Footer-scoped CSS injected once per render. Kept inline (rather than
 * in vendor SCSS or globals) so the override travels with the component
 * — every consumer of `<Footer />` gets these tweaks without an extra
 * stylesheet import. Tokens picked to match vendor neutrals (no #000 /
 * #fff hex literals — vars resolve to the OKLCH-ish palette already
 * defined in vendor `_variable.scss`).
 */
const FOOTER_INLINE_CSS = `
  .tf-footer .footer-social { margin-top: 4px; }
  .tf-footer .footer-social__label {
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 8px !important;
  }
  .tf-footer .footer-social .tf-social-icon_2 { gap: 12px; flex-wrap: wrap; }

  .tf-footer .form_sub .f-content {
    flex-direction: row;
    align-items: stretch;
    gap: 8px;
    flex-wrap: nowrap;
  }
  .tf-footer .form_sub .f-content > .col {
    flex: 1 1 auto;
    min-width: 0;
  }
  .tf-footer .form_sub .f-content > .col input { width: 100%; }
  .tf-footer .form_sub .f-content > button {
    flex: 0 0 auto;
    white-space: nowrap;
  }
  @media (max-width: 479px) {
    .tf-footer .form_sub .f-content {
      flex-direction: column;
      align-items: stretch;
    }
    .tf-footer .form_sub .f-content > * { width: 100%; }
  }

  .tf-footer .footer-payment {
    border-top: 1px solid var(--line);
  }
  .tf-footer .footer-payment .container {
    padding-top: 24px;
    padding-bottom: 16px;
  }
  .tf-footer .footer-payment__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
  .tf-footer .footer-payment__list li {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 28px;
  }
  .tf-footer .footer-payment__list img {
    height: 100%;
    width: auto;
    display: block;
    filter: grayscale(1);
    opacity: 0.65;
    transition: opacity 0.2s ease, filter 0.2s ease;
  }
  .tf-footer .footer-payment__list li:hover img {
    filter: grayscale(0);
    opacity: 1;
  }
  .tf-footer .footer-bottom .inner-bottom { border-top: 0; }
`;
