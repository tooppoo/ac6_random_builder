import fc, { Arbitrary, type ArrayConstraints } from 'fast-check'
import type { RawAssembly } from '~core/assembly/assembly.ts'
import { LockedParts } from '~core/assembly/random/lock.ts'
import { randomBuild } from '~core/assembly/random/random-builder.ts'
import type { Candidates } from '~data/types/candidates.ts'
import { candidates } from '~data/versions/v1.06.1.ts'

export const genAssembly = (candidates: Candidates | null = null) =>
  (candidates ? fc.constant(candidates) : genCandidates()).map(randomBuild)
export const genAssemblyKeys = (cons: ArrayConstraints = {}) =>
  genAssembly().chain((a) => fc.uniqueArray(fc.constantFrom(...a.keys), cons))

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
        keys: fc.uniqueArray(fc.constantFrom(...assembly.keys), {
          minLength: 0,
          maxLength: assembly.keys.length,
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
      rightArmUnits: toArr(candidates.rightArmUnits),
      leftArmUnits: toArr(candidates.leftArmUnits),
      rightBackUnits: toArr(candidates.rightBackUnits),
      leftBackUnits: toArr(candidates.leftBackUnits),

      heads: toArr(candidates.heads),
      cores: toArr(candidates.cores),
      arms: toArr(candidates.arms),
      legs: toArr(candidates.legs),

      boosters: toArr(candidates.boosters),
      fcses: toArr(candidates.fcses),
      generators: toArr(candidates.generators),

      expansions: toArr(candidates.expansions),
    })
  }
})()
