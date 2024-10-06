import config from '@ac6_assemble_tool/eslint/prettier'

export default {
  ...config,
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
}
