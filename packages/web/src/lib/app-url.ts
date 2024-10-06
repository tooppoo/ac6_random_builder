const protocol = 'https://'
const domain = 'tooppoo.github.io'
const basePath = 'ac6_assemble_tool'

export function appPath(...paths: string[]): string {
  return (
    protocol +
    [domain, basePath, '/', ...paths].join('/').replaceAll(/\/+/g, '/')
  )
}
