import eslint from '@eslint/js'
import * as tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import { config as tsConfig, configs as tsConfigs } from 'typescript-eslint'

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
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  eslint.configs.recommended,
  ...tsConfigs.recommended,
  {
    // https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    settings: {
      'import/parsers': {
        /*
         & trick for eslint-plugin-import
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
