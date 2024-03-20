import type { PartsFilter } from '~core/assembly/filter/base.ts'
import { notEquipped } from '~data/types/base/classification.ts'
import { type Candidates, type CandidatesKey } from '~data/types/candidates.ts'

export const excludeNotEquipped = (() => {
  const name = 'exclude-not-equipped'

  return {
    name,
    build: (key: CandidatesKey): PartsFilter => ({
      name,
      apply: (candidates: Candidates): Candidates => {
        const f = (p: Candidates[typeof key][number]) =>
          p.classification !== notEquipped

        return {
          ...candidates,
          [key]: candidates[key].filter(f),
        }
      },
    }),
  }
})()
