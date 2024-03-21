import type { AssemblyKey } from '~core/assembly/assembly.ts'
import {
  PartsFilterSet,
  type ReadonlyPartsFilterState,
} from '~core/assembly/filter/base.ts'
import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { logger } from '~core/utils/logger.ts'
import { type Candidates } from '~data/types/candidates.ts'

export interface FilterState {
  open: boolean
  map: {
    [key in AssemblyKey]?: PartsFilterSet
  }
  current: CurrentFilter
}
export interface CurrentFilter {
  id: AssemblyKey | null
  name: string
  filter: PartsFilterSet
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

export function applyFilter(
  candidates: Candidates,
  state: FilterState,
): Candidates {
  return Object.values(state.map).reduce((c, f) => f.apply(c), candidates)
}

export function toggleFilter(
  key: AssemblyKey,
  state: FilterState,
): FilterState {
  const filter = state.map[key] || setupFilter(key)

  return {
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

export function changePartsFilter({
  changed,
  state,
}: {
  changed: ReadonlyPartsFilterState
  state: FilterState
}): FilterState {
  logger.debug('changePartsFilter begin', { changed, state: { ...state } })

  if (!state.current.id) return state

  const updated = changed.enabled
    ? state.current.filter.disable(changed.key)
    : state.current.filter.enable(changed.key)

  state.current.filter = updated
  state.map[state.current.id] = updated

  logger.debug('changePartsFilter end', { changed, state: { ...state } })

  return state
}

export function setupFilter(key: AssemblyKey): PartsFilterSet {
  return PartsFilterSet.empty.add(
    excludeNotEquipped.name,
    excludeNotEquipped.build(key),
  )
}

export function getFilter(
  key: AssemblyKey,
  state: FilterState,
): PartsFilterSet {
  return state.map[key] || setupFilter(key)
}

export function anyFilterEnabled(
  key: AssemblyKey,
  state: FilterState,
): boolean {
  return getFilter(key, state).containEnabled
}
