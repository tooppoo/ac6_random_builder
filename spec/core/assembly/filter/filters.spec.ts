import {
  excludeNotEquipped,
  notUseHanger,
} from '~core/assembly/filter/filters.ts'

import { armNotEquipped } from '~data/arm-units.ts'
import { backNotEquipped } from '~data/back-units.ts'
import { expansionNotEquipped } from '~data/expansions.ts'
import { armUnit } from '~data/types/base/classification.ts'

import { fc, it } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  genAssemblyKey,
  genCandidates,
  genFilterApplyContext,
} from '~spec/helper.ts'

describe(excludeNotEquipped.name, () => {
  it.prop([genCandidates(), genAssemblyKey(), genFilterApplyContext()])(
    'not contain not-equipped unit at specified key',
    (candidates, key, context) => {
      const applied = excludeNotEquipped.build(key).apply(candidates, context)
      const actual = applied[key]

      expect(actual).not.toContain(armNotEquipped)
      expect(actual).not.toContain(backNotEquipped)
      expect(actual).not.toContain(expansionNotEquipped)
    },
  )
  it.prop([genCandidates(), genAssemblyKey(), genFilterApplyContext()])(
    'not change other candidates',
    (candidates, key, context) => {
      const applied = excludeNotEquipped.build(key).apply(candidates, context)

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

describe(notUseHanger.name, () => {
  it.prop([
    genCandidates(),
    fc.constantFrom(...(['rightBackUnit', 'leftBackUnit'] as const)),
    genFilterApplyContext(),
  ])('remove arm unit from back unit', (candidates, key, context) => {
    const applied = notUseHanger.build(key).apply(candidates, context)

    expect(applied[key].map((p) => p.classification)).not.toContain(armUnit)
  })
  it.prop([
    genCandidates(),
    genAssemblyKey({ without: ['rightBackUnit', 'leftBackUnit'] }),
    genFilterApplyContext(),
  ])('not change parts other than back unit', (candidates, key, context) => {
    const applied = notUseHanger.build(key).apply(candidates, context)

    expect(applied[key]).toEqual(candidates[key])
  })
})
