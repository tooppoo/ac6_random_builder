import { IndexedDbRepository } from '~core/assembly/store/repository/indexed-db/indexed-db-repository.ts'
import type { StoredAssemblyRepository } from '~core/assembly/store/stored-assembly.ts'

import { type Writable, writable } from 'svelte/store'

export const storedRepositoryStore = (() => {
  const repository = new IndexedDbRepository()

  const wrapper: Writable<StoredAssemblyRepository> = writable({
    async storeNew(aggregation, candidates, current: Date = new Date()) {
      await repository.storeNew(aggregation, candidates, current)

      wrapper.set(this)
    },
    async update(aggregation, candidates, current: Date = new Date()) {
      await repository.update(aggregation, candidates, current)

      wrapper.set(this)
    },
    async delete(aggregation) {
      await repository.delete(aggregation)

      wrapper.set(this)
    },
    async all(candidates) {
      return repository.all(candidates)
    },
  })

  return wrapper
})()
