import { expansion as expansionCategory } from '#parts/types/base/category'
import { expansion as expansionClass } from '#parts/types/base/classification'
import { noneManufacture } from '#parts/types/base/manufacture'

import {
  type AsAssaultArmor,
  type AsProtect,
  defineExpansion,
} from './types/expansion/types'

export const expansions = [
  defineExpansion<AsAssaultArmor>({
    name: 'ASSAULT ARMOR',
    classification: expansionClass,
    category: expansionCategory,
    manufacture: noneManufacture,

    attack_power: 1500,
    impact: 2000,
    accumulative_impact: 1380,

    blast_radius: 60,
    effective_range: 200,

    direct_hit_adjustment: 230,

    price: 0,
    weight: 0,
    en_load: 0,
  }),
  defineExpansion<AsProtect>({
    name: 'PULSE ARMOR',
    classification: expansionClass,
    category: expansionCategory,
    manufacture: noneManufacture,

    durability: 3300,
    time_limit: 10,

    price: 0,
    weight: 0,
    en_load: 0,
  }),
  defineExpansion<AsProtect>({
    name: 'PULSE PROTECTION',
    classification: expansionClass,
    category: expansionCategory,
    manufacture: noneManufacture,

    durability: 4000,
    time_limit: 25,

    price: 0,
    weight: 0,
    en_load: 0,
  }),
  defineExpansion<AsProtect>({
    name: 'TERMINAL ARMOR',
    classification: expansionClass,
    category: expansionCategory,
    manufacture: noneManufacture,

    durability: 20000,
    time_limit: 2,

    price: 0,
    weight: 0,
    en_load: 0,
  }),
] as const

export type Expansion = (typeof expansions)[number]
