import type { AssemblyKey, RawAssembly } from '~core/assembly/assembly.ts'

import {
  type Booster,
  boosterNotEquipped,
  type BoosterNotEquipped,
} from '~data/booster.ts'
import type { Legs } from '~data/legs.ts'
import { tank } from '~data/types/base/category.ts'
import { booster, notEquipped } from '~data/types/base/classification.ts'
import {
  type Candidates,
  excludeNotEquipped,
  notTank,
  onlyTank,
} from '~data/types/candidates.ts'

type LockedPartsMap = {
  [P in AssemblyKey]?: RawAssembly[P]
}
type Filter = (c: Candidates) => Candidates

export class LockedParts {
  static get empty(): LockedParts {
    return new LockedParts({}, (_) => _)
  }

  constructor(
    private readonly map: LockedPartsMap,
    private readonly candidatesFilter: Filter,
  ) {}

  get<K extends AssemblyKey>(
    target: K,
    fallback: () => NonNullable<LockedPartsMap[K]>,
  ): NonNullable<LockedPartsMap[K]> {
    return this.map[target] || fallback()
  }
  filter(candidates: Candidates): Candidates {
    return this.candidatesFilter(candidates)
  }

  lock<K extends AssemblyKey>(
    target: K,
    item: NonNullable<LockedPartsMap[K]>,
  ): LockedParts {
    if (isBooster(target, item))
      switch (item.classification) {
        case notEquipped:
          // ブースター未装備はタンク限定なので、
          // ブースター未装備にロックする場合は脚部のロックを強制解除 + タンク限定
          return this.unlock('legs')
            .withFilter((c) => ({
              ...c,
              legs: onlyTank(c.legs),
            }))
            .writeMap(target, item)
        case booster:
          // ブースター装備はタンク以外限定なので、
          // ブースター装備で固定する場合は脚部のロックを強制解除 + タンク以外に限定
          return this.unlock('legs')
            .withFilter((c) => ({
              ...c,
              legs: notTank(c.legs),
            }))
            .writeMap(target, item)
      }
    if (isLegs(target, item))
      switch (item.category) {
        case tank:
          // タンクはブースター装備不可なので、
          // タンクにロックする場合はブースターのロックを強制解除 + ブースター未装備限定
          return this.unlock('booster')
            .withFilter((c) => ({
              ...c,
              booster: [boosterNotEquipped],
            }))
            .writeMap(target, item)
        default:
          // タンク以外はブースター装備必須なので、
          // タンク以外の脚にロックする場合はブースターのロックを強制解除 + ブースター装備限定
          return this.unlock('booster')
            .withFilter((c) => ({
              ...c,
              booster: excludeNotEquipped(c.booster),
            }))
            .writeMap(target, item)
      }

    return this.writeMap(target, item)
  }
  unlock<K extends AssemblyKey>(target: K): LockedParts {
    const copyMap = { ...this.map }
    delete copyMap[target]

    if (!copyMap.legs && !copyMap.booster) {
      return this.withMap(copyMap).clearFilter()
    } else {
      return this.withMap(copyMap)
    }
  }
  isLocking(key: AssemblyKey): boolean {
    return !!this.map[key]
  }

  get lockedKeys(): Array<keyof RawAssembly> {
    return Object.keys(this.map) as Array<keyof RawAssembly>
  }
  get list(): Array<RawAssembly[keyof RawAssembly]> {
    return Object.values(this.map)
  }

  private writeMap<K extends AssemblyKey>(
    target: K,
    item: NonNullable<LockedPartsMap[K]>,
  ) {
    return this.withMap({ ...this.map, [target]: item })
  }
  private withMap(map: LockedPartsMap) {
    return new LockedParts(map, this.candidatesFilter)
  }
  private withFilter(filter: Filter) {
    return new LockedParts(this.map, filter)
  }
  private clearFilter() {
    return this.withFilter((_) => _)
  }
}

function isBooster<K extends AssemblyKey>(
  key: K,
  _item: unknown,
): _item is Booster | BoosterNotEquipped {
  return key === 'booster'
}
function isLegs<K extends AssemblyKey>(key: K, _item: unknown): _item is Legs {
  return key === 'legs'
}
