import * as ArmUnits from '~data/arm-units.ts'
import type { Arms } from '~data/arms.ts'
import * as BackUnits from '~data/back-units.ts'
import type { Booster } from '~data/booster.ts'
import type { Core } from '~data/cores.ts'
import * as Expansion from '~data/expansions.ts'
import type { FCS } from '~data/fces.ts'
import type { Generator } from '~data/generators.ts'
import type { Head } from '~data/heads.ts'
import type { Legs } from '~data/legs.ts'

export type CandidatesKey = keyof Candidates
export type Candidates = Readonly<{
  rightArmUnit: ReadonlyArray<ArmUnits.ArmUnit | ArmUnits.ArmNotEquipped>
  leftArmUnit: ReadonlyArray<
    ArmUnits.LeftArmUnit | ArmUnits.ArmUnit | ArmUnits.ArmNotEquipped
  >
  rightBackUnit: ReadonlyArray<
    BackUnits.BackUnit | ArmUnits.ArmUnit | BackUnits.BackNotEquipped
  >
  leftBackUnit: ReadonlyArray<
    | BackUnits.LeftBackUnit
    | BackUnits.BackUnit
    | ArmUnits.LeftArmUnit
    | ArmUnits.ArmUnit
    | BackUnits.BackNotEquipped
  >

  head: readonly Head[]
  core: readonly Core[]
  arms: readonly Arms[]
  legs: readonly Legs[]

  booster: readonly Booster[]
  fcs: readonly FCS[]
  generator: readonly Generator[]

  expansion: ReadonlyArray<Expansion.Expansion | Expansion.ExpansionNotEquipped>
}>
