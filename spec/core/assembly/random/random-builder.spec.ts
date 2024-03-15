import { it } from '@fast-check/vitest'
import { tank } from '~data/types/base/category'
import { booster, boosterNotEquipped } from '~data/types/base/classification'
import fc from 'fast-check'
import { Assembly } from '~core/assembly/assembly'
import { describe, expect } from 'vitest'
import { candidates } from '~core/assembly/candidates'
import { randomBuild } from '~core/assembly/random/random-builder'

describe(randomBuild.name, () => {
  it.prop([genRandomizer()])(
    'should build correct coupling booster and legs',
    (i) => {
      const actual = randomBuild(candidates, () => i)

      switch (actual.legs.category) {
        case tank:
          expect(actual.booster.classification).toStrictEqual(
            boosterNotEquipped,
          )
          break
        default:
          expect(actual.booster.classification).toStrictEqual(booster)
          break
      }
    },
  )
  it.prop([genRandomizer()])('should not contain any empty parts', (i) => {
    const actual = randomBuild(candidates, () => i)

    expect(Object.values(actual)).not.toContain(undefined)
  })
  it.prop([genRandomizer()])('should contain all parts as key', (i) => {
    const assembly = randomBuild(candidates, () => i)
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

    expect(Object.keys(assembly).sort()).toStrictEqual(expected.sort())
  })
})
export function genRandomizer() {
  return fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true })
}
