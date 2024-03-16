import { type Category, notEquipped, type NotEquipped } from './category.ts'
import { type Classification } from './classification.ts'
import { type Manufacture } from './manufacture.ts'

export type ACParts<
  Cl extends Classification,
  M extends Manufacture,
  Ca extends Category,
> = BaseACParts<Cl, Ca> &
  Readonly<{
    manufacture: M
  }>

export type WithEnLoad = Readonly<{
  /** EN負荷 */
  en_load: number
}>

export const defineNotEquipped = <Cl extends Classification>(
  classification: Cl,
): BaseACParts<Cl, NotEquipped> & WithEnLoad => ({
  name: '(Not Equipped)',
  classification,
  category: notEquipped,
  price: 0,
  weight: 0,
  en_load: 0,
})

type BaseACParts<Cl extends Classification, Ca extends string> = Readonly<{
  /** 名前 */
  name: string
  classification: Cl
  category: Ca
  /** 価格 */
  price: number
  /** 重量 */
  weight: number
}>
