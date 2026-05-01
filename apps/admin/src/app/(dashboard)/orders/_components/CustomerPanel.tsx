import styles from './orders.module.scss';

export interface AddressSnap {
  adSoyad?: string;
  telefon?: string;
  il?: string;
  ilce?: string;
  acikAdres?: string;
  postaKodu?: string;
}

interface CustomerPanelProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: AddressSnap;
  billingAddress: AddressSnap;
  notes: string | null;
}

function AddressBlock({ address, label }: { address: AddressSnap; label: string }) {
  return (
    <div className={styles.addressBlock}>
      <p className={styles.addressEyebrow}>{label}</p>
      {address.adSoyad ? (
        <address>
          <strong>{address.adSoyad}</strong>
          {address.acikAdres && (
            <>
              {address.acikAdres}
              <br />
            </>
          )}
          {(address.ilce ?? address.il) && (
            <>
              {address.ilce} {address.il && '/'} {address.il} {address.postaKodu}
              <br />
            </>
          )}
          {address.telefon && (
            <span>
              <a href={`tel:${address.telefon}`} style={{ color: 'inherit' }}>
                {address.telefon}
              </a>
            </span>
          )}
        </address>
      ) : (
        <p className="h6 text-main mb-0" style={{ marginTop: 8 }}>
          Adres bilgisi yok.
        </p>
      )}
    </div>
  );
}

/**
 * "Müşteri" tab body — paired address blocks, contact grid below, then
 * an optional order note. No identical card grid; the address grid is
 * a single bordered frame split with a vertical divider, the contact
 * grid is a typographic key-value run.
 */
export function CustomerPanel({
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  billingAddress,
  notes,
}: CustomerPanelProps) {
  return (
    <div>
      <div className={styles.addressGrid}>
        <AddressBlock address={shippingAddress} label="Teslimat Adresi" />
        <AddressBlock address={billingAddress} label="Fatura Adresi" />
      </div>

      <div className={styles.contactGrid}>
        <div>
          <span className="label">Müşteri</span>
          <span className="value">{customerName}</span>
        </div>
        <div>
          <span className="label">E-posta</span>
          <span className="value">
            <a href={`mailto:${customerEmail}`} style={{ color: 'inherit' }}>
              {customerEmail}
            </a>
          </span>
        </div>
        {customerPhone && (
          <div>
            <span className="label">Telefon</span>
            <span className="value">
              <a href={`tel:${customerPhone}`} style={{ color: 'inherit' }}>
                {customerPhone}
              </a>
            </span>
          </div>
        )}
      </div>

      {notes && (
        <div style={{ marginTop: 24 }}>
          <p className={styles.sectionEyebrow}>Sipariş Notu</p>
          <p
            className="h6"
            style={{
              padding: '14px 16px',
              background: 'oklch(0.97 0.005 260)',
              border: '1px solid var(--line, #e1e4e8)',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {notes}
          </p>
        </div>
      )}
    </div>
  );
}
