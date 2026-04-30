import type { CartSnapshot, OrderSummary } from '@akonbutik/types';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface CreateOrderInput {
  cart: CartSnapshot;
  billingAddress: AddressSnapshot;
  shippingAddress: AddressSnapshot;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  notes?: string;
  /** Phase 4 wires this from JWT; null for guest checkout. */
  userId?: string | null;
}

export interface AddressSnapshot {
  adSoyad: string;
  telefon: string;
  il: string;
  ilce: string;
  acikAdres: string;
  postaKodu: string;
}

export interface OrderRepository {
  create(input: CreateOrderInput): Promise<OrderSummary & { id: string }>;
  findById(id: string): Promise<(OrderSummary & { id: string }) | null>;
  findByOrderNumber(
    orderNumber: string,
  ): Promise<(OrderSummary & { id: string }) | null>;
  markPaid(orderId: string): Promise<void>;
}
