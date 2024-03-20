import sinon from 'sinon'
import { it } from '@fast-check/vitest'
import { genCandidates } from '~spec/helper.ts'
import { afterEach, describe, expect } from 'vitest'
import { type PartsFilter, PartsFilterSet } from '~core/assembly/filter/base.ts'

describe(PartsFilterSet.name, () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it.prop([genCandidates()])(
    'should apply filter, and not apply removed',
    (candidates) => {
      const filters = [...new Array(3)].map<PartsFilter>(() => ({
        apply: (_) => _,
      }))
      const stubs = filters
        .map((f) => sinon.stub(f, 'apply'))
        .map((s) => {
          s.returnsArg(0)

          return s
        })

      const sut1 = (() => {
        const [f1, f2, f3] = filters

        return PartsFilterSet.empty.add('1', f1).add('2', f2).add('3', f3)
      })()
      expect(sut1.apply(candidates)).toEqual(candidates)

      const sut2 = sut1.remove('2')
      expect(sut2.apply(candidates)).toEqual(candidates)

      const sut3 = sut2.remove('3')
      expect(sut3.apply(candidates)).toEqual(candidates)

      expect(stubs.map((s) => s.callCount)).toEqual([3, 1, 2])
    },
  )
})
