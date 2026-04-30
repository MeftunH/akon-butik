import { Button, Price } from '@akonbutik/ui';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');
  return (
    <main className="container py-5">
      <h1 className="display-4 mb-3">{t('brandName')}</h1>
      <p className="lead text-muted">
        Storefront skeleton — Phase 2 will port the Ocaka home page here.
      </p>
      <div className="d-flex gap-3 align-items-center mt-4">
        <Button variant="primary">Sepete Ekle (smoke test)</Button>
        <Price amount={{ amountMinor: 12345, currency: 'TRY' }} />
      </div>
    </main>
  );
}
