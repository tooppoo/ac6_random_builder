import { fc, it as fcit } from '@fast-check/vitest'
import { random, sum } from '~core/utils/array'
import { describe, expect, it } from 'vitest'
import { logger } from '~core/utils/logger.ts'

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
    fcit.prop([fc.uniqueArray(fc.string(), { minLength: 1 })])(
      'should return each items so-so',
      (xs) => {
        const tryCount = 10_000
        const result: { [key: string]: number } = xs.reduce(
          (acc, key) => ({
            ...acc,
            [key]: 0,
          }),
          {},
        )
        ;[...new Array(tryCount)].forEach(() => {
          result[random(xs)] += 1
        })
        const per = Math.floor(tryCount / xs.length)

        logger.debug({ result, per })

        expect.extend({
          between: (received, { begin, end }) => ({
            message: () => `${received} is not between ${begin} and ${end}`,
            pass: begin <= received && received <= end,
          }),
        })

        Object.values(result).forEach((count) => {
          // @ts-expect-error extension
          expect(count).between({
            begin: per / 1.5,
            end: per * 1.5,
          })
        })
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
