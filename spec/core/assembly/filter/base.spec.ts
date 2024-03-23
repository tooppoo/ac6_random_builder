import { type PartsFilter, PartsFilterSet } from '~core/assembly/filter/base.ts'

import { fc, it } from '@fast-check/vitest'
import sinon from 'sinon'
import { afterEach, describe, expect } from 'vitest'

import { genCandidates, genFilterApplyContext } from '~spec/helper.ts'

describe(PartsFilterSet.name, () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it.prop([genCandidates(), genFilterApplyContext()])(
    'should apply filter, and not apply removed',
    (candidates, context) => {
      const filters = [...new Array(4)].map<PartsFilter>((_, i) => ({
        name: `${i + 1}`,
        apply: (_) => _,
      }))
      const stubs = filters
        .map((f) => sinon.stub(f, 'apply'))
        .map((s) => {
          s.returnsArg(0)

          return s
        })

      const sut1 = filters
        .reduce((acc, f) => acc.add(f, { enabled: true }), PartsFilterSet.empty)
        .disable('4')

      expect(sut1.apply(candidates, context)).to.deep.equals(candidates, 'sut1')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([1, 1, 1, 0], 'sut1')

      const sut2 = sut1.disable('2')
      expect(sut2.apply(candidates, context)).to.deep.equals(candidates, 'sut2')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([2, 1, 2, 0], 'sut2')

      const sut3 = sut2.disable('3')
      expect(sut3.apply(candidates, context)).to.deep.equals(candidates, 'sut3')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([3, 1, 2, 0], 'sut3')

      const sut4 = sut3.enable('4')
      expect(sut4.apply(candidates, context)).to.deep.equals(candidates, 'sut4')
      expect(stubs.map((s) => s.callCount)).to.deep.equals([4, 1, 2, 1], 'sut4')
    },
  )

  it('should not change state via enable / disable', () => {
    const filters = [...new Array(4)].map<PartsFilter>((_, i) => ({
      name: `${i + 1}`,
      apply: (_) => _,
    }))
    const sut = filters.reduce(
      (acc, f) => acc.add(f, { enabled: true }),
      PartsFilterSet.empty,
    )

    const updated = sut.disable('1').disable('2').disable('3').disable('4')

    expect(updated).not.toEqual(sut)
  })

  describe('private filter', () => {
    const buildSetFromPair = (
      stat: { enabled: boolean },
      pairs: { name: string; private: boolean }[],
    ) =>
      pairs.reduce(
        (acc, p) =>
          acc.add(
            {
              name: p.name,
              apply: (_) => _,
            },
            { enabled: stat.enabled, private: p.private },
          ),
        PartsFilterSet.empty,
      )

    it.prop([genNameAndPrivatePair()])(
      'list filters without private filter',
      (pairs) => {
        const set = buildSetFromPair({ enabled: true }, pairs)

        const actual = set.list.map((s) => s.filter.name)
        const expected = pairs.filter((x) => !x.private).map((x) => x.name)

        expect(actual.toSorted()).to.deep.equals(expected.toSorted())
      },
    )
    it.prop([
      genNameAndPrivatePair().filter((ps) => ps.every((p) => p.private)),
    ])('ignore enable message for private filter', (pairs) => {
      const set = buildSetFromPair({ enabled: false }, pairs)
      const updated = pairs.reduce((acc, { name }) => acc.enable(name), set)

      expect(updated).toStrictEqual(set)
    })
    it.prop([
      genNameAndPrivatePair().filter((ps) => ps.every((p) => p.private)),
    ])('ignore disable message for private filter', (pairs) => {
      const set = buildSetFromPair({ enabled: true }, pairs)
      const updated = pairs.reduce((acc, { name }) => acc.disable(name), set)

      expect(updated).toStrictEqual(set)
    })
  })
})

const genNameAndPrivatePair = () =>
  fc
    .uniqueArray(fc.string({ minLength: 1 }))
    .chain((names) =>
      fc.record({
        names: fc.constant(names),
        privates: fc.array(fc.boolean(), {
          minLength: names.length,
          maxLength: names.length,
        }),
      }),
    )
    .map(({ names, privates }) =>
      names.map((name, i) => ({
        name,
        private: privates[i],
      })),
    )
