import {
  type Assembly,
  type AssemblyKey,
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

export const defaultRandomBuildOption: Required<RandomBuildOption> = {
  randomizer: () => Math.random(),
  lockedParts: LockedParts.empty,
}

export function randomBuild(
  candidates: Candidates,
  option: RandomBuildOption = defaultRandomBuildOption,
): Assembly {
  const rnd = randomIfNotLocked({ ...defaultRandomBuildOption, ...option })

  const legs = rnd('legs', candidates.legs)
  const base: Omit<RawAssembly, 'legs' | 'booster'> = {
    rightArmUnit: rnd('rightArmUnit', candidates.rightArmUnits),
    leftArmUnit: rnd('leftArmUnit', candidates.leftArmUnits),
    rightBackUnit: rnd('rightBackUnit', candidates.rightBackUnits),
    leftBackUnit: rnd('leftBackUnit', candidates.leftBackUnits),

    head: rnd('head', candidates.heads),
    core: rnd('core', candidates.cores),
    arms: rnd('arms', candidates.arms),

    fcs: rnd('fcs', candidates.fcses),
    generator: rnd('generator', candidates.generators),

    expansion: rnd('expansion', candidates.expansions),
  }

  switch (legs.category) {
    case 'tank':
      return createAssembly({ ...base, legs, booster: boosterNotEquipped })
    default:
      return createAssembly({
        ...base,
        legs,
        booster: rnd('booster', candidates.boosters),
      })
  }
}

const randomIfNotLocked =
  ({ lockedParts, randomizer }: Required<RandomBuildOption>) =>
  <K extends AssemblyKey, T extends RawAssembly[K]>(
    key: K,
    xs: readonly T[],
  ): T =>
    lockedParts.get(key, () => random(lockedParts.filter(key, xs), randomizer))
