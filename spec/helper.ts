import fc from 'fast-check'
import { candidates } from '~data/versions/v1.06.1.ts'
import { randomBuild } from '~core/assembly/random/random-builder.ts'
import type { Candidates } from '~data/types/candidates.ts'

export function genRandomizer() {
  return fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true })
}

export function genAssembly(c: Candidates = candidates) {
  return genRandomizer().map((i) => randomBuild(c, { randomizer: () => i }))
}
