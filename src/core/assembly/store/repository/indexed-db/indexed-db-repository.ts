import {
  type StoredAssemblyDto,
  storedAssemblyDtoScheme,
} from '~core/assembly/store/repository/data-transfer-object.ts'
import {
  type DataBase,
  setupDataBase,
} from '~core/assembly/store/repository/indexed-db/indexed-db.ts'
import type {
  ClearableStoredAssemblyRepository,
  NewAssemblyAggregation,
  StoredAssemblyAggregation,
  StoredAssemblyRepository,
  UpdatedAssemblyAggregation,
} from '~core/assembly/store/stored-assembly.ts'

import {
  assemblyToSearch,
  searchToAssembly,
} from '~view/pages/index/interaction/share.ts'

import type { Candidates } from '~data/types/candidates.ts'

export class IndexedDbRepository
  implements StoredAssemblyRepository, ClearableStoredAssemblyRepository
{
  private readonly database: DataBase

  /**
   * 直接の利用はテストからに限定すること
   */
  constructor() {
    this.database = setupDataBase()
  }

  async storeNew(
    aggregation: NewAssemblyAggregation,
    candidates: Candidates,
    current: Date = new Date(),
  ): Promise<void> {
    const { dto, error } = aggregationToDto(
      {
        ...aggregation,
        createdAt: current,
        updatedAt: current,
      },
      candidates,
    )
    if (error) {
      return Promise.reject(error)
    }

    await this.database.stored_assembly.add(dto)
  }

  async all(candidates: Candidates): Promise<StoredAssemblyAggregation[]> {
    return this.database.stored_assembly.toArray().then((xs) =>
      xs.map((x) => ({
        ...x,
        assembly: searchToAssembly(new URLSearchParams(x.assembly), candidates),
      })),
    )
  }

  async delete(aggregation: StoredAssemblyAggregation): Promise<void> {
    await this.database.stored_assembly.delete(aggregation.id)
  }

  async update(
    aggregation: UpdatedAssemblyAggregation,
    candidates: Candidates,
    current: Date = new Date(),
  ): Promise<void> {
    const { dto, error } = aggregationToDto(
      {
        ...aggregation,
        updatedAt: current,
      },
      candidates,
    )
    if (error) {
      return Promise.reject(error)
    }

    await this.database.stored_assembly.put(dto)
  }

  async clear(): Promise<void> {
    await this.database.stored_assembly.clear()
  }
}

type TransformResult =
  | { dto: StoredAssemblyDto; error: null }
  | { dto: null; error: Error }
function aggregationToDto(
  aggregation: StoredAssemblyAggregation,
  candidates: Candidates,
): TransformResult {
  const dto = {
    id: aggregation.id,
    name: aggregation.name,
    description: aggregation.description,
    assembly: assemblyToSearch(aggregation.assembly, candidates).toString(),
    createdAt: aggregation.createdAt,
    updatedAt: aggregation.updatedAt,
  }

  const result = storedAssemblyDtoScheme.safeParse(dto)

  return result.success
    ? { dto, error: null }
    : { dto: null, error: result.error }
}
