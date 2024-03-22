import { logger } from '~core/utils/logger.ts'

import type { Candidates } from '~data/types/candidates.ts'

export interface PartsFilter {
  readonly name: string

  apply(candidates: Candidates): Candidates
}

interface PartsFilterMap {
  [name: string]: PartsFilterState
}

export type ReadonlyPartsFilterState = Readonly<PartsFilterState>
interface PartsFilterState {
  readonly filter: PartsFilter
  enabled: boolean
}

export class PartsFilterSet {
  static get empty(): PartsFilterSet {
    return new PartsFilterSet({})
  }

  private constructor(private readonly map: PartsFilterMap) {}

  apply(candidates: Candidates): Candidates {
    return this.enableFilters.reduce((acc, f) => f.apply(acc), candidates)
  }

  add(filter: PartsFilter): PartsFilterSet {
    return new PartsFilterSet({
      ...this.map,
      [filter.name]: {
        filter,
        enabled: false,
      },
    })
  }

  isEnabled(filterName: string) {
    return this.enableFilters.some((f) => f.name === filterName)
  }
  enable(key: string): PartsFilterSet {
    return this.toggle(key, true)
  }
  disable(key: string): PartsFilterSet {
    return this.toggle(key, false)
  }

  get list(): ReadonlyPartsFilterState[] {
    return Object.values(this.map)
  }

  get containEnabled(): boolean {
    return this.enableFilters.length > 0
  }

  private toggle(key: string, state: boolean): PartsFilterSet {
    const copy = { ...this.map }
    copy[key] && (copy[key].enabled = state)

    logger.debug(`${this.constructor.name}#toggle`, { copy, key })

    return new PartsFilterSet(copy)
  }

  private get enableFilters(): PartsFilter[] {
    return this.list
      .filter(({ enabled }) => enabled)
      .map(({ filter }) => filter)
  }
}
