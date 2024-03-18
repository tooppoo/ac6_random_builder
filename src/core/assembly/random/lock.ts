import type { RawAssembly } from 'src/core/assembly/assembly.ts'

export class LockedParts {
  static get empty(): LockedParts {
    return new LockedParts({})
  }

  constructor(private readonly map: Partial<RawAssembly>) {}

  get<K extends keyof RawAssembly>(target: K): RawAssembly[K] | null {
    // @ts-expect-error TS2590
    return this.map[target] || null
  }
  set<K extends keyof RawAssembly>(
    target: K,
    item: RawAssembly[K],
  ): LockedParts {
    return new LockedParts({ ...this.map, [target]: item })
  }
}
