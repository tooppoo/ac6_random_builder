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
  const randomizer = option.randomizer || defaultRandomizer

  const legs = random(candidates.legs, randomizer)
  const base: Omit<RawAssembly, 'legs' | 'booster'> = {
    rightArmUnit: random(candidates.rightArmUnits, randomizer),
    leftArmUnit: random(candidates.leftArmUnits, randomizer),
    rightBackUnit: random(candidates.rightBackUnits, randomizer),
    leftBackUnit: random(candidates.leftBackUnits, randomizer),

    head: random(candidates.heads, randomizer),
    core: random(candidates.cores, randomizer),
    arms: random(candidates.arms, randomizer),

    fcs: random(candidates.fcses, randomizer),
    generator: random(candidates.generators, randomizer),

    expansion: random(candidates.expansions, randomizer),
  }

  switch (legs.category) {
    case 'tank':
      return createAssembly({ ...base, legs, booster: boosterNotEquipped })
    default:
      return createAssembly({
        ...base,
        legs,
        booster: random(candidates.boosters, randomizer),
      })
  }
}
