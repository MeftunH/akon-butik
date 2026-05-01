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
      // Nest binds constructor params by class reference at runtime; the
      // autofix that converts to `import type` deletes that runtime
      // binding and silently breaks DI on first save. Disabling the rule
      // (instead of relying on per-import disable directives) is the
      // version we don't have to think about. The 4× regression history
      // is in commits 132aa29, bd9b87e, 3973c68, 7497947.
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
];
