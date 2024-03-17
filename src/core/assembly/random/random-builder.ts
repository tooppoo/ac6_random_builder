import {
  type Assembly,
  createAssembly,
  type RawAssembly,
} from '~core/assembly/assembly.ts'
import { random } from '~core/utils/array.ts'
import { boosterNotEquipped } from '~data/booster.ts'
import type { Candidates } from '~data/types/candidates.ts'

export type Randomizer = () => number
export function randomBuild(
  candidates: Candidates,
  randomizer: Randomizer = () => Math.random(),
): Assembly {
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
