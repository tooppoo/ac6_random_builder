import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat()

export default tseslint.config(
  {
    ignores: ['dist/**/*', 'coverage/**/*'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('plugin:svelte/recommended'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
)
