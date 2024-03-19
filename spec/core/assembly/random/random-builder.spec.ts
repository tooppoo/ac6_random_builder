import { it } from '@fast-check/vitest'
import { describe, expect } from 'vitest'
import type { Assembly } from '~core/assembly/assembly'
import { randomBuild } from '~core/assembly/random/random-builder'
import { tank } from '~data/types/base/category'
import { booster, notEquipped } from '~data/types/base/classification'
import { candidates } from '~data/versions/v1.06.1.ts'
import { genLockedParts, genRandomizer } from '~spec/helper.ts'

describe(randomBuild.name, () => {
  it.prop([genRandomizer()])(
    'should build correct coupling booster and legs',
    (i) => {
      const actual = randomBuild(candidates, { randomizer: () => i })

      switch (actual.legs.category) {
        case tank:
          expect(actual.booster.classification).toStrictEqual(notEquipped)
          break
        default:
          expect(actual.booster.classification).toStrictEqual(booster)
          break
      }
    },
  )
  it.prop([genRandomizer()])('should not contain any empty parts', (i) => {
    const actual = randomBuild(candidates, { randomizer: () => i })

    expect(Object.values(actual)).not.toContain(undefined)
  })
  it.prop([genRandomizer()])('should contain all parts as key', (i) => {
    const assembly = randomBuild(candidates, { randomizer: () => i })
    const expected: Array<keyof Assembly> = [
      'rightArmUnit',
      'leftArmUnit',
      'rightBackUnit',
      'leftBackUnit',
      'head',
      'arms',
      'core',
      'legs',
      'booster',
      'fcs',
      'generator',
      'expansion',
    ]

    expect(assembly.keys.toSorted()).toEqual(
      expect.arrayContaining(expected.sort()),
    )
  })
  it.prop([genLockedParts()])('should use locked parts', ({ lockedParts }) => {
    const assembly = randomBuild(candidates, { lockedParts })

    const partsShouldBeLocked = lockedParts.lockedKeys.map((k) => assembly[k])

    expect(partsShouldBeLocked.toSorted()).toEqual(lockedParts.list.toSorted())
  })
})
