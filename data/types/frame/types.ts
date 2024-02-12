import type {Arms, Classification, Core, Head, Legs} from "../base/classification";
import type {Manufacture} from "../base/manufacture";
import type {ACParts} from "../base/types";
import type {Category} from "~/data/types/base/category.ts";

const defineFrame = <Cl extends Classification>() => <Ex extends object>() => <
  D extends Frame<Cl, M, Ca>,
  M extends Manufacture,
  Ca extends Category
>(d: D & Ex) => d

export const defineHead = defineFrame<Head>()
export type AsHead = Readonly<{
  /** 姿勢安定性能 */
  attitude_stability: number
  /** システム復元性能 */
  system_recovery: number
  /** スキャン距離 */
  scan_distance: number
  /** スキャン持続時間 */
  scan_effect_duration: number
  /** スキャン待機時間 */
  scan_standby_time: number
}>
& WithAttitudeStability

export const defineCore = defineFrame<Core>()
export type AsCore = Readonly<{
  /** ブースター効率補正 */
  booster_efficiency_adjective: number
  /** ジェネレーター出力補正 */
  generator_output_adjective: number
  /** ジェネレーター供給補正 */
  generator_supply_adjective: number
}>
& WithAttitudeStability

export const defineArms = defineFrame<Arms>()
export type AsArms =  Readonly<{
  /** 腕部積載上限 */
  arms_load_limit: number
  /** 反動制御 */
  recoil_control: number
  /** 射撃武器適正 */
  firearm_specialization: number
  /** 近接武器適正 */
  melee_specialization: number
}>

export const defineLegs = defineFrame<Legs>()
export type AsLegs = Readonly<{
  /** 積載上限　*/
  load_limit: number
  /** 水平跳躍性能　*/
  jump_distance: number
  /** 垂直跳躍性能　*/
  jump_height: number
}>
& WithAttitudeStability

type Frame<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends string,
> = ACParts<Cl, M, Ca> & Readonly<{
  ap: number

  /** 耐弾防御 */
  anti_kinetic_defense: number
  /** 耐EN防御 */
  anti_energy_defense: number
  /** 耐爆防御 */
  anti_explosive_defense: number
}>

type WithAttitudeStability = Readonly<{
  /** 姿勢安定性能 */
  attitude_stability: number
}>
