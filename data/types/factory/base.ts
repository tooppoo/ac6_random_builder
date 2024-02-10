import {Classification} from "../classification";
import {Manufacture} from "../manufacture";

export type ACParts<
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

export type WithEnLoad = Readonly<{
  en_load: number
}>
