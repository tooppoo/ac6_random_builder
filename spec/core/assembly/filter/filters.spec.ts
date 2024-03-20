import { it } from '@fast-check/vitest'
import { describe, expect } from 'vitest'
import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { armNotEquipped } from '~data/arm-units.ts'
import { backNotEquipped } from '~data/back-units.ts'
import { genCandidates } from '~spec/helper.ts'

describe('excludeNotEquipped', () => {
  it.prop([genCandidates()])('not contain not-equipped unit', (candidates) => {
    const applied = excludeNotEquipped.build('rightArmUnits').apply(candidates)
    const actual = applied.rightArmUnits

    expect(actual).not.toContain(armNotEquipped)
    expect(actual).not.toContain(backNotEquipped)
  })
  it.prop([genCandidates()])('not change other candidates', (candidates) => {
    const applied = excludeNotEquipped.build('rightArmUnits').apply(candidates)

    expect(applied).toMatchObject({
      heads: candidates.heads,
      cores: candidates.cores,
      arms: candidates.arms,
      legs: candidates.legs,

      boosters: candidates.boosters,
      fcses: candidates.fcses,
      generators: candidates.generators,

      expansions: candidates.expansions,
    })
  })
})
