import type { Assembly } from '~core/assembly/assembly.ts'

import type { Candidates } from '~data/types/candidates.ts'

export interface PartsFilter {
  readonly name: string

  apply(candidates: Candidates, context: FilterApplyContext): Candidates
}
export type FilterApplyContext = Readonly<{
  assembly: Assembly
}>
