import {random, sum} from "src/core/utils/array";
import {describe, expect, it} from "vitest";
import {fc, it as fcit} from "@fast-check/vitest";

describe('utils/array', () => {
  describe(sum.name, () => {
    const modelSum = (xs: number[]) => {
      let sum = 0
      xs.forEach(x => {
        sum += x
      })

      return sum
    }

    fc.assert(
      fc.property(fc.array(fc.integer()), (data) => {
        describe(`list = ${JSON.stringify(data)}`, () => {
          it(`should return sum(${modelSum(data)})`, () => {
            expect(sum(data)).toStrictEqual(modelSum(data))
          })
        })
      })
    )
  })

  describe(random.name, () => {
    fcit.prop([
      fc.array(fc.option(fc.integer()), { minLength: 1 }),
      fc.float({ min: 0, max: 1, noNaN: true }),
    ])('', (xs, i) => {
      return random(xs, () => i) !== undefined
    })

    describe('with empty array', () => {
      it('should throw error', () => {
        expect(() => random([])).toThrowError()
      })
    })
  })
})
