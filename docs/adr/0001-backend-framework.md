# ADR 0001 — Backend framework: NestJS

**Status**: Accepted, 2026-04-30
**Deciders**: solo dev + Claude Code

## Context

Akon Butik needs a backend for catalog, cart, orders, payments, accounts, blog, admin, and DIA ERP integration. The frontend is Next.js 15 (TypeScript, React 19). Hosting is a root-access VPS (AlmaLinux 8) running cPanel/WHM with ~60 other live tenants. The codebase is owned by **one human developer + Claude Code** as the engineering pair — no team, no language flexibility for hires in the near term.

Two serious candidates were considered: **NestJS** (Node, TypeScript) and **Laravel** (PHP).

## Decision

Use **NestJS 10** with the Fastify adapter as the backend framework.

## Rationale

1. **Same language as frontend**: enables a shared `packages/types` for FE↔BE alignment. Renaming a domain field surfaces every call site at compile time.
2. **AI pair fluency**: Claude Code's freshest and broadest training surface is modern TypeScript (Next.js, NestJS, Prisma, Vitest, Playwright). It produces fewer mistakes and cleaner refactors here than in PHP/Laravel.
3. **Opinionated structure**: NestJS modules / controllers / providers / DI map cleanly onto our hexagonal architecture and reduce micro-decisions for a solo dev.
4. **Ecosystem fit**: BullMQ (Redis queues), Prisma (Postgres), Pino (logs), OpenTelemetry, Swagger, class-validator are all first-class.
5. **Operational simplicity**: VPS has root access and ample resources (31 GB RAM, 12 vCPU); Node + PM2 stand up cleanly without the friction shared cPanel might create.

## Trade-offs accepted

- **No PHP DIA client head start**: `fattihkoca/DiaWebService` covers PHP login + basic CRUD, but the parent-variant aggregation and queue topology we need are greenfield in either language. The PHP advantage is small.
- **No Filament-style admin scaffolding**: Phase 5 admin is hand-built in Next.js. Claude Code can scaffold pages quickly, narrowing the gap. Refine.dev or AdminJS are fallbacks if scope balloons.
- **iyzico Node SDK is slightly less mature than the PHP one**: `iyzipay-node` is officially maintained and well-tested with the Checkout Form flow we'll use; risk is low.
- **Smaller pool of NestJS developers in Turkey if ever hiring**: irrelevant in current single-dev context.

## Alternatives rejected

| Option | Why not |
|---|---|
| **Laravel** | See trade-offs above; the AI-pair angle is decisive |
| **Express bare** | No structure — solo-dev maintenance pain over time |
| **Fastify bare** | Same as Express; boilerplate without the opinions |
| **Next.js API routes only** | DIA sync workers, queues, long-running jobs are awkward inside Next.js |

## Consequences

- All backend code is TypeScript with `strict: true`; zero `any`.
- We commit to NestJS for the lifetime of the project — no mid-build re-evaluation gate (a switch costs 3–4 weeks after Phase 1 starts).
- We add Node 20 + PM2 + BullMQ + Prisma to the operational surface. The VPS is sized for it.
