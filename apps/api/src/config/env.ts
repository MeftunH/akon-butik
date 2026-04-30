import { z } from 'zod';

const emptyToUndefined = (v: unknown): unknown => (v === '' ? undefined : v);

/**
 * The single source of truth for environment-driven configuration.
 *
 * Everywhere else in the codebase, read config via `ConfigService` injection
 * (which exposes a typed `Env` shape). Direct `process.env.*` access is
 * forbidden by an ESLint rule.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  DIA_BASE_URL: z.string().url(),
  DIA_USERNAME: z.string().min(1),
  DIA_PASSWORD: z.string().min(1),
  DIA_API_KEY: z.string().min(1),
  DIA_FIRMA_KODU: z.coerce.number().int().positive(),
  DIA_DONEM_KODU: z.coerce.number().int().positive(),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),

  // Phase-1 temporary admin auth — replaced by AdminAuthGuard in Phase 5
  ADMIN_SYNC_TOKEN: z.string().min(32),

  // First-login bootstrap for the seeded admin@akonbutik.com user. The
  // seed plants a placeholder hash that argon2 cannot verify; a single
  // POST /api/admin/auth/login that matches this password is allowed
  // through and writes the real argon2 hash into the DB. Optional —
  // unset (or rotated) once the password has been bootstrapped.
  ADMIN_BOOTSTRAP_PASSWORD: z.preprocess(emptyToUndefined, z.string().min(1).optional()),

  // Treat empty strings from .env as missing so zod's .optional() applies
  IYZICO_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  IYZICO_SECRET_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  IYZICO_BASE_URL: z.string().url().default('https://sandbox-api.iyzipay.com'),

  // Image storage — admin-uploaded product photography.
  //   Dev: filesystem under apps/api/storage, served at /uploads via Fastify
  //   Prod: writes to ~akonbutik/public_html/uploads on the cPanel VPS, served
  //         directly by Apache at https://akonbutik.com/uploads/
  // S3 / MinIO is intentionally NOT a dependency — the company runs its
  // own server and a port/adapter design lets us swap to object storage
  // later without touching domain code.
  IMAGE_STORAGE_ROOT: z.string().min(1).default('./storage'),
  IMAGE_PUBLIC_BASE_URL: z.string().url().default('http://localhost:4000/uploads'),

  CORS_ORIGINS: z
    .string()
    .default('')
    .transform((v) =>
      v
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(raw: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return parsed.data;
}
