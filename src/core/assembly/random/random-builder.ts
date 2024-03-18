import {
  type Assembly,
  createAssembly,
  type RawAssembly,
} from '~core/assembly/assembly.ts'
import { random } from '~core/utils/array.ts'
import { boosterNotEquipped } from '~data/booster.ts'
import type { Candidates } from '~data/types/candidates.ts'
import { LockedParts } from './lock.ts'

export type RandomBuildOption = Readonly<{
  randomizer?: () => number
  lockedParts?: LockedParts
}>

const defaultRandomizer = () => Math.random()
export const defaultRandomBuildOption: Required<RandomBuildOption> = {
  randomizer: () => Math.random(),
  lockedParts: LockedParts.empty,
}

export function randomBuild(
  candidates: Candidates,
  option: RandomBuildOption = defaultRandomBuildOption,
): Assembly {
  const rnd = <T>(xs: readonly T[]): T =>
    random(xs, option.randomizer || defaultRandomizer)

  const legs = rnd(candidates.legs)
  const base: Omit<RawAssembly, 'legs' | 'booster'> = {
    rightArmUnit: rnd(candidates.rightArmUnits),
    leftArmUnit: rnd(candidates.leftArmUnits),
    rightBackUnit: rnd(candidates.rightBackUnits),
    leftBackUnit: rnd(candidates.leftBackUnits),

    head: rnd(candidates.heads),
    core: rnd(candidates.cores),
    arms: rnd(candidates.arms),

    fcs: rnd(candidates.fcses),
    generator: rnd(candidates.generators),

    expansion: rnd(candidates.expansions),
  }

  switch (legs.category) {
    case 'tank':
      return createAssembly({ ...base, legs, booster: boosterNotEquipped })
    default:
      return createAssembly({
        ...base,
        legs,
        booster: rnd(candidates.boosters),
      })
  }
}
