# Operations Runbook

## On-call surface area

Single owner (the developer) — alert escalation is via email to `cswebyazilim@gmail.com`. Pager-style rotation is not yet set up (single dev).

## Service map

| Service | Port | Process | Logs | Restart |
|---|---|---|---|---|
| `apps/web` | 3000 | PM2 `akonbutik-web` (cluster ×4) | `~/logs/web.{out,err}.log` | `pm2 restart akonbutik-web` |
| `apps/admin` | 3100 | PM2 `akonbutik-admin` | `~/logs/admin.{out,err}.log` | `pm2 restart akonbutik-admin` |
| `apps/api` | 4000 | PM2 `akonbutik-api` (cluster ×2) | `~/logs/api.{out,err}.log` | `pm2 restart akonbutik-api` |
| postgresql-16 | 5432 (localhost) | systemd | `journalctl -u postgresql-16` | `systemctl restart postgresql-16` |
| redis | 6379 (localhost) | systemd | `journalctl -u redis` | `systemctl restart redis` |
| Apache (cPanel) | 80/443 | systemd `httpd` | `journalctl -u httpd` | `systemctl restart httpd` (impact: ALL cPanel tenants — coordinate) |

## Deploy

```bash
# from a developer machine
./infra/deploy/deploy.sh

# or piecemeal
ssh akonbutik@srv.csweb.com.tr 'pm2 reload akonbutik-api --update-env'
```

CI on `main` runs `pnpm build`, then SSHes to the VPS and runs PM2 reload with health-check rollback.

## Rollback

```bash
ssh akonbutik@srv.csweb.com.tr
cd ~/apps/api
git tag                          # find previous release tag
git checkout <previous-tag>
pnpm install --prod --frozen-lockfile
pm2 reload akonbutik-api
```

For database migrations that can't be rolled back, restore from the most recent nightly dump.

## Restore from backup

Backups: `pg_dumpall` nightly at 03:00 → Backblaze B2 (`b2://akonbutik-backups/<date>.sql.xz`). Retention 30 days.

```bash
b2 download-file-by-name akonbutik-backups 2026-04-29.sql.xz /tmp/restore.sql.xz
xz -d /tmp/restore.sql.xz
sudo -u postgres psql -d akonbutik_prod < /tmp/restore.sql
```

**Test the restore quarterly** — a backup that has never been restored is not a backup.

## Common alerts

### `Disk usage > 90 %`
Check `du -sh /home/*/ | sort -h | tail -10` to find the offender (likely image uploads).
**Do NOT delete other tenants' data.** Move our `/home/akonbutik/uploads/old/` to off-server cold storage, or request a disk expansion from the host.

### `pm2 process restarting in a loop`
```bash
pm2 logs akonbutik-api --lines 200
```
Check for: env var missing (zod will print the offending key), Postgres unreachable, port already taken.

### `DIA sync stuck`
```bash
# Inspect the latest DiaSyncLog rows
psql -h localhost -U akonbutik_app -d akonbutik_prod \
  -c 'SELECT entity, status, started_at, error FROM dia_sync_logs ORDER BY started_at DESC LIMIT 10;'
# Trigger manual sync
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" https://api.akonbutik.com/api/admin/sync/products
```
If `INVALID_SESSION` keeps returning, another process is using the same DIA user. Check that no second worker is running locally.

### `iyzico webhook not arriving`
1. Check `Payment` table for the `pending_3ds` row that's stuck.
2. Verify iyzico merchant dashboard shows the txn as captured.
3. Manually re-trigger: `POST /api/payments/iyzico/recover/:paymentId` (admin only).

## Things that are NOT okay to do (Ground Rule)

`srv.csweb.com.tr` hosts ~60 other live cPanel tenants. **Never** on this server:

- `dnf remove`, `systemctl disable`, `systemctl stop httpd`
- WHM "EasyApache 4 → Customize" with packages unchecked
- PHP version removals (other tenants depend on PHP 5.4 → 8.3)
- Modifying `/etc/php.ini`, system Apache config, or another tenant's home directory
- WHM "Terminate cPanel Account" on anything other than `akonbutik`

If a resource (disk, RAM, ports) is blocking you, the answer is **request more resource from the host**, never "let's clean up unused-looking stuff".

## Useful queries

```sql
-- Today's orders
SELECT status, COUNT(*), SUM(total_minor)/100.0 AS try
FROM orders WHERE created_at > now() - interval '1 day'
GROUP BY status;

-- Low-stock variants (under 5 units)
SELECT p.name_tr, v.size, v.color, v.stock_qty
FROM product_variants v JOIN products p ON p.id = v.product_id
WHERE v.stock_qty < 5 AND p.status = 'visible'
ORDER BY v.stock_qty ASC LIMIT 50;

-- Recent DIA sync errors
SELECT entity, started_at, error
FROM dia_sync_logs WHERE status = 'failed'
ORDER BY started_at DESC LIMIT 20;
```
