import type { AssemblyKey } from '~core/assembly/assembly.ts'
import type { PartsFilter } from '~core/assembly/filter/base.ts'
import {
  type EnableOrNot,
  enableOrNot,
  type FilterByProp,
} from '~core/assembly/filter/filter-type.ts'
import { logger } from '~core/utils/logger.ts'

import { UsableItemNotFoundError } from '~view/pages/index/interaction/filter.ts'

import { boosterNotEquipped } from '@ac6_assemble_tool/parts/not-equipped'
import { tank } from '@ac6_assemble_tool/parts/types/base/category'
import { armUnit, notEquipped } from '@ac6_assemble_tool/parts/types/base/classification'
import type { ACParts } from '@ac6_assemble_tool/parts/types/base/types'
import { type Candidates, type CandidatesKey } from '@ac6_assemble_tool/parts/types/candidates'

export const excludeNotEquipped = (() => {
  const name = 'excludeNotEquipped'

  type Config = WithEmptyHandle<
    Readonly<{
      key: CandidatesKey
    }>
  >

  return {
    name,
    build: ({ key, onEmpty }: Config): PartsFilter<EnableOrNot> => ({
      name,
      type: enableOrNot,
      apply: (candidates: Candidates): Candidates => {
        const filtered = candidates[key].filter(
          (p: Candidates[typeof key][number]) =>
            p.classification !== notEquipped,
        )
        return filtered.length > 0
          ? {
              ...candidates,
              [key]: filtered,
            }
          : onEmpty({ key, candidates })
      },
    }),
  } as const
})()

export const notUseHanger = (() => {
  const name = 'notUseHanger'

  return {
    name,
    build: (key: CandidatesKey): PartsFilter<EnableOrNot> => ({
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
    build: (initialCandidates: Candidates): PartsFilter<EnableOrNot> => ({
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

export function onlyPropertyIncludedInList<
  P extends string & keyof B,
  B extends ACParts,
>(prop: P) {
  const name = `only-${prop}-included-in-list` as const

  type Params = {
    key: AssemblyKey
    selected: B[P][]
    whole: B[P][]
    onEmpty: (
      context: Omit<Params, 'onEmpty'> & {
        candidates: Candidates
        property: P
      },
    ) => Candidates
  }
  return {
    name,
    build: ({
      key,
      selected,
      whole,
      onEmpty,
    }: Params): PartsFilter<FilterByProp<P, B>> => ({
      name,
      type: {
        id: 'filterByProperty',
        property: prop,
        value: selected,
        whole,
      },
      apply(candidates) {
        // typeの変更を反映するため、this経由でtypeを参照する必要がある
        // そのため、この apply は arrow function にしてはならない
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = candidates[key].filter((c: any) =>
          // 指定の値が含まれているかどうかのチェックのみなので、ここでは厳格さは不要と判断
          this.type.value.includes(c[prop]),
        )

        return result.length > 0
          ? {
              ...candidates,
              [key]: result,
            }
          : onEmpty({ key, selected, whole, candidates, property: prop })
      },
    }),
  }
}

type OnEmpty<Params extends object> = (
  context: Omit<Params, 'onEmpty'> & { candidates: Candidates },
) => Candidates
type WithEmptyHandle<Params extends object> = Params & {
  onEmpty: OnEmpty<Params>
}

export const errorWhenEmpty =
  (key: AssemblyKey, message: string): OnEmpty<object> =>
  (context) => {
    logger.error({
      message,
      key,
      context,
    })

    throw new UsableItemNotFoundError({ key, ...context }, message)
  }
