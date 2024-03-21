import { it } from '@fast-check/vitest'
import { describe, expect } from 'vitest'
import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { armNotEquipped } from '~data/arm-units.ts'
import { backNotEquipped } from '~data/back-units.ts'
import { genCandidates } from '~spec/helper.ts'

describe('excludeNotEquipped', () => {
  it.prop([genCandidates()])('not contain not-equipped unit', (candidates) => {
    const applied = excludeNotEquipped.build('rightArmUnit').apply(candidates)
    const actual = applied.rightArmUnit

    expect(actual).not.toContain(armNotEquipped)
    expect(actual).not.toContain(backNotEquipped)
  })
  it.prop([genCandidates()])('not change other candidates', (candidates) => {
    const applied = excludeNotEquipped.build('rightArmUnit').apply(candidates)

    expect(applied).toMatchObject({
      head: candidates.head,
      core: candidates.core,
      arms: candidates.arms,
      legs: candidates.legs,

      booster: candidates.booster,
      fcs: candidates.fcs,
      generator: candidates.generator,

      expansion: candidates.expansion,
    })
  })
})
