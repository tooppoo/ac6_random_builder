import type * as Classification from "../classification";
import {Manufacture} from "../manufacture";
import {AttackType} from "../attack_type";
import {ACParts, WithEnLoad} from "./base";
import {WeaponType} from "../weapon_type.ts";

type Unit<
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
type AttackUnit<
  C extends Classification.Classification,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
> = Unit<C, M, W> & Readonly<{
  /** 属性 */
  attack_type: A
}>

export type ArmUnit<
  C extends Classification.ArmUnit,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
> = AttackUnit<C, M, W, A>

export type MultiHit = Readonly<{
  /** 連続攻撃回数 */
  consecutive_hits: number
}>

export type AsShooting = Readonly<{
  /** 射撃反動 */
  recoil: number

}>

export type WithBlast = Readonly<{
  /** 爆発範囲 */
  blast_radius: number
}>
export type WithCharge = Readonly<{
  /** チャージ攻撃力 */
  charge_attack_power: number
  /** チャージ衝撃力 */
  charge_impact: number
  /** チャージ衝撃残留 */
  charge_accumulative_impact: number
}>
export type WithChargeBlast = Readonly<{
  /** チャージ爆発範囲 */
  charge_blast_radius: number
}>

export type WithEffectiveRange = Readonly<{
  /** 有効射程 */
  effective_range: number
}>
export type WithTotalRounds = Readonly<{
  /** 装弾数 */
  total_rounds: number
  /** リロード時間 */
  reload_time: number
  /** 弾単価 */
  ammunition_cost: number
}>

export type WithPAInterference = Readonly<{
  /** PA干渉 */
  pa_interference: number
}>
export type WithCooling = Readonly<{
  /** 冷却性能 */
  cooling: number
}>

export const defineArmUnit = <Ex extends object>() => <
  D extends ArmUnit<C, M, W, A>,
  C extends Classification.ArmUnit,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
>(d: D & Ex) => d
