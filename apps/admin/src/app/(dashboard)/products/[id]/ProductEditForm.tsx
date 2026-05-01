'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BrandOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  nameTr: string;
}

interface ProductLite {
  id: string;
  nameTr: string;
  descriptionMd: string;
  defaultPriceMinor: number;
  currency: string;
  status: 'visible' | 'hidden' | 'needs_review';
  brand: { id: string; name: string } | null;
  category: { id: string; nameTr: string } | null;
}

const STATUS_LABELS: Record<ProductLite['status'], string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const formSchema = z.object({
  nameTr: z.string().trim().min(1, 'Ad zorunlu').max(255),
  descriptionMd: z.string().max(10000),
  // Display in TL with 2 decimals; convert to minor units on submit.
  priceTl: z
    .string()
    .min(1, 'Fiyat zorunlu')
    .regex(/^\d+([.,]\d{1,2})?$/, 'Geçerli bir fiyat girin (örn. 1299,90)'),
  status: z.enum(['visible', 'hidden', 'needs_review']),
  brandId: z.string(),
  categoryId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductEditFormProps {
  product: ProductLite;
  brands: readonly BrandOption[];
  categories: readonly CategoryOption[];
}

/**
 * Sectioned product edit form (Genel / Fiyat & Durum / Açıklama). Each
 * section reads as a vendor `box-info` card with vendor input styles
 * (see `_form.scss`). Submit hits PATCH /api/admin/products/:id with
 * the same payload as before — only the chrome changed.
 */
export function ProductEditForm({ product, brands, categories }: ProductEditFormProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'danger'; message: string } | null>(
    null,
  );

  const initialPriceTl = (product.defaultPriceMinor / 100).toFixed(2).replace('.', ',');

  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameTr: product.nameTr,
      descriptionMd: product.descriptionMd,
      priceTl: initialPriceTl,
      status: product.status,
      brandId: product.brand?.id ?? '',
      categoryId: product.category?.id ?? '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null);
    const priceMinor = parsePriceToMinor(values.priceTl);
    const payload = {
      nameTr: values.nameTr,
      descriptionMd: values.descriptionMd,
      defaultPriceMinor: priceMinor,
      status: values.status,
      brandId: values.brandId === '' ? null : values.brandId,
      categoryId: values.categoryId === '' ? null : values.categoryId,
    };
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? `Güncelleme başarısız (${res.status.toString()})`);
      }
      const updated = (await res.json()) as ProductLite & { defaultPriceMinor: number };
      reset({
        ...values,
        priceTl: (updated.defaultPriceMinor / 100).toFixed(2).replace('.', ','),
      });
      setFeedback({ tone: 'success', message: 'Değişiklikler kaydedildi.' });
      router.refresh();
    } catch (err) {
      setFeedback({
        tone: 'danger',
        message: err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu',
      });
    }
  });

  return (
    <form className="product-edit-form" onSubmit={(e) => void onSubmit(e)} noValidate>
      <section className="dashboard-card mb-4">
        <h3 className="account-title type-semibold h5 mb-3">Genel Bilgiler</h3>
        <div className="list-ver">
          <fieldset>
            <label htmlFor="nameTr" className="form-label h6 fw-semibold">
              Ürün adı
            </label>
            <input
              id="nameTr"
              type="text"
              placeholder="Örn. Kruvaze Yaka Triko Bluz"
              aria-invalid={Boolean(formState.errors.nameTr)}
              {...register('nameTr')}
            />
            {formState.errors.nameTr && (
              <small className="text-danger d-block mt-2">{formState.errors.nameTr.message}</small>
            )}
          </fieldset>

          <div className="row g-3">
            <fieldset className="col-md-6">
              <label htmlFor="brandId" className="form-label h6 fw-semibold">
                Marka
              </label>
              <select id="brandId" className="form-select" {...register('brandId')}>
                <option value="">— Atanmadı —</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="col-md-6">
              <label htmlFor="categoryId" className="form-label h6 fw-semibold">
                Kategori
              </label>
              <select id="categoryId" className="form-select" {...register('categoryId')}>
                <option value="">— Atanmadı —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameTr}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="dashboard-card mb-4">
        <h3 className="account-title type-semibold h5 mb-3">Fiyat & Durum</h3>
        <div className="row g-3">
          <fieldset className="col-md-6">
            <label htmlFor="priceTl" className="form-label h6 fw-semibold">
              Fiyat ({product.currency})
            </label>
            <input
              id="priceTl"
              type="text"
              inputMode="decimal"
              placeholder="1299,90"
              aria-invalid={Boolean(formState.errors.priceTl)}
              {...register('priceTl')}
            />
            {formState.errors.priceTl && (
              <small className="text-danger d-block mt-2">{formState.errors.priceTl.message}</small>
            )}
          </fieldset>
          <fieldset className="col-md-6">
            <label htmlFor="status" className="form-label h6 fw-semibold">
              Durum
            </label>
            <select id="status" className="form-select" {...register('status')}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
      </section>

      <section className="dashboard-card mb-4">
        <h3 className="account-title type-semibold h5 mb-3">Açıklama</h3>
        <fieldset>
          <label htmlFor="descriptionMd" className="form-label h6 fw-semibold">
            Markdown destekli açıklama
          </label>
          <textarea id="descriptionMd" rows={8} {...register('descriptionMd')} />
        </fieldset>
      </section>

      {feedback && (
        <div className={`alert alert-${feedback.tone} mb-3`} role="status">
          <span className="h6 fw-normal">{feedback.message}</span>
        </div>
      )}

      <button type="submit" className="tf-btn animate-btn" disabled={formState.isSubmitting}>
        <i className="icon icon-check-1 me-2" />
        {formState.isSubmitting ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    </form>
  );
}

function parsePriceToMinor(input: string): number {
  const normalized = input.replace(',', '.');
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.round(value * 100);
}
