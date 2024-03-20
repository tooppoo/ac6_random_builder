import type { Candidates } from '~data/types/candidates.ts'

export interface PartsFilter {
  apply(candidates: Candidates): Candidates
}

export class PartsFilterSet implements PartsFilter {
  static get empty(): PartsFilterSet {
    return new PartsFilterSet({})
  }

  private constructor(private readonly map: Record<string, PartsFilter>) {}

  apply(candidates: Candidates): Candidates {
    return this.list.reduce((acc, f) => f.apply(acc), candidates)
  }

  add(key: string, f: PartsFilter): PartsFilterSet {
    return new PartsFilterSet({
      ...this.map,
      [key]: f,
    })
  }
  remove(key: string): PartsFilterSet {
    const copy = { ...this.map }
    delete copy[key]

    return new PartsFilterSet(copy)
  }

  private get list(): PartsFilter[] {
    return Object.values(this.map)
  }
}
