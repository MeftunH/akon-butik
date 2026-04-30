## What

<!-- One-paragraph summary of what this PR changes. -->

## Why

<!-- Link to issue / context. Why is this change needed now? -->

## How

<!-- Brief description of the approach. Anything non-obvious? -->

## Checklist

- [ ] Conventional Commit message (`feat(scope): …`, `fix(scope): …`, etc.)
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm test` all green locally
- [ ] If the change touches the database: migration is reversible and tested
- [ ] If the change adds a third-party package: ADR or PR description explains why
- [ ] If the change affects the server: it is **additive only** (see ADR 0004)
- [ ] If the change affects an architectural decision: ADR added/updated under `docs/adr/`
- [ ] If the change affects ops: `docs/runbook.md` updated
