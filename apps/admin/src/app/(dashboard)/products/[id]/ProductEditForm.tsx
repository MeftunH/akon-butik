'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EditSection } from '../_components/EditSection';

import styles from './ProductEditForm.module.scss';

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
  slug: string;
  nameTr: string;
  descriptionMd: string;
  defaultPriceMinor: number;
  currency: string;
  status: 'visible' | 'hidden' | 'needs_review';
  diaSyncedAt: string | null;
  brand: { id: string; name: string } | null;
  category: { id: string; nameTr: string } | null;
}

const STATUS_LABELS: Record<ProductLite['status'], string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const STATUS_DESCRIPTIONS: Record<ProductLite['status'], string> = {
  visible: 'Mağaza vitrininde ve arama sonuçlarında listelenir.',
  hidden: 'Yalnızca admin panelinden erişilir; müşteriler göremez.',
  needs_review: "İçerik tamamlanana kadar storefront'tan gizli; ekip bunun üzerinde çalışıyor.",
};

const formSchema = z.object({
  nameTr: z
    .string()
    .trim()
    .min(2, 'Ürün adı en az 2 karakter olmalı')
    .max(255, 'Ürün adı 255 karakteri aşamaz'),
  descriptionMd: z.string().max(10_000, 'Açıklama 10.000 karakteri aşamaz'),
  // Display in TL with up to 2 decimals; convert to minor units on submit.
  priceTl: z
    .string()
    .min(1, 'Fiyat boş bırakılamaz')
    .regex(
      /^\d+([.,]\d{1,2})?$/,
      'Fiyatı yalnızca rakam ve virgül kullanarak yazın (örn. 1299,90)',
    ),
  status: z.enum(['visible', 'hidden', 'needs_review']),
  brandId: z.string(),
  categoryId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export interface ProductEditFormProps {
  product: ProductLite;
  brands: readonly BrandOption[];
  categories: readonly CategoryOption[];
}

/**
 * Sectioned product edit form. Each section is rendered as a typographic
 * `<EditSection>` block (NOT a dashboard card) so the page reads as one
 * continuous editorial flow. Inputs use a vendor-tinted but non-pill
 * surface (square corners, hairline border) to feel like a buyer's
 * spreadsheet rather than a marketing form.
 *
 * Errors are announced via a polite live region next to the save bar so
 * screen-reader users hear validation feedback at the moment of submit.
 *
 * Submit hits PATCH /api/admin/products/:id with the same payload as
 * before — only the chrome and feedback layer changed.
 */
export function ProductEditForm({ product, brands, categories }: ProductEditFormProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'danger'; message: string } | null>(
    null,
  );

  const initialPriceTl = (product.defaultPriceMinor / 100).toFixed(2).replace('.', ',');

  const { register, handleSubmit, formState, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameTr: product.nameTr,
      descriptionMd: product.descriptionMd,
      priceTl: initialPriceTl,
      status: product.status,
      brandId: product.brand?.id ?? '',
      categoryId: product.category?.id ?? '',
    },
    mode: 'onBlur',
  });

  const watchedStatus = watch('status');

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
        const fallback = `Sunucu yanıtı: ${res.status.toString()}`;
        throw new Error(body?.message ?? `Güncelleme başarısız oldu. ${fallback}`);
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
        message:
          err instanceof Error
            ? err.message
            : 'Bağlantı sırasında bilinmeyen bir hata oluştu, lütfen tekrar deneyin.',
      });
    }
  });

  // Concise list of validation errors for the live region (vs. only the
  // inline label below each field). Helps screen-reader users hear all
  // problems at submit time without scrolling.
  const errorList = Object.entries(formState.errors)
    .map(([field, err]) => {
      const message = (err as { message?: string } | undefined)?.message;
      if (!message) return null;
      return { field, message };
    })
    .filter(Boolean) as { field: string; message: string }[];

  return (
    <form
      className={styles.editForm}
      onSubmit={(e) => void onSubmit(e)}
      noValidate
      aria-label="Ürün düzenleme formu"
    >
      <EditSection
        id="temel"
        eyebrow="Bölüm 01"
        title="Temel Bilgi"
        description="Müşterilerin ilk gördüğü bilgi: ürün adı, slug ve açıklama. Slug DIA senkronundan üretilir; gerekirse yeniden senkronla yenileyebilirsiniz."
      >
        <div className={styles.fieldGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="nameTr">Ürün adı</label>
            <input
              id="nameTr"
              type="text"
              placeholder="Örn. Kruvaze Yaka Triko Bluz"
              aria-invalid={Boolean(formState.errors.nameTr)}
              aria-describedby={formState.errors.nameTr ? 'nameTr-err' : undefined}
              {...register('nameTr')}
            />
            {formState.errors.nameTr && (
              <span id="nameTr-err" className={styles.fieldError}>
                {formState.errors.nameTr.message}
              </span>
            )}
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="slug-display">Slug</label>
            <div className={styles.slugRow}>
              <input
                id="slug-display"
                type="text"
                value={product.slug}
                readOnly
                className={styles.slugInput}
                aria-describedby="slug-hint"
              />
              <span id="slug-hint" className={styles.slugHint}>
                Slug DIA senkronundan üretilir, manuel değiştirilemez.
              </span>
            </div>
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label htmlFor="descriptionMd">Açıklama</label>
            <textarea
              id="descriptionMd"
              rows={8}
              placeholder="Markdown destekli ürün açıklaması (kumaş, yıkama, kalıp notları)"
              aria-invalid={Boolean(formState.errors.descriptionMd)}
              {...register('descriptionMd')}
            />
            {formState.errors.descriptionMd && (
              <span className={styles.fieldError}>{formState.errors.descriptionMd.message}</span>
            )}
            <span className={styles.fieldHint}>
              Başlıklar için ##, vurgu için *italik*, kalın için **kalın** kullanın.
            </span>
          </div>
        </div>
      </EditSection>

      <EditSection
        id="fiyat"
        eyebrow="Bölüm 02"
        title="Fiyatlandırma"
        description="Varsayılan satış fiyatı. Variant özel fiyatları yine DIA tarafından yönetilir."
      >
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label htmlFor="priceTl">Liste fiyatı ({product.currency})</label>
            <div className={styles.priceRow}>
              <span className={styles.priceCurrency} aria-hidden>
                ₺
              </span>
              <input
                id="priceTl"
                type="text"
                inputMode="decimal"
                placeholder="1299,90"
                aria-invalid={Boolean(formState.errors.priceTl)}
                aria-describedby={formState.errors.priceTl ? 'priceTl-err' : undefined}
                {...register('priceTl')}
              />
            </div>
            {formState.errors.priceTl && (
              <span id="priceTl-err" className={styles.fieldError}>
                {formState.errors.priceTl.message}
              </span>
            )}
            <span className={styles.fieldHint}>
              Ondalık ayırıcı virgül; binlik ayraç kullanmayın.
            </span>
          </div>
        </div>
      </EditSection>

      <EditSection
        id="siniflandirma"
        eyebrow="Bölüm 03"
        title="Sınıflandırma"
        description="Marka ve kategori, mağaza filtrelerini ve menü gezintisini şekillendirir. Her ikisi de boş bırakılabilir; o zaman ürün yalnızca ana listede görünür."
      >
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label htmlFor="brandId">Marka</label>
            <select id="brandId" {...register('brandId')}>
              <option value="">Atanmadı</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="categoryId">Kategori</label>
            <select id="categoryId" {...register('categoryId')}>
              <option value="">Atanmadı</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameTr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </EditSection>

      <EditSection
        id="yayin"
        eyebrow="Bölüm 05"
        title="Yayın"
        description="Storefront yayın durumu. DIA senkron tarihi referans amaçlıdır; sahada yapılan değişiklikler otomatik üzerine yazılır."
        meta={
          product.diaSyncedAt ? (
            <span>
              Son senkron: <strong>{new Date(product.diaSyncedAt).toLocaleString('tr-TR')}</strong>
            </span>
          ) : (
            <span>Henüz senkronlanmadı</span>
          )
        }
      >
        <div className={styles.statusRail}>
          {(['visible', 'needs_review', 'hidden'] as const).map((value) => (
            <label
              key={value}
              className={styles.statusOption}
              data-active={watchedStatus === value ? 'true' : 'false'}
            >
              <input type="radio" value={value} {...register('status')} />
              <div className={styles.statusOptionBody}>
                <span className={styles.statusOptionTitle}>{STATUS_LABELS[value]}</span>
                <span className={styles.statusOptionDesc}>{STATUS_DESCRIPTIONS[value]}</span>
              </div>
            </label>
          ))}
        </div>
      </EditSection>

      <div className={styles.saveBar} role="region" aria-label="Form eylemleri">
        <div className={styles.saveBarFeedback} aria-live="polite" aria-atomic>
          {feedback && (
            <span className={styles.feedback} data-tone={feedback.tone}>
              <span className={styles.feedbackDot} aria-hidden />
              {feedback.message}
            </span>
          )}
          {!feedback && errorList.length > 0 && formState.isSubmitted && (
            <span className={styles.feedback} data-tone="danger">
              <span className={styles.feedbackDot} aria-hidden />
              {errorList.length === 1
                ? (errorList[0]?.message ?? 'Form geçersiz.')
                : `${errorList.length.toString()} alanı düzeltin: ` +
                  errorList.map((e) => e.message).join(' · ')}
            </span>
          )}
          {!feedback && formState.isDirty && errorList.length === 0 && (
            <span className={styles.feedback} data-tone="muted">
              Kaydedilmemiş değişiklikleriniz var.
            </span>
          )}
        </div>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={formState.isSubmitting || !formState.isDirty}
          data-busy={formState.isSubmitting ? 'true' : 'false'}
        >
          {formState.isSubmitting ? (
            <>
              <span className={styles.spinner} aria-hidden />
              Kaydediliyor
            </>
          ) : (
            <>Değişiklikleri Kaydet</>
          )}
        </button>
      </div>
    </form>
  );
}

function parsePriceToMinor(input: string): number {
  const normalized = input.replace(',', '.');
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.round(value * 100);
}
