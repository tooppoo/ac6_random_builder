import {Category} from "./category.ts";
import {Classification} from "./classification.ts";
import {Manufacture} from "./manufacture.ts";

export type ACParts<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends Category,
> = BaseACParts<Cl> & Readonly<{
  manufacture: M
  category: Ca
}>

export type WithEnLoad = Readonly<{
  en_load: number
}>

export const defineNotEquipped = <C extends Classification>(classification: C): BaseACParts<C> => ({
  name: '(Not Equipped)',
  classification,
  price: 0,
  weight: 0,
})

type BaseACParts<C extends Classification> = Readonly<{
  /** 名前 */
  name: string
  classification: C
  /** 価格　*/
  price: number
  /** 重量　*/
  weight: number
}>
