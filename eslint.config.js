import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import tsEslint from 'typescript-eslint'

const compat = new FlatCompat()

export default tsEslint.config(
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
  ...tsEslint.configs.recommended,
  ...compat.extends('plugin:svelte/recommended'),
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
)
