import type { StoredAssemblyAggregation } from '~core/assembly/store/stored-assembly'

export function filterByKeywords<T extends StoredAssemblyAggregation>(
  keywords: string[],
  list: T[],
): T[] {
  if (keywords.length === 0) {
    return list
  }

  return list.filter((x) =>
    keywords.some((k) => x.name.includes(k) || x.description.includes(k)),
  )
}
