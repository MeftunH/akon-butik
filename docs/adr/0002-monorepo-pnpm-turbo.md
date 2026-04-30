# ADR 0002 — Monorepo with pnpm workspaces + Turborepo

**Status**: Accepted, 2026-04-30

## Context

Akon Butik consists of three deployable apps (`web`, `admin`, `api`) plus shared libraries (UI, types, Prisma schema, DIA client, utilities). With a single dev + AI pair owning everything, the question is whether to keep them in one repo or split.

## Decision

Single monorepo at the project root. **pnpm workspaces** for package management, **Turborepo** for task orchestration and caching.

## Rationale

1. **Atomic refactors**: rename a `Product` field in Prisma → update the `@akonbutik/types` re-export → update every FE consumer in one PR. Splitting requires version bumping and coordination.
2. **Shared types are first-class**: `packages/types`, `packages/database`, `packages/dia-client` are imported by both FE and BE; they belong with their consumers, not behind a registry.
3. **Single CI pipeline**: one typecheck verifies that everything still compiles together.
4. **Turborepo caching**: tasks only re-run for packages whose inputs changed.
5. **Solo dev workflow**: one `pnpm install`, one `git push`, one branch, one PR.

## Trade-offs accepted

- Cloning the repo brings everything down. For a project of this size that's negligible.
- Service-level CI granularity is slightly weaker than polyrepo (we'd need to mark per-package paths in workflows). Acceptable.

## Alternatives rejected

- **Polyrepo (one repo per app)**: all the pain of cross-repo coordination, none of the benefits, when there's a single dev.
- **Monorepo without Turborepo (npm workspaces only)**: works but loses task caching — incremental builds get slow as the repo grows.
