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

export function spaceByWord(key: AssemblyKey): string {
  return key.replaceAll(/([A-Z])/g, ' $1')
}

export function assemblyKeys(): AssemblyKey[] {
  return [
    'rightArmUnit',
    'leftArmUnit',
    'rightBackUnit',
    'leftBackUnit',
    'head',
    'core',
    'arms',
    'legs',
    'booster',
    'fcs',
    'generator',
    'expansion',
  ]
}

export type Assembly = RawAssembly & AssemblyProperty
export type AssemblyProperty = {
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
  /** EN余剰 */
  readonly enSurplus: number
  /** EN供給効率 */
  readonly enSupplyEfficiency: number
  /** EN補充遅延 */
  readonly enRechargeDelay: number
  /** 総COAM */
  readonly coam: number

  /** 姿勢安定性能 */
  readonly attitudeStability: number

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
    get enSurplus(): number {
      return this.enOutput - this.enLoad
    },
    get enOutput(): number {
      return Math.floor(
        this.generator.en_output *
          (this.core.generator_output_adjective * 0.01),
      )
    },
    get enSupplyEfficiency(): number {
      if (this.enSurplus >= 1800) {
        return Math.floor(9000 + ((this.enSurplus - 1800) * 75) / 17)
      } else if (this.enSurplus >= 0) {
        return Math.floor(1500 + (this.enSurplus * 25) / 6)
      } else {
        return 100
      }
    },
    get enRechargeDelay(): number {
      const base =
        1000 /
        ((this.generator.en_recharge / 100) *
          this.core.generator_supply_adjective)

      // 小数点第二位で四捨五入
      return Math.round(base * 100) / 100
    },
    get coam(): number {
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
          this.generator,
        ].map((p) => p.price),
      )
    },
    get attitudeStability(): number {
      return sum([
        this.head,
        this.core,
        this.legs,
      ].map(p => p.attitude_stability))
    },
    get withinLoadLimit(): boolean {
      return this.load <= this.loadLimit
    },
    get withinEnOutput(): boolean {
      return this.enSurplus >= 0
    },
  }
}

export type RawAssembly = AssemblyNotTank | AssemblyWithTank
export type AssemblyKey = keyof RawAssembly

type AssemblyNotTank = BaseAssembly & {
  legs: LegsNotTank
  booster: Boosters.Booster
}
type AssemblyWithTank = BaseAssembly & {
  legs: LegsTank
  booster: Boosters.BoosterNotEquipped
}
type BaseAssembly = {
  rightArmUnit: ArmUnits.ArmUnit | ArmUnits.ArmNotEquipped
  leftArmUnit: ArmUnits.ArmUnit | ArmUnits.LeftArmUnit | ArmUnits.ArmNotEquipped
  rightBackUnit:
    | ArmUnits.ArmUnit
    | BackUnits.BackUnit
    | BackUnits.BackNotEquipped
  leftBackUnit:
    | ArmUnits.ArmUnit
    | ArmUnits.LeftArmUnit
    | BackUnits.BackUnit
    | BackUnits.LeftBackUnit
    | BackUnits.BackNotEquipped

  head: Head
  core: Core
  arms: Arms

  fcs: FCS
  generator: Generator
  expansion: Expansion.Expansion | Expansion.ExpansionNotEquipped
}
