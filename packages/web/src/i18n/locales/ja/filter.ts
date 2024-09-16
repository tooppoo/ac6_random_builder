import { onlyPropertyIncludedInList } from '@ac6_assemble_tool/core/assembly/filter/filters'
import type { Unit } from '@ac6_assemble_tool/parts/units'

export const jaFilter = {
  filter: '絞り込み',
  excludeNotEquipped: '非武装を除外する',
  notUseHanger: 'ハンガーを使用しない',
  excludeAllNotEquipped: 'すべての$t(excludeNotEquipped)',
  notUseAllHanger: 'すべての$t(notUseHanger)',
  resetAllFilter: 'すべての絞り込みを解除する',
  maxCoamLimit: '最大$t(assembly:coam)',
  maxLoadLimit: '最大$t(assembly:load)',
  applyCurrentLegsLoadLimit: '$t(assembly:legs)の$t(assembly:load)を適用',
  [onlyPropertyIncludedInList('manufacture').name]: '開発企業',
  [onlyPropertyIncludedInList<'attack_type', Unit>('attack_type').name]: '属性',
  filterByParts: {
    description: '選択するパーツの<br>条件を設定する',
  },
}
