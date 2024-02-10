import {Classification} from "./classification";
import {Manufacture} from "./manufacture";
import {AttackType} from "./attack_type";

type ACParts<
  C extends Classification,
  M extends Manufacture,
> = Readonly<{
  classification: C
  manufacture: M
  /** 価格　*/
  price: number
  /** 重量　*/
  weight: number
}>

type ArmUnit<C extends Classification, M extends Manufacture, A extends AttackType> = ACParts<C, M> & Readonly<{
  attack_type: A
  /** 攻撃力 */
  attack_power: number
  /** 衝撃力　*/
  impact: number
  /** 衝撃残留 */
  accumulative_impact: number
  /** 直撃補正 */
  direct_hit_adjustment: number
}>
export const defineArmUnit = <
  C extends Classification,
  M extends Manufacture,
  A extends AttackType,
  D extends ArmUnit<C, M, A>
>(d: D) => d as const
