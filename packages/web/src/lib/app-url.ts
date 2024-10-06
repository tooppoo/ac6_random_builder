const protocol = 'https://'
const domain = 'tooppoo.github.io'
const basePath = 'ac6_assemble_tool'

export function appUrl(...paths: string[]): string {
  return protocol + resolve(domain, basePath, '/', ...paths)
}

export function publicPath(...paths: string[]): string {
  return resolve('/', basePath, '/', ...paths)
}

function resolve(...paths: string[]): string {
  return paths.join('/').replaceAll(/\/+/g, '/')
}
