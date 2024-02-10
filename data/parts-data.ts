
// ARM UNIT
import {leftArmUnit} from "./types/classification";
import {defineArmUnit, MultiHit, WithCharge, WithCooling, WithPAInterference} from "./types/factory/arum_unit";
import {pile_bunker} from "./types/category";
import {balam} from "./types/manufacture";
import {kinetic} from "./types/attack_type";
import {melee} from "./types/weapon_type.ts";

export const leftArmUnits = [
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'PB-033M ASHMEAD',
    classification: leftArmUnit,
    category: pile_bunker,
    weapon_type: melee,
    manufacture: balam,
    price: 185000,

    attack_type: kinetic,
    attack_power: 1688,
    impact: 1150,
    accumulative_impact: 850,
    consecutive_hits: 1,

    charge_attack_power: 4630,
    charge_impact: 1800,
    charge_accumulative_impact: 1100,

    direct_hit_adjustment: 150,
    pa_interference: 119,
    cooling: 302,

    weight: 4180,
    en_load: 225,
  }),
] as const
