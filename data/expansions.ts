import { expansion } from '~data/types/base/classification.ts'
import { defineNotEquipped } from './types/base/types'
import {
  type AsAssaultArmor,
  type AsProtect,
  defineExpansion,
} from './types/expansion/types'

export const expansions = [
  defineExpansion<AsAssaultArmor>({
    name: 'ASSAULT ARMOR',
    classification: expansion,

    attack_power: 1500,
    impact: 2000,
    accumulative_impact: 1380,

    blast_radius: 60,
    effective_range: 200,

    direct_hit_adjustment: 230,
  }),
  defineExpansion<AsProtect>({
    name: 'PULSE ARMOR',
    classification: expansion,

    durability: 3300,
    time_limit: 10,
  }),
  defineExpansion<AsProtect>({
    name: 'PULSE PROTECTION',
    classification: expansion,

    durability: 4000,
    time_limit: 25,
  }),
  defineExpansion<AsProtect>({
    name: 'TERMINAL ARMOR',
    classification: expansion,

    durability: 20000,
    time_limit: 2,
  }),
] as const
export const expansionNotEquipped = defineNotEquipped()
export type ExpansionNotEquipped = typeof expansionNotEquipped

export type Expansion = (typeof expansions)[number]
