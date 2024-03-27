import type { AssemblyKey } from '~core/assembly/assembly.ts'
import type { PartsFilter } from '~core/assembly/filter/base.ts'
import { enableOrNot, filterByProp } from '~core/assembly/filter/filter-type.ts'

import { boosterNotEquipped } from '~data/booster.ts'
import { tank } from '~data/types/base/category.ts'
import { armUnit, notEquipped } from '~data/types/base/classification.ts'
import type { ACParts } from '~data/types/base/types.ts'
import { type Candidates, type CandidatesKey } from '~data/types/candidates.ts'

export const excludeNotEquipped = (() => {
  const name = 'excludeNotEquipped'

  return {
    name,
    build: (key: CandidatesKey): PartsFilter => ({
      name,
      type: enableOrNot,
      apply: (candidates: Candidates): Candidates => ({
        ...candidates,
        [key]: candidates[key].filter(
          (p: Candidates[typeof key][number]) =>
            p.classification !== notEquipped,
        ),
      }),
    }),
  } as const
})()

export const notUseHanger = (() => {
  const name = 'notUseHanger'

  return {
    name,
    build: (key: CandidatesKey): PartsFilter => ({
      name,
      type: enableOrNot,
      apply: (candidates) => {
        switch (key) {
          case 'rightBackUnit':
          case 'leftBackUnit':
            return {
              ...candidates,
              [key]: candidates[key].filter(
                (p) => p.classification !== armUnit,
              ),
            }
          default:
            return candidates
        }
      },
    }),
  } as const
})()

export const assumeConstraintLegsAndBooster = (() => {
  const name = 'assumeConstraintLegsAndBooster' as const

  return {
    name,
    build: (initialCandidates: Candidates): PartsFilter => ({
      name,
      type: enableOrNot,
      apply: (candidates, { assembly, wholeFilter }): Candidates => {
        if (wholeFilter.booster.containEnabled) {
          return {
            ...candidates,
            // ブースターになんらかのフィルタが適用されている場合、
            // その時点でブースター装備が確定しているのでタンクは除外
            legs: candidates.legs.filter((l) => l.category !== tank),
          }
        }
        if (assembly.legs.category === tank) {
          return {
            ...candidates,
            booster: [boosterNotEquipped],
          }
        } else {
          return {
            ...candidates,
            booster: initialCandidates.booster,
          }
        }
      },
    }),
  }
})()

export const onlyPropertyIncludedInList = <P extends keyof ACParts>(
  prop: P,
) => {
  const name = `only-${prop}-included-in-list` as const

  type List = ACParts[P][]
  type Params = {
    key: AssemblyKey
    selected: List
    whole: List
    onEmpty: (
      context: Omit<Params, 'onEmpty'> & { candidates: Candidates },
    ) => Candidates
  }
  return {
    name,
    build: ({ key, selected, whole, onEmpty }: Params): PartsFilter => ({
      name,
      type: filterByProp(prop, selected, whole),
      apply(candidates) {
        // typeの変更を反映するため、this経由でtypeを参照する必要がある
        // そのため、この apply は arrow function にしてはならない
        const result = candidates[key].filter((c) =>
          this.type.value!.includes(c[prop]),
        )

        return result.length > 0
          ? {
              ...candidates,
              [key]: result,
            }
          : onEmpty({ key, selected, whole, candidates })
      },
    }),
  }
}
