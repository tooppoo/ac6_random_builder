import type { AssemblyKey } from '~core/assembly/assembly.ts'
import { PartsFilterSet } from '~core/assembly/filter/base.ts'
import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'

export interface FilterState {
  open: boolean
  map: {
    [key in AssemblyKey]?: PartsFilterSet
  }
  current: {
    id: AssemblyKey | null
    name: string
    filter: PartsFilterSet
  }
}

export const initialFilterState = (): FilterState => ({
  open: false,
  map: {},
  current: {
    id: null,
    name: '',
    filter: PartsFilterSet.empty,
  },
})

export function toggleFilter(
  key: AssemblyKey,
  state: FilterState,
): FilterState {
  const filter = state.map[key] || setupFilter()

  return {
    ...state,
    open: !state.open,
    map: {
      ...state.map,
      [key]: filter,
    },
    current: {
      id: key,
      name: key.replaceAll(/([A-Z])/g, ' $1'),
      filter,
    },
  }
}

export function setupFilter(): PartsFilterSet {
  return PartsFilterSet.empty.add(excludeNotEquipped.name, excludeNotEquipped)
}
