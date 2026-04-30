import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'İletişim' };

export default function ContactPage() {
  return (
    <StaticPage
      title="İletişim"
      lead="Sorunuz, talebiniz veya iş birliği için bize ulaşın."
      breadcrumbs={[{ label: 'İletişim' }]}
      draft
    >
      <div className="row g-4">
        <div className="col-md-6">
          <h2 className="h5 fw-bold mb-3">İletişim Bilgileri</h2>
          <dl className="row mb-0">
            <dt className="col-sm-4 text-muted fw-normal">E-posta</dt>
            <dd className="col-sm-8 mb-2">
              <a href="mailto:info@akonbutik.com">info@akonbutik.com</a>
            </dd>

            <dt className="col-sm-4 text-muted fw-normal">Telefon</dt>
            <dd className="col-sm-8 mb-2">+90 (000) 000 00 00</dd>

            <dt className="col-sm-4 text-muted fw-normal">Adres</dt>
            <dd className="col-sm-8 mb-0">
              İstanbul, Türkiye
              <br />
              <span className="text-muted small">Tam adres yakında bu sayfada.</span>
            </dd>
          </dl>
        </div>
        <div className="col-md-6">
          <h2 className="h5 fw-bold mb-3">Çalışma Saatleri</h2>
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              Pazartesi – Cuma: <strong>09:00 – 18:00</strong>
            </li>
            <li className="mb-2">
              Cumartesi: <strong>10:00 – 16:00</strong>
            </li>
            <li className="mb-0">Pazar: kapalı</li>
          </ul>
          <p className="text-muted small mt-3 mb-0">E-posta yanıtları 1 iş günü içinde verilir.</p>
        </div>
      </div>

      <hr className="my-5" />

      <h2 className="h5 fw-bold mb-3">Bize Yazın</h2>
      <p className="text-muted">
        İletişim formu yakında bu sayfada olacak. O zamana kadar
        <a href="mailto:info@akonbutik.com"> info@akonbutik.com </a>
        adresine yazabilirsiniz.
      </p>
    </StaticPage>
  );
}
