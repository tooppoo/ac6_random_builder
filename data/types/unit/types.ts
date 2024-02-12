
import type {pulse_gun} from "~/data/types/unit/category.ts";
import type {Classification, ArmUnit, leftBackUnit} from "~/data/types/base/classification.ts";
import type {Manufacture} from "~/data/types/base/manufacture.ts";
import type {ACParts, WithEnLoad} from "~/data/types/base/types.ts";
import type {AttackType, coral, energy, explosive, kinetic, none} from "./attack_type.ts";
import type {melee, shield, WeaponType} from "./weapon_type.ts";

const defineAttackUnit = <C extends Classification>() => <Ex extends object>() => <
  D extends AttackUnit<C, M, W, A>,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
>(d: D & Ex) => d

export const defineArmUnit = defineAttackUnit<ArmUnit>()

export const defineShieldUnit = <Ex>() => <
  D extends Unit<typeof leftBackUnit, M, typeof shield, typeof none>,
  M extends Manufacture,
>(d: D & Ex) => d

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

export type AsLaserGun = AsEnergyShooting & WithIdealRange
export type AsPlasmaGun =
  & AsEnergyShooting
  & WithBlast
  & WithChargeBlast
  & WithChargeAmmoConsumption

export type AsPulseGun = Readonly<{
    attack_type: typeof energy
    category: typeof  pulse_gun
  }>
  & AsShooting
  & WithHeatBuildup
  & WithPAInterference
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

export type AsMissile = Readonly<{
  /** 誘導性能 */
  guidance: number
  /** 誘導ロック時間 */
  homing_lock_time: number
  /** 最大ロック数 */
  lock_count: number
}>
& WithEffectiveRange
& WithTotalRounds
& WithReload

export type AsShield = AsGuardUnit & Readonly<{
  /** IG攻撃軽減 */
  ig_damage_mitigation: number
  /** IG衝撃軽減 */
  ig_impact_dampening: number
  /** IG持続時間 */
  ig_duration: number
}>
& WithCooling
export type AsBuckler = AsShield
export type AsScutum = AsGuardUnit & Readonly<{
  /** アイドリング攻撃軽減 */
  idle_damage_mitigation: number
  /** アイドリング衝撃軽減 */
  idle_impact_dampening: number
  /** アイドリング持続時間 */
  idle_duration: number
}>
& WithCooling

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

type AsEnergyShooting = Readonly<{
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

type AsGuardUnit = Readonly<{
  /** 攻撃軽減 */
  damage_mitigation: number
  /** 衝撃軽減 */
  impact_dampening: number
  /** 展開時発熱 */
  deploy_heat_buildup: number
  /** 展開範囲 */
  deployment: number
}>

type Unit<
  C extends Classification,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
> = ACParts<C, M> & WithEnLoad & Readonly<{
  /** 武器タイプ */
  weapon_type: W
  /** 属性 */
  attack_type: A
}>
type AttackUnit<
  C extends Classification,
  M extends Manufacture,
  W extends WeaponType,
  A extends AttackType,
> = Unit<C, M, W, A> & Readonly<{
  /** 攻撃力 */
  attack_power: number
  /** 衝撃力　*/
  impact: number
  /** 衝撃残留 */
  accumulative_impact: number
  /** 直撃補正 */
  direct_hit_adjustment: number
}>
