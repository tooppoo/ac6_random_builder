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
      const filters = [...new Array(4)].map<PartsFilter>(() => ({
        name: 'test',
        apply: (_) => _,
      }))
      const stubs = filters
        .map((f) => sinon.stub(f, 'apply'))
        .map((s) => {
          s.returnsArg(0)

          return s
        })

      const sut1 = (() => {
        const [f1, f2, f3, f4] = filters

        return PartsFilterSet.empty
          .add('1', f1)
          .add('2', f2)
          .add('3', f3)
          .add('4', f4)
      })().disable('4')
      expect(sut1.apply(candidates)).to.deep.equals(candidates, 'sut1')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([1, 1, 1, 0], 'sut1')

      const sut2 = sut1.disable('2')
      expect(sut2.apply(candidates)).to.deep.equals(candidates, 'sut2')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([2, 1, 2, 0], 'sut2')

      const sut3 = sut2.disable('3')
      expect(sut3.apply(candidates)).to.deep.equals(candidates, 'sut3')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([3, 1, 2, 0], 'sut3')

      const sut4 = sut3.enable('4')
      expect(sut4.apply(candidates)).to.deep.equals(candidates, 'sut4')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([4, 1, 2, 1], 'sut4')
    },
  )
})
