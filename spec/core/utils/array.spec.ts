import { fc, it as fcit } from '@fast-check/vitest'
import { random, sum } from 'src/core/utils/array'
import { describe, expect, it } from 'vitest'

describe('utils/array', () => {
  describe(sum.name, () => {
    const modelSum = (xs: number[]) => {
      let sum = 0
      xs.forEach((x) => {
        sum += x
      })

      return sum
    }

    fcit.prop([fc.array(fc.integer())])('should return sum of them', (xs) => {
      return sum(xs) === modelSum(xs)
    })
  })

  describe(random.name, () => {
    fcit.prop([
      fc.array(fc.option(fc.integer()), { minLength: 1 }),
      fc.float({ min: 0, max: 1, noNaN: true }),
    ])('should select a item', (xs, i) => {
      return random(xs, () => i) !== undefined
    })

    describe('with empty array', () => {
      it('should throw error', () => {
        expect(() => random([])).toThrowError()
      })
    })
  })
})
