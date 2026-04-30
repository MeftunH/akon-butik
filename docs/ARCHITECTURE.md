# Akon Butik — Architecture

## High-level

```
                 ┌──────────────────────────────────────┐
                 │            Browsers (TR)             │
                 └───────────┬─────────────┬────────────┘
                             │             │
              akonbutik.com  │             │ admin.akonbutik.com
                  ┌──────────▼──┐  ┌──────▼─────────┐
                  │  apps/web   │  │  apps/admin    │
                  │  Next.js 15 │  │  Next.js 15    │
                  │  SSR + ISR  │  │  client-heavy  │
                  └──────┬──────┘  └────────┬───────┘
                         │                  │
                         │ HTTPS (RSC fetch + client mut)
                         │                  │
                  api.akonbutik.com         │
                  ┌──────▼─────┐            │
                  │  apps/api  │            │
                  │  NestJS 10 │◄───────────┘
                  └──┬─────┬───┘
                     │     │
            ┌────────┘     └─────────┐
            │                        │
       ┌────▼───────┐         ┌──────▼─────┐
       │ Postgres16 │         │  Redis 7   │  ← BullMQ queues + cart cache
       └────────────┘         └─────┬──────┘
                                    │
                              ┌─────▼──────┐
                              │ Workers    │  ← BullMQ consumers
                              │ (in-proc.) │
                              └─────┬──────┘
                                    │
                            ┌───────▼────────┐         ┌──────────────┐
                            │  DIA ERP API   │◄────────┤  iyzico      │
                            │  (JSON-RPC)    │         │  Cargo APIs  │
                            └────────────────┘         └──────────────┘
```

All three apps + Postgres + Redis run on the **same VPS** (srv.csweb.com.tr) under cPanel user `akonbutik`. WHM Application Manager places Apache `mod_proxy` in front of the three Node processes (ports 3000/3100/4000). Apache handles TLS via cPanel's AutoSSL.

## Bounded contexts (NestJS modules)

The API is split into bounded contexts. Each owns its data, exposes a port, and is invoked through use-cases.

| Context | Owns (Prisma models) | Public surface |
|---|---|---|
| **Catalog** | `Product`, `ProductVariant`, `ProductImage`, `Category`, `Brand` | `/api/catalog/products`, `/api/catalog/products/:slug`, `/api/catalog/categories` |
| **Inventory** | (denormalized stock on `ProductVariant`) | internal — used by Catalog and DIA sync |
| **Customers** | `User`, `Address`, `Session` | `/api/customers/me`, `/api/customers/me/addresses` |
| **Auth** | uses `User`, `Session` | `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `/api/auth/logout` |
| **Cart** | `Cart`, `CartItem` | `/api/cart`, `/api/cart/items` |
| **Orders** | `Order`, `OrderItem` | `/api/orders`, `/api/orders/:id` |
| **Payments** | `Payment` | `/api/payments/iyzico/webhook`, `/api/payments/iyzico/init` |
| **Shipping** | `Shipment` | `/api/shipments/:id`, `/api/track-order` |
| **CMS** | `BlogPost`, `BlogCategory`, `Tag`, `BlogComment`, `Setting` | `/api/cms/posts`, `/api/cms/posts/:slug` |
| **Admin** | `AdminUser`, `AdminAuditLog` | `/api/admin/*` (separate auth guard) |
| **DIA** | `DiaSyncLog` | internal services + `/api/admin/sync/*` triggers |

## Hexagonal pattern (per module)

```
HTTP Controller  →  Use-case (pure business logic)  →  Port (interface)
                                                            │
                                       ┌────────────────────┴───────────────────┐
                                       │                                        │
                                Prisma adapter                          DIA / iyzico adapter
```

The `Catalog` module under `apps/api/src/modules/catalog/` is the canonical example. Other modules follow the same shape.

## Data flow — example: customer places an order

1. **Browser** → `apps/web` → POST `/api/cart/items` (add to cart)
2. **Browser** → `apps/web` → POST `/api/checkout/init` → `apps/api` returns iyzico Checkout Form URL
3. **Browser** → iyzico hosted page (3DS)
4. **iyzico** → `apps/api` webhook → marks `Payment.status = captured`
5. **apps/api** → enqueues BullMQ job `dia-push:order`
6. **Worker** → DIA `scf_siparis_ekle` → stores `dia_siparis_kodu` on `Order`
7. **Worker** → enqueues `email:send` (order confirmation)

## DIA integration

- `packages/dia-client` is a transport-agnostic, typed RPC client over `undici`.
- A single DIA user (`akonwb`) per worker process, with `disconnect_same_user: true`. Multiple workers using the same DIA user would evict each other.
- Sync workers run inside the NestJS API process (BullMQ workers). Cron schedule:
  - `dia-sync:products` every 30 min (keyset-paginated)
  - `dia-sync:stock` every 5 min (B2C cache via `b2c_durum=E`)
  - `dia-sync:categories` daily

## SEO strategy

- Storefront uses Next.js App Router with **ISR** (`revalidate: 300`) on product/category pages.
- On-demand revalidation: sync workers POST to a webhook in `apps/web` to invalidate paths when DIA pushes a product change.
- JSON-LD `Product`, `BreadcrumbList`, `Organization` on every product page.
- `next-sitemap` + `robots.txt` + dynamic OG images.
- next-intl with `tr` default + `en` secondary.

## Security

- Helmet, strict CSP (tightened in Phase 6).
- Argon2 password hashing, JWT access (15 min) + refresh (7 d) in HttpOnly+Secure cookies.
- Rate limiting (Throttler) on `/auth/*`, `/checkout/*`, `/search`, plus a global fallback.
- All secrets in `~/private/.env` (mode 600, owner `akonbutik`); never committed.
- See [`docs/runbook.md`](runbook.md) for ops procedures, restore-from-backup, and on-call.
