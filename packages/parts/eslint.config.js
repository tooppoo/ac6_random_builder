import eslint from '@eslint/js'
import * as tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import { config as tsConfig, configs as tsConfigs } from 'typescript-eslint'

export default tsConfig(
  {
    ignores: ['dist/'],
  },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2023,
      },
    },
  },
  eslint.configs.recommended,
  ...tsConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
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
              pattern: '~parts/**',
              group: 'builtin',
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
