import {Assembly} from "~core/assembly/assembly.ts";
import {Candidates} from "~core/assembly/candidates.ts";
import {notEquipped} from "~data/booster.ts";

export type Randomizer = () => number
export function randomBuild(
  candidates: Candidates,
  randomizer: Randomizer = () => Math.random(),
): Assembly {
  const randomSelect = <T>(xs: readonly T[]): T => xs[
    Math.floor(randomizer() * (xs.length - 1))
  ]

  const legs = randomSelect(candidates.legs)
  const base: Omit<Assembly, 'legs' | 'booster'> = {
    rightArmUnit: randomSelect(candidates.rightArmUnits),
    leftArmUnit: randomSelect(candidates.leftArmUnits),
    rightBackUnit: randomSelect(candidates.rightBackUnits),
    leftBackUnit: randomSelect(candidates.leftBackUnits),

    head: randomSelect(candidates.heads),
    core: randomSelect(candidates.cores),
    arms: randomSelect(candidates.arms),

    fcs: randomSelect(candidates.fcses),
    generator: randomSelect(candidates.generators),

    expansion: randomSelect(candidates.expansions),
  }

  switch(legs.category) {
    case 'tank':
      return { ...base, legs, booster: notEquipped }
    default:
      return { ...base, legs, booster: randomSelect(candidates.boosters) }
  }
}