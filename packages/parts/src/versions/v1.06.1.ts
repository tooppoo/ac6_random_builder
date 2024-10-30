import { armUnits, leftArmUnits } from '#parts/arm-units'
import { arms } from '#parts/arms'
import { backUnits, leftBackUnits } from '#parts/back-units'
import { boosters } from '#parts/booster'
import { cores } from '#parts/cores'
import { expansions } from '#parts/expansions'
import { fcses } from '#parts/fces'
import { generators } from '#parts/generators'
import { heads } from '#parts/heads'
import { legs } from '#parts/legs'
import {
  backNotEquipped,
  boosterNotEquipped,
  expansionNotEquipped,
  armNotEquipped,
} from '#parts/not-equipped'
import type { ACParts } from '#parts/types/base/types'
import {
  type CandidatesDefinition,
  defineCandidates,
  type Candidates,
  type Order,
} from '#parts/types/candidates'

export const version = 'v1.06.1' as const
export type VERSION = typeof version
// UNIT
export { armUnits, leftArmUnits } from '#parts/arm-units'
export { backUnits, leftBackUnits } from '#parts/back-units'
// FRAME
export { heads } from '#parts/heads'
export { cores } from '#parts/cores'
export { arms } from '#parts/arms'
export { legs } from '#parts/legs'
// INNER
export { boosters } from '#parts/booster'
export { fcses } from '#parts/fces'
export { generators } from '#parts/generators'
// EXPANSION
export { expansions } from '#parts/expansions'

export const definition: CandidatesDefinition = {
  armUnits: armUnits,
  onlyLeftArmUnits: leftArmUnits,
  backUnits: backUnits,
  onlyLeftBackUnits: leftBackUnits,

  head: heads,
  core: cores,
  arms,
  legs,

  booster: boosters,
  fcs: fcses,
  generator: generators,

  expansion: expansions,
}
export const candidates: Candidates = defineCandidates(definition)

const toName = <T extends ACParts>(xs: readonly T[]): readonly T['name'][] =>
  xs.map((x) => x.name)
export const orders: Order = {
  rightArmUnit: toName([armNotEquipped, ...definition.armUnits]),
  leftArmUnit: toName([
    armNotEquipped,
    ...definition.onlyLeftArmUnits,
    ...definition.armUnits,
  ]),
  rightBackUnit: toName([
    backNotEquipped,
    ...definition.backUnits,
    ...definition.armUnits,
  ]),
  leftBackUnit: toName([
    backNotEquipped,
    ...definition.onlyLeftBackUnits,
    ...definition.backUnits,
    ...definition.onlyLeftArmUnits,
    ...definition.armUnits,
  ]),

  head: toName(candidates.head),
  core: toName(candidates.core),
  arms: toName(candidates.arms),
  legs: toName(candidates.legs),

  booster: toName(candidates.booster.concat(boosterNotEquipped)),
  fcs: toName(candidates.fcs),
  generator: toName(candidates.generator),

  expansion: toName([expansionNotEquipped, ...definition.expansion]),
}
