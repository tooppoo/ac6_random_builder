const extensionsForFormat = [
  'js',
  'cjs',
  'mjs',
  'json',
  'scss',
  'ts',
  'yml',
  'yaml',
  'html',
  'svelte',
]
export default {
  [`*.{${extensionsForFormat.join(',')}}`]: [
    'eslint --fix',
    'prettier --write',
  ],
}
