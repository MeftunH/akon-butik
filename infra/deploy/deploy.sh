#!/usr/bin/env bash
# deploy.sh — rsync built artifacts to srv.csweb.com.tr and reload PM2.
#
# Prereq: server-init.sh has been run once; cPanel user `akonbutik` exists
# (verified in /var/cpanel/users/akonbutik); WHM Application Manager has
# the three apps (akonbutik.com, admin.akonbutik.com, api.akonbutik.com)
# registered against ports 3000 / 3100 / 4000.

set -euo pipefail

REMOTE_USER="${REMOTE_USER:-akonbutik}"
REMOTE_HOST="${REMOTE_HOST:-srv.csweb.com.tr}"
REMOTE_BASE="${REMOTE_BASE:-/home/$REMOTE_USER/apps}"

echo "==> Building all apps locally"
pnpm install --frozen-lockfile
pnpm build

echo "==> Syncing apps/web → $REMOTE_HOST:$REMOTE_BASE/web"
rsync -avz --delete \
  --exclude='node_modules' --exclude='.next/cache' \
  apps/web/.next/standalone/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/web/"
rsync -avz apps/web/.next/static/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/web/.next/static/"
rsync -avz apps/web/public/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/web/public/"

echo "==> Syncing apps/admin → $REMOTE_HOST:$REMOTE_BASE/admin"
rsync -avz --delete \
  --exclude='node_modules' --exclude='.next/cache' \
  apps/admin/.next/standalone/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/admin/"
rsync -avz apps/admin/.next/static/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/admin/.next/static/"

echo "==> Syncing apps/api → $REMOTE_HOST:$REMOTE_BASE/api"
rsync -avz --delete \
  --exclude='node_modules' \
  apps/api/dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/api/dist/"
rsync -avz apps/api/package.json "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE/api/"

echo "==> Installing prod dependencies on remote and running migrations"
ssh "$REMOTE_USER@$REMOTE_HOST" bash -s <<'EOSSH'
  set -euo pipefail
  cd ~/apps/api && pnpm install --prod --frozen-lockfile
  cd ~/apps/api && pnpm --filter @akonbutik/database db:migrate:deploy
EOSSH

echo "==> Reloading PM2 with health-check"
ssh "$REMOTE_USER@$REMOTE_HOST" 'pm2 reload ~/apps/ecosystem.config.cjs --update-env'

echo "==> Smoke-testing endpoints"
curl -fsS https://api.akonbutik.com/api/health/live  | grep -q '"ok"' || { echo "API live check failed"; exit 1; }
curl -fsS https://akonbutik.com/                     -o /dev/null      || { echo "Web root failed"; exit 1; }
echo "==> Deploy OK"
