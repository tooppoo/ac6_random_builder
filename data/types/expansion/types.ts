import type { BaseACParts } from 'data/types/base/types.ts'
import type { AsAttackUnit, WithBlast } from '../unit/types'

export const defineExpansion = <Ex extends object>(d: BaseACParts & Ex) => d

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
