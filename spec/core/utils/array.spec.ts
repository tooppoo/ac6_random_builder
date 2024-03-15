import { fc, it as fcit } from '@fast-check/vitest'
import { random, sum } from '~core/utils/array'
import { describe, expect, it } from 'vitest'

describe('utils/array', () => {
  describe(sum.name, () => {
    fcit.prop([fc.array(fc.integer())])('should return sum of them', (xs) => {
      expect(sum(xs)).toStrictEqual(modelSum(xs))
    })

    function modelSum(xs: number[]): number {
      let sum = 0
      xs.forEach((x) => {
        sum += x
      })

      return sum
    }
  })

  describe(random.name, () => {
    fcit.prop([nonEmptyArray(anyWithoutUndefined())])(
      'should select a item',
      (xs) => {
        expect(random(xs)).not.toBeUndefined()
      },
    )
    fcit.prop([nonEmptyArray(anyWithoutUndefined())])(
      'should return item within list',
      (xs) => {
        expect(xs).contain(random(xs))
      },
    )

    describe('with empty array', () => {
      it('should throw error', () => {
        expect(() => random([])).toThrowError()
      })
    })

    function nonEmptyArray<T>(arb: fc.Arbitrary<T>) {
      return fc.array(arb, { minLength: 1 })
    }
    function anyWithoutUndefined() {
      return fc.anything().filter((v) => v !== undefined)
    }
  })
})
