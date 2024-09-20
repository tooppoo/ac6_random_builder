import * as ArmUnits from '~parts/arm-units'
import type { Arms } from '~parts/arms'
import * as BackUnits from '~parts/back-units'
import type { Booster } from '~parts/booster'
import type { Core } from '~parts/cores'
import * as Expansion from '~parts/expansions'
import type { FCS } from '~parts/fces'
import type { Generator } from '~parts/generators'
import type { Head } from '~parts/heads'
import type { Legs } from '~parts/legs'
import type {
  ArmNotEquipped,
  BackNotEquipped,
  BoosterNotEquipped,
  ExpansionNotEquipped,
} from '~parts/not-equipped'
import { tank } from '~parts/types/base/category'
import {
  type Classification,
  notEquipped,
} from '~parts/types/base/classification'

export type CandidatesKey = keyof Candidates
export type Candidates = Readonly<{
  rightArmUnit: ReadonlyArray<ArmUnits.ArmUnit | ArmNotEquipped>
  leftArmUnit: ReadonlyArray<
    ArmUnits.LeftArmUnit | ArmUnits.ArmUnit | ArmNotEquipped
  >
  rightBackUnit: ReadonlyArray<
    BackUnits.BackUnit | ArmUnits.ArmUnit | BackNotEquipped
  >
  leftBackUnit: ReadonlyArray<
    | BackUnits.LeftBackUnit
    | BackUnits.BackUnit
    | ArmUnits.LeftArmUnit
    | ArmUnits.ArmUnit
    | BackNotEquipped
  >

  head: readonly Head[]
  core: readonly Core[]
  arms: readonly Arms[]
  legs: readonly Legs[]

  booster: readonly (Booster | BoosterNotEquipped)[]
  fcs: readonly FCS[]
  generator: readonly Generator[]

  expansion: ReadonlyArray<Expansion.Expansion | ExpansionNotEquipped>
}>

export function onlyTank(xs: readonly Legs[]): Legs[] {
  return xs.filter((x) => x.category === tank)
}
export function notTank(xs: readonly Legs[]): Legs[] {
  return xs.filter((x) => x.category !== tank)
}
export function excludeNotEquipped<
  T extends { classification: Classification },
>(xs: readonly T[]): T[] {
  return xs.filter((x) => x.classification !== notEquipped)
}

/**
 * UI上でのパーツの表示順序
 */
export type Order = Record<keyof Candidates, readonly string[]>
export type OrderParts = <K extends keyof Candidates>(
  key: K,
  parts: Candidates[K],
) => Candidates[K]
export function defineOrder(order: Order): OrderParts {
  return <K extends keyof Candidates>(
    key: K,
    parts: Candidates[K],
  ): Candidates[K] => {
    type NamePartsMap = Record<string, Candidates[K][number]>
    const namePartsMap = parts.reduce(
      (acc: NamePartsMap, p: Candidates[K][number]): NamePartsMap => ({
        ...acc,
        [p.name]: p,
      }),
      {} as NamePartsMap,
    )

    return order[key].reduce(
      (acc: Candidates[K], name): Candidates[K] => {
        const item = namePartsMap[name]
        
        return (item ? [...acc, item] : acc) as Candidates[K]
      },
      [] as Candidates[K],
    )
  }
}
