# ADR 0003 — Parent Product + child Variant aggregation from DIA stokkarts

**Status**: Accepted, 2026-04-30

## Context

The Ocaka theme models products as **flat** entities: a single record carries `sizes: string[]` and `colors: ProductColor[]` independently. The PDP UX lets the user pick a size and a color and adds that combination to the cart.

DIA models the same thing differently: every size+color combination is its own `scf_stokkart` row with its own stock. A single "two-piece summer set" with 7 sizes and 3 colors is **21 stokkart rows** in DIA.

We need a schema that: (a) preserves DIA's per-variant stock semantics, (b) presents the flat shape the theme expects, (c) re-syncs without losing local enrichments (custom images, descriptions).

## Decision

Two-table model:

```
Product  (parent — canonical name, description, default price, brand, category, images)
   1
   ▼
   N
ProductVariant  (one row per DIA stokkart — size, color, sku, stock_qty, dia_stokkartkodu)
```

The Catalog API derives `availableSizes` and `availableColors` arrays by collapsing `ProductVariant` rows for each `Product`, returning the flat shape the theme expects.

DIA sync groups sibling stokkarts into one parent using a **parent-key strategy**:

1. If DIA `urungrubu` is populated and consistent → use that as the parent key.
2. Else if DIA `urunmodelkodu` is populated and consistent → use that.
3. Else fall back to a **name-prefix heuristic**: strip the trailing size/color tokens from `aciklama` and group on the remainder.
4. Operators can override grouping mistakes via the admin "Merge / Split" UI.

Mis-grouped products are flagged with `Product.status = needs_review` until a human confirms.

## Rationale

- Preserves DIA as the authoritative stock + price source while letting the storefront present a clean PDP.
- The fallback heuristic accepts that DIA tenants are inconsistent with `urungrubu` discipline.
- Manual override avoids the schema breaking on edge cases.

## Trade-offs accepted

- The name-prefix heuristic will mis-group on unusual SKUs. The `needs_review` flag and admin override make this manageable.
- Two extra Prisma joins per PDP. Mitigated by `include: { variants }` and ISR.

## Alternatives rejected

- **Mirror DIA 1:1 (one Product per stokkart)**: kills the "pick size + color" UX; PDPs would list 21 separate products.
- **Treat sizes/colors as JSON columns on Product**: loses per-variant stock; admin can't see which variants are low-stock.
