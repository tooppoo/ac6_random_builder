// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_node, _path, target] = process.argv
  if (!target) {
    throw new Error(`target is required as 1st argument`)
  }

  const claspJson = resolveFile(target, '.clasp.json')
  const claspJsonTarget = resolveFile('.clasp.json')
  fs.copyFileSync(claspJson, claspJsonTarget)
  console.log(`cp ${claspJson} ${claspJsonTarget}`)

  const appScriptJson = resolveFile(target, 'appsscript.json')
  const appScriptJsonTarget = resolveFile(target, 'dist', 'appsscript.json')
  fs.copyFileSync(appScriptJson, appScriptJsonTarget)
  console.log(`cp ${appScriptJson} ${appScriptJsonTarget}`)
}

/**
 * @param paths {string}
 * @returns {string}
 */
function resolveFile(...paths) {
  return path.resolve(__dirname, '..', ...paths)
}

main()
