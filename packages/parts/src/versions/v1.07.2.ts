import {
  defineCandidates,
  type Candidates,
  type Order,
} from '#parts/types/candidates'
import { apply, patches } from '#parts/versions/patches'

import { definition as v1_07, orders as order_v1_07 } from './v1.07'

export const version = 'v1.07.2' as const
export type VERSION = typeof version

export const definition = apply(v1_07, [
  // arm units
  patches.armUnits.update('HG-004 DUCKETT', () => ({
    attack_power: 249,
    recoil: 49,
    reload_time: 3.0,
  })),
  patches.armUnits.update('IB-C03W1: WLT 011', () => ({
    impact: 168,
    accumulative_impact: 168,
  })),

  // back units
  patches.backUnits.update('BML-G2/P03MLT-06', () => ({
    weight: 3610,
  })),
  patches.backUnits.update('45-091 JVLN BETA', () => ({
    reload_time: 4.1,
  })),
  patches.backUnits.update('Vvc-706PM', () => ({
    weight: 3650,
  })),

  // booster
  patches.booster.update('BST-G2/P04', () => ({
    upward_thrust: 5567,
  })),
  patches.booster.update('BUERZEL/21D', () => ({
    upward_thrust: 5301,
  })),
  patches.booster.update('BC-0600 12345', () => ({
    upward_thrust: 5784,
  })),
  patches.booster.update('IA-C01B: GILLS', () => ({
    upward_thrust: 5484,
  })),

  // generator
  patches.generator.update('AG-T-005 HOKUSHI', () => ({
    post_recovery_en_supply: 1020,
  })),
  patches.generator.update('VP-20D', () => ({
    supply_recovery: 425,
  })),
])

export const candidates: Candidates = defineCandidates(definition)
export const orders: Order = order_v1_07
