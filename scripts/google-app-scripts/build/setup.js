import { assume, cp, resolveLib, resolveRoot } from './_common.js'

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
        .replace('REPLACE_BY_REAL_SCRIPT_ID', assume(process.env.SCRIPT_ID))
        .replace('REPLACE_BY_REAL_PARENT_ID', assume(process.env.PARENT_ID)),
  )

  cp(
    resolveLib(target, 'appsscript.json'),
    resolveRoot('dist', target, 'appsscript.json'),
  )
}

main()
