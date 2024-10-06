import type * as Category from '#parts/types/base/category'
import type * as Classification from '#parts/types/base/classification'
import type { Manufacture } from '#parts/types/base/manufacture'

import type { ACParts } from '../base/types'

export const defineGenerator = (d: Generator) => d
export type Generator = Readonly<{
  /** EN容量 */
  en_capacity: number
  /** EN補充性能 */
  en_recharge: number
  /** 供給復元性能 */
  supply_recovery: number
  /** 復元時補充EN */
  post_recovery_en_supply: number
  /** EN射撃武器適性 */
  energy_firearm_spec: number
  /** EN出力 */
  en_output: number
}> &
  ACParts<Classification.Generator, Manufacture, Category.Generator>
