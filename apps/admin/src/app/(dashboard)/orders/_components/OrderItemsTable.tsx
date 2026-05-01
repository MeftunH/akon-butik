import { formatTl } from './format';
import styles from './orders.module.scss';

export interface OrderItemRow {
  id: string;
  productNameSnap: string;
  variantSku: string;
  size: string | null;
  color: string | null;
  unitPriceMinor: number;
  totalPriceMinor: number;
  quantity: number;
  /** Optional thumbnail URL — admin orders endpoint doesn't surface this yet. */
  imageUrl?: string | null;
}

interface OrderItemsTableProps {
  items: readonly OrderItemRow[];
}

/**
 * Editorial line-items table for the order detail page. Each row
 * carries a product snapshot (no live link out — order line items
 * preserve the snapshot at purchase time, not the current catalog
 * record). Variants render as compact chips so size and colour read
 * inline without crowding the product name.
 */
export function OrderItemsTable({ items }: OrderItemsTableProps) {
  if (items.length === 0) {
    return <p className="h6 text-main mb-0">Bu siparişte ürün satırı yok.</p>;
  }

  return (
    <table className={styles.itemsTable}>
      <thead>
        <tr>
          <th>Ürün</th>
          <th className={styles.qty}>Adet</th>
          <th className={styles.unit}>Birim</th>
          <th className={styles.total}>Tutar</th>
        </tr>
      </thead>
      <tbody>
        {items.map((line) => (
          <tr key={line.id}>
            <td>
              <div className={styles.lineProduct}>
                <div className={styles.thumb} aria-hidden>
                  {line.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={line.imageUrl}
                      alt=""
                      width={64}
                      height={80}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="icon icon-package-thin" />
                  )}
                </div>
                <div className={styles.lineMeta}>
                  <span className={styles.lineName}>{line.productNameSnap}</span>
                  <span className={styles.lineSku}>{line.variantSku}</span>
                  {(line.size ?? line.color) && (
                    <div className={styles.variantRow}>
                      {line.size && (
                        <span className={styles.variantChip}>
                          Beden <strong>{line.size}</strong>
                        </span>
                      )}
                      {line.color && (
                        <span className={styles.variantChip}>
                          Renk <strong>{line.color}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className={styles.qty}>×{line.quantity.toString()}</td>
            <td className={styles.unit}>{formatTl(line.unitPriceMinor)}</td>
            <td className={styles.total}>{formatTl(line.totalPriceMinor)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
