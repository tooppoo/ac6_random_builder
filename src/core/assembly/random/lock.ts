import type { AssemblyKey, RawAssembly } from 'src/core/assembly/assembly.ts'
import type { Booster, BoosterNotEquipped } from '~data/booster.ts'
import type { Legs } from '~data/legs.ts'
import { tank } from '~data/types/base/category.ts'
import { booster, notEquipped } from '~data/types/base/classification.ts'

type LockedPartsMap = {
  [P in AssemblyKey]?: RawAssembly[P]
}
type LockedPartsFilter = {
  [P in AssemblyKey]?: (x: RawAssembly[P]) => boolean
}

export class LockedParts {
  static get empty(): LockedParts {
    return new LockedParts({}, {})
  }

  constructor(
    private readonly map: LockedPartsMap,
    private readonly filterMap: LockedPartsFilter,
  ) {}

  get<K extends AssemblyKey>(
    target: K,
    fallback: () => NonNullable<LockedPartsMap[K]>,
  ): NonNullable<LockedPartsMap[K]> {
    return this.map[target] || fallback()
  }
  filter<K extends AssemblyKey>(
    target: K,
    xs: readonly NonNullable<LockedPartsMap[K]>[],
  ): NonNullable<LockedPartsMap[K]>[] {
    return xs.filter(this.filterMap[target] || ((_) => true))
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
            .withFilter({
              legs: (x) => x.category === tank,
            })
            .writeMap(target, item)
        case booster:
          // ブースター装備はタンク以外限定なので、
          // ブースター装備で固定する場合は脚部のロックを強制解除 + タンク以外に限定
          return this.unlock('legs')
            .withFilter({
              legs: (x) => x.category !== tank,
            })
            .writeMap(target, item)
      }
    if (isLegs(target, item))
      switch (item.category) {
        case tank:
          // タンクはブースター装備不可なので、
          // タンクにロックする場合はブースターのロックを強制解除 + ブースター未装備限定
          return this.unlock('booster')
            .withFilter({
              booster: (x) => x.classification === notEquipped,
            })
            .writeMap(target, item)
        default:
          // タンク以外はブースター装備必須なので、
          // タンク以外の脚にロックする場合はブースターのロックを強制解除 + ブースター装備限定
          return this.unlock('booster')
            .withFilter({
              booster: (x) => x.classification !== notEquipped,
            })
            .writeMap(target, item)
      }

    return this.writeMap(target, item)
  }
  unlock<K extends AssemblyKey>(target: K): LockedParts {
    const copyMap = { ...this.map }
    delete copyMap[target]

    // filterはロック時の特殊な状況でのみ必要なので、
    // unlockでは一律解除で良い
    return this.withMap(copyMap).clearFilter()
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
    return new LockedParts(map, this.filterMap)
  }
  private withFilter(filter: LockedPartsFilter) {
    return new LockedParts(this.map, filter)
  }
  private clearFilter() {
    return this.withFilter({})
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
