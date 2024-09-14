import type { Candidates } from '~data/types/candidates'

type Part = keyof Candidates
type PatchForPart = <P extends Part>(key: P) => DefinePatch<P>

type DefinePatch<P extends Part> = (
  name: string,
  apply: PatchFunction<P>,
) => Patch
type PatchFunction<P extends Part> = (
  p: Candidates[P][number],
) => Candidates[P][number]
type Patch = (base: Candidates) => Candidates

export function apply(base: Candidates, patches: readonly Patch[]): Candidates {
  return patches.reduce((acc, p) => p(acc), base)
}

const defineUpdate: PatchForPart =
  <P extends Part>(key: P) =>
  (name, apply) =>
  (base) => {
    const xs = base[key]

    const targetIndex = xs.findIndex((x) => x.name === name)
    const target = xs[targetIndex] || null

    if (!target) {
      throw new Error(`${name} is not exist`)
    }

    const result = (() => {
      const r = [...xs]

      for (let i = 0; i < xs.length; i++) {
        if (i === targetIndex) {
          r[i] = apply(xs[i])

          return r
        }
      }
    })()

    return { ...base, [key]: result }
  }

const defineAdd =
  <P extends Part>(key: P) =>
  (newItem: Candidates[P][number]) =>
  (base: Candidates): Candidates => {
    return {
      ...base,
      [key]: base[key].concat([newItem]),
    }
  }

const definePatch = <P extends Part>(key: P) => ({
  update: defineUpdate(key),
  add: defineAdd(key),
})

export const patches = {
  rightArmUnit: definePatch('rightArmUnit'),
  leftArmUnit: definePatch('leftArmUnit'),
  rightBackUnit: definePatch('rightBackUnit'),
  leftBackUnit: definePatch('leftBackUnit'),

  head: definePatch('head'),
  arms: definePatch('arms'),
  core: definePatch('core'),
  legs: definePatch('legs'),

  fcs: definePatch('fcs'),
  booster: definePatch('booster'),
  generator: definePatch('generator'),

  expansion: definePatch('expansion'),
}
