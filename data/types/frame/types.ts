import type * as Classification from "../base/classification";
import type {Manufacture} from "../base/manufacture";
import type {ACParts, WithEnLoad} from "../base/types";
import type * as Category from "~/data/types/base/category.ts";

const defineFrame = <
  Cl extends Classification.Classification,
  Ca extends Category.Frame,
  Ex extends object
>() => <
  M extends Manufacture,
>(d: Frame<Cl, M, Ca> & Ex) => d

export const defineHead = defineFrame<Classification.Head, typeof Category.head, AsHead>()
type AsHead = Readonly<{
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

export const defineCore = defineFrame<Classification.Core, typeof Category.core, AsCore>()
type AsCore = Readonly<{
  /** ブースター効率補正 */
  booster_efficiency_adjective: number
  /** ジェネレーター出力補正 */
  generator_output_adjective: number
  /** ジェネレーター供給補正 */
  generator_supply_adjective: number
}>
& WithAttitudeStability

export const defineArms = defineFrame<Classification.Arms, typeof Category.arms, AsArms>()
type AsArms =  Readonly<{
  /** 腕部積載上限 */
  arms_load_limit: number
  /** 反動制御 */
  recoil_control: number
  /** 射撃武器適正 */
  firearm_specialization: number
  /** 近接武器適正 */
  melee_specialization: number
}>

export const defineLegs = defineFrame<Classification.Legs, Category.Legs, AsLegs>()
type AsLegs = Readonly<{
  /** 積載上限　*/
  load_limit: number
  /** 水平跳躍性能　*/
  jump_distance: number
  /** 垂直跳躍性能　*/
  jump_height: number
}>
& WithAttitudeStability

type Frame<
  Cl extends Classification.Classification,
  M extends Manufacture,
  Ca extends Category.Frame,
> = ACParts<Cl, M, Ca> & WithEnLoad & Readonly<{
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
