import type {Assembly} from "~core/assembly/assembly.ts";

import {ulid} from "ulid";

export function createAggregation(
  param: {
    name: string,
    description: string,
    assembly: Assembly
  },
  genId: () => string = () => ulid()
): StoredAssemblyAggregation {
  return {
    id: genId(),
    ...param,
  }
}
export type StoredAssemblyAggregation = Readonly<{
  id: string
  name: string
  description: string
  assembly: Assembly
}>

export interface StoredAssemblyRepository {
  storeNew(aggregation: StoredAssemblyAggregation): Promise<void>
}
