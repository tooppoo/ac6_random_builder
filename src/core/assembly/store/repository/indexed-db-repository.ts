import {type StoredAssemblyDto, storedAssemblyDtoScheme} from "~core/assembly/store/repository/data-transfer-object.ts";
import type {StoredAssemblyAggregation, StoredAssemblyRepository} from "~core/assembly/store/stored-assembly.ts";
import {BaseCustomError} from "~core/utils/error.ts";

import {assemblyToSearch} from "~view/pages/index/interaction/share.ts";

import type {Candidates} from "~data/types/candidates.ts";

export class IndexedDbRepository implements StoredAssemblyRepository {
  static readonly databaseName = 'ac6-assembly-tool' as const
  static readonly databaseVersion: number = 1
  static readonly storeName = 'stored-assembly' as const

  constructor(
    private readonly candidates: Candidates,
    private readonly dbGateway: IDBFactory = indexedDB
  ) {
  }

  storeNew(aggregation: StoredAssemblyAggregation): Promise<void> {
    return openIndexdDb(this.dbGateway, async (db) => {
      const transaction = db.transaction(IndexedDbRepository.storeName, 'readwrite')
      const store = transaction.objectStore(IndexedDbRepository.storeName)

      const dto: StoredAssemblyDto = {
        id: aggregation.id,
        name: aggregation.name,
        description: aggregation.description,
        assembly: assemblyToSearch(aggregation.assembly, this.candidates).toString(),
      }

      store.add(dto)
    })
  }
}

function openIndexdDb(dbGateway: IDBFactory, f: (db: IDBDatabase) => Promise<void>): Promise<void> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const openRequest = dbGateway.open(IndexedDbRepository.databaseName, IndexedDbRepository.databaseVersion)

    const handleError = function () {
      reject(openRequest.error)
    }
    openRequest.onerror = handleError
    openRequest.onblocked = handleError

    openRequest.onupgradeneeded = setupDatabase

    openRequest.onsuccess = function () {
      resolve(openRequest.result)
    }
  }).then((db) =>
    f(db).finally(() => db.close())
  )
}

function setupDatabase(event: IDBVersionChangeEvent) {
  const db = (<IDBRequest<IDBDatabase>>event.target).result

  db.onerror = function (event) {
    throw new DbAccessError({ cause: event }, 'IndexedDB access error')
  }

  switch(db.version) {
    // versionが更新されていったら、都度更新処理を追加
    case 0: {
      const store = db.createObjectStore('stored-assembly', {
        keyPath: 'id',
      })
      const scheme = storedAssemblyDtoScheme.keyof().enum

      store.createIndex(scheme.id, scheme.id, { unique: true })
      store.createIndex(scheme.name, scheme.name, { unique: false })
      store.createIndex(scheme.description, scheme.description, { unique: false })
      store.createIndex(scheme.assembly, scheme.assembly, { unique: false })
    }
  }
}

class DbAccessError extends BaseCustomError<{ cause: Event }> {}
