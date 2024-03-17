import type { Candidates } from 'data/types/candidates.ts'

export const version = 'v1.06.1' as const
export type VERSION = typeof version

// UNIT
import { armUnits, leftArmUnits, armNotEquipped } from '~data/arm-units.ts'
import { backUnits, leftBackUnits, backNotEquipped } from '~data/back-units.ts'
export { armUnits, leftArmUnits, armNotEquipped } from '~data/arm-units.ts'
export { backUnits, leftBackUnits, backNotEquipped } from '~data/back-units.ts'
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
export { boosters, boosterNotEquipped } from '~data/booster.ts'
export { fcses } from '~data/fces.ts'
export { generators } from '~data/generators.ts'
// EXPANSION
import { expansions, expansionNotEquipped } from '~data/expansions.ts'
export { expansions, expansionNotEquipped } from '~data/expansions.ts'

export const candidates: Candidates = {
  rightArmUnits: [...armUnits, armNotEquipped],
  leftArmUnits: [...leftArmUnits, ...armUnits, armNotEquipped],
  rightBackUnits: [...backUnits, ...armUnits, backNotEquipped],
  leftBackUnits: [
    ...leftBackUnits,
    ...backUnits,
    ...leftArmUnits,
    ...armUnits,
    backNotEquipped,
  ],

  heads,
  cores,
  arms,
  legs,

  boosters,
  fcses,
  generators,

  expansions: [...expansions, expansionNotEquipped],
} as const
