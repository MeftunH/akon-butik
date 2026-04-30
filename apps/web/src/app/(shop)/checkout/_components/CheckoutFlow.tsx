'use client';

import { Price, useCart } from '@akonbutik/ui';
import { TR_ILLER } from '@akonbutik/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const phoneRegex = /^(\+?90|0)?5\d{9}$/;
const postalRegex = /^\d{5}$/;

const addressSchema = z.object({
  adSoyad: z.string().trim().min(2, 'Ad soyad en az 2 karakter olmalı').max(120),
  telefon: z.string().regex(phoneRegex, 'Geçerli bir Türk cep telefonu girin'),
  il: z.string().min(2, 'İl seçin'),
  ilce: z.string().trim().min(2, 'İlçe en az 2 karakter olmalı').max(60),
  acikAdres: z
    .string()
    .trim()
    .min(10, 'Açık adres en az 10 karakter olmalı')
    .max(500),
  postaKodu: z.string().regex(postalRegex, '5 haneli posta kodu girin'),
});

const checkoutSchema = z.object({
  customerEmail: z.string().email('Geçerli bir e-posta girin'),
  customerName: z.string().trim().min(2).max(120),
  customerPhone: z.string().regex(phoneRegex, 'Geçerli bir Türk cep telefonu girin'),
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  notes: z.string().trim().max(500).optional(),
  shippingSameAsBilling: z.boolean(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const EMPTY_ADDRESS = {
  adSoyad: '',
  telefon: '',
  il: '',
  ilce: '',
  acikAdres: '',
  postaKodu: '',
};

export function CheckoutFlow() {
  const { cart, loading } = useCart();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, control, handleSubmit, watch, setValue, formState } =
    useForm<CheckoutFormValues>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
        customerEmail: '',
        customerName: '',
        customerPhone: '',
        billingAddress: EMPTY_ADDRESS,
        shippingAddress: EMPTY_ADDRESS,
        notes: '',
        shippingSameAsBilling: true,
      },
    });

  const sameAsBilling = watch('shippingSameAsBilling');
  const billing = watch('billingAddress');

  if (loading) return <p className="text-center text-muted py-5">Sepetiniz yükleniyor…</p>;
  if (cart.items.length === 0) {
    return (
      <main className="container py-5 text-center">
        <p className="text-muted mb-3">Sepetiniz boş — ödeme yapmak için ürün ekleyin.</p>
        <Link href="/shop" className="btn btn-primary">
          Mağazaya Dön
        </Link>
      </main>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const payload = {
        customerEmail: values.customerEmail,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        notes: values.notes,
        billingAddress: { type: 'fatura' as const, ...values.billingAddress },
        shippingAddress: {
          type: 'teslimat' as const,
          ...(values.shippingSameAsBilling ? values.billingAddress : values.shippingAddress),
        },
      };
      const res = await fetch('/api/checkout/init', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? 'Ödeme başlatılamadı');
      }
      const data = (await res.json()) as { redirectUrl: string };
      router.push(data.redirectUrl);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
      setSubmitting(false);
    }
  });

  return (
    <main className="container py-5">
      <h1 className="h2 fw-bold mb-4">Ödeme</h1>
      <form onSubmit={(e) => void onSubmit(e)} noValidate>
        <div className="row gx-5">
          <section className="col-lg-8">
            <fieldset className="mb-4">
              <legend className="h5 fw-bold mb-3">İletişim</legend>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="customerName">
                    Ad Soyad
                  </label>
                  <input
                    id="customerName"
                    className="form-control"
                    {...register('customerName')}
                  />
                  {formState.errors.customerName && (
                    <small className="text-danger">{formState.errors.customerName.message}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="customerEmail">
                    E-posta
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    className="form-control"
                    {...register('customerEmail')}
                  />
                  {formState.errors.customerEmail && (
                    <small className="text-danger">
                      {formState.errors.customerEmail.message}
                    </small>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="customerPhone">
                    Telefon
                  </label>
                  <input
                    id="customerPhone"
                    className="form-control"
                    placeholder="0555 123 45 67"
                    {...register('customerPhone')}
                  />
                  {formState.errors.customerPhone && (
                    <small className="text-danger">
                      {formState.errors.customerPhone.message}
                    </small>
                  )}
                </div>
              </div>
            </fieldset>

            <AddressFieldset
              prefix="billingAddress"
              title="Fatura Adresi"
              register={register}
              control={control}
              setValue={setValue}
              errors={formState.errors.billingAddress}
            />

            <div className="form-check mb-3">
              <input
                id="sameAsBilling"
                type="checkbox"
                className="form-check-input"
                {...register('shippingSameAsBilling')}
              />
              <label className="form-check-label" htmlFor="sameAsBilling">
                Teslimat adresim fatura adresimle aynı
              </label>
            </div>

            {!sameAsBilling && (
              <AddressFieldset
                prefix="shippingAddress"
                title="Teslimat Adresi"
                register={register}
                control={control}
                setValue={setValue}
                errors={formState.errors.shippingAddress}
              />
            )}

            <fieldset className="mb-4">
              <label className="form-label" htmlFor="notes">
                Sipariş notu (opsiyonel)
              </label>
              <textarea
                id="notes"
                rows={3}
                className="form-control"
                {...register('notes')}
              />
            </fieldset>
          </section>

          <aside className="col-lg-4">
            <div className="cart-summary border rounded p-4 sticky-top" style={{ top: 100 }}>
              <h2 className="h5 fw-bold mb-3">Sipariş Özeti</h2>
              <ul className="list-unstyled mb-3">
                {cart.items.map((line) => (
                  <li key={line.variantId} className="d-flex justify-content-between mb-2">
                    <span>
                      {line.product.nameTr} · ×{line.quantity}
                    </span>
                    <Price
                      amount={{
                        amountMinor: line.variant.priceMinor * line.quantity,
                        currency: 'TRY',
                      }}
                    />
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mb-2">
                <span>Ara Toplam</span>
                <Price amount={{ amountMinor: cart.subtotalMinor, currency: 'TRY' }} />
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Kargo</span>
                {cart.shippingMinor === 0 ? (
                  <span className="text-success">Ücretsiz</span>
                ) : (
                  <Price amount={{ amountMinor: cart.shippingMinor, currency: 'TRY' }} />
                )}
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Toplam</span>
                <Price
                  amount={{ amountMinor: cart.totalMinor, currency: 'TRY' }}
                  size="lg"
                />
              </div>
              {submitError && (
                <p className="text-danger small mb-2" role="alert">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={submitting || !billing}
              >
                {submitting ? 'Yönlendiriliyor…' : 'Siparişi Tamamla'}
              </button>
              <p className="small text-muted mt-3 mb-0">
                * Şu anda ödeme sandbox modunda — gerçek bir kart çekilmez.
              </p>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}

interface AddressFieldsetProps {
  prefix: 'billingAddress' | 'shippingAddress';
  title: string;
  register: ReturnType<typeof useForm<CheckoutFormValues>>['register'];
  control: ReturnType<typeof useForm<CheckoutFormValues>>['control'];
  setValue: ReturnType<typeof useForm<CheckoutFormValues>>['setValue'];
  errors: ReturnType<typeof useForm<CheckoutFormValues>>['formState']['errors']['billingAddress'];
}

function AddressFieldset({ prefix, title, register, control, errors }: AddressFieldsetProps) {
  return (
    <fieldset className="mb-4">
      <legend className="h5 fw-bold mb-3">{title}</legend>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Ad Soyad</label>
          <input className="form-control" {...register(`${prefix}.adSoyad` as const)} />
          {errors?.adSoyad && <small className="text-danger">{errors.adSoyad.message}</small>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Telefon</label>
          <input
            className="form-control"
            placeholder="0555 123 45 67"
            {...register(`${prefix}.telefon` as const)}
          />
          {errors?.telefon && <small className="text-danger">{errors.telefon.message}</small>}
        </div>
        <div className="col-md-4">
          <label className="form-label">İl</label>
          <Controller
            control={control}
            name={`${prefix}.il` as const}
            render={({ field }) => (
              <select className="form-select" {...field} value={field.value ?? ''}>
                <option value="" disabled>
                  İl seçin
                </option>
                {TR_ILLER.map((il) => (
                  <option key={il.code} value={il.name}>
                    {il.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors?.il && <small className="text-danger">{errors.il.message}</small>}
        </div>
        <div className="col-md-4">
          <label className="form-label">İlçe</label>
          <input className="form-control" {...register(`${prefix}.ilce` as const)} />
          {errors?.ilce && <small className="text-danger">{errors.ilce.message}</small>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Posta Kodu</label>
          <input
            className="form-control"
            inputMode="numeric"
            maxLength={5}
            {...register(`${prefix}.postaKodu` as const)}
          />
          {errors?.postaKodu && (
            <small className="text-danger">{errors.postaKodu.message}</small>
          )}
        </div>
        <div className="col-12">
          <label className="form-label">Açık Adres</label>
          <textarea
            rows={2}
            className="form-control"
            {...register(`${prefix}.acikAdres` as const)}
          />
          {errors?.acikAdres && (
            <small className="text-danger">{errors.acikAdres.message}</small>
          )}
        </div>
      </div>
    </fieldset>
  );
}
