import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { random } from '~core/utils/array.ts'

import {
  anyFilterContain,
  anyFilterEnabled,
  assemblyWithHeadParts,
  changePartsFilter,
  enableFilterOnAllParts,
  type FilterState,
  initialFilterState,
  toggleFilter,
} from '~view/index/interaction/filter.ts'

import { booster, notEquipped, tank } from '~data/types/base/category.ts'
import { candidates } from '~data/versions/v1.06.1.ts'

import { fc, it } from '@fast-check/vitest'
import { beforeEach, describe, expect } from 'vitest'

import { genAssemblyKey, genAssemblyKeys, genCandidates } from '~spec/helper.ts'

describe('filter interaction', () => {
  describe('toggle', () => {
    it.prop([
      genAssemblyKeys({ minLength: 1 }),
      genAssemblyKeys(),
      genAssemblyKeys(),
      genInitialFilterState(),
    ])('filter for each key is assumed', (k1, k2, k3, state) => {
      const keys = [...k1, ...k2, ...k3]
      keys.forEach((key, i) => {
        state = toggleFilter(key, state)

        expect(state.map[key], `${key} ${i}`).not.undefined
      })
    })
    it.prop([genAssemblyKey(), genInitialFilterState()])(
      `filter for specified key is used as current filter`,
      (key, initialState) => {
        const state = toggleFilter(key, initialState)

        expect(state.current.filter).toBe(state.map[key])
      },
    )
    it.prop([genAssemblyKey(), genInitialFilterState()])(
      `specified key is used as current id`,
      (key, initialState) => {
        const state = toggleFilter(key, initialState)

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

  it.prop([fc.boolean(), genAssemblyKey(), genCandidates()])(
    `open status should be reversed from before toggle`,
    (open, key, candidates) => {
      const state = {
        ...initialFilterState(candidates),
        open,
      }

      expect(toggleFilter(key, state).open).toBe(!open)
    },
  )
  it.prop([fc.boolean(), genAssemblyKey(), genInitialFilterState()])(
    'after apply filter, candidates are changed',
    (enabledOldState, key, initialState) => {
      const state = toggleFilter(key, initialState)
      const filterState = {
        ...random(state.current.filter.list),
        enabled: enabledOldState,
      }

      const updated = changePartsFilter({ target: filterState, state })

      expect(updated.current.filter).to.deep.equals(
        updated.map[key],
        'current == map[key]',
      )
      expect(
        updated.current.filter.isEnabled(filterState.filter.name),
      ).to.equals(!enabledOldState, 'switched enabled state')
    },
  )

  it.prop([genAssemblyKey(), genInitialFilterState()])(
    'any filter enabled',
    (key, initialState) => {
      const state = toggleFilter(key, initialState)
      state.map[key] = state.map[key].enable(
        random(state.map[key].list).filter.name,
      )

      expect(anyFilterEnabled(key, state)).toBe(true)
    },
  )

  it.prop([
    genAssemblyKey({
      only: ['rightArmUnit', 'leftArmUnit', 'rightBackUnit', 'leftBackUnit'],
    }),
    genInitialFilterState(),
  ])('filterable parts should contain any filter', (key, state) => {
    expect(anyFilterContain(key, state)).toBe(true)
  })

  describe('enable a filter for all parts', () => {
    describe(excludeNotEquipped.name, () => {
      let state: FilterState
      const filterName = excludeNotEquipped.name
      beforeEach(() => {
        const init = initialFilterState(candidates)

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

const genInitialFilterState = () => genCandidates().map(initialFilterState)
