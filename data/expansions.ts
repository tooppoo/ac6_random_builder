import { defineNotEquipped } from './types/base/types'
import {
  type AsAssaultArmor,
  type AsProtect,
  defineExpansion,
} from './types/expansion/types'

export const expansions = [
  defineExpansion<AsAssaultArmor>({
    name: 'ASSAULT ARMOR',

    attack_power: 1500,
    impact: 2000,
    accumulative_impact: 1380,

    blast_radius: 60,
    effective_range: 200,

    direct_hit_adjustment: 230,
  }),
  defineExpansion<AsProtect>({
    name: 'PULSE ARMOR',

    durability: 3300,
    time_limit: 10,
  }),
  defineExpansion<AsProtect>({
    name: 'PULSE PROTECTION',

    durability: 4000,
    time_limit: 25,
  }),
  defineExpansion<AsProtect>({
    name: 'TERMINAL ARMOR',

    durability: 20000,
    time_limit: 2,
  }),
] as const
export const notEquipped = defineNotEquipped()
export type NotEquipped = typeof notEquipped

export type Expansion = (typeof expansions)[number]
