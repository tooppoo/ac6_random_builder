import { onlyPropertyIncludedInList } from '~core/assembly/filter/filters.ts'

import type { Unit } from '~data/units.ts'

export const enFilter = {
  filter: 'filter',
  excludeNotEquipped: 'exclude not-equipped',
  notUseHanger: 'not use hanger',
  excludeAllNotEquipped: 'exclude any not-equipped',
  notUseAllHanger: 'not use any hanger',
  resetAllFilter: 'reset all filters',
  maxCoamLimit: 'max $t(assembly:coam)',
  maxLoadLimit: 'max $t(assembly:load)',
  applyCurrentLegsLoadLimit: 'apply $t(assembly:load) of $t(assembly:legs)',
  [onlyPropertyIncludedInList('manufacture').name]: 'manufacture',
  [onlyPropertyIncludedInList<'attack_type', Unit>('attack_type').name]:
    'attack type',
  filterByParts: {
    description: 'Set condition for the parts',
  },
}
