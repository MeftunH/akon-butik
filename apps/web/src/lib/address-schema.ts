import { z } from 'zod';

/**
 * Single source of truth for the customer-side address schema. Used by
 * both the checkout form (apps/web/src/app/(shop)/checkout/_components/CheckoutFlow.tsx)
 * and the account address-modal (apps/web/src/app/(shop)/account/addresses/_components/AddressFormModal.tsx).
 *
 * Mirrors the API CreateAddressDto regex'es so the client-side validation
 * never lets a payload through that the server would reject.
 */
const phoneRegex = /^(\+?90|0)?5\d{9}$/;
const postalRegex = /^\d{5}$/;

export const addressSchema = z.object({
  adSoyad: z.string().trim().min(2, 'Ad soyad en az 2 karakter olmalı').max(120),
  telefon: z.string().regex(phoneRegex, 'Geçerli bir Türk cep telefonu girin'),
  il: z.string().min(2, 'İl seçin'),
  ilce: z.string().trim().min(2, 'İlçe en az 2 karakter olmalı').max(60),
  acikAdres: z.string().trim().min(10, 'Açık adres en az 10 karakter olmalı').max(500),
  postaKodu: z.string().regex(postalRegex, '5 haneli posta kodu girin'),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export const accountAddressSchema = addressSchema.extend({
  type: z.enum(['fatura', 'teslimat']),
  label: z.string().trim().max(40).optional(),
  isDefault: z.boolean().optional(),
});

export type AccountAddressFormValues = z.infer<typeof accountAddressSchema>;

export const EMPTY_ADDRESS_FORM: AccountAddressFormValues = {
  type: 'teslimat',
  adSoyad: '',
  telefon: '',
  il: '',
  ilce: '',
  acikAdres: '',
  postaKodu: '',
  label: '',
  isDefault: false,
};
