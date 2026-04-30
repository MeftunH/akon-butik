import {
  CartBadge,
  CartProvider,
  Footer,
  Header,
  NewsletterForm,
  Topbar,
} from '@akonbutik/ui';
import Link from 'next/link';
import type { ReactNode } from 'react';

const navLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Mağaza', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hakkımızda', href: '/about' },
  { label: 'İletişim', href: '/contact' },
];

const footerColumns = [
  {
    title: 'Müşteri Hizmetleri',
    links: [
      { label: 'İletişim', href: '/contact' },
      { label: 'Sipariş Takibi', href: '/track-order' },
      { label: 'İade ve Değişim', href: '/iade-degisim' },
      { label: 'SSS', href: '/faq' },
    ],
  },
  {
    title: 'Akon Butik',
    links: [
      { label: 'Hakkımızda', href: '/about' },
      { label: 'Mağazalar', href: '/store-list' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { label: 'KVKK Aydınlatma', href: '/kvkk' },
      { label: 'Çerez Politikası', href: '/cerezler' },
      { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
    ],
  },
];

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Topbar announcement="450 TL ve üzeri alışverişlerde kargo bedava" />
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
      <Footer
        brandName="AKON BUTİK"
        tagline="Şıklığın butik adresi."
        columns={footerColumns}
        newsletter={<NewsletterForm />}
        copyright="Akon Butik. Tüm hakları saklıdır."
      />
    </CartProvider>
  );
}
