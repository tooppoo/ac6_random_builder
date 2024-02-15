import type * as Category from "~/data/types/base/category.ts";
import type * as Classification from "~/data/types/base/classification.ts";
import {Manufacture} from "~/data/types/base/manufacture";
import {ACParts} from "../base/types";

export const defineGenerator= <M extends Manufacture>(d: Generator<M>) => d
export type Generator<M extends Manufacture> = Readonly<{
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
}>
& ACParts<Classification.Generator, M, Category.Generator>
