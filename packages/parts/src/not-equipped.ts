import type { NotEquipped } from '~data/types/base/category'
import { notEquipped } from '~data/types/base/category'
import type { NotEquipped as NotEquippedClass } from '~data/types/base/classification'
import { notEquipped as notEquippedClass } from '~data/types/base/classification'
import type { NoneManufacture } from '~data/types/base/manufacture'
import { noneManufacture } from '~data/types/base/manufacture'
import type { ACParts, WithEnLoad } from '~data/types/base/types'

const defineNotEquipped = (): ACParts<
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

export const boosterNotEquipped = defineNotEquipped()
export type BoosterNotEquipped = typeof boosterNotEquipped

export const expansionNotEquipped = defineNotEquipped()
export type ExpansionNotEquipped = typeof expansionNotEquipped

export const armNotEquipped = defineNotEquipped()
export type ArmNotEquipped = typeof armNotEquipped

export const backNotEquipped = defineNotEquipped()
export type BackNotEquipped = typeof backNotEquipped
