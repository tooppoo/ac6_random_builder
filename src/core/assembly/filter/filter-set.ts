import type {
  FilterApplyContext,
  PartsFilter,
} from '~core/assembly/filter/base.ts'
import { logger } from '~core/utils/logger.ts'

import type { Candidates } from '~data/types/candidates.ts'

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
    return this.enableFilters(this.listAll).reduce(
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
    return (
      this.contains(filterName) &&
      this.enableFilters(this.list).some((f) => f.name === filterName)
    )
  }

  update(target: ReadonlyPartsFilterState): PartsFilterSet {
    if (this.map[target.filter.name].private) return this

    return new PartsFilterSet({
      ...this.map,
      [target.filter.name]: target,
    })
  }

  enable(key: string): PartsFilterSet {
    return this.toggle(key, true)
  }

  get list(): ReadonlyPartsFilterState[] {
    return this.listAll.filter((f) => !f.private)
  }

  get containEnabled(): boolean {
    return this.enableFilters(this.list).length > 0
  }

  private contains(name: string): boolean {
    return !!this.map[name]
  }

  private toggle(key: string, state: boolean): PartsFilterSet {
    if (!this.contains(key)) return this

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

  private enableFilters(list: PartsFilterState[]): PartsFilter[] {
    return list.filter(({ enabled }) => enabled).map(({ filter }) => filter)
  }

  private get listAll(): PartsFilterState[] {
    return Object.values(this.map)
  }
}
