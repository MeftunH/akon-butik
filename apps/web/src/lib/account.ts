import { cookies } from 'next/headers';

import { env } from '../config/env';

export interface CustomerProfile {
  id: string;
  email: string;
  adSoyad: string;
  telefon: string;
  diaCarikartKodu: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
}

export interface CustomerAddress {
  id: string;
  type: 'fatura' | 'teslimat';
  adSoyad: string;
  telefon: string;
  il: string;
  ilce: string;
  acikAdres: string;
  postaKodu: string;
  isDefault: boolean;
}

export interface CustomerOrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  totalMinor: number;
  currency: string;
  diaSiparisKodu: string | null;
  itemCount: number;
  createdAt: string;
}

export interface CustomerOrderItem {
  id: string;
  variantId: string;
  productNameSnap: string;
  variantSku: string;
  size: string | null;
  color: string | null;
  quantity: number;
  unitPriceMinor: number;
  totalPriceMinor: number;
}

export interface OrderAddressSnapshot {
  type?: 'fatura' | 'teslimat';
  adSoyad: string;
  telefon: string;
  il: string;
  ilce: string;
  acikAdres: string;
  postaKodu: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  status: string;
  subtotalMinor: number;
  shippingMinor: number;
  totalMinor: number;
  currency: string;
  diaSiparisKodu: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  notes: string | null;
  billingAddress: OrderAddressSnapshot;
  shippingAddress: OrderAddressSnapshot;
  createdAt: string;
  paidAt: string | null;
  items: CustomerOrderItem[];
}

export const NOT_AUTHENTICATED = Symbol.for('akonbutik.account.unauthenticated');
export type Unauthenticated = typeof NOT_AUTHENTICATED;

/**
 * Server-side fetch that forwards the request's cookies (akon_at / akon_rt)
 * to the API so the JWT decorator on the customers controller can resolve
 * the user. Returns the {@link NOT_AUTHENTICATED} sentinel on 401, throws on
 * other non-2xx.
 */
export async function fetchAccount<T>(path: string): Promise<T | Unauthenticated> {
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const url = new URL(path.replace(/^\//, ''), `${env.API_INTERNAL_URL}/`);
  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      ...(cookieHeader && { cookie: cookieHeader }),
    },
    cache: 'no-store',
  });
  if (res.status === 401) return NOT_AUTHENTICATED;
  if (!res.ok) {
    throw new Error(`${res.status.toString()} ${res.statusText} for ${path}`);
  }
  return (await res.json()) as T;
}
