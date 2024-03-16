import type { Assembly } from '~core/assembly/assembly.ts'
import type { Candidates } from '~core/assembly/candidates.ts'
import { random } from '~core/utils/array.ts'
import { notEquipped } from '~data/booster.ts'

export type Randomizer = () => number
export function randomBuild(
  candidates: Candidates,
  randomizer: Randomizer = () => Math.random(),
): Assembly {
  const legs = random(candidates.legs, randomizer)
  const base: Omit<Assembly, 'legs' | 'booster'> = {
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
      return { ...base, legs, booster: notEquipped }
    default:
      return { ...base, legs, booster: random(candidates.boosters, randomizer) }
  }
}
