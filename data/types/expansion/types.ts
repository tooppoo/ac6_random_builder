import type { Expansion as ExpansionCategory } from '~data/types/base/category.ts'
import type { Expansion as ExpansionClass } from '~data/types/base/classification.ts'
import type { NoneManufacture } from '~data/types/base/manufacture.ts'
import type { ACParts } from '~data/types/base/types.ts'

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
