import {
  type Assembly,
  type AssemblyKey,
  createAssembly,
} from '~core/assembly/assembly.ts'
import {
  PartsFilterSet,
  type ReadonlyPartsFilterState,
} from '~core/assembly/filter/base.ts'
import { excludeNotEquipped } from '~core/assembly/filter/filters.ts'
import { logger } from '~core/utils/logger.ts'

import { boosterNotEquipped } from '~data/booster.ts'
import { tank } from '~data/types/base/category.ts'
import { type Candidates } from '~data/types/candidates.ts'

export interface FilterState {
  open: boolean
  map: Record<AssemblyKey, PartsFilterSet>
  current: CurrentFilter
}
export interface CurrentFilter {
  id: AssemblyKey | null
  name: string
  filter: PartsFilterSet
}

export const initialFilterState = (): FilterState => ({
  open: false,
  map: {
    rightArmUnit: setupFilter('rightArmUnit'),
    leftArmUnit: setupFilter('leftArmUnit'),
    rightBackUnit: setupFilter('rightBackUnit'),
    leftBackUnit: setupFilter('leftBackUnit'),
    head: setupFilter('head'),
    core: setupFilter('core'),
    arms: setupFilter('arms'),
    legs: setupFilter('legs'),
    booster: setupFilter('booster'),
    fcs: setupFilter('fcs'),
    generator: setupFilter('generator'),
    expansion: setupFilter('expansion'),
  },
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

export function assemblyWithHeadParts(candidates: Candidates): Assembly {
  // filterによって選択状態の武器が除外される可能性があるので
  // filter適用後の候補から先頭を機械的に適用
  const base = {
    rightArmUnit: candidates.rightArmUnit[0],
    leftArmUnit: candidates.leftArmUnit[0],
    rightBackUnit: candidates.rightBackUnit[0],
    leftBackUnit: candidates.leftBackUnit[0],
    head: candidates.head[0],
    core: candidates.core[0],
    arms: candidates.arms[0],
    fcs: candidates.fcs[0],
    generator: candidates.generator[0],
    expansion: candidates.expansion[0],
  }
  const legs = candidates.legs[0]

  if (legs.category === tank) {
    return createAssembly({
      ...base,
      legs,
      booster: boosterNotEquipped,
    })
  } else {
    return createAssembly({
      ...base,
      legs,
      booster: candidates.booster[0],
    })
  }
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
    ? state.current.filter.disable(changed.filter.name)
    : state.current.filter.enable(changed.filter.name)

  state.current.filter = updated
  state.map[state.current.id] = updated

  logger.debug('changePartsFilter end', { changed, state: { ...state } })

  return state
}

export function enableFilterOnAllParts(
  filterName: string,
  state: FilterState,
): FilterState {
  logger.debug('enableFilterOnAllParts', { filterName, state })

  return {
    ...state,
    map: Object.entries(state.map).reduce(
      (acc, [setKey, set]) => ({ ...acc, [setKey]: set.enable(filterName) }),
      state.map,
    ),
  }
}

export function anyFilterEnabled(
  key: AssemblyKey,
  state: FilterState,
): boolean {
  return getFilter(key, state).containEnabled
}
export function anyFilterContain(
  key: AssemblyKey,
  state: FilterState,
): boolean {
  return getFilter(key, state).list.length > 0
}

function setupFilter(key: AssemblyKey): PartsFilterSet {
  switch (key) {
    case 'rightArmUnit':
    case 'leftArmUnit':
    case 'rightBackUnit':
    case 'leftBackUnit':
    case 'expansion':
      return PartsFilterSet.empty.add(excludeNotEquipped.build(key))
    default:
      return PartsFilterSet.empty
  }
}

function getFilter(key: AssemblyKey, state: FilterState): PartsFilterSet {
  return state.map[key] || setupFilter(key)
}
