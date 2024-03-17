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
  rightArmUnits: [...ArmUnits.armUnits, ArmUnits.notEquipped],
  leftArmUnits: [
    ...ArmUnits.leftArmUnits,
    ...ArmUnits.armUnits,
    ArmUnits.notEquipped,
  ],
  rightBackUnits: [
    ...BackUnits.backUnits,
    ...ArmUnits.armUnits,
    BackUnits.notEquipped,
  ],
  leftBackUnits: [
    ...BackUnits.leftBackUnits,
    ...BackUnits.backUnits,
    ...ArmUnits.leftArmUnits,
    ...ArmUnits.armUnits,
    BackUnits.notEquipped,
  ],

  heads,
  cores,
  arms,
  legs,

  boosters,
  fcses,
  generators,

  expansions: [...Expansion.expansions, Expansion.notEquipped],
} as const

export type Candidates = Readonly<{
  rightArmUnits: ReadonlyArray<ArmUnits.ArmUnit | ArmUnits.NotEquipped>
  leftArmUnits: ReadonlyArray<
    ArmUnits.LeftArmUnit | ArmUnits.ArmUnit | ArmUnits.NotEquipped
  >
  rightBackUnits: ReadonlyArray<
    BackUnits.BackUnit | ArmUnits.ArmUnit | BackUnits.NotEquipped
  >
  leftBackUnits: ReadonlyArray<
    | BackUnits.LeftBackUnit
    | BackUnits.BackUnit
    | ArmUnits.LeftArmUnit
    | ArmUnits.ArmUnit
    | BackUnits.NotEquipped
  >

  heads: readonly Head[]
  cores: readonly Core[]
  arms: readonly Arms[]
  legs: readonly Legs[]

  boosters: readonly Booster[]
  fcses: readonly FCS[]
  generators: readonly Generator[]

  expansions: ReadonlyArray<Expansion.Expansion | Expansion.NotEquipped>
}>
