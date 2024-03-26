import { onlyPropertyIncludedInList } from '~core/assembly/filter/filters.ts'

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
  [onlyPropertyIncludedInList('manufacture').name]: '指定企業の製品のみ使用',
  filterByParts: {
    description: '選択するパーツの<br>条件を設定する',
  },
}
