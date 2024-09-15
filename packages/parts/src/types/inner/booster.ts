import type * as Category from '~parts/types/base/category'
import type * as Classification from '~parts/types/base/classification'
import type { Manufacture } from '~parts/types/base/manufacture'
import type { ACParts } from '~parts/types/base/types'

export const defineBooster = <M extends Manufacture>(d: Booster<M>) => d
type Booster<M extends Manufacture> = WithBooster &
  ACParts<Classification.Booster, M, Category.Booster>

export type WithBooster = Readonly<{
  /** 推力 */
  thrust: number
  /** 上昇推力 */
  upward_thrust: number
  /** 上昇消費EN */
  upward_en_consumption: number

  /** QB推力 */
  qb_thrust: number
  /** QB噴射時間 */
  qb_jet_duration: number
  /** QB消費EN */
  qb_en_consumption: number
  /** QBリロード時間 */
  qb_reload_time: number
  /** QBリロード保証重量 */
  qb_reload_ideal_weight: number

  /** AB推力 */
  ab_thrust: number
  /** AB消費EN */
  ab_en_consumption: number

  /** 近接攻撃推力 */
  melee_attack_thrust: number
  /** 近接攻撃消費EN */
  melee_attack_en_consumption: number
}>
