import type { PartsFilter } from 'src/core/assembly/filter/base.ts'
import { notEquipped } from '~data/types/base/classification.ts'
import type { Candidates } from '~data/types/candidates.ts'

export const excludeNotEquipped: PartsFilter = {
  name: 'exclude-not-equipped',
  apply: (candidates: Candidates): Candidates => {
    type Unit =
      | 'rightArmUnits'
      | 'leftArmUnits'
      | 'rightBackUnits'
      | 'leftBackUnits'
    const f = <K extends Unit>(p: Candidates[K][number]) =>
      p.classification !== notEquipped

    return {
      ...candidates,
      rightArmUnits: candidates.rightArmUnits.filter(f),
      leftArmUnits: candidates.leftArmUnits.filter(f),
      rightBackUnits: candidates.rightBackUnits.filter(f),
      leftBackUnits: candidates.leftBackUnits.filter(f),
    }
  },
}
