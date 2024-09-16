import {
  baseRules,
  globalIgnores,
  importRules,
} from '@ac6_assemble_tool/eslint/configs'
import { FlatCompat } from '@eslint/eslintrc'
import * as tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import { config as tsConfig } from 'typescript-eslint'

const compat = new FlatCompat()

export default tsConfig(
  {
    ignores: ['coverage'],
  },
  globalIgnores,
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
  ...baseRules,
  ...compat.extends('plugin:svelte/recommended'),
  ...importRules({
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
  }),
)
