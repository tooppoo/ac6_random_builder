import fc, { type ArrayConstraints } from 'fast-check'
import type { RawAssembly } from '~core/assembly/assembly.ts'
import { LockedParts } from '~core/assembly/random/lock.ts'
import { randomBuild } from '~core/assembly/random/random-builder.ts'
import type { Candidates } from '~data/types/candidates.ts'
import { candidates } from '~data/versions/v1.06.1.ts'

export function genRandomizer() {
  return fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true })
}

export function genAssembly(c: Candidates = candidates) {
  return genRandomizer().map((i) => randomBuild(c, { randomizer: () => i }))
}
export function genAssemblyKeys(
  cons: ArrayConstraints & { candidates?: Candidates },
) {
  return genAssembly(cons.candidates || candidates).chain((a) =>
    fc.array(fc.oneof(...a.keys.map(fc.constant)), cons),
  )
}

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
        keys: fc.uniqueArray(
          fc.oneof(...assembly.keys.map((k) => fc.constant(k))),
          { minLength: 0, maxLength: assembly.keys.length },
        ),
      }),
    )
    .map(({ assembly, keys }) =>
      keys.map((key) => ({
        key,
        part: assembly[key],
      })),
    )
