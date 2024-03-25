import {
  assumeConstraintLegsAndBooster,
  excludeNotEquipped,
  notUseHanger,
  onlyProvidedBySpecifiedManufactures,
} from '~core/assembly/filter/filters.ts'

import { armNotEquipped } from '~data/arm-units.ts'
import { backNotEquipped } from '~data/back-units.ts'
import { boosterNotEquipped } from '~data/booster.ts'
import { expansionNotEquipped } from '~data/expansions.ts'
import { tank } from '~data/types/base/category.ts'
import { armUnit } from '~data/types/base/classification.ts'
import { manufactures } from '~data/types/base/manufacture.ts'
import type { ACParts } from '~data/types/base/types.ts'

import { fc, it } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  genAssembly,
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

describe(assumeConstraintLegsAndBooster.name, () => {
  describe('when legs is tank', () => {
    it.prop([
      genCandidates(),
      genFilterApplyContext().filter(
        ({ assembly }) => assembly.legs.category === tank,
      ),
    ])(
      'should allow only not-equipped as candidates of booster',
      (candidates, context) => {
        const applied = assumeConstraintLegsAndBooster
          .build(candidates)
          .apply(candidates, context)

        expect(applied.booster).toEqual([boosterNotEquipped])
      },
    )
  })
  describe('when legs is not tank', () => {
    it.prop([
      genCandidates(),
      genFilterApplyContext().filter(
        ({ assembly }) => assembly.legs.category !== tank,
      ),
    ])('should allow only actual booster', (candidates, context) => {
      const applied = assumeConstraintLegsAndBooster
        .build(candidates)
        .apply(candidates, context)

      expect(applied.booster).to.deep.equals(
        candidates.booster,
        'booster candidates should not be changed',
      )
      expect(applied.booster).not.to.contains(
        boosterNotEquipped,
        'booster candidates should not contain not-equipped',
      )
    })
  })
})

describe(onlyProvidedBySpecifiedManufactures.name, () => {
  it.prop([
    genCandidates().chain((c) =>
      fc.record({ candidates: fc.constant(c), assembly: genAssembly(c) }),
    ),
    genAssemblyKey(),
    genManufactures(),
  ])(
    'should contain only products which is provided specified manufacture in candidates',
    ({ candidates, assembly }, key, manufactures) => {
      const filter = onlyProvidedBySpecifiedManufactures.build(
        key,
        manufactures,
      )

      const applied = filter.apply(candidates, { assembly })

      const actual = applied[key]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c) => (c as never as ACParts<any, any, any>).manufacture)
        .filter((_) => _)
        .toSorted()

      // フィルタリングされた結果のmanufacturesは、
      // 指定されたmanufactureのサブセットであること
      expect(manufactures).toEqual(expect.arrayContaining(actual))
    },
  )
  function genManufactures() {
    return fc.array(genManufacture())
  }
  function genManufacture() {
    return fc.constantFrom(...manufactures)
  }
})
