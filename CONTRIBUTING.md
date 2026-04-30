# Contributing

## Branches

- `main` is the trunk; protected, CI must pass before merge.
- Short-lived feature branches: `feat/<scope>-<slug>`, `fix/<scope>-<slug>`, `chore/<scope>-<slug>`, `docs/<slug>`.
- Rebase on `main` before opening a PR. Squash on merge.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/) — enforced by commitlint on `commit-msg`.

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
**Scopes**: `web`, `admin`, `api`, `ui`, `database`, `dia-client`, `types`, `i18n`, `utils`, `config`, `infra`, `docs`, `deps`, `release`

Examples:

```
feat(catalog): add variant size filter to product list endpoint
fix(checkout): retry iyzico Checkout Form on transient 5xx
chore(deps): bump prisma to 5.22
docs(adr): add 0005 cargo carrier choice
```

## Pre-commit

Husky runs `lint-staged` on staged files (Prettier + ESLint --fix). Do not bypass with `--no-verify` — fix the underlying issue instead.

## Pull requests

- Self-review against the PR template checklist before requesting review.
- All CI checks must be green to merge.
- One PR per logical change; avoid bundling unrelated changes.
- Update or add an ADR in `docs/adr/` for any non-trivial architectural decision.

## Local environment

Copy `.env.example` to `.env` in each app and fill values. Never commit secrets.
