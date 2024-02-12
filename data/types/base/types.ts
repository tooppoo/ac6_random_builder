import {Category} from "./category.ts";
import {Classification} from "./classification.ts";
import {Manufacture} from "./manufacture.ts";

export type ACParts<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends Category,
> = Readonly<{
  classification: Cl
  manufacture: M
  category: Ca
  /** 価格　*/
  price: number
  /** 重量　*/
  weight: number
}>

export type WithEnLoad = Readonly<{
  en_load: number
}>
