import {Category, notEquipped, NotEquipped} from "./category.ts";
import {Classification} from "./classification.ts";
import {Manufacture} from "./manufacture.ts";

export type ACParts<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends Category,
> = BaseACParts<Cl, Ca> & Readonly<{
  manufacture: M
}>

export type WithEnLoad = Readonly<{
  en_load: number
}>

export const defineNotEquipped = <Cl extends Classification>(classification: Cl): BaseACParts<Cl, NotEquipped> => ({
  name: '(Not Equipped)',
  classification,
  category: notEquipped,
  price: 0,
  weight: 0,
})

type BaseACParts<Cl extends Classification, Ca extends string> = Readonly<{
  /** 名前 */
  name: string
  classification: Cl
  category: Ca
  /** 価格　*/
  price: number
  /** 重量　*/
  weight: number
}>
