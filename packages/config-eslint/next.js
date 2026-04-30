import nextPlugin from '@next/eslint-plugin-next';

import reactConfig from './react.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // App-router-only — the rule scans for `pages/` at the project root
      // and can't be configured to ignore its absence cleanly, so disable.
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
