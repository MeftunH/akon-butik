# ADR 0004 — Multi-tenant VPS: additive changes only

**Status**: Accepted, 2026-04-30

## Context

`srv.csweb.com.tr` is a shared cPanel/WHM VPS running AlmaLinux 8.10. It hosts approximately **60 active cPanel tenants** alongside `akonbutik` (visible in `/var/cpanel/users/`). All those tenants are live customer sites depending on the system Apache, the installed PHP versions (5.4 → 8.3), and various other shared services.

We have root access, which means we *can* do destructive things — but those things would also affect every other tenant on the box.

## Decision

**Every change to the server is additive, scoped to user `akonbutik`, isolated at the network layer, and reversible.** No exceptions.

Concretely:

- **Allowed**: `dnf install` net-new packages (Node 20 from NodeSource, Postgres 16 from PGDG, Redis 7 from EPEL); register apps in WHM Application Manager under user `akonbutik`; bind new services to `127.0.0.1` only; create files under `/home/akonbutik/`.
- **Forbidden**: `dnf remove` anything; `systemctl disable` or `stop` any existing service; touch `/etc/php.ini` or system Apache config; remove EasyApache packages or PHP versions; terminate other cPanel accounts; modify another tenant's home directory.

## Rationale

A package that looks unused (PHP 5.4, an old Perl module) may be load-bearing for another tenant's legacy site. Even if it isn't, the cost of investigating before removal exceeds the cost of leaving it. Disk space is not so tight that we need to fight for it (47 GB free at 81 % usage; our footprint is ~25 GB / 12–18 months).

## Trade-offs accepted

- Slightly higher disk usage and more installed cruft on the server.
- We must request disk expansions from the host instead of "cleaning up".

## Enforcement

- `infra/deploy/server-init.sh` is the only script that touches the server. It's idempotent and contains no destructive operations.
- The `runbook.md` explicitly lists the forbidden operations so the dev (or any future operator) is reminded.
- This rule is also captured in long-term memory at `~/.claude/projects/-home-cld-Projects-akonbutik/memory/feedback_no_whm_deletions.md`.
