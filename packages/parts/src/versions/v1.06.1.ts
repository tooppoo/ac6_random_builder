import { armUnits, leftArmUnits } from '~data/arm-units'
import { arms } from '~data/arms'
import { backUnits, leftBackUnits } from '~data/back-units'
import { boosters } from '~data/booster'
import { cores } from '~data/cores'
import { expansions } from '~data/expansions'
import { fcses } from '~data/fces'
import { generators } from '~data/generators'
import { heads } from '~data/heads'
import { legs } from '~data/legs'
import {
  armNotEquipped,
  backNotEquipped,
  expansionNotEquipped,
} from '~data/not-equipped'
import type { ACParts } from '~data/types/base/types'
import type { Candidates, Order } from '~data/types/candidates'

export const version = 'v1.06.1' as const
export type VERSION = typeof version
// UNIT
export { armUnits, leftArmUnits } from '~data/arm-units'
export { backUnits, leftBackUnits } from '~data/back-units'
// FRAME
export { heads } from '~data/heads'
export { cores } from '~data/cores'
export { arms } from '~data/arms'
export { legs } from '~data/legs'
// INNER
export { boosters } from '~data/booster'
export { fcses } from '~data/fces'
export { generators } from '~data/generators'
// EXPANSION
export { expansions } from '~data/expansions'

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

const toName = <T extends ACParts>(xs: readonly T[]): readonly T['name'][] =>
  xs.map((x) => x.name)
export const orders: Order = {
  rightArmUnit: toName(candidates.rightArmUnit),
  leftArmUnit: toName(candidates.leftArmUnit),
  rightBackUnit: toName(candidates.rightBackUnit),
  leftBackUnit: toName(candidates.leftBackUnit),

  head: toName(candidates.head),
  core: toName(candidates.core),
  arms: toName(candidates.arms),
  legs: toName(candidates.legs),

  booster: toName(candidates.booster),
  fcs: toName(candidates.fcs),
  generator: toName(candidates.generator),

  expansion: toName(candidates.expansion),
}
