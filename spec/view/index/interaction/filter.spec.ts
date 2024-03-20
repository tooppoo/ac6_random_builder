import { fc, it } from '@fast-check/vitest'
import { random } from '~core/utils/array.ts'
import { genAssemblyKeys } from '~spec/helper.ts'
import { describe, expect } from 'vitest'
import {
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
    it.prop([genAssemblyKeys({ minLength: 1 }).map(random)])(
      `filter for specified key is used as current filter`,
      (key) => {
        const state = toggleFilter(key, initialFilterState())

        expect(state.current.filter).toBe(state.map[key])
      },
    )
    it.prop([genAssemblyKeys({ minLength: 1 }).map(random)])(
      `specified key is used as current id`,
      (key) => {
        const state = toggleFilter(key, initialFilterState())

        expect(state.current.id).toEqual(key)
      },
    )
    it.prop([fc.boolean(), genAssemblyKeys({ minLength: 1 }).map(random)])(
      `open status should be reversed from before toggle`,
      (open, key) => {
        const state = {
          ...initialFilterState(),
          open,
        }

        expect(toggleFilter(key, state).open).toBe(!open)
      },
    )
  })
})
