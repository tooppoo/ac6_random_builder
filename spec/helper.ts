import fc from 'fast-check'
import { candidates, type Candidates } from '~core/assembly/candidates.ts'
import { randomBuild } from '~core/assembly/random/random-builder.ts'

export function genRandomizer() {
  return fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true })
}

export function genAssembly(c: Candidates = candidates) {
  return genRandomizer().map((i) => randomBuild(c, () => i))
}
