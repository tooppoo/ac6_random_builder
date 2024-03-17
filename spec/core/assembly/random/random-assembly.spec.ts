import { fc, it } from '@fast-check/vitest'
import type { Validator } from '~core/assembly/random/validator/base'
import { failure, success } from '~core/assembly/random/validator/result'
import { candidates } from '~data/versions/v1.06.1.ts'
import { describe } from 'vitest'
import { RandomAssembly } from '~core/assembly/random/random-assembly'

describe(RandomAssembly.name, () => {
  it.prop([fc.array(generateValidator())])(
    'should return only valid assembly',
    (validators) => {
      const sut = validators.reduce<RandomAssembly>(
        (r, v) => r.addValidator(v),
        RandomAssembly.init(),
      )
      const assembly = sut.assemble(candidates)

      return sut.validate(assembly).isSuccess
    },
  )
})

const generateValidator = (): fc.Arbitrary<Validator> =>
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
