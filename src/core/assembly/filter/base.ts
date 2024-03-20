import type { Candidates } from '~data/types/candidates.ts'

export interface PartsFilter {
  readonly name: string

  apply(candidates: Candidates): Candidates
}

interface PartsFilterMap {
  [name: string]: PartsFilterState
}
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

  add(key: string, filter: PartsFilter): PartsFilterSet {
    return new PartsFilterSet({
      ...this.map,
      [key]: {
        filter,
        enabled: true,
      },
    })
  }

  enable(key: string): PartsFilterSet {
    return this.toggle(key, true)
  }
  disable(key: string): PartsFilterSet {
    return this.toggle(key, false)
  }

  private toggle(key: string, state: boolean): PartsFilterSet {
    const copy = { ...this.map }
    copy[key] && (copy[key].enabled = state)

    return new PartsFilterSet(copy)
  }

  private get enableFilters(): PartsFilter[] {
    return Object.values(this.map)
      .filter(({ enabled }) => enabled)
      .map(({ filter }) => filter)
  }
}
