import { assume, cp, resolveRoot } from './_common.js'

function main() {
  cp(resolveRoot('.env.local.example'), resolveRoot('.env.local'), (body) =>
    body
      .replace(
        'REPLACE_BY_ISSUE_POST_TOKEN',
        assume(process.env.ISSUE_POST_TOKEN),
      )
      .replace('REPLACE_BY_REPO_NAME', assume(process.env.REPO_NAME)),
  )
}

main()
