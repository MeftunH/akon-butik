import Link from 'next/link';

import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Blog' };

export default function BlogPage() {
  return (
    <StaticPage
      title="Blog"
      lead="Stil rehberleri, koleksiyon hikayeleri, ilham."
      breadcrumbs={[{ label: 'Blog' }]}
    >
      <div className="text-center py-5">
        <p className="lead text-muted mb-4">
          Akon Butik blogu çok yakında. İlk yazılarımız sezon trendleri, stil önerileri ve marka
          hikayemiz üzerine olacak.
        </p>
        <Link href="/shop" className="tf-btn animate-btn fw-semibold">
          Mağazaya git <i className="icon icon-arrow-right" />
        </Link>
      </div>
    </StaticPage>
  );
}
