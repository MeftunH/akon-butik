import { z } from 'zod';

/** TR mobile phone in E.164 form (+905XXXXXXXXX) or local (05XXXXXXXXX). */
export const trPhoneSchema = z
  .string()
  .trim()
  .regex(/^(\+?90|0)?5\d{9}$/, { message: 'Geçerli bir Türk cep telefonu girin' });

export const passwordSchema = z
  .string()
  .min(10, 'Şifre en az 10 karakter olmalı')
  .max(128, 'Şifre 128 karakteri geçemez');

export const emailSchema = z.string().trim().toLowerCase().email('Geçerli bir e-posta girin');

export const addressInputSchema = z.object({
  type: z.enum(['fatura', 'teslimat']),
  adSoyad: z.string().trim().min(2).max(120),
  telefon: trPhoneSchema,
  il: z.string().trim().min(2).max(40),
  ilce: z.string().trim().min(2).max(60),
  acikAdres: z.string().trim().min(10).max(500),
  postaKodu: z.string().trim().regex(/^\d{5}$/, '5 haneli posta kodu girin'),
  isDefault: z.boolean().optional(),
  label: z.string().trim().max(40).optional(),
});

export const productFilterSchema = z.object({
  category: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  size: z.array(z.string().trim()).optional(),
  color: z.array(z.string().trim()).optional(),
  minPriceMinor: z.coerce.number().int().nonnegative().optional(),
  maxPriceMinor: z.coerce.number().int().nonnegative().optional(),
  inStock: z.coerce.boolean().optional(),
  onSale: z.coerce.boolean().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'popularity']).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(60).default(24),
});

export const cartAddItemSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().positive().max(99),
});

export const registerInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  adSoyad: z.string().trim().min(2).max(120),
  telefon: trPhoneSchema,
  kvkkAccepted: z.literal(true, {
    errorMap: () => ({ message: 'KVKK aydınlatma metnini onaylamalısınız' }),
  }),
});

export const loginInputSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export type AddressInputDto = z.infer<typeof addressInputSchema>;
export type ProductFilterDto = z.infer<typeof productFilterSchema>;
export type CartAddItemDto = z.infer<typeof cartAddItemSchema>;
export type RegisterInputDto = z.infer<typeof registerInputSchema>;
export type LoginInputDto = z.infer<typeof loginInputSchema>;
