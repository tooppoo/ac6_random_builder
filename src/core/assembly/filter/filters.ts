import type { AssemblyKey } from '~core/assembly/assembly.ts'
import type { PartsFilter } from '~core/assembly/filter/base.ts'

import { boosterNotEquipped } from '~data/booster.ts'
import { tank } from '~data/types/base/category.ts'
import { armUnit, notEquipped } from '~data/types/base/classification.ts'
import type { Manufacture } from '~data/types/base/manufacture.ts'
import { type Candidates, type CandidatesKey } from '~data/types/candidates.ts'

export const excludeNotEquipped = (() => {
  const name = 'excludeNotEquipped'

  return {
    name,
    build: (key: CandidatesKey): PartsFilter => ({
      name,
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
      apply: (candidates, { assembly }): Candidates => {
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

export const onlyProvidedBySpecifiedManufactures = (() => {
  const name = 'onlyProvidedBySpecifiedManufactures'

  return {
    name,
    build: (key: AssemblyKey, manufactures: Manufacture[]): PartsFilter => ({
      name,
      apply: (candidates): Candidates => {
        switch (key) {
          case 'expansion':
            return candidates
          default:
            return {
              ...candidates,
              [key]: candidates[key].filter((c) => {
                if (c.classification === notEquipped) return true

                return manufactures.includes(c.manufacture)
              }),
            }
        }
      },
    }),
  }
})()
