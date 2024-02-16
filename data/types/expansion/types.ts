import { AsAttackUnit, WithBlast } from '../unit/types'

export const defineExpansion = <Ex extends object>(d: Expansion & Ex) => d

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

type Expansion = Readonly<{
  name: string
}>
