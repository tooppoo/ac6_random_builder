import * as ArmUnits from '~data/arm-units.ts'
import {arms} from '~data/arms.ts'
import * as BackUnits from '~data/back-units.ts'
import {boosters} from '~data/booster.ts'
import {cores} from '~data/cores.ts'
import * as Expansion from '~data/expansions.ts'
import {fcses} from '~data/fces.ts'
import {generators} from '~data/generators.ts'
import {heads} from '~data/heads.ts'
import {legs} from '~data/legs.ts'

export const candidates = {
  rightArmUnits: [...ArmUnits.armUnits, ArmUnits.notEquipped] as const,
  leftArmUnits: [
    ...ArmUnits.armUnits,
    ...ArmUnits.leftArmUnits,
    ArmUnits.notEquipped,
  ] as const,
  rightBackUnits: [...BackUnits.backUnits, BackUnits.notEquipped] as const,
  leftBackUnits: [
    ...BackUnits.backUnits,
    ...BackUnits.lefTBackUnits,
    BackUnits.notEquipped,
  ] as const,

  heads,
  cores,
  arms,
  legs,

  boosters,
  fcses,
  generators,

  expansions: [...Expansion.expansions, Expansion.notEquipped] as const,
} as const
export type Candidates = typeof candidates
