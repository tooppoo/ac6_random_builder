import type * as Classification from "../base/classification.ts";
import type {Manufacture} from "../base/manufacture.ts";
import type {WeaponType} from "./weapon_type.ts";
import type {ACParts, WithEnLoad} from "../base/types.ts";
import {AttackType} from "./attack_type.ts";

export type Unit<
  C extends Classification.Classification,
  M extends Manufacture,
  W extends WeaponType,
> = ACParts<C, M> & WithEnLoad & Readonly<{
  /** 武器タイプ */
  weapon_type: W
  /** 攻撃力 */
  attack_power: number
  /** 衝撃力　*/
  impact: number
  /** 衝撃残留 */
  accumulative_impact: number
  /** 直撃補正 */
  direct_hit_adjustment: number
}>
export type AttackUnit<
  C extends Classification.Classification,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
> = Unit<C, M, W> & Readonly<{
  /** 属性 */
  attack_type: A
}>