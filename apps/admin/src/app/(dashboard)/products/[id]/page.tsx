import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../../lib/admin-fetch';

import { ProductEditForm } from './ProductEditForm';
import styles from './ProductEditForm.module.scss';

interface AdminProductDetail {
  id: string;
  slug: string;
  nameTr: string;
  descriptionMd: string;
  defaultPriceMinor: number;
  currency: string;
  status: 'visible' | 'hidden' | 'needs_review';
  diaParentKey: string | null;
  diaSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
  brand: { id: string; name: string } | null;
  category: { id: string; nameTr: string } | null;
  variants: {
    id: string;
    sku: string;
    diaStokkartkodu: string;
    size: string | null;
    color: string | null;
    stockQty: number;
    priceOverrideMinor: number | null;
  }[];
  images: {
    id: string;
    url: string;
    sortOrder: number;
    isPrimary: boolean;
    source: 'dia' | 'manual';
  }[];
}

interface BrandOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  nameTr: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: 'Ürün Düzenle' };

const STATUS_LABELS: Record<AdminProductDetail['status'], string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const STATUS_TONE: Record<AdminProductDetail['status'], 'visible' | 'hidden' | 'review'> = {
  visible: 'visible',
  hidden: 'hidden',
  needs_review: 'review',
};

const TL = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
});

export default async function ProductEditPage({ params }: PageProps) {
  const { id } = await params;
  const [product, brands, categories] = await Promise.all([
    fetchAdmin<AdminProductDetail | null>(`/admin/products/${id}`),
    fetchAdmin<BrandOption[]>('/admin/brands'),
    fetchAdmin<CategoryOption[]>('/admin/categories'),
  ]);
  if (
    product === ADMIN_NOT_AUTHENTICATED ||
    brands === ADMIN_NOT_AUTHENTICATED ||
    categories === ADMIN_NOT_AUTHENTICATED
  ) {
    redirect('/login');
  }
  if (!product) notFound();

  return (
    <div className={styles.page}>
      <nav aria-label="breadcrumb" className={styles.breadcrumb}>
        <Link href="/products">Ürünler</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{product.nameTr}</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroPrimary}>
          <p className={styles.heroEyebrow}>Ürün düzenleme</p>
          <h1 className={styles.heroTitle}>{product.nameTr}</h1>
          <div className={styles.heroMeta}>
            <span>
              <code>{product.slug}</code>
            </span>
            {product.diaParentKey && (
              <span>
                DIA: <code>{product.diaParentKey}</code>
              </span>
            )}
            <span>ID: {product.id.slice(0, 8)}</span>
            <Link
              className={styles.heroLink}
              href={`/products/${product.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              Mağazada görüntüle ↗
            </Link>
          </div>
        </div>
        <div className={styles.heroSecondary}>
          <span
            className={styles.heroStatus}
            data-tone={STATUS_TONE[product.status]}
            aria-label={`Durum: ${STATUS_LABELS[product.status]}`}
          >
            {STATUS_LABELS[product.status]}
          </span>
          <span className={styles.heroPrice}>{TL.format(product.defaultPriceMinor / 100)}</span>
        </div>
      </header>

      <ProductEditForm product={product} brands={brands} categories={categories} />
    </div>
  );
}
