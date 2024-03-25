import { OverTryLimitError } from '~core/assembly/random/random-assembly.ts'
import {
  notCarrySameUnitInSameSideName,
  notOverEnergyOutputName,
  totalCoamNotOverMaxName,
  totalLoadNotOverMaxName,
  ValidationError,
  type ValidationName,
} from '~core/assembly/random/validator/validators.ts'

import type { I18Next } from '~view/i18n/define.ts'
import { assemblyErrorMessage } from '~view/pages/index/interaction/error-message'

import { fc, it } from '@fast-check/vitest'
import type { ArrayConstraints } from 'fast-check'
import { afterEach, beforeEach, describe, expect, vi } from 'vitest'

describe(assemblyErrorMessage.name, () => {
  let i18n: Pick<I18Next, 't'>
  let mock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mock = vi.fn()
    i18n = {
      t: mock as never as I18Next['t'],
    }
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('unknown error', () => {
    it.prop([fc.string().map((s) => new Error(s))])(
      'should provide unknown message',
      (error) => {
        assemblyErrorMessage(error, i18n)

        expect(mock).toHaveBeenNthCalledWith(1, 'unknown.description', {
          ns: 'error',
        })
        expect(mock).toHaveBeenNthCalledWith(2, 'guideToDevelop', {
          ns: 'error',
        })
      },
    )
  })
  describe('over try limit error', () => {
    const genValidationError = ({
      validationName,
      adjustable,
    }: {
      validationName: ValidationName
      adjustable: boolean
    }) =>
      fc
        .string()
        .map((msg) => new ValidationError({ validationName, adjustable }, msg))

    type TestCase = {
      load: ArrayConstraints
      coam: ArrayConstraints
      notAdjustable: ArrayConstraints
      unknown: ArrayConstraints
      expected: { load: number; coam: number; unknown: number }
    }

    describe.each<TestCase>([
      {
        load: { minLength: 0, maxLength: 0 },
        coam: { minLength: 0, maxLength: 0 },
        notAdjustable: { minLength: 0, maxLength: 0 },
        unknown: { minLength: 0, maxLength: 0 },
        expected: { load: 0, coam: 0, unknown: 0 },
      },
      {
        load: { minLength: 1 },
        coam: { minLength: 0, maxLength: 0 },
        notAdjustable: { minLength: 0, maxLength: 0 },
        unknown: { minLength: 0, maxLength: 0 },
        expected: { load: 1, coam: 0, unknown: 0 },
      },
      {
        load: { minLength: 0, maxLength: 0 },
        coam: { minLength: 1 },
        notAdjustable: { minLength: 0, maxLength: 0 },
        unknown: { minLength: 0, maxLength: 0 },
        expected: { load: 0, coam: 1, unknown: 0 },
      },
      {
        load: { minLength: 0, maxLength: 0 },
        coam: { minLength: 0, maxLength: 0 },
        notAdjustable: { minLength: 1 },
        unknown: { minLength: 0, maxLength: 0 },
        expected: { load: 0, coam: 0, unknown: 0 },
      },
      {
        load: { minLength: 0, maxLength: 0 },
        coam: { minLength: 0, maxLength: 0 },
        notAdjustable: { minLength: 0, maxLength: 0 },
        unknown: { minLength: 1 },
        expected: { load: 0, coam: 0, unknown: 1 },
      },
      {
        load: { minLength: 1 },
        coam: { minLength: 1 },
        notAdjustable: { minLength: 1 },
        unknown: { minLength: 1 },
        expected: { load: 1, coam: 1, unknown: 1 },
      },
    ])(
      'when load-error($load), coam-error($coam), not-adjustable-error($notAdjustable), unknown($unknown)',
      ({ load, coam, notAdjustable, unknown, expected }) => {
        const genTotalLoadNotOverMax = () =>
          genValidationError({
            validationName: totalLoadNotOverMaxName,
            adjustable: true,
          })
        const genTotalCoamNotOverMax = () =>
          genValidationError({
            validationName: totalCoamNotOverMaxName,
            adjustable: true,
          })
        const genNotAdjustable = () =>
          fc
            .constantFrom<ValidationName>(
              notOverEnergyOutputName,
              notCarrySameUnitInSameSideName,
            )
            .chain((validationName) =>
              genValidationError({
                validationName,
                adjustable: false,
              }),
            )

        it.prop([
          fc.array(genTotalLoadNotOverMax(), load),
          fc.array(genTotalCoamNotOverMax(), coam),
          fc.array(genNotAdjustable(), notAdjustable),
          fc.array(
            fc.string().map((s) => new Error(s)),
            unknown,
          ),
        ])(
          `should build error message for ${JSON.stringify(expected)}`,
          (loadError, coamError, notAdjustableError, unknownError) => {
            const shuffle = () => Math.random() - Math.random()
            const sut = new OverTryLimitError({
              limit: 5,
              errors: [
                ...loadError,
                ...coamError,
                ...notAdjustableError,
                ...unknownError,
              ].toSorted(shuffle),
            })
            const count = {} as Record<string, number>

            mock.mockImplementation((...args) => {
              // 引数ごとに呼び出し回数を記録
              count[JSON.stringify(args)] =
                (count[JSON.stringify(args)] || 0) + 1

              return ''
            })

            assemblyErrorMessage(sut, i18n)

            /**
             * 引数ごとの呼び出し回数が想定通りかのチェック
             * - sinon.mock -> 同一のmockに複数回withArgsを指定できない
             * - vi.fn, sinon.stub -> 引数と呼び出しのセットでexpectationを設定できない
             * 上記の理由から、「引数ごとの呼び出し回数チェック」の仕組みを自作
             */
            const expectedCount = {
              [JSON.stringify([
                'assembly.overTryLimit.description',
                {
                  ns: 'error',
                },
              ])]: 1,
              [JSON.stringify([
                `assembly.${totalLoadNotOverMaxName}.label`,
                {
                  ns: 'error',
                },
              ])]: expected.load,
              [JSON.stringify([
                `assembly.${totalCoamNotOverMaxName}.label`,
                {
                  ns: 'error',
                },
              ])]: expected.coam,
              [JSON.stringify(['assembly.retry.guide', { ns: 'error' }])]: 1,
              [JSON.stringify(['assembly.unknown.label', { ns: 'error' }])]: 1,
              [JSON.stringify(['times'])]:
                expected.load + expected.coam + expected.unknown,
            }
            expect(expectedCount).toMatchObject(count)
          },
        )
      },
    )
  })
})
