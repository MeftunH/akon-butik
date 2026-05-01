import Link from 'next/link';

import styles from './ProductRow.module.scss';

export type ProductStatusKey = 'visible' | 'hidden' | 'needs_review';

export interface ProductRowData {
  id: string;
  slug: string;
  nameTr: string;
  status: ProductStatusKey;
  defaultPriceMinor: number;
  currency: string;
  diaParentKey: string | null;
  diaSyncedAt: string | null;
  brand: { id: string; name: string } | null;
  category: { id: string; nameTr: string } | null;
  variantCount: number;
  /**
   * Total stock across variants. The current admin list endpoint does not
   * yet return this; we surface it as `null` to display "—" until the
   * backend includes it (see report — Phase 5b backend gap).
   */
  totalStock: number | null;
  /**
   * Primary image URL for the row thumbnail. Currently unsupplied by the
   * list endpoint (`/admin/products` does not include the images relation),
   * so the thumbnail falls back to an icon. Phase 5b backend extension
   * would surface `images: { url, isPrimary }` and unblock this.
   */
  primaryImageUrl: string | null;
}

const STATUS_LABELS: Record<ProductStatusKey, string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const formatTl = (minor: number): string =>
  new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(minor / 100);

const formatRelativeDate = (iso: string | null): string => {
  if (!iso) return '—';
  const dt = new Date(iso);
  return dt.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });
};

const stockTone = (n: number | null): 'ok' | 'warn' | 'out' => {
  if (n === null) return 'ok';
  if (n === 0) return 'out';
  if (n <= 4) return 'warn';
  return 'ok';
};

interface ProductListProps {
  items: readonly ProductRowData[];
}

/**
 * Editorial product row list. We use a CSS Grid layout (not a vendor
 * `<table>`) so each row reads like a buying-team line in a lookbook
 * spreadsheet: thumbnail, identity (name + brand + category + DIA key),
 * price, stock, status pill, action. The header row is the only place
 * where we surface column labels — they're tiny, uppercase, and quiet.
 */
export function ProductList({ items }: ProductListProps) {
  if (items.length === 0) return null;

  return (
    <div className={styles.list} role="table" aria-label="Ürün listesi">
      <div className={styles.headerRow} role="row">
        <span aria-hidden />
        <span role="columnheader">Ürün</span>
        <span role="columnheader">Fiyat</span>
        <span role="columnheader">Stok</span>
        <span role="columnheader">Durum</span>
        <span role="columnheader" style={{ textAlign: 'right' }}>
          İşlem
        </span>
      </div>
      {items.map((p) => (
        <ProductRow key={p.id} product={p} />
      ))}
    </div>
  );
}

function ProductRow({ product }: { product: ProductRowData }) {
  const tone = stockTone(product.totalStock);

  return (
    <div className={styles.row} role="row">
      <div className={`${styles.thumb} row-thumb`} role="cell">
        {product.primaryImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.primaryImageUrl} alt="" loading="lazy" />
        ) : (
          <i className={`icon icon-image-square ${styles.thumbFallback}`} aria-hidden />
        )}
      </div>

      <div className={styles.identity} role="cell">
        <h3 className={styles.name}>
          <Link href={`/products/${product.id}`}>{product.nameTr}</Link>
        </h3>
        <div className={styles.meta}>
          {product.brand && <span className={styles.metaPiece}>{product.brand.name}</span>}
          {product.category && <span className={styles.metaPiece}>{product.category.nameTr}</span>}
          {!product.brand && !product.category && (
            <span className={styles.metaPiece}>Marka ve kategori atanmamış</span>
          )}
          {product.diaParentKey && (
            <span className={`${styles.metaPiece} ${styles.dia}`}>DIA {product.diaParentKey}</span>
          )}
        </div>
      </div>

      <div className={styles.price} role="cell">
        <span className={styles.priceMajor}>{formatTl(product.defaultPriceMinor)}</span>
        <span className={styles.priceCurrency}>{product.currency}</span>
      </div>

      <div className={styles.inventory} role="cell">
        <span className={styles.stockNumber} data-tone={tone}>
          {product.totalStock !== null ? product.totalStock.toString() : '—'}
        </span>
        <span className={styles.variantNote}>
          {product.variantCount === 0
            ? 'variant yok'
            : `${product.variantCount.toString()} variant`}
        </span>
      </div>

      <div className={styles.status} role="cell">
        <span className={styles.statusBadge} data-tone={product.status}>
          {STATUS_LABELS[product.status]}
        </span>
        <span className={styles.lastSync}>
          {product.diaSyncedAt
            ? `Senkron ${formatRelativeDate(product.diaSyncedAt)}`
            : 'Henüz senkronlanmadı'}
        </span>
      </div>

      <div className={styles.action} role="cell">
        <Link href={`/products/${product.id}`}>
          Düzenle
          <i className="icon icon-arrow-right" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

interface ProductEmptyProps {
  hasFilters: boolean;
}

/**
 * Boutique-tone empty state. Two variants: "no results for current
 * filters" (chatty, suggests adjustments) vs "catalog is empty" (warm,
 * points at DIA sync).
 */
export function ProductEmpty({ hasFilters }: ProductEmptyProps) {
  return (
    <div className={styles.empty}>
      <i className={`icon ${hasFilters ? 'icon-search' : 'icon-bag-simple'} ${styles.emptyIcon}`} />
      {hasFilters ? (
        <>
          <h3 className={styles.emptyTitle}>Bu filtrelerle eşleşen bir ürün yok.</h3>
          <p className={styles.emptyBody}>
            Filtreleri biraz gevşetmeyi deneyin. Marka, kategori veya durum seçimini sıfırlamak çoğu
            zaman aradığınız ürünü geri getirir.
          </p>
        </>
      ) : (
        <>
          <h3 className={styles.emptyTitle}>Katalog henüz boş.</h3>
          <p className={styles.emptyBody}>
            DIA senkronu çalıştırarak ürünleri buraya getirin; sonra bu sayfada görselleri yükleyip
            kategorileri atayabilirsiniz.
          </p>
        </>
      )}
    </div>
  );
}
