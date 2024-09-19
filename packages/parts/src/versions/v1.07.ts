import type { Order } from '~parts/types/candidates'
import { apply, patches } from '~parts/versions/patches'

import { candidates as v1_06_1, orders as order_v1_06_1 } from './v1.06.1'

export const version = 'v1.07' as const
export type VERSION = typeof version

export const candidates = apply(v1_06_1, [
  // Melee
  patches.leftArmUnit.update('Vvc-770LB', () => ({
    charge_attack_power: 1450 * 2,
    charge_accumulative_impact: 360 * 2,
    cooling: 402,
  })),
  patches.leftArmUnit.update('VE-67LLA', () => ({
    charge_impact: 1870,
    charge_accumulative_impact: 960,
    pa_interference: 138,
  })),
  patches.leftArmUnit.update('44-143 HMMR', () => ({
    attack_power: 1208,
    impact: 690,
    accumulative_impact: 440,
  })),
  patches.leftArmUnit.update('IB-C03W2; WLT 101', () => ({
    attack_power: 1460,
    cooling: 231,
    en_load: 578,
  })),

  // FIXME: 部位ではなくパーツ単位でパッチを当てる
  // Arm Units
  patches.rightArmUnit.update('LR-036 CURTIS', () => ({
    recoil: 19,
  })),
  patches.leftArmUnit.update('LR-036 CURTIS', () => ({
    recoil: 19,
  })),
  patches.rightArmUnit.update('MG-014 LUDLOW', () => ({
    // mask data only
  })),
  patches.leftArmUnit.update('MG-014 LUDLOW', () => ({
    // mask data only
  })),
  patches.rightArmUnit.update('DF-MG-02 CHANG-CHEN', () => ({
    recoil: 5,
  })),
  patches.leftArmUnit.update('DF-MG-02 CHANG-CHEN', () => ({
    recoil: 5,
  })),
  patches.rightArmUnit.update('MA-E-210 ETSUJIN', () => ({
    attack_power: 48 * 4,
    impact: 44 * 4,
    accumulative_impact: 20 * 4,
  })),
  patches.leftArmUnit.update('MA-E-210 ETSUJIN', () => ({
    attack_power: 48 * 4,
    impact: 44 * 4,
    accumulative_impact: 20 * 4,
  })),
  patches.rightArmUnit.update('HG-004 DUCKETT', () => ({
    attack_power: 272,
    impact: 315,
    accumulative_impact: 160,
    magazine_rounds: 8,
    total_rounds: 208.
  })),
  patches.leftArmUnit.update('HG-004 DUCKETT', () => ({
    attack_power: 272,
    impact: 315,
    accumulative_impact: 160,
    magazine_rounds: 8,
    total_rounds: 208.
  })),
  patches.rightArmUnit.update('LITTLE GEM', () => ({
    weight: 2940,
    en_load: 169,
  })),
  patches.leftArmUnit.update('LITTLE GEM', () => ({
    weight: 2940,
    en_load: 169,
  })),
  patches.rightArmUnit.update('44-141 JVLN ALPHA', () => ({
    weight: 5920,
  })),
  patches.leftArmUnit.update('44-141 JVLN ALPHA', () => ({
    weight: 5920,
  })),
  patches.rightArmUnit.update('DIZZY', () => ({
    reload_time: 6.3,
    weight: 5590,
  })),
  patches.leftArmUnit.update('DIZZY', () => ({
    reload_time: 6.3,
    weight: 5590,
  })),
  patches.rightArmUnit.update('IRIDIUM', () => ({
    reload_time: 3.8,
  })),
  patches.leftArmUnit.update('IRIDIUM', () => ({
    reload_time: 3.8,
  })),
  patches.rightArmUnit.update('WS-1200 THERAPIST', () => ({
    reload_time: 2.5,
  })),
  patches.leftArmUnit.update('WS-1200 THERAPIST', () => ({
    reload_time: 2.5,
  })),
  patches.rightArmUnit.update('WB-0000 BAD COOK', () => ({
    weight: 5370,
  })),
  patches.leftArmUnit.update('WB-0000 BAD COOK', () => ({
    weight: 5370,
  })),
  patches.rightArmUnit.update('VP-66LR', () => ({
    attack_power: 261,
    impact: 135,
    accumulative_impact: 59,
  })),
  patches.leftArmUnit.update('VP-66LR', () => ({
    attack_power: 261,
    impact: 135,
    accumulative_impact: 59,
  })),
  patches.rightArmUnit.update('VP-66LS', () => ({
    charge_accumulative_impact: 488,
    charge_time: 0.7,
    cooling: 263,
  })),
  patches.leftArmUnit.update('VP-66LS', () => ({
    charge_accumulative_impact: 488,
    charge_time: 0.7,
    cooling: 263,
  })),
  patches.rightArmUnit.update('VP-66LH', () => ({
    // mask data only
  })),
  patches.leftArmUnit.update('VP-66LH', () => ({
    // mask data only
  })),
  patches.rightArmUnit.update('Vvc-760PR', () => ({
    // mask data only
  })),
  patches.leftArmUnit.update('Vvc-760PR', () => ({
    // mask data only
  })),
  patches.rightArmUnit.update('IB-C03W1: WLT011', () => ({
    heat_buildup: 180,
  })),
  patches.leftArmUnit.update('IB-C03W1: WLT011', () => ({
    heat_buildup: 180,
  })),
  patches.rightArmUnit.update('44-142 KRSV', () => ({
    impact: 144,
    accumulative_impact: 100,
    heat_buildup: 105,
    cooling: 177,
  })),
  patches.leftArmUnit.update('44-142 KRSV', () => ({
    impact: 144,
    accumulative_impact: 100,
    heat_buildup: 105,
    cooling: 177,
  })),
  // shield
  patches.leftBackUnit.update('VP-61PS', () => ({
    deploy_heat_buildup: 205,
  })),
  patches.leftBackUnit.update('VP-61PB', () => ({
    ig_duration: 0.4,
    deploy_heat_buildup: 205,
  })),
  patches.leftBackUnit.update('SI-29: SU-TT/C', () => ({
    deploy_heat_buildup: 480,
  })),
  // back units
  patches.rightBackUnit.update('DF-GA-09 SHAO-WEI', () => ({
    heat_buildup: 37,
    recoil: 3,
  })),
  patches.leftBackUnit.update('DF-GA-09 SHAO-WEI', () => ({
    heat_buildup: 37,
    recoil: 3,
  })),
  patches.rightBackUnit.update('SB-033M MORLEY', () => ({
    attack_power: 1410,
  })),
  patches.leftBackUnit.update('SB-033M MORLEY', () => ({
    attack_power: 1410,
  })),
  patches.rightBackUnit.update('BML-G2/P19SPL-12', () => ({
    homing_lock_time: 1.0,
  })),
  patches.leftBackUnit.update('BML-G2/P19SPL-12', () => ({
    homing_lock_time: 1.0,
  })),
  patches.rightBackUnit.update('BML-G2/P16SPL-08', () => ({
    homing_lock_time: 0.8,
  })),
  patches.leftBackUnit.update('BML-G2/P16SPL-08', () => ({
    homing_lock_time: 0.8,
  })),
  patches.rightBackUnit.update('BML-G2/P17SPL-16', () => ({
    homing_lock_time: 1.4,
  })),
  patches.leftBackUnit.update('BML-G2/P17SPL-16', () => ({
    homing_lock_time: 1.4,
  })),
  patches.rightBackUnit.update('BML-G1/P31DUO-02', () => ({
    homing_lock_time: 0.3,
    reload_time: 2.8,
  })),
  patches.leftBackUnit.update('BML-G1/P31DUO-02', () => ({
    homing_lock_time: 0.3,
    reload_time: 2.8,
  })),
  patches.rightBackUnit.update('BML-G1/P32DUO-03', () => ({
    reload_time: 3.5,
  })),
  patches.leftBackUnit.update('BML-G1/P32DUO-03', () => ({
    reload_time: 3.5,
  })),
  patches.rightBackUnit.update('BML-G3/P04ACT-01', () => ({
    homing_lock_time: 1.7,
    weight: 2270,
  })),
  patches.leftBackUnit.update('BML-G3/P04ACT-01', () => ({
    homing_lock_time: 1.7,
    weight: 2270,
  })),
  // heads
  patches.head.update('AH-J-124 BASHO', () => ({
    attitude_stability: 394,
    system_recovery: 90,
    scan_distance: 390,
  })),
  patches.head.update('HD-011 MELANDER', () => ({
    ap: 1010,
    system_recovery: 124,
    scan_distance: 380,
  })),
  patches.head.update('HD-012 MELANDER C3', () => ({
    ap: 1070,
    system_recovery: 115,
  })),
  patches.head.update('DF-HD-08 TIAN-QIANG', () => ({
    ap: 420,
    attitude_stability: 267,
    system_recovery: 79,
    scan_distance: 300,
  })),
  patches.head.update('VP-44S', () => ({
    attitude_stability: 432,
    system_recovery: 136,
  })),
  patches.head.update('NACHTREIHER/44E', () => ({
    attitude_stability: 463,
    system_recovery: 107,
    scan_distance: 420,
  })),
  patches.head.update('KASUAR/44Z', () => ({
    ap: 480,
  })),
  patches.head.update('LAMMERGEIER/44F', () => ({
    attitude_stability: 305,
    scan_distance: 360,
  })),
  patches.head.update('VE-44A', () => ({
    attitude_stability: 423,
    system_recovery: 138,
  })),
  patches.head.update('VE-44B', () => ({
    attitude_stability: 450,
  })),
  patches.head.update('HC-2000 FINDER EYE', () => ({
    attitude_stability: 396,
    scan_distance: 340,
    en_load: 84,
  })),
  patches.head.update('HC-2000/BC SHADE EYE', () => ({
    attitude_stability: 472,
    system_recovery: 127,
  })),
  patches.head.update('HC-3000 WRECKER', () => ({
    attitude_stability: 378,
    system_recovery: 93,
    scan_distance: 370,
  })),
  patches.head.update('HS-5000 APPETIZER', () => ({
    ap: 950,
    attitude_stability: 418,
    system_recovery: 98,
  })),
  patches.head.update('EL-TH-10 FIRMEZA', () => ({
    ap: 620,
    attitude_stability: 421,
    system_recovery: 104,
    scan_distance: 440,
    weight: 2370,
  })),
  patches.head.update('EL-PH-00 ALBA', () => ({
    attitude_stability: 465,
    system_recovery: 129,
  })),
  patches.head.update('20-081 MIND ALPHA', () => ({
    attitude_stability: 462,
    scan_distance: 430,
  })),
  patches.head.update('IB-C03H: HAL 826', () => ({
    attitude_stability: 470,
  })),
  // core
  patches.core.update('AC-J-120 BASHO', () => ({
    ap: 3840,
    attitude_stability: 502,
    weight: 16100,
  })),
  patches.core.update('BD-011 MELANDER', () => ({
    ap: 3680,
    attitude_stability: 474,
    weight: 15200,
  })),
  patches.core.update('BD-012 MELANDER C3', () => ({
    ap: 3010,
    booster_efficiency_adjective: 107,
    generator_supply_adjective: 106,
    weight: 13700,
  })),
  patches.core.update('DF-BD-08 TIAN-QIANG', () => ({
    generator_supply_adjective: 70,
  })),
  patches.core.update('VP-40S', () => ({
    generator_output_adjective: 111,
  })),
  patches.core.update('EL-TC-10 FIRMEZA', () => ({
    ap: 2650,
    generator_output_adjective: 109,
  })),
  // arms
  patches.arms.update('AR-011 MELANDER', () => ({
    melee_specialization: 124,
  })),
  patches.arms.update('AR-012 MELANDER C3', () => ({
    melee_specialization: 110,
  })),
  patches.arms.update('DF-AR-09 TIAN-LAO', () => ({
    ap: 2970,
    melee_specialization: 81,
    firearm_specialization: 76,
  })),
  patches.arms.update('VP-46S', () => ({
    melee_specialization: 138,
  })),
  patches.arms.update('VP-46D', () => ({
    melee_specialization: 139,
  })),
  patches.arms.update('AC-3000 WRECKER', () => ({
    melee_specialization: 72,
  })),
  patches.arms.update('AS-5000 SALAD', () => ({
    melee_specialization: 131,
    en_load: 218,
  })),
  patches.arms.update('EL-TA-10 FIRMEZA', () => ({
    melee_specialization: 120,
  })),
  patches.arms.update('EL-PA-00 ALBA', () => ({
    melee_specialization: 91,
  })),
  patches.arms.update('04-101 MIND ALPHA', () => ({
    melee_specialization: 88,
  })),
  patches.arms.update('IB-C03A: HAL 826', () => ({
    melee_specialization: 114,
  })),
  // legs
  patches.legs.update('AL-J-121 BASHO', () => ({
    jump_distance: 152,
  })),
  patches.legs.update('LG-012 MELANDER C3', () => ({
    jump_distance: 138,
  })),
  patches.legs.update('NACHTREIHER/42E', () => ({
    ap: 3360,
    attitude_stability: 662,
  })),
  patches.legs.update('VE-42A', () => ({
    ap: 5700,
    anti_kinetic_defense: 380,
    anti_energy_defense: 421,
    anti_explosive_defense: 387,
  })),
  patches.legs.update('2S-5000 DESSERT', () => ({
    ap: 5290,
    anti_kinetic_defense: 382,
    anti_energy_defense: 392,
    anti_explosive_defense: 369,
  })),
  patches.legs.update('EL-TL-10 FIRMEZA', () => ({
    jump_distance: 155,
  })),
  patches.legs.update('EL-PL-00 ALBA', () => ({
    jump_distance: 130,
  })),
  patches.legs.update('IA-C01L: EPHEMERA', () => ({
    jump_distance: 144,
  })),
  patches.legs.update('KASUAR/42Z', () => ({
    load_limit: 49280,
  })),
  patches.legs.update('RC-2000 SPRING CHICKEN', () => ({
    attitude_stability: 801,
  })),
  patches.legs.update('LAMMERGEIER/42F', () => ({
    attitude_stability: 980,
  })),
  patches.legs.update('EL-TL-11 FORTALEZA', () => ({
    ap: 5100,
    ab_thrust: 8668,
  })),
  // booster
  patches.booster.update('BST-G2/P06SPD', () => ({
    melee_attack_thrust: 11585,
  })),
  patches.booster.update('FLUEGEL/21Z', () => ({
    melee_attack_thrust: 13002,
  })),
  patches.booster.update('BUERZEL/21D', () => ({
    qb_en_consumption: 630,
  })),
  patches.booster.update('BC-0600 12345', () => ({
    ab_thrust: 8635,
  })),
  patches.booster.update('BC-0200 GRIDWALKER', () => ({
    melee_attack_thrust: 12535,
  })),
  patches.booster.update('IA-C01B: GILLS', () => ({
    ab_thrust: 8701,
  })),
  // fcs
  patches.fcs.update('FC-006 ABBOT', () => ({
    close_range_assist: 74,
    medium_range_assist: 38,
  })),
  patches.fcs.update('FC-008 TALBOT', () => ({
    close_range_assist: 65,
    medium_range_assist: 57,
    long_range_assist: 32,
  })),
  patches.fcs.update('VE-21A', () => ({
    close_range_assist: 45,
    medium_range_assist: 72,
    en_load: 320,
  })),
  patches.fcs.update('VE-21B', () => ({
    medium_range_assist: 85,
    long_range_assist: 90,
  })),
  patches.fcs.update('IA-C01F: OCELLUS', () => ({
    close_range_assist: 81,
    missile_lock_correction: 45,
  })),
  // generator
  patches.generator.update('AG-E-013 YABA', () => ({
    en_capacity: 3060,
    en_recharge: 1086,
  })),
  patches.generator.update('AG-T-005 HOKUSHI', () => ({
    en_capacity: 3420,
    en_recharge: 1052,
  })),
  patches.generator.update('DF-GN-02 LING-TAI', () => ({
    en_capacity: 2240,
  })),
  patches.generator.update('DF-GN-06 MING-TANG', () => ({
    en_capacity: 3140,
    en_recharge: 1449,
    en_output: 3310,
  })),
  patches.generator.update('DF-GN-08 SAN-TAI', () => ({
    en_recharge: 1020,
    supply_recovery: 526,
    post_recovery_en_supply: 620,
  })),
  patches.generator.update('VP-20S', () => ({
    en_capacity: 2620,
    en_recharge: 892,
    en_output: 3400,
  })),
  patches.generator.update('VP-20C', () => ({
    en_capacity: 2870,
    en_recharge: 980,
    post_recovery_en_supply: 1230,
  })),
  patches.generator.update('VP-20D', () => ({
    en_capacity: 3720,
    energy_firearm_spec: 108,
  })),
  patches.generator.update('VE-20A', () => ({
    en_capacity: 2570,
    en_recharge: 787,
    energy_firearm_spec: 120,
    en_output: 3180,
  })),
  patches.generator.update('IB-C03G: NGI 000', () => ({
    post_recovery_en_supply: 3100,
    energy_firearm_spec: 102,
  })),
])

export const orders: Order = order_v1_06_1
