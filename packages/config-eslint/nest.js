import baseConfig from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    // NestJS DI binds by runtime class reference; `import type` tree-shakes
    // the binding and the container can't resolve it. The codebase pins
    // those imports with explicit `eslint-disable-next-line @typescript-
    // eslint/consistent-type-imports` directives. Without this setting,
    // the pre-commit autofix flags those directives as unused, removes
    // them, and silently breaks DI on the next save — a regression that
    // has hit this project multiple times.
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/parameter-properties': 'off',
    },
  },
];
