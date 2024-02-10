
// ARM UNIT
import {armUnit, leftArmUnit} from "./types/classification";
import {
  AsRapidFireWeapon,
  AsShooting,
  defineArmUnit,
  MultiHit,
  WithBlast,
  WithCharge, WithChargeBlast, WithChargeTime,
  WithCooling, WithEffectiveRange, WithMagazine,
  WithPAInterference, WithTotalRounds
} from "./types/factory/arum_unit";
import {
  burst_rifle,
  chainsaw, coral_oscillator,
  explosive_thrower,
  laser_blade,
  laser_dagger, laser_lance,
  laser_slicer, light_wave_blade,
  pile_bunker, plasma_thrower, pulse_blade,
  stun_baton
} from "./types/category";
import {
  allmind,
  arquebus,
  arquebus_add,
  balam,
  dafeng,
  rad,
  rubicon_research_institute,
  takigawa,
  vcpl
} from "./types/manufacture";
import {coral, energy, explosive, kinetic} from "./types/attack_type";
import {charge, melee, semi_auto} from "./types/weapon_type.ts";

export const leftArmUnits = [
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'PB-033M ASHMEAD',
    classification: leftArmUnit,
    category: pile_bunker,
    attack_type: kinetic,
    weapon_type: melee,
    manufacture: balam,
    price: 185000,

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
  defineArmUnit<WithBlast & WithCharge & WithChargeBlast & WithEffectiveRange & WithTotalRounds>()({
    name: 'DF-ET-09 TAI-YANG-SHOU',
    classification: leftArmUnit,
    category: explosive_thrower,
    attack_type: explosive,
    weapon_type: semi_auto,
    manufacture: dafeng,
    price: 215000,

    attack_power: 1142,
    impact: 830,
    accumulative_impact: 650,
    blast_radius: 20,

    charge_attack_power: 1142,
    charge_impact: 830,
    charge_accumulative_impact: 650,
    charge_blast_radius: 25,

    direct_hit_adjustment: 190,
    effective_range: 125,
    total_rounds: 48,
    reload_time: 3.1,
    ammunition_cost: 600,

    weight: 3790,
    en_load: 160,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'WB-0010 DOUBLE TROUBLE',
    classification: leftArmUnit,
    category: chainsaw,
    attack_type: kinetic,
    weapon_type: melee,
    manufacture: rad,
    price: 69000,

    attack_power: 1025,
    impact: 750,
    accumulative_impact: 375,
    consecutive_hits: 2,

    charge_attack_power: 2970,
    charge_impact: 2380,
    charge_accumulative_impact: 840,

    direct_hit_adjustment: 270,
    pa_interference: 119,
    cooling: 302,

    weight: 5090,
    en_load: 108,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'VP-67EB',
    classification: leftArmUnit,
    category: stun_baton,
    attack_type: kinetic,
    weapon_type: melee,
    manufacture: arquebus,
    price: 94000,

    attack_power: 293,
    impact: 215,
    accumulative_impact: 85,
    consecutive_hits: 3,

    charge_attack_power: 1971,
    charge_impact: 1360,
    charge_accumulative_impact: 590,

    direct_hit_adjustment: 215,
    pa_interference: 140,
    cooling: 1156,

    weight: 1720,
    en_load: 198,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'VP-67LD',
    classification: leftArmUnit,
    category: laser_dagger,
    attack_type: energy,
    weapon_type: melee,
    manufacture: arquebus,
    price: 135000,

    attack_power: 752,
    impact: 310,
    accumulative_impact: 120,
    consecutive_hits: 3,

    charge_attack_power: 1868,
    charge_impact: 1100,
    charge_accumulative_impact: 375,

    direct_hit_adjustment: 175,
    pa_interference: 118,
    cooling: 1308,

    weight: 1350,
    en_load: 150,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'Vvc-770LB',
    classification: leftArmUnit,
    category: laser_blade,
    attack_type: energy,
    weapon_type: melee,
    manufacture: vcpl,
    price: 210000,

    attack_power: 1630,
    impact: 1100,
    accumulative_impact: 330,
    consecutive_hits: 1,

    charge_attack_power: 1170 * 2,
    charge_impact: 750 * 2,
    charge_accumulative_impact: 280 * 2,

    direct_hit_adjustment: 195,
    pa_interference: 127,
    cooling: 347,

    weight: 2060,
    en_load: 245,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'Vvc-774LS',
    classification: leftArmUnit,
    category: laser_slicer,
    attack_type: energy,
    weapon_type: melee,
    manufacture: vcpl,
    price: 339000,

    attack_power: 1615,
    impact: 900,
    accumulative_impact: 225,
    consecutive_hits: 2,

    charge_attack_power: 2612,
    charge_impact: 1500,
    charge_accumulative_impact: 375,

    direct_hit_adjustment: 185,
    pa_interference: 122,
    cooling: 267,

    weight: 3260,
    en_load: 328,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name:  'VE-67LLA',
    classification:  leftArmUnit,
    category: laser_lance,
    attack_type: energy,
    weapon_type: melee,
    manufacture: arquebus_add,
    price: 270000,

    attack_power: 1151,
    impact: 800,
    accumulative_impact: 400,
    consecutive_hits: 1,

    charge_attack_power: 2381,
    charge_impact: 1800,
    charge_accumulative_impact: 900,

    direct_hit_adjustment: 195,
    pa_interference:  131,
    cooling: 263,

    weight: 4520,
    en_load: 460,
  }),
  defineArmUnit<MultiHit & WithCharge & WithChargeBlast & WithPAInterference & WithEffectiveRange & WithCooling>()({
    name: '44-143 HMMR',
    classification: leftArmUnit,
    category: plasma_thrower,
    attack_type: kinetic,
    weapon_type: melee,
    manufacture: allmind,
    price: 172000,

    attack_power: 1381,
    impact: 810,
    accumulative_impact: 520,
    consecutive_hits: 2,

    charge_attack_power: 265 * 6,
    charge_impact: 33 * 6,
    charge_accumulative_impact: 22 * 6,
    charge_blast_radius: 20,

    direct_hit_adjustment: 165,
    pa_interference: 142,
    effective_range: 78,
    cooling: 366,

    weight: 2410,
    en_load: 311,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'HI-32: BU-TT/A',
    classification: leftArmUnit,
    category: pulse_blade,
    attack_type: energy,
    weapon_type: melee,
    manufacture: takigawa,
    price: 0,

    attack_power: 963,
    impact: 710,
    accumulative_impact: 450,
    consecutive_hits: 2,

    charge_attack_power: 1586,
    charge_impact: 1200,
    charge_accumulative_impact: 650,

    direct_hit_adjustment: 230,
    pa_interference: 147,
    cooling: 282,

    weight: 1800,
    en_load: 213,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithEffectiveRange & WithCooling>()({
    name: 'IA-C01W2: MOONLIGHT',
    classification: leftArmUnit,
    category: light_wave_blade,
    attack_type: energy,
    weapon_type: melee,
    manufacture: rubicon_research_institute,
    price: 270000,

    attack_power: 615,
    impact: 495,
    accumulative_impact: 495,
    consecutive_hits: 2,

    charge_attack_power: 2310,
    charge_impact: 910,
    charge_accumulative_impact: 910,

    direct_hit_adjustment: 175,
    pa_interference: 112,
    effective_range: 280,
    cooling: 265,

    weight: 2200,
    en_load: 544,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithEffectiveRange & WithCooling>()({
    name: 'IA-C01W7: ML-REDSHIFT',
    classification: leftArmUnit,
    category: coral_oscillator,
    attack_type: coral,
    weapon_type: melee,
    manufacture: rubicon_research_institute,
    price: 343000,

    attack_power: 727,
    impact: 530,
    accumulative_impact: 530,
    consecutive_hits: 2,

    charge_attack_power: 1614,
    charge_impact: 820,
    charge_accumulative_impact: 820,

    direct_hit_adjustment: 190,
    pa_interference: 126,
    effective_range: 280,
    cooling: 209,

    weight: 2200,
    en_load: 544,
  }),
  defineArmUnit<MultiHit & WithCharge & WithPAInterference & WithCooling>()({
    name: 'IB-C03W2: WLT 101',
    classification: leftArmUnit,
    category: coral_oscillator,
    attack_type: coral,
    weapon_type: melee,
    manufacture: rubicon_research_institute,
    price: 368000,

    attack_power: 1350,
    impact: 960,
    accumulative_impact: 960,
    consecutive_hits: 1,

    charge_attack_power: 1950,
    charge_impact: 1450,
    charge_accumulative_impact: 1450,

    direct_hit_adjustment: 210,
    pa_interference: 140,
    cooling: 199,

    weight: 2030,
    en_load: 642,
  })
] as const

export const armUnits = [

] as const
