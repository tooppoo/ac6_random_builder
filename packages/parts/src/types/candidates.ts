import * as ArmUnits from '~data/arm-units'
import type { Arms } from '~data/arms'
import * as BackUnits from '~data/back-units'
import type { Booster } from '~data/booster'
import type { Core } from '~data/cores'
import * as Expansion from '~data/expansions'
import type { FCS } from '~data/fces'
import type { Generator } from '~data/generators'
import type { Head } from '~data/heads'
import type { Legs } from '~data/legs'
import type {
  ArmNotEquipped,
  BackNotEquipped,
  BoosterNotEquipped,
  ExpansionNotEquipped,
} from '~data/not-equipped'
import { tank } from '~data/types/base/category'
import {
  type Classification,
  notEquipped,
} from '~data/types/base/classification'

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
      (acc: Candidates[K], name): Candidates[K] =>
        [...acc, namePartsMap[name]] as Candidates[K],
      [] as Candidates[K],
    )
  }
}
