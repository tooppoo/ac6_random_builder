import { logger } from '~core/utils/logger.ts'

import type { Candidates } from '~data/types/candidates.ts'

import type { Assembly } from 'src/core/assembly/assembly.ts'

export interface PartsFilter {
  readonly name: string

  apply(candidates: Candidates, context: FilterApplyContext): Candidates
}
export type FilterApplyContext = Readonly<{
  assembly: Assembly
}>

interface PartsFilterMap {
  [name: string]: PartsFilterState
}

export type ReadonlyPartsFilterState = Readonly<PartsFilterState>
interface PartsFilterState {
  readonly filter: PartsFilter
  enabled: boolean
  private: boolean
}

type AddFilterOption = Readonly<
  Partial<{
    enabled: boolean
    private: boolean
  }>
>

export class PartsFilterSet {
  static get empty(): PartsFilterSet {
    return new PartsFilterSet({})
  }

  private constructor(private readonly map: PartsFilterMap) {}

  apply(candidates: Candidates, context: FilterApplyContext): Candidates {
    return this.enableFilters.reduce(
      (acc, f) => f.apply(acc, context),
      candidates,
    )
  }

  add(filter: PartsFilter, opt: AddFilterOption = {}): PartsFilterSet {
    return new PartsFilterSet({
      ...this.map,
      [filter.name]: {
        filter,
        enabled: opt.enabled || false,
        private: opt.private || false,
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
    return Object.values(this.map).filter((f) => !f.private)
  }

  get containEnabled(): boolean {
    return this.enableFilters.length > 0
  }

  private toggle(key: string, state: boolean): PartsFilterSet {
    const target = { ...this.map[key] }

    logger.debug(`${this.constructor.name}#toggle`, {
      target,
      key,
      map: this.map,
    })

    if (target.private) return this

    return new PartsFilterSet({
      ...this.map,
      [key]: {
        ...target,
        enabled: state,
      },
    })
  }

  private get enableFilters(): PartsFilter[] {
    return this.list
      .filter(({ enabled }) => enabled)
      .map(({ filter }) => filter)
  }
}
