import {resources} from "~view/i18n/resources";

import { echo } from 'zx'

type Resource = Record<string, ResourceValue>
type ResourceValue = string | Resource

function main(): void {
  const result = unique(
    removeOneByteSymbols(
      nestedToValues(resources.ja).join('')
    )
  )

  echo(result)
}

function nestedToValues(obj: Resource): string[] {
  const values = Object.values(obj) as ResourceValue[]

  return values.reduce(
    (acc, v): string[] => {
      return [
        ...acc,
        ...(typeof v === 'string' ? [v] : nestedToValues(v)),
      ]
    },
    [] as string[]
  )
}

function removeOneByteSymbols(src: string): string {
  return src.replace(/[ -~\n]/g, '')
}

function unique(src: string): string {
  const charMap = src
    .split('')
    .reduce(
      (acc, char) => ({ ...acc, [char]: char }),
      {}
    )

  return Object.values(charMap).join('')
}

main()
