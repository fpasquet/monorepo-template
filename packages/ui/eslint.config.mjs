// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { reactConfig } from '@monorepo/eslint-config/react';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactConfig,
  {
    ignores: ['eslint.config.mjs'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      // enable all recommended rules to report an error
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'error',
        { group: 'newLine', preferSingleLine: true, printWidth: 120 },
      ],
      'better-tailwindcss/no-unregistered-classes': [
        'error',
        {
          ignore: ['toaster', 'data-\\[state=(open|closed)\\]:.+', 'data-\\[side=(bottom|left|right|top)\\]:.+'],
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/global.css',
      },
    },
  },
  ...storybook.configs['flat/recommended'],
];
