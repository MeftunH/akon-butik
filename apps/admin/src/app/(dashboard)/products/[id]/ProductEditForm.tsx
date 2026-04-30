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
    <section>
      <h2 className="h6 fw-bold mb-3">Genel Bilgiler</h2>
      <form onSubmit={(e) => void onSubmit(e)} noValidate>
        <div className="mb-3">
          <label htmlFor="nameTr" className="form-label">
            Ürün adı
          </label>
          <input id="nameTr" className="form-control" {...register('nameTr')} />
          {formState.errors.nameTr && (
            <small className="text-danger">{formState.errors.nameTr.message}</small>
          )}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label htmlFor="priceTl" className="form-label">
              Fiyat ({product.currency})
            </label>
            <input
              id="priceTl"
              inputMode="decimal"
              className="form-control"
              {...register('priceTl')}
            />
            {formState.errors.priceTl && (
              <small className="text-danger">{formState.errors.priceTl.message}</small>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="status" className="form-label">
              Durum
            </label>
            <select id="status" className="form-select" {...register('status')}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="brandId" className="form-label">
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
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
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
        </div>

        <div className="mb-3">
          <label htmlFor="descriptionMd" className="form-label">
            Açıklama (markdown)
          </label>
          <textarea
            id="descriptionMd"
            rows={6}
            className="form-control"
            {...register('descriptionMd')}
          />
        </div>

        {feedback && (
          <div className={`alert alert-${feedback.tone} small mb-3`} role="status">
            {feedback.message}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
      </form>
    </section>
  );
}

function parsePriceToMinor(input: string): number {
  const normalized = input.replace(',', '.');
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.round(value * 100);
}
