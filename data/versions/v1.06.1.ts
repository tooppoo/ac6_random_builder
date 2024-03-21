import type { Candidates } from '~data/types/candidates.ts'

export const version = 'v1.06.1' as const
export type VERSION = typeof version

// UNIT
import { armUnits, leftArmUnits, armNotEquipped } from '~data/arm-units.ts'
import { backUnits, leftBackUnits, backNotEquipped } from '~data/back-units.ts'
export { armUnits, leftArmUnits } from '~data/arm-units.ts'
export { backUnits, leftBackUnits } from '~data/back-units.ts'
// FRAME
import { heads } from '~data/heads.ts'
import { cores } from '~data/cores.ts'
import { arms } from '~data/arms.ts'
import { legs } from '~data/legs.ts'
export { heads } from '~data/heads.ts'
export { cores } from '~data/cores.ts'
export { arms } from '~data/arms.ts'
export { legs } from '~data/legs.ts'
// INNER
import { boosters } from '~data/booster.ts'
import { fcses } from '~data/fces.ts'
import { generators } from '~data/generators.ts'
export { boosters } from '~data/booster.ts'
export { fcses } from '~data/fces.ts'
export { generators } from '~data/generators.ts'
// EXPANSION
import { expansions, expansionNotEquipped } from '~data/expansions.ts'
export { expansions } from '~data/expansions.ts'

export const candidates: Candidates = {
  rightArmUnit: [...armUnits, armNotEquipped],
  leftArmUnit: [...leftArmUnits, ...armUnits, armNotEquipped],
  rightBackUnit: [...backUnits, ...armUnits, backNotEquipped],
  leftBackUnit: [
    ...leftBackUnits,
    ...backUnits,
    ...leftArmUnits,
    ...armUnits,
    backNotEquipped,
  ],

  head: heads,
  core: cores,
  arms,
  legs,

  booster: boosters,
  fcs: fcses,
  generator: generators,

  expansion: [...expansions, expansionNotEquipped],
} as const
