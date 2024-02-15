import {sum} from "src/core/utils/array";
import {describe, expect, it} from "vitest";
import fc from "fast-check";

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
})
