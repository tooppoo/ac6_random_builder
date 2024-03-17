import { fc, it } from '@fast-check/vitest'
import type { Validator } from '~core/assembly/random/validator/base'
import { failure, success } from '~core/assembly/random/validator/result'
import { candidates } from '~data/versions/v1.06.1.ts'
import { afterEach, beforeEach, describe, expect, type Mock, vi } from 'vitest'
import {
  OverTryLimitError,
  OverwriteInnerSecretValidatorError,
  RandomAssembly,
} from '~core/assembly/random/random-assembly'

describe(RandomAssembly.name, () => {
  it.prop([fc.array(generateValidatorWithKey())])(
    'should return only valid assembly',
    (validators) => {
      const sut = validators.reduce<RandomAssembly>(
        (r, { key, validator }) => r.addValidator(key, validator),
        RandomAssembly.init(),
      )
      const assembly = sut.assemble(candidates)

      return sut.validate(assembly).isSuccess
    },
  )

  describe('with validator', () => {
    describe('when add validator', () => {
      describe('with same key', () => {
        it.prop([generateValidator(), generateValidator()])(
          'return later validator for the key',
          (val1, val2) => {
            const sut = RandomAssembly.init()
              .addValidator('key', val1)
              .addValidator('key', val2)

            expect(sut.getValidator('key')).toBe(val2)
          },
        )
        it.prop([generateValidator(), generateValidator()])(
          'count of validators should not change',
          (val1, val2) => {
            const sut1 = RandomAssembly.init().addValidator('key', val1)
            const sut2 = sut1.addValidator('key', val2)

            expect(sut1.validators.length).toBe(sut2.validators.length)
          },
        )
      })

      describe('with inner key', () => {
        const testValidator: Validator = {
          validate: () => {
            throw new Error('this should not be called')
          },
        }
        const sut = RandomAssembly.init()
        const key = '__inner__test'

        it('should throw error', () => {
          expect(() => sut.addValidator(key, testValidator)).toThrowError(
            OverwriteInnerSecretValidatorError,
          )
        })
        it('enable check what key occur error', () => {
          try {
            sut.addValidator(key, testValidator)

            expect.fail('should throw error')
          } catch (e) {
            if (e instanceof OverwriteInnerSecretValidatorError) {
              expect(e.key).toEqual(key)
            } else {
              expect.fail(`unexpected error ${e} thrown`)
            }
          }
        })
      })
    })
    describe('when get validator via unknown key', () => {
      it.prop([generateValidator()])(
        'contain only later validator',
        (validator) => {
          const sut = RandomAssembly.init().addValidator('key', validator)

          expect(sut.getValidator('unknown')).toBeNull()
        },
      )
    })
  })

  describe('when over limit of try', () => {
    let mockValidate: Mock
    let validator: Validator
    const limit = 5

    beforeEach(() => {
      mockValidate = vi
        .fn()
        .mockImplementation(() => failure([new Error('test')]))
      validator = {
        validate: mockValidate,
      }
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should throw error', () => {
      const sut = RandomAssembly.init({ limit }).addValidator('test', validator)

      expect(() => sut.assemble(candidates)).toThrowError(OverTryLimitError)
      expect(mockValidate).toHaveBeenCalledTimes(limit)
    })
    it('enable check how many tried', () => {
      const sut = RandomAssembly.init({ limit }).addValidator('test', validator)

      try {
        sut.assemble(candidates)
        expect.fail('should throw error')
      } catch (e) {
        if (e instanceof OverTryLimitError) {
          expect(e.limit).toEqual(limit)
        } else {
          expect.fail(`unexpected error ${e} thrown`)
        }
      }
    })
    it('can reuse same object after limit', () => {
      const sut = RandomAssembly.init({ limit }).addValidator('test', validator)

      try {
        sut.assemble(candidates)
      } catch (_e) {
        expect(() => sut.assemble(candidates)).toThrowError(OverTryLimitError)
      }

      expect(mockValidate).toHaveBeenCalledTimes(limit * 2)
    })
  })
})

const generateValidator = () =>
  fc.oneof(
    fc.integer({ min: 8480, max: 26740 }).map<Validator>((border) => ({
      validate: (a) =>
        a.arms.weight <= border
          ? success(a)
          : failure([new Error(`not arms.weight <= ${border}`)]),
    })),
    fc.constant<Validator>({
      validate: (a) =>
        a.head.manufacture === 'baws'
          ? success(a)
          : failure([new Error(`not head.manufacture = baws`)]),
    }),
    fc.constant<Validator>({
      validate: (a) =>
        a.core.price > 0
          ? success(a)
          : failure([new Error('not core.price > 0')]),
    }),
  )
const generateValidatorWithKey = () =>
  fc.record({
    key: fc.string({ minLength: 0 }),
    validator: generateValidator(),
  })
