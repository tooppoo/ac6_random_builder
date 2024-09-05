import fs from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'path'

function main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_node, _path, target] = process.argv
  if (!target) {
    throw new Error(`target is required as 1st argument`)
  }

  cp(
    resolveLib(target, '.clasp.json.example'),
    resolveRoot('.clasp.json'),
    (body) =>
      body
        .replace('REPLACE_BY_REAL_SCRIPT_ID', process.env.SCRIPT_ID)
        .replace('REPLACE_BY_REAL_PARENT_ID', process.env.PARENT_ID),
  )

  cp(
    resolveLib(target, 'appsscript.json'),
    resolveRoot('dist', target, 'appsscript.json'),
  )
}

/**
 *
 * @param src {string}
 * @param dest {string}
 * @param decorate {(string) => string | null}
 * @returns {void}
 */
function cp(src, dest, decorate = null) {
  console.log(`cp ${src} ${dest}`)

  if (!decorate) {
    fs.copyFileSync(src, dest)
  } else {
    const before = fs.readFileSync(src)
    const after = decorate(before.toString('utf-8'))

    fs.writeFileSync(dest, after)
  }
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
