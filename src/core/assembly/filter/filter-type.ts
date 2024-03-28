import type { ACParts } from '~data/types/base/types.ts'

export type FilterType =
  | EnableOrNot
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | FilterByProp<any, any>

export type EnableOrNot = typeof enableOrNot
export const enableOrNot = {
  id: 'enable',
  value: null,
} as const

export type FilterByProp<P extends string & keyof B, B extends ACParts> = {
  id: 'filterByProperty'
  property: P
  value: B[P][]
  whole: B[P][]
}
