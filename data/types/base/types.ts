import { type Category, notEquipped, type NotEquipped } from './category.ts'
import {
  type Classification,
  type NotEquipped as NotEquippedClass,
  notEquipped as notEquippedClass,
} from './classification.ts'
import {
  type Manufacture,
  noneManufacture,
  type NoneManufacture,
} from './manufacture.ts'

export type ACParts<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends Category,
> = Readonly<{
  /** 名前 */
  name: string
  /** 分類 */
  classification: Cl
  /** 製造企業 */
  manufacture: M
  /** カテゴリ */
  category: Ca
  /** 価格 */
  price: number
  /** 重量 */
  weight: number
  /** EN負荷 */
  en_load: number
}>

export type WithEnLoad = Readonly<{
  /** EN負荷 */
  en_load: number
}>

export const defineNotEquipped = (): ACParts<
  NotEquippedClass,
  NoneManufacture,
  NotEquipped
> &
  WithEnLoad =>
  ({
    name: '(Not Equipped)',
    classification: notEquippedClass,
    manufacture: noneManufacture,
    category: notEquipped,
    price: 0,
    weight: 0,
    en_load: 0,
  }) as const
