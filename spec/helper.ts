import {
  type AssemblyKey,
  assemblyKeys,
  type RawAssembly,
} from '~core/assembly/assembly.ts'
import { LockedParts } from '~core/assembly/random/lock.ts'
import { randomBuild } from '~core/assembly/random/random-builder.ts'
import { random } from '~core/utils/array.ts'

import type { Candidates } from '~data/types/candidates.ts'
import { candidates } from '~data/versions/v1.06.1.ts'

import fc, { Arbitrary, type ArrayConstraints } from 'fast-check'

export const genAssembly = (candidates: Candidates | null = null) =>
  (candidates ? fc.constant(candidates) : genCandidates()).map(randomBuild)
export const genAssemblyKeys = (cons: ArrayConstraints = {}) =>
  fc.uniqueArray(fc.constantFrom(...assemblyKeys()), cons)

type AssemblyKeyConstraint =
  | { only: AssemblyKey[]; without?: undefined }
  | { only?: undefined; without: AssemblyKey[] }
  | { only?: undefined; without?: undefined }
export const genAssemblyKey = ({ only, without }: AssemblyKeyConstraint = {}) =>
  genAssemblyKeys({ minLength: 1 })
    .map(random)
    .filter((k) => {
      if (only) return only.some((v) => v === k)
      if (without) return without.every((v) => v !== k)

      return true
    })

export const genLockedParts = () =>
  genAssemblyPartWithKeyPairs().map((pairs) => ({
    pairs,
    lockedParts: pairs.reduce(
      (lc, { key, part }) => lc.lock(key, part),
      LockedParts.empty,
    ),
  }))
const genAssemblyPartWithKeyPairs = () =>
  genAssembly()
    .chain((assembly) =>
      fc.record({
        assembly: fc.constant(assembly as RawAssembly),
        keys: fc.uniqueArray(fc.constantFrom(...assemblyKeys()), {
          minLength: 0,
          maxLength: assemblyKeys().length,
        }),
      }),
    )
    .map(({ assembly, keys }) =>
      keys.map((key) => ({
        key,
        part: assembly[key],
      })),
    )

export const genCandidates = (() => {
  const toArray =
    (constraints: ArrayConstraints) =>
    <T>(xs: readonly T[]): Arbitrary<T[]> =>
      fc.uniqueArray(fc.constantFrom(...xs), constraints)

  return (constraints: ArrayConstraints = { minLength: 1 }) => {
    const toArr = toArray(constraints)

    return fc.record<Candidates>({
      rightArmUnit: toArr(candidates.rightArmUnit),
      leftArmUnit: toArr(candidates.leftArmUnit),
      rightBackUnit: toArr(candidates.rightBackUnit),
      leftBackUnit: toArr(candidates.leftBackUnit),

      head: toArr(candidates.head),
      core: toArr(candidates.core),
      arms: toArr(candidates.arms),
      legs: toArr(candidates.legs),

      booster: toArr(candidates.booster),
      fcs: toArr(candidates.fcs),
      generator: toArr(candidates.generator),

      expansion: toArr(candidates.expansion),
    })
  }
})()
