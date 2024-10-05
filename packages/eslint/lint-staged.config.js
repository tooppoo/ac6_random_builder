
const extensionsForFormat = [
  'js',
  'cjs',
  'mjs',
  'json',
  'ts',
  'yml',
  'yaml',
  'html',
  'svelte',
]
export default {
  [`*.${extensionsForFormat.join(',')}`]: ['eslint --fix', 'prettier --write'],
}
