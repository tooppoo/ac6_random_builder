import type { ACParts } from '~data/types/base/types.ts'

export type FilterType = typeof enableOrNot | ReturnType<typeof filterByProp>

export const enableOrNot = {
  id: 'enable',
  value: null,
} as const
export const filterByProp = <P extends keyof ACParts, T>(
  property: P,
  xs: T[],
) =>
  ({
    id: 'filterByProperty',
    property,
    value: xs,
  }) as const
