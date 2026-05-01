import type { Metadata } from 'next';

import { ContactForm } from './_components/ContactForm';
import { ContactInformation } from './_components/ContactInformation';
import { ContactPageTitle } from './_components/ContactPageTitle';

/**
 * /contact — page-title breadcrumb, address + hours block (with a static
 * map stand-in linking out to Google Maps for routing), and a validated
 * contact form. The form is the only client component on the page; the
 * surrounding chrome stays a server component so SSR HTML carries the
 * full text-only contact information for SEO and assistive tech even
 * before hydration.
 */
export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Akon Butik ile iletişime geçin. Mağaza adresi, telefon, çalışma saatleri ve doğrudan ulaşabileceğiniz iletişim formu.',
  openGraph: {
    title: 'İletişim · Akon Butik',
    description: 'Akon Butik ile iletişime geçin. Mağaza adresi, telefon ve iletişim formu.',
    images: [{ url: '/images/section/contact-information.jpg', width: 1640, height: 1510 }],
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="page-contact">
      <ContactPageTitle />
      <ContactInformation />
      <ContactForm />
    </main>
  );
}
