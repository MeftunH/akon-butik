/**
 * Root ESLint flat config. Applies base rules to every workspace file,
 * then layers stricter rule sets on top of the relevant directories
 * (Next.js for storefront/admin, Nest-friendly for the API).
 *
 * Per-package eslint.config.mjs files import from the same shared config
 * so editor integrations also pick up the right rules.
 */
import baseConfig from '@akonbutik/config-eslint/base';
import nextConfig from '@akonbutik/config-eslint/next';
import nestConfig from '@akonbutik/config-eslint/nest';

const scopeFiles = (configs, filesGlobs) =>
  configs.map((c) => ({ ...c, files: filesGlobs }));

export default [
  ...baseConfig,
  ...scopeFiles(nextConfig, [
    'apps/web/**/*.{ts,tsx,js,jsx}',
    'apps/admin/**/*.{ts,tsx,js,jsx}',
    'packages/ui/**/*.{ts,tsx,js,jsx}',
  ]),
  ...scopeFiles(nestConfig, ['apps/api/**/*.ts']),
];
