import { assume, cp, resolveRoot } from './_common.js'

function main() {
  cp(
    resolveRoot('.clasprc.json.example'),
    resolveRoot('.clasprc.json'),
    (body) => {
      const json = JSON.parse(
        body
          .replace('GAS_ACCESS_TOKEN', assume(process.env.GAS_ACCESS_TOKEN))
          .replace('GAS_SCOPE', assume(process.env.GAS_SCOPE))
          .replace('GAS_ID_TOKEN', assume(process.env.GAS_ID_TOKEN))
          .replace('GAS_REFRESH_TOKEN', assume(process.env.GAS_REFRESH_TOKEN))
          .replace('GAS_CLIENT_ID', assume(process.env.GAS_CLIENT_ID))
          .replace('GAS_CLIENT_SECRET', assume(process.env.GAS_CLIENT_SECRET)),
      )
      json.token.expiry_date = Date.now() + 60 * 5

      return JSON.stringify(json)
    },
  )
}

main()
