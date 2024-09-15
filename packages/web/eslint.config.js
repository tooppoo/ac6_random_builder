import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import * as tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import { config as tsConfig, configs as tsConfigs } from 'typescript-eslint'

const compat = new FlatCompat()

export default tsConfig(
  {
    ignores: ['dist/', 'coverage/', 'node_modules'],
  },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2023,
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
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/parsers': {
        /*
         * trick for eslint-plugin-import
         * https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
         */
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
        '@typescript-eslint/parser': ['.ts', '.js'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
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
              pattern: '~view/**',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '~root/**',
              group: 'parent',
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
