import type { Expansion as ExpansionCategory } from '~parts/types/base/category'
import type { Expansion as ExpansionClass } from '~parts/types/base/classification'
import type { NoneManufacture } from '~parts/types/base/manufacture'
import type { ACParts } from '~parts/types/base/types'

import type { AsAttackUnit, WithBlast } from '../unit/types'

export const defineExpansion = <Ex extends object>(
  d: ACParts<ExpansionClass, NoneManufacture, ExpansionCategory> & Ex,
) => d

export type AsAssaultArmor = Readonly<{
  /** 効果範囲 */
  effective_range: number
}> &
  AsAttackUnit &
  WithBlast

export type AsProtect = Readonly<{
  /** 耐久性 */
  durability: number
  /** 持続時間 */
  time_limit: number
}>
