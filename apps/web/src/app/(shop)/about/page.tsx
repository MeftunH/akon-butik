import type { Metadata } from 'next';

import { AboutAtelier } from './_components/AboutAtelier';
import { AboutBrandStory } from './_components/AboutBrandStory';
import { AboutCta } from './_components/AboutCta';
import { AboutPageTitle } from './_components/AboutPageTitle';
import { AboutStats } from './_components/AboutStats';

/**
 * /about — brand storytelling page. Composed of five vendor-styled bands
 * (page-title hero, brand story grid, atelier pillars, stats strip, CTA
 * footer) so each section can evolve independently without mutating the
 * vendor SCSS bundle. Copy is original Turkish prose tuned for the Akon
 * Butik voice; no lorem, no SaaS clichés.
 */
export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Akon Butik, Sakarya Adapazarı Çark Caddesi’ndeki butiğinden Türkiye’nin her iline kombin ulaştıran bir kadın giyim markasıdır.',
  openGraph: {
    title: 'Hakkımızda · Akon Butik',
    description: 'Sakarya’nın butik adresi. Şıklığın haftalık hali, Çark Caddesi’nden.',
    images: [{ url: '/images/section/about-us.jpg', width: 1920, height: 900 }],
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="page-about">
      <AboutPageTitle />
      <AboutBrandStory />
      <AboutAtelier />
      <AboutStats />
      <AboutCta />
    </main>
  );
}
