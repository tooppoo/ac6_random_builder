import * as ArmUnits from 'data/arm-units.ts'
import type { Arms } from 'data/arms.ts'
import * as BackUnits from 'data/back-units.ts'
import type { Booster } from 'data/booster.ts'
import type { Core } from 'data/cores.ts'
import * as Expansion from 'data/expansions.ts'
import type { FCS } from 'data/fces.ts'
import type { Generator } from 'data/generators.ts'
import type { Head } from 'data/heads.ts'
import type { Legs } from 'data/legs.ts'

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
