#!/usr/bin/env bash
# server-init.sh — one-shot server provisioning for srv.csweb.com.tr (AlmaLinux 8 + WHM).
#
# Run as root, ONCE, on a fresh server. Re-running is safe (all steps are idempotent).
#
# GROUND RULE — see docs/adr/0004-multi-tenant-server-additive-only.md:
#   This script ONLY ADDS net-new packages and services. It must NEVER:
#     - dnf remove anything
#     - systemctl disable an existing service
#     - touch /etc/php.ini, system Apache config, or any other tenant's files
#     - change EasyApache profiles or remove PHP versions
#   Other tenants on this VPS are live customer sites; their stack must be undisturbed.

set -euo pipefail

echo "==> AlmaLinux: $(cat /etc/redhat-release)"
echo "==> Free disk: $(df -h / | tail -1 | awk '{print $4}')"
echo "==> Free RAM:  $(free -h | awk '/Mem:/ {print $7}')"

# Node.js 20 LTS via NodeSource
if ! command -v node >/dev/null 2>&1; then
  echo "==> Installing Node.js 20 from NodeSource"
  dnf module reset nodejs -y
  curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
  dnf install -y nodejs
  npm install -g pnpm@9 pm2@latest
else
  echo "==> Node already installed: $(node --version)"
fi

# PostgreSQL 16 from PGDG
if ! command -v psql >/dev/null 2>&1; then
  echo "==> Installing PostgreSQL 16 from PGDG"
  dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
  dnf -qy module disable postgresql
  dnf install -y postgresql16-server postgresql16-contrib
  /usr/pgsql-16/bin/postgresql-16-setup initdb
  systemctl enable --now postgresql-16
else
  echo "==> psql already installed: $(psql --version)"
fi

# Redis 7 from EPEL
if ! command -v redis-cli >/dev/null 2>&1; then
  echo "==> Installing Redis 7 from EPEL"
  dnf install -y epel-release
  dnf install -y redis
  # Bind to localhost only (127.0.0.1) — never expose Redis externally
  sed -i 's/^bind .*/bind 127.0.0.1 -::1/' /etc/redis/redis.conf || true
  systemctl enable --now redis
else
  echo "==> redis-cli already installed: $(redis-cli --version)"
fi

# Tighten Postgres pg_hba.conf to scram-sha-256 + localhost only
echo "==> Verifying pg_hba.conf is scram-sha-256 + localhost only"
PGHBA=/var/lib/pgsql/16/data/pg_hba.conf
if [ -f "$PGHBA" ]; then
  sed -i 's/^host.*all.*all.*0\.0\.0\.0\/0.*$/# &/' "$PGHBA" || true
  grep -q '^host.*all.*akonbutik_app.*127.0.0.1/32.*scram-sha-256' "$PGHBA" || \
    echo "host    all             akonbutik_app   127.0.0.1/32            scram-sha-256" >> "$PGHBA"
  systemctl reload postgresql-16 || true
fi

# Disk-usage alert (>= 90% root → email)
if [ ! -f /etc/cron.daily/akon-disk-alert ]; then
  cat >/etc/cron.daily/akon-disk-alert <<'CRON'
#!/usr/bin/env bash
USE=$(df -P / | awk 'NR==2 {gsub("%","",$5); print $5}')
if [ "$USE" -ge 90 ]; then
  echo "WARNING: srv.csweb.com.tr root disk at ${USE}%" | \
    mail -s "[akonbutik] disk usage ${USE}%" cswebyazilim@gmail.com 2>/dev/null || \
    logger -t akon-disk-alert "Disk at ${USE}% — mail unavailable"
fi
CRON
  chmod +x /etc/cron.daily/akon-disk-alert
fi

echo "==> Done. Verify services:"
systemctl --no-pager status postgresql-16 redis | head -20
