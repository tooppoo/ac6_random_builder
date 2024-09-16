import type { Assembly, AssemblyKey } from '~core/assembly/assembly'
import type { PartsFilterSet } from '~core/assembly/filter/filter-set'

import type { Candidates } from '@ac6_assemble_tool/parts/types/candidates'

export interface PartsFilter<T> {
  readonly name: string
  readonly type: T

  apply(candidates: Candidates, context: FilterApplyContext): Candidates
}
export type FilterApplyContext = Readonly<{
  assembly: Assembly
  wholeFilter: WholeFilter
}>

export type WholeFilter = Record<AssemblyKey, PartsFilterSet>
