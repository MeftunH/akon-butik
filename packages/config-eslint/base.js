import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/*.tsbuildinfo',
      '**/storybook-static/**',
      '**/playwright-report/**',
      'vendor/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
      parserOptions: {
        // Build/eslint/jest config files live outside any tsconfig include
        // path; `allowDefaultProject` lets them lint with the default project
        // so we don't have to pull them into runtime tsconfig include lists.
        projectService: {
          allowDefaultProject: [
            'eslint.config.{js,mjs}',
            'jest.config.{js,cjs}',
            'vitest.config.{js,ts}',
            'packages/config-eslint/*.js',
          ],
        },
      },
    },
    plugins: {
      import: importPlugin,
      security: securityPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      // import hygiene
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-default-export': 'off',
      'import/no-cycle': 'error',
      // security
      'security/detect-object-injection': 'off', // too noisy with TS
      // unicorn — pragmatic subset
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': ['error', { cases: { kebabCase: true, pascalCase: true } }],
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-useless-undefined': 'off',
      // typescript
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true },
      ],
      // ban direct process.env outside config
      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[object.object.name='process'][object.property.name='env']",
          message:
            'Direct process.env access is forbidden outside src/config/env.ts. Read from the typed config module instead.',
        },
      ],
    },
  },
  // Config files (eslint.config.*, next.config.*, jest.config.*, vitest.config.*,
  // and the shared eslint configs in packages/config-eslint) live outside
  // any runtime tsconfig include path. They lint via the default project,
  // which doesn't enable strictNullChecks — so type-checked rules can't run
  // reliably here. Disable them for these files only.
  {
    files: [
      '**/eslint.config.{js,mjs}',
      '**/next.config.{js,ts,mjs}',
      '**/jest.config.{js,cjs}',
      '**/vitest.config.{js,ts}',
      'packages/config-eslint/*.js',
    ],
    ...tseslint.configs.disableTypeChecked,
  },
  prettierConfig,
];
