import {booster, boosterNotEquipped} from "data/types/base/classification";
import fc from 'fast-check'
import {candidates} from "~core/assembly/candidates";
import {randomBuild} from "~core/assembly/random/random-builder";
import {describe, expect, it} from 'vitest'

describe(randomBuild.name, () => {
  fc.assert(
    fc.property(fc.float({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true }), (i) => {
      const actual = randomBuild(candidates, () => i)

      if (actual.legs.category === 'tank') {
        describe('with tank', () => {
          describe(actual.legs.name, () => {
            it('should not contain booster', () => {
              expect(actual.booster.classification).toStrictEqual(boosterNotEquipped)
            })
          })
        })
      } else {
        describe('without tank', () => {
          describe(actual.legs.name, () => {
            it('should contain booster', () => {
              expect(actual.booster.classification).toStrictEqual(booster)
            })
          })
        })
      }
    })
  )
})

