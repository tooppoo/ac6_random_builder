import type { StoredAssemblyDto } from '~core/assembly/store/repository/data-transfer-object.ts'

import { Dexie, type EntityTable } from 'dexie'

export type DataBase = Dexie & {
  stored_assembly: EntityTable<StoredAssemblyDto, 'id'>
}

export const setupDataBase = (() => {
  let db: DataBase | null = null

  return (): DataBase => {
    if (db) return db

    db = new Dexie('ac6-assembly-tool') as DataBase
    db.version(1).stores({
      stored_assembly: 'id,name,createdAt,updatedAt',
    })

    return db
  }
})()
