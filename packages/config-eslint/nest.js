import baseConfig from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      // NestJS uses decorators; ignore class-method-this rules
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      // DI parameter-properties pattern
      '@typescript-eslint/parameter-properties': 'off',
    },
  },
];
