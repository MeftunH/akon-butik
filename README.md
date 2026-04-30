# Akon Butik

E-commerce platform for Akon Butik clothing store — Next.js 15 storefront and admin panel, NestJS backend, PostgreSQL + Redis, integrated with DIA ERP and iyzico payments.

## Quickstart

```bash
nvm use                                                  # Node 20
pnpm install
docker compose -f infra/docker/docker-compose.dev.yml up -d
pnpm dev                                                 # all apps
```

Storefront: http://localhost:3000
Admin: http://localhost:3100
API + Swagger: http://localhost:4000/api/docs

## Repo layout

```
apps/
  web/       Next.js storefront (akonbutik.com)
  admin/     Next.js admin panel (admin.akonbutik.com)
  api/       NestJS backend (api.akonbutik.com)
packages/
  ui/        Shared React components
  database/  Prisma schema + client
  dia-client DIA JSON-RPC client (server-only)
  types/     Shared domain types + zod schemas
  i18n/      next-intl messages (tr/en)
  utils/     formatTRY, formatDateTR, slugify, …
  config-*   Shared ESLint and tsconfig bases
infra/
  docker/    Local docker-compose (Postgres, Redis, MailHog)
  deploy/    PM2 ecosystem.config.cjs, rsync deploy scripts
docs/
  ARCHITECTURE.md, runbook.md
  adr/       Architecture Decision Records
vendor/
  ochaka-theme/  Original purchased theme (reference, do not edit)
```

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design, bounded contexts, data flow
- [`docs/runbook.md`](docs/runbook.md) — deploy, rollback, restore-from-backup, on-call
- [`docs/adr/`](docs/adr/) — Architecture Decision Records (one per major decision)
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — branching, commit format, PR flow

## License

Proprietary. © Akon Butik.
