import type { Assembly } from '~core/assembly/assembly.ts'

import type { Candidates } from '~data/types/candidates.ts'

import { ulid } from 'ulid'

export function createAggregation(
  param: {
    name: string
    description: string
    assembly: Assembly
  },
  genId: () => string = () => ulid(),
): NewAssemblyAggregation {
  return {
    id: genId(),
    ...param,
  }
}
export type NewAssemblyAggregation = Omit<
  StoredAssemblyAggregation,
  'createdAt' | 'updatedAt'
>
export type UpdatedAssemblyAggregation = Omit<
  StoredAssemblyAggregation,
  'updatedAt'
>
export type StoredAssemblyAggregation = Readonly<{
  id: string
  name: string
  description: string
  assembly: Assembly
  createdAt: Date
  updatedAt: Date
}>

export interface StoredAssemblyRepository {
  storeNew(
    aggregation: NewAssemblyAggregation,
    candidates: Candidates,
    current: Date,
  ): Promise<void>
  storeNew(
    aggregation: NewAssemblyAggregation,
    candidates: Candidates,
  ): Promise<void>

  update(
    aggregation: UpdatedAssemblyAggregation,
    candidates: Candidates,
    current: Date,
  ): Promise<void>
  update(
    aggregation: UpdatedAssemblyAggregation,
    candidates: Candidates,
  ): Promise<void>

  all(candidates: Candidates): Promise<StoredAssemblyAggregation[]>

  delete(aggregation: StoredAssemblyAggregation): Promise<void>
  insert(
    aggregation: StoredAssemblyAggregation,
    candidates: Candidates,
  ): Promise<void>
}
export interface ClearableStoredAssemblyRepository {
  clear(): Promise<void>
}
