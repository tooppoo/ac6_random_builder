import { type Category, notEquipped, type NotEquipped } from './category.ts'
import {
  type Classification,
  type NotEquipped as NotEquippedClass,
  notEquipped as notEquippedClass,
} from './classification.ts'
import { type Manufacture } from './manufacture.ts'

export type ACParts<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends Category,
> = ACProducts<Cl, Ca> &
  Readonly<{
    manufacture: M
  }>

export type WithEnLoad = Readonly<{
  /** EN負荷 */
  en_load: number
}>

export const defineNotEquipped = (): ACProducts<NotEquippedClass, NotEquipped> &
  WithEnLoad =>
  ({
    name: '(Not Equipped)',
    classification: notEquippedClass,
    category: notEquipped,
    price: 0,
    weight: 0,
    en_load: 0,
  }) as const

type ACProducts<Cl extends Classification, Ca extends string> = BaseACParts &
  Readonly<{
    classification: Cl
    category: Ca
    /** 価格 */
    price: number
    /** 重量 */
    weight: number
  }>

export type BaseACParts = Readonly<{
  /** 名前 */
  name: string
}>
