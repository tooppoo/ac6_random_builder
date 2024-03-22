import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { random } from '~core/utils/array.ts'

import { armNotEquipped } from '~data/arm-units.ts'
import { backNotEquipped } from '~data/back-units.ts'
import { expansionNotEquipped } from '~data/expansions.ts'

import { it } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import { genAssemblyKeys, genCandidates } from '~spec/helper.ts'

describe('excludeNotEquipped', () => {
  it.prop([genCandidates(), genAssemblyKeys({ minLength: 1 }).map(random)])(
    'not contain not-equipped unit at specified key',
    (candidates, key) => {
      const applied = excludeNotEquipped.build(key).apply(candidates)
      const actual = applied[key]

      expect(actual).not.toContain(armNotEquipped)
      expect(actual).not.toContain(backNotEquipped)
    },
  )
  it.prop([genCandidates()])(
    'not contain not-equipped at expansion',
    (candidates) => {
      const applied = excludeNotEquipped.build('expansion').apply(candidates)
      const actual = applied.expansion

      expect(actual).not.toContain(expansionNotEquipped)
    },
  )
  it.prop([genCandidates(), genAssemblyKeys({ minLength: 1 }).map(random)])(
    'not change other candidates',
    (candidates, key) => {
      const applied = excludeNotEquipped.build(key).apply(candidates)

      expect(applied).toMatchObject({
        head: candidates.head,
        core: candidates.core,
        arms: candidates.arms,
        legs: candidates.legs,

        booster: candidates.booster,
        fcs: candidates.fcs,
        generator: candidates.generator,
      })
    },
  )
})
