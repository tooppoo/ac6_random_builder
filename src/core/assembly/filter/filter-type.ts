import type { ACParts } from '~data/types/base/types.ts'

export type FilterType = typeof enableOrNot | ReturnType<typeof filterByProp>

export const enableOrNot = {
  id: 'enable',
  value: null,
} as const
export const filterByProp = <P extends keyof ACParts, T>(
  property: P,
  selected: T[],
  whole: T[],
) =>
  ({
    id: 'filterByProperty',
    property,
    value: selected,
    whole,
  }) as const
