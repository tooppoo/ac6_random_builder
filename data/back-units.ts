import {
  AsBuckler, AsGatling,
  AsScutum,
  AsShield,
  defineBackUnit,
  defineShieldUnit
} from "./types/unit/types.ts";
import {leftBackUnit} from "./types/base/classification.ts";
import {arquebus, arquebus_add, dafeng, rubicon_research_institute, takigawa} from "~/data/types/base/manufacture.ts";
import {kinetic, none} from "~/data/types/unit/attack_type.ts";
import {full_auto, shield} from "~/data/types/unit/weapon_type.ts";
import {coral_shield, gatling_cannon, pulse_buckler, pulse_scutum, pulse_shield} from "~/data/types/unit/category.ts";

export const lefTBackUnit = [
  defineShieldUnit<AsShield>()({
    name: 'VP-61PS',
    classification: leftBackUnit,
    category: pulse_shield,
    attack_type: none,
    weapon_type: shield,
    manufacture: arquebus,
    price: 123000,

    damage_mitigation: 58,
    impact_dampening: 40,
    ig_damage_mitigation: 78,
    ig_impact_dampening: 80,
    ig_duration: 0.6,
    deploy_heat_buildup: 190,
    deployment: 180,
    cooling: 144,

    weight: 27000,
    en_load: 310,
  }),
  defineShieldUnit<AsShield>()({
    name: 'SI-24: SU-Q5',
    classification: leftBackUnit,
    category: pulse_shield,
    attack_type: none,
    weapon_type: shield,
    manufacture: takigawa,
    price: 43000,

    damage_mitigation: 45,
    impact_dampening: 25,
    ig_damage_mitigation: 65,
    ig_impact_dampening: 75,
    ig_duration: 1.0,
    deploy_heat_buildup: 160,
    deployment: 180,
    cooling: 88,

    weight: 2010,
    en_load: 220,
  }),
  defineShieldUnit<AsShield>()({
    name: 'SI-27: SU-R8',
    classification: leftBackUnit,
    category: pulse_shield,
    attack_type: none,
    weapon_type: shield,
    manufacture: takigawa,
    price: 100000,

    damage_mitigation: 63,
    impact_dampening: 48,
    ig_damage_mitigation: 67,
    ig_impact_dampening: 79,
    ig_duration: 0.2,
    deploy_heat_buildup: 140,
    deployment: 180,
    cooling: 110,

    weight: 3150,
    en_load: 323,
  }),
  defineShieldUnit<AsBuckler>()({
    name: 'VP-61PB',
    classification: leftBackUnit,
    category: pulse_buckler,
    attack_type: none,
    weapon_type: shield,
    manufacture: arquebus,
    price: 76000,

    damage_mitigation: 35,
    impact_dampening: 35,
    ig_damage_mitigation: 96,
    ig_impact_dampening: 95,
    ig_duration: 0.3,
    deploy_heat_buildup: 480,
    deployment: 180,
    cooling: 132,

    weight: 1920,
    en_load: 285,
  }),
  defineShieldUnit<AsBuckler>()({
    name: 'SI-29: SU-TT/C',
    classification: leftBackUnit,
    category: pulse_buckler,
    attack_type: none,
    weapon_type: shield,
    manufacture: takigawa,
    price: 62000,

    damage_mitigation: 30,
    impact_dampening: 56,
    ig_damage_mitigation: 82,
    ig_impact_dampening: 76,
    ig_duration: 1.6,
    deploy_heat_buildup: 670,
    deployment:  180,
    cooling: 142,

    weight: 3380,
    en_load: 385,
  }),
  defineShieldUnit<AsScutum>()({
    name: 'VE-61PSA',
    classification: leftBackUnit,
    category: pulse_scutum,
    attack_type: none,
    weapon_type: shield,
    manufacture: arquebus_add,
    price: 197000,

    damage_mitigation: 86,
    impact_dampening: 70,
    idle_damage_mitigation: 21,
    idle_impact_dampening: 18,
    idle_duration: 4.0,
    deploy_heat_buildup: 270,
    deployment: 180,
    cooling: 113,

    weight: 4100,
    en_load: 480,
  }),
  defineShieldUnit<AsShield>()({
    name: 'IB-C03W4: NGI 028',
    classification: leftBackUnit,
    category: coral_shield,
    attack_type: none,
    weapon_type: shield,
    manufacture: rubicon_research_institute,
    price: 255000,

    damage_mitigation: 55,
    impact_dampening: 42,
    ig_damage_mitigation: 68,
    ig_impact_dampening: 57,
    ig_duration: 0.8,
    deploy_heat_buildup: 450,
    deployment: 360,
    cooling: 100,

    weight: 2170,
    en_load: 800,
  }),
] as const

export const backUnits = [
  defineBackUnit<AsGatling>()({
    name: 'DF-GA-09 SHAO-WEI',
    classification: leftBackUnit,
    category: gatling_cannon,
    attack_type: kinetic,
    weapon_type: full_auto,
    manufacture: dafeng,
    price: 220000,

    attack_power: 24,
    impact: 20,
    accumulative_impact: 11,
    heat_buildup: 39,

    direct_hit_adjustment: 190,
    recoil: 5,
    ideal_range: 156,
    effective_range: 289,
    rapid_fire: 14.3,
    total_rounds: 800,
    cooling: 650,
    ammunition_cost: 20,

    weight: 3960,
    en_load: 404,
  }),
] as const
