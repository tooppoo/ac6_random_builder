import type { Candidates } from '~parts/types/candidates'

type Part = keyof Candidates
type PatchFunction<P extends Part> = (
  p: Partial<Candidates[P][number]>,
) => Partial<Candidates[P][number]>
type Patch = (base: Candidates) => Candidates

export function apply(base: Candidates, patches: readonly Patch[]): Candidates {
  return patches.reduce((acc, p) => p(acc), base)
}

type DefineUpdatePatch = <P extends Part>(key: P) => UpdatePatch<P>
type UpdatePatch<P extends Part> = (
  name: string,
  apply: PatchFunction<P>,
) => Patch

const defineUpdate: DefineUpdatePatch =
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
          const before = xs[i]
          const after = apply(before)
          r[i] = { ...before, ...after }

          return r
        }
      }
    })()

    return { ...base, [key]: result }
  }

type DefineAddPatch = <P extends Part>(key: P) => AddPatch<P>
type AddPatch<P extends Part> = (newItem: Candidates[P][number]) => Patch
const defineAdd: DefineAddPatch =
  <P extends Part>(key: P) =>
  (newItem: Candidates[P][number]) =>
  (base: Candidates): Candidates => {
    return {
      ...base,
      [key]: base[key].concat([newItem]),
    }
  }

type PatchSet<P extends Part> = Readonly<{
  update: UpdatePatch<P>
  add: AddPatch<P>
}>
const setupPatch = <P extends Part>(key: P): PatchSet<P> => ({
  update: defineUpdate(key),
  add: defineAdd(key),
})

type Patches = Readonly<{
  rightArmUnit: PatchSet<'rightArmUnit'>
  leftArmUnit: PatchSet<'leftArmUnit'>
  rightBackUnit: PatchSet<'rightBackUnit'>
  leftBackUnit: PatchSet<'leftBackUnit'>

  head: PatchSet<'head'>
  arms: PatchSet<'arms'>
  core: PatchSet<'core'>
  legs: PatchSet<'legs'>

  fcs: PatchSet<'fcs'>
  booster: PatchSet<'booster'>
  generator: PatchSet<'generator'>

  expansion: PatchSet<'expansion'>
}>
export const patches: Patches = {
  rightArmUnit: setupPatch('rightArmUnit'),
  leftArmUnit: setupPatch('leftArmUnit'),
  rightBackUnit: setupPatch('rightBackUnit'),
  leftBackUnit: setupPatch('leftBackUnit'),

  head: setupPatch('head'),
  arms: setupPatch('arms'),
  core: setupPatch('core'),
  legs: setupPatch('legs'),

  fcs: setupPatch('fcs'),
  booster: setupPatch('booster'),
  generator: setupPatch('generator'),

  expansion: setupPatch('expansion'),
}
