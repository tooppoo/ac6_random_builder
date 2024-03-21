import { fc, it } from '@fast-check/vitest'
import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { random } from '~core/utils/array.ts'
import { booster, notEquipped, tank } from '~data/types/base/category.ts'
import { genAssemblyKey, genAssemblyKeys, genCandidates } from '~spec/helper.ts'
import { beforeEach, describe, expect } from 'vitest'
import {
  anyFilterContain,
  anyFilterEnabled,
  applyFilter,
  assemblyWithHeadParts,
  changePartsFilter,
  enableFilterOnAllParts,
  type FilterState,
  initialFilterState,
  toggleFilter,
} from '~view/index/interaction/filter.ts'

describe('filter interaction', () => {
  describe('toggle', () => {
    it.prop([
      genAssemblyKeys({ minLength: 1 }),
      genAssemblyKeys(),
      genAssemblyKeys(),
    ])('filter for each key is assumed', (k1, k2, k3) => {
      const keys = [...k1, ...k2, ...k3]
      let state = initialFilterState()

      keys.forEach((key, i) => {
        state = toggleFilter(key, state)

        expect(state.map[key], `${key} ${i}`).not.undefined
      })
    })
    it.prop([genAssemblyKey()])(
      `filter for specified key is used as current filter`,
      (key) => {
        const state = toggleFilter(key, initialFilterState())

        expect(state.current.filter).toBe(state.map[key])
      },
    )
    it.prop([genAssemblyKey()])(
      `specified key is used as current id`,
      (key) => {
        const state = toggleFilter(key, initialFilterState())

        expect(state.current.id).toEqual(key)
      },
    )
  })

  it.prop([genCandidates()])('setup assembly', (candidates) => {
    const sut = assemblyWithHeadParts(candidates)

    switch (sut.legs.category) {
      case tank:
        expect(sut.booster.category).toEqual(notEquipped)
        break
      default:
        expect(sut.booster.category).toEqual(booster)
        break
    }
  })

  it.prop([fc.boolean(), genAssemblyKey()])(
    `open status should be reversed from before toggle`,
    (open, key) => {
      const state = {
        ...initialFilterState(),
        open,
      }

      expect(toggleFilter(key, state).open).toBe(!open)
    },
  )
  it.prop([
    fc.boolean(),
    genAssemblyKey({
      only: ['rightArmUnit', 'leftArmUnit', 'rightBackUnit', 'leftBackUnit'],
    }),
    genCandidates(),
  ])(
    'after apply filter, candidates are changed',
    (enabled, key, oldCandidates) => {
      const state = toggleFilter(key, initialFilterState())
      const filterState = {
        ...random(state.current.filter.list),
        enabled,
      }

      const updated = changePartsFilter({ changed: filterState, state })

      expect(applyFilter(oldCandidates, updated)).toEqual(
        updated.current.filter.apply(oldCandidates),
      )
    },
  )

  it.prop([
    fc.boolean(),
    genAssemblyKey({
      only: ['rightArmUnit', 'leftArmUnit', 'rightBackUnit', 'leftBackUnit'],
    }),
  ])('any filter enabled or not', (enabledOldState, key) => {
    const state = toggleFilter(key, initialFilterState())
    const filterState = {
      ...random(state.current.filter.list),
      enabled: enabledOldState,
    }

    const updated = changePartsFilter({ changed: filterState, state })

    expect(anyFilterEnabled(key, updated)).toBe(!enabledOldState)
  })

  it.prop([
    genAssemblyKey({
      only: ['rightArmUnit', 'leftArmUnit', 'rightBackUnit', 'leftBackUnit'],
    }),
  ])('filterable parts should contain any filter', (key) => {
    const state = initialFilterState()

    expect(anyFilterContain(key, state)).toBe(true)
  })

  describe('enable a filter for all parts', () => {
    describe(excludeNotEquipped.name, () => {
      let state: FilterState
      const filterName = excludeNotEquipped.name
      beforeEach(() => {
        const init = initialFilterState()

        state = enableFilterOnAllParts(filterName, init)
      })

      it('should enable the filter on unit parts', () => {
        expect(
          [
            // unit
            state.map.rightArmUnit,
            state.map.leftArmUnit,
            state.map.rightBackUnit,
            state.map.leftBackUnit,
            // frame
            state.map.head,
            state.map.core,
            state.map.arms,
            state.map.legs,
            // inner
            state.map.booster,
            state.map.fcs,
            state.map.generator,
            // expansion
            state.map.expansion,
          ].map((p) => p.isEnabled(filterName)),
        ).toEqual([
          // unit
          true,
          true,
          true,
          true,
          // frame
          false,
          false,
          false,
          false,
          // inner
          false,
          false,
          false,
          // expansion
          true,
        ])
      })
    })
  })
})
