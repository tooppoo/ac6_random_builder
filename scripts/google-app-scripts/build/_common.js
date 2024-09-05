import fs from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'path'

/**
 * @param paths {string}
 * @returns {string}
 */
export function resolveRoot(...paths) {
  const dir = path.dirname(fileURLToPath(import.meta.url))

  return path.resolve(dir, '..', ...paths)
}

/**
 * @param paths {string}
 * @returns {string}
 */
export function resolveLib(...paths) {
  return resolveRoot('libs', ...paths)
}

/**
 *
 * @param src {string}
 * @param dest {string}
 * @param decorate {(string) => string | null}
 * @returns {void}
 */
export function cp(src, dest, decorate = null) {
  console.log(`cp ${src} ${dest}`)

  if (!decorate) {
    fs.copyFileSync(src, dest)
  } else {
    const before = fs.readFileSync(src)
    const after = decorate(before.toString('utf-8'))

    fs.writeFileSync(dest, after)
  }
}
