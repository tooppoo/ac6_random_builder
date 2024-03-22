import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import { config as tsConfig, configs as tsConfigs } from 'typescript-eslint'

const compat = new FlatCompat()

export default tsConfig(
  {
    ignores: ['dist/**/*', 'coverage/**/*'],
  },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  eslint.configs.recommended,
  ...tsConfigs.recommended,
  ...compat.extends('plugin:svelte/recommended'),
  {
    // https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'esnext',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.js'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '~core/**',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '~view/**',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '~data/**',
              group: 'external',
              position: 'before',
            },
          ],
          distinctGroup: true,
        },
      ],
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 1,
          maxEOF: 1,
        },
      ],
    },
  },
)
