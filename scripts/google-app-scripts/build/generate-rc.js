import { cp, resolveRoot } from './_common.js'

function main() {
  cp(
    resolveRoot('.clasprc.json.example'),
    resolveRoot('.clasprc.json'),
    (body) =>
      body
        .replace('GAS_ACCESS_TOKEN', process.env.GAS_ACCESS_TOKEN)
        .replace('GAS_SCOPE', process.env.GAS_SCOPE)
        .replace('GAS_ID_TOKEN', process.env.GAS_ID_TOKEN)
        .replace('GAS_REFRESH_TOKEN', process.env.GAS_REFRESH_TOKEN)
        .replace('GAS_CLIENT_ID', process.env.GAS_CLIENT_ID)
        .replace('GAS_CLIENT_SECRET', process.env.GAS_CLIENT_SECRET),
  )
}

main()
