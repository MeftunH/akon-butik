'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { EditSection } from '../_components/EditSection';
import { InlineCreateSelect } from '../_components/InlineCreateSelect';
import { RichTextEditor } from '../_components/RichTextEditor';

import styles from './ProductEditForm.module.scss';
import { ProductImagesPanel } from './ProductImagesPanel';

interface BrandOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  nameTr: string;
}

interface ProductImage {
  id: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
  source: 'dia' | 'manual';
}

interface ProductVariant {
  id: string;
  sku: string;
  diaStokkartkodu: string;
  size: string | null;
  color: string | null;
  stockQty: number;
  priceOverrideMinor: number | null;
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
  variants: readonly ProductVariant[];
  images: readonly ProductImage[];
}

const STATUS_LABELS: Record<ProductLite['status'], string> = {
  visible: 'Görünür',
  hidden: 'Gizli',
  needs_review: 'İncelemede',
};

const STATUS_DESCRIPTIONS: Record<ProductLite['status'], string> = {
  visible: 'Mağaza vitrininde ve arama sonuçlarında listelenir.',
  hidden: 'Yalnızca admin panelinden erişilir, müşteriler göremez.',
  needs_review: "İçerik tamamlanana kadar storefront'tan gizli, ekip üzerinde çalışıyor.",
};

