# Local development infrastructure

```bash
docker compose -f infra/docker/docker-compose.dev.yml up -d
```

| Service | Host port | Purpose |
|---------|-----------|---------|
| postgres:16-alpine | 5432 | Application database (`akonbutik_dev`, user `akonbutik_app`) |
| redis:7-alpine | 6379 | BullMQ queues, cart cache, DIA session cache |
| mailhog | 1025 (SMTP) / 8025 (web UI) | Catches outbound mail in dev. Open http://localhost:8025 |

All ports bind to `127.0.0.1` so nothing is exposed publicly.

## Reset the dev database

```bash
docker compose -f infra/docker/docker-compose.dev.yml down -v
docker compose -f infra/docker/docker-compose.dev.yml up -d postgres
pnpm --filter @akonbutik/database db:migrate:deploy
pnpm --filter @akonbutik/database db:seed
```
