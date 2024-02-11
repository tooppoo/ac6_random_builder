import type * as Classification from "~/data/types/base/classification.ts";
import type {Manufacture} from "~/data/types/base/manufacture.ts";
import {AttackType, coral, energy, explosive, kinetic} from "../attack_type.ts";
import type {melee, WeaponType} from "../weapon_type.ts";
import {AttackUnit} from "../types.ts";


export const defineArmUnit = <Ex extends object>() => <
  D extends ArmUnit<M, W, A>,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
>(d: D & Ex) => d

type ArmUnit<
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
> = AttackUnit<Classification.ArmUnit, M, W, A>

export type AsMelee = Readonly<{
  weapon_type: typeof melee,
  /** 連続攻撃回数 */
  consecutive_hits: number
}>
& WithCharge
& WithPAInterference
& WithCooling

export type AsKineticShooting = Readonly<{
    attack_type: typeof kinetic
  }>
& AsShooting
& WithIdealRange

export type AsBlastShooting = Readonly<{
    attack_type: typeof explosive,
  }>
& AsShooting
& WithEffectiveRange
& WithBlast
& WithReload

export type AsEnergyShooting = Readonly<{
    attack_type: typeof energy

    /** チャージEN負荷 */
    charge_en_load: number
  }>
& AsShooting
& WithHeatBuildup
& WithCharge
& WithChargeTime
& WithChargeHeatBuildup
& WithEffectiveRange
& WithRapidFire
& WithCooling

export type AsCoralShooting = Readonly<{
    attack_type: typeof coral
    /** チャージEN負荷 */
    charge_en_load: number
  }>
& AsShooting
& WithHeatBuildup
& WithBlast
& WithCharge
& WithChargeTime
& WithChargeHeatBuildup
& WithChargeAmmoConsumption
& WithEffectiveRange
& WithRapidFire
& WithCooling
& WithPAInterference

export type AsShooting = Readonly<{
  /** 射撃反動 */
  recoil: number
}>
& WithTotalRounds

export type WithIdealRange = Readonly<{
  /** 性能保証射程 */
  ideal_range: number
}>
& WithEffectiveRange
export type WithRapidFire = Readonly<{
  /** 連射性能 */
  rapid_fire: number
}>
export type WithMagazine = Readonly<{
  /** マガジン弾数 */
  magazine_rounds: number
}>
& WithReload
export type WithReload = Readonly<{
  /** リロード時間 */
  reload_time: number
}>

export type WithHeatBuildup = Readonly<{
  /** 攻撃時発熱 */
  heat_buildup: number
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
export type WithChargeTime = Readonly<{
  /** チャージ時間 */
  charge_time: number
}>
export type WithChargeHeatBuildup = Readonly<{
  /** チャージ攻撃時発熱 */
  charge_heat_buildup: number
}>
export type WithChargeAmmoConsumption = Readonly<{
  /** チャージ消費弾数 */
  charge_ammo_consumption: number
}>

export type WithEffectiveRange = Readonly<{
  /** 有効射程 */
  effective_range: number
}>
export type WithTotalRounds = Readonly<{
  /** 装弾数 */
  total_rounds: number
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
