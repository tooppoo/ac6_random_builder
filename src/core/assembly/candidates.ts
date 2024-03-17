import {
  armNotEquipped,
  armUnits,
  leftArmUnits,
} from '~data/versions/v1.06.1.ts'
import * as ArmUnits from '~data/arm-units.ts'
import { arms, type Arms } from '~data/arms.ts'
import * as BackUnits from '~data/back-units.ts'
import { boosters, type Booster } from '~data/booster.ts'
import { type Core, cores } from '~data/cores.ts'
import * as Expansion from '~data/expansions.ts'
import { type FCS, fcses } from '~data/fces.ts'
import { type Generator, generators } from '~data/generators.ts'
import { heads, type Head } from '~data/heads.ts'
import { type Legs, legs } from '~data/legs.ts'

export const candidates: Candidates = {
  rightArmUnits: [...armUnits, armNotEquipped],
  leftArmUnits: [...leftArmUnits, ...armUnits, armNotEquipped],
  rightBackUnits: [
    ...BackUnits.backUnits,
    ...ArmUnits.armUnits,
    BackUnits.backNotEquipped,
  ],
  leftBackUnits: [
    ...BackUnits.leftBackUnits,
    ...BackUnits.backUnits,
    ...ArmUnits.leftArmUnits,
    ...ArmUnits.armUnits,
    BackUnits.backNotEquipped,
  ],

  heads,
  cores,
  arms,
  legs,

  boosters,
  fcses,
  generators,

  expansions: [...Expansion.expansions, Expansion.expansionNotEquipped],
} as const

export type Candidates = Readonly<{
  rightArmUnits: ReadonlyArray<ArmUnits.ArmUnit | ArmUnits.ArmNotEquipped>
  leftArmUnits: ReadonlyArray<
    ArmUnits.LeftArmUnit | ArmUnits.ArmUnit | ArmUnits.ArmNotEquipped
  >
  rightBackUnits: ReadonlyArray<
    BackUnits.BackUnit | ArmUnits.ArmUnit | BackUnits.BackNotEquipped
  >
  leftBackUnits: ReadonlyArray<
    | BackUnits.LeftBackUnit
    | BackUnits.BackUnit
    | ArmUnits.LeftArmUnit
    | ArmUnits.ArmUnit
    | BackUnits.BackNotEquipped
  >

  heads: readonly Head[]
  cores: readonly Core[]
  arms: readonly Arms[]
  legs: readonly Legs[]

  boosters: readonly Booster[]
  fcses: readonly FCS[]
  generators: readonly Generator[]

  expansions: ReadonlyArray<
    Expansion.Expansion | Expansion.ExpansionNotEquipped
  >
}>
