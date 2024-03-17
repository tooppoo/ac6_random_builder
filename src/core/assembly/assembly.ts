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
  /** 総重量 */
  readonly weight: number
  /** 総積載量 */
  readonly load: number
  /** 積載上限 */
  readonly loadLimit: number
  /** EN負荷 */
  readonly enLoad: number
  /** EN出力 */
  readonly enOutput: number

  /**
   * @return {boolean} 積載量が積載上限以内の場合にtrue
   */
  readonly withinLoadLimit: boolean
  /**
   * @return {boolean} EN出力がEN負荷以上の場合にtrue
   */
  readonly withinEnOutput: boolean
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
    get load(): number {
      return this.weight - this.legs.weight
    },
    get loadLimit(): number {
      return this.legs.load_limit
    },
    get enLoad(): number {
      return sum(
        [
          this.rightArmUnit,
          this.rightBackUnit,
          this.leftArmUnit,
          this.leftBackUnit,
          this.head,
          this.core,
          this.arms,
          this.legs,
          this.booster,
          this.fcs,
        ].map((p) => p.en_load),
      )
    },
    get enOutput(): number {
      return Math.floor(
        this.generator.en_output *
          (this.core.generator_output_adjective * 0.01),
      )
    },
    get withinLoadLimit(): boolean {
      return this.load <= this.loadLimit
    },
    get withinEnOutput(): boolean {
      return this.enLoad <= this.enOutput
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
  rightBackUnit: ArmUnits.ArmUnit | BackUnits.BackUnit | BackUnits.NotEquipped
  leftBackUnit:
    | ArmUnits.ArmUnit
    | ArmUnits.LeftArmUnit
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
