import { sum } from '~core/utils/array.ts'
import type * as ArmUnits from '~data/arm-units.ts'
import type { Arms } from '~data/arms.ts'
import type * as BackUnits from '~data/back-units.ts'
import type * as Boosters from '~data/booster.ts'
import type { Core } from '~data/cores.ts'
import type * as Expansion from '~data/expansions.ts'
import type { FCS } from '~data/fces.ts'
import type { Generator } from '~data/generators.ts'
import type { Head } from '~data/heads.ts'
import type { LegsNotTank, LegsTank } from '~data/legs.ts'

export type Assembly = RawAssembly & {
  readonly ap: number
  readonly weight: number
}

export function createAssembly(base: RawAssembly): Assembly {
  return {
    ...base,
    get ap(): number {
      return sum([this.head, this.core, this.arms, this.legs].map((p) => p.ap))
    },
    get weight(): number {
      return sum(
        [
          this.rightArmUnit,
          this.leftArmUnit,
          this.rightBackUnit,
          this.leftBackUnit,
          this.head,
          this.core,
          this.arms,
          this.legs,
          this.booster,
          this.fcs,
          this.generator,
        ].map((p) => p.weight),
      )
    },
  }
}

export type RawAssembly = AssemblyNotTank | AssemblyWithTank

type AssemblyNotTank = BaseAssembly & {
  legs: LegsNotTank
  booster: Boosters.Booster
}
type AssemblyWithTank = BaseAssembly & {
  legs: LegsTank
  booster: Boosters.NotEquipped
}
type BaseAssembly = {
  rightArmUnit: ArmUnits.ArmUnit | ArmUnits.NotEquipped
  leftArmUnit: ArmUnits.ArmUnit | ArmUnits.LeftArmUnit | ArmUnits.NotEquipped
  rightBackUnit: BackUnits.BackUnit | BackUnits.NotEquipped
  leftBackUnit:
    | BackUnits.BackUnit
    | BackUnits.LeftBackUnit
    | BackUnits.NotEquipped

  head: Head
  core: Core
  arms: Arms

  fcs: FCS
  generator: Generator
  expansion: Expansion.Expansion | Expansion.NotEquipped
}