const formSchema = z.object({
  nameTr: z
    .string()
    .trim()
    .min(2, 'Ürün adı en az 2 karakter olmalı')
    .max(255, 'Ürün adı 255 karakteri aşamaz'),
  descriptionMd: z.string().max(10_000, 'Açıklama 10.000 karakteri aşamaz'),
  // Price entered as a Turkish-formatted decimal (1234,56 or 1.234,56). The
  // serializer parses it into minor units before submit.
  priceTl: z
    .string()
    .min(1, 'Fiyat boş bırakılamaz')
    .refine((v) => Number.isFinite(parsePriceToMinor(v)), 'Geçerli bir fiyat girin'),
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
 * Single-column product editor. Layout reads top-down as the operator's
 * actual edit sequence: glance at imagery, refine the descriptor block,
 * adjust price and taxonomy, then publish. The vendor Ocaka admin
 * conventions provide the typography scale and neutral palette;
 * everything else is custom because the vendor admin does not ship a
 * product-edit page.
 *
 * Why no card chrome around sections: cards multiply hairlines without
 * adding signal. We use vertical hairlines between sections and the
 * page reads as a single editorial column.
 *
 * API contracts in use:
 *   PATCH /api/admin/products/:id     : name, description, price, status, brandId, categoryId
 *   POST  /api/admin/brands            : { name }   then server slugifies
 *   POST  /api/admin/categories        : { nameTr } then server slugifies
 *
 * Known contract gap (May 2026): UpdateProductDto does not accept
 * compareAtPriceMinor. Sale price UI is therefore omitted; reintroduce
 * once the API shape lands. See report.
 */
export function ProductEditForm({
  product,
  brands: initialBrands,
  categories: initialCategories,
}: ProductEditFormProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'danger'; message: string } | null>(
    null,
  );

  // Local copies so newly created brands/categories are immediately
  // selectable without a full page refresh.
  const [brands, setBrands] = useState<readonly BrandOption[]>(initialBrands);
  const [categories, setCategories] = useState<readonly CategoryOption[]>(initialCategories);

  const initialPriceTl = (product.defaultPriceMinor / 100).toFixed(2).replace('.', ',');

  const { register, handleSubmit, formState, reset, watch, setValue, control, getValues } =
    useForm<FormValues>({
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
  const watchedPrice = watch('priceTl');

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

  const errorList = Object.entries(formState.errors)
    .map(([field, err]) => {
      const message = (err as { message?: string } | undefined)?.message;
      if (!message) return null;
      return { field, message };
    })
    .filter(Boolean) as { field: string; message: string }[];

  const formattedPriceDisplay = formatPriceDisplay(watchedPrice);

  return (
    <form
      className={styles.editForm}
      onSubmit={(e) => void onSubmit(e)}
      noValidate
      aria-label="Ürün düzenleme formu"
    >
      <EditSection
        id="medya"
        eyebrow="Bölüm 01"
        title="Görsel ve Medya"
        description="Birincil görsel mağaza listesinde, kart önizlemesinde ve detay sayfasında kullanılır. Sürükleyerek sıralayın, bir görseli birincil olarak işaretleyin."
      >
        <ProductImagesPanel productId={product.id} initialImages={product.images} />
      </EditSection>

      <EditSection
        id="temel"
        eyebrow="Bölüm 02"
        title="Temel Bilgi"
        description="Müşterilerin ilk gördüğü bilgi: ürün adı, kalıcı slug ve zengin açıklama. Slug DIA senkronundan üretilir."
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
            <Controller
              control={control}
              name="descriptionMd"
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Kumaş, yıkama, kalıp, stil notları… Başlık, kalın, italik, liste ve alıntı kullanabilirsiniz."
                  ariaLabel="Ürün açıklaması"
                  ariaInvalid={Boolean(formState.errors.descriptionMd)}
                  ariaDescribedBy={formState.errors.descriptionMd ? 'descriptionMd-err' : undefined}
                />
              )}
            />
            {formState.errors.descriptionMd && (
              <span id="descriptionMd-err" className={styles.fieldError}>
                {formState.errors.descriptionMd.message}
              </span>
            )}
          </div>
        </div>
      </EditSection>

      <EditSection
        id="fiyat"
        eyebrow="Bölüm 03"
        title="Fiyatlandırma"
        description="Varsayılan satış fiyatı. Variant özel fiyatları DIA tarafından yönetilir."
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
                placeholder="1.299,90"
                aria-invalid={Boolean(formState.errors.priceTl)}
                aria-describedby="priceTl-display"
                {...register('priceTl', {
                  onBlur: () => {
                    // Normalize on blur so 1234,5 becomes 1234,50.
                    const v = getValues('priceTl');
                    const minor = parsePriceToMinor(v);
                    if (Number.isFinite(minor) && minor > 0) {
                      setValue('priceTl', (minor / 100).toFixed(2).replace('.', ','), {
                        shouldDirty: false,
                      });
                    }
                  },
                })}
              />
            </div>
            {formState.errors.priceTl && (
              <span className={styles.fieldError}>{formState.errors.priceTl.message}</span>
            )}
            <span id="priceTl-display" className={styles.fieldHint}>
              Görüntüleme: <strong className={styles.priceLive}>{formattedPriceDisplay}</strong>.
              Ondalık ayırıcı virgül, binlik için nokta.
            </span>
          </div>
        </div>
      </EditSection>

      <EditSection
        id="siniflandirma"
        eyebrow="Bölüm 04"
        title="Sınıflandırma"
        description="Marka ve kategori, mağaza filtrelerini ve menü gezintisini şekillendirir. Listede yoksa hemen yenisini ekleyin."
      >
        <div className={styles.fieldGrid}>
          <Controller
            control={control}
            name="brandId"
            render={({ field }) => (
              <InlineCreateSelect
                value={field.value}
                onChange={field.onChange}
                options={brands.map((b) => ({ id: b.id, label: b.name }))}
                label="Marka"
                emptyLabel="Atanmadı"
                createLabel="+ Yeni marka ekle"
                createPlaceholder="Marka adı, örn. Akon Studio"
                createEndpoint="/api/admin/brands"
                buildCreateBody={(name) => ({ name })}
                deriveLabel={(created) =>
                  (created as { name?: string }).name?.trim() ?? 'İsimsiz marka'
                }
                onCreated={(created) => {
                  setBrands((prev) =>
                    [...prev, { id: created.id, name: created.label }].sort((a, b) =>
                      a.name.localeCompare(b.name, 'tr'),
                    ),
                  );
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <InlineCreateSelect
                value={field.value}
                onChange={field.onChange}
                options={categories.map((c) => ({ id: c.id, label: c.nameTr }))}
                label="Kategori"
                emptyLabel="Atanmadı"
                createLabel="+ Yeni kategori ekle"
                createPlaceholder="Kategori adı, örn. Triko Üst"
                createEndpoint="/api/admin/categories"
                buildCreateBody={(nameTr) => ({ nameTr })}
                deriveLabel={(created) =>
                  (created as { nameTr?: string }).nameTr?.trim() ?? 'İsimsiz kategori'
                }
                onCreated={(created) => {
                  setCategories((prev) =>
                    [...prev, { id: created.id, nameTr: created.label }].sort((a, b) =>
                      a.nameTr.localeCompare(b.nameTr, 'tr'),
                    ),
                  );
                }}
              />
            )}
          />
        </div>
      </EditSection>

      <EditSection
        id="varyantlar"
        eyebrow="Bölüm 05"
        title="Varyantlar"
        description="Variant verisi DIA senkronundan gelir, admin panelden düzenlenmez. Stok ve fiyat sapmaları DIA tarafında düzeltilmelidir."
        meta={
          <span>
            Toplam: <strong>{product.variants.length.toString()}</strong>
          </span>
        }
      >
        {product.variants.length === 0 ? (
          <div className={styles.variantEmpty}>
            <p className={styles.variantEmptyTitle}>Variant bulunmuyor</p>
            <p className={styles.variantEmptyBody}>
              DIA senkronu çalıştırarak variantları getirebilirsiniz. Senkrondan sonra bu liste
              otomatik olarak doldurulur.
            </p>
          </div>
        ) : (
          <div className={styles.variantTableWrap}>
            <table className={styles.variantTable}>
              <thead>
                <tr>
                  <th scope="col">SKU</th>
                  <th scope="col">DIA Stokkart</th>
                  <th scope="col">Beden</th>
                  <th scope="col">Renk</th>
                  <th scope="col" className={styles.numericHeader}>
                    Stok
                  </th>
                  <th scope="col" className={styles.numericHeader}>
                    Fiyat
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.variants.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <code>{v.sku}</code>
                    </td>
                    <td>
                      <code>{v.diaStokkartkodu}</code>
                    </td>
                    <td>{v.size ?? '·'}</td>
                    <td>{v.color ?? '·'}</td>
                    <td className={styles.numericCell}>{v.stockQty.toString()}</td>
                    <td className={styles.numericCell}>
                      {v.priceOverrideMinor !== null
                        ? formatTl(v.priceOverrideMinor)
                        : 'varsayılan'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </EditSection>

      <EditSection
        id="yayin"
        eyebrow="Bölüm 06"
        title="Yayın"
        description="Storefront yayın durumu. DIA senkron tarihi referans amaçlıdır, sahada yapılan değişiklikler bir sonraki senkronda üzerine yazılabilir."
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

        <div className={styles.dangerRow}>
          <div>
            <p className={styles.dangerTitle}>Tehlikeli alan</p>
            <p className={styles.dangerCopy}>
              Ürün silme şu an devre dışı. DIA üzerinden gelen ürünler kaynak sistemde
              pasifleştirilmeli; manuel ürünler için silme akışı bir sonraki sürümde açılacak.
            </p>
          </div>
          <button
            type="button"
            className={styles.dangerButton}
            disabled
            aria-disabled
            title="Ürün silme henüz desteklenmiyor"
          >
            Ürünü sil
          </button>
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
                  errorList.map((e) => e.message).join(', ')}
            </span>
          )}
          {!feedback && formState.isDirty && errorList.length === 0 && (
            <span className={styles.feedback} data-tone="muted">
              Kaydedilmemiş değişiklikleriniz var.
            </span>
          )}
          {!feedback && !formState.isDirty && (
            <span className={styles.feedback} data-tone="muted">
              Form temiz, kaydedilecek bir şey yok.
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

const TL_DISPLAY_FORMATTER = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
});

function formatTl(minor: number): string {
  return TL_DISPLAY_FORMATTER.format(minor / 100);
}

/**
 * Live-format the priceTl input for display below the field. We never
 * mutate the input itself while typing (that fights the cursor), but
 * we render the canonicalised currency string in a hint row so the
 * operator can verify decimals at a glance.
 */
function formatPriceDisplay(input: string | undefined): string {
  if (!input) return TL_DISPLAY_FORMATTER.format(0);
  const minor = parsePriceToMinor(input);
  if (!Number.isFinite(minor) || minor < 0) return 'geçersiz';
  return TL_DISPLAY_FORMATTER.format(minor / 100);
}

/**
 * Parse a Turkish-formatted decimal string (1.234,56) into integer
 * minor units. Returns NaN if the input is not a clean decimal.
 */
function parsePriceToMinor(input: string): number {
  const trimmed = input.trim();
  if (trimmed.length === 0) return Number.NaN;
  // Drop thousand separators (.), then convert decimal comma to point.
  const normalized = trimmed.replaceAll('.', '').replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return Number.NaN;
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return Number.NaN;
  return Math.round(value * 100);
}
