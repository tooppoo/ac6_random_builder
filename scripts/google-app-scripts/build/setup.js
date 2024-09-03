import fs from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'path'

function main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_node, _path, target] = process.argv
  if (!target) {
    throw new Error(`target is required as 1st argument`)
  }

  cp({
    src: resolveLib(target, '.clasp.json'),
    dest: resolveRoot('.clasp.json'),
  })

  cp({
    src: resolveLib(target, 'appsscript.json'),
    dest: resolveRoot('dist', target, 'appsscript.json'),
  })
}

/**
 *
 * @param config { src: string, dest: string }
 * @returns {void}
 */
function cp({ src, dest }) {
  console.log(`cp ${src} ${dest}`)
  fs.copyFileSync(src, dest)
}

/**
 * @param paths {string}
 * @returns {string}
 */
function resolveRoot(...paths) {
  const dir = path.dirname(fileURLToPath(import.meta.url))

  return path.resolve(dir, '..', ...paths)
}

/**
 * @param paths {string}
 * @returns {string}
 */
function resolveLib(...paths) {
  return resolveRoot('libs', ...paths)
}

main()
