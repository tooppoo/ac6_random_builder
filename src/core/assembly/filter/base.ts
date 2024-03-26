import type { Assembly } from '~core/assembly/assembly.ts'
import type { FilterType } from '~core/assembly/filter/filter-type.ts'

import type { Candidates } from '~data/types/candidates.ts'

export interface PartsFilter {
  readonly name: string
  readonly type: FilterType

  apply(candidates: Candidates, context: FilterApplyContext): Candidates
}
export type FilterApplyContext = Readonly<{
  assembly: Assembly
}>
