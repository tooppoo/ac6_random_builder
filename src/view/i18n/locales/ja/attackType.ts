import {
  coral,
  energy,
  explosive,
  kinetic,
  none,
} from '~data/types/unit/attack_type.ts'

export const jaAttackType = {
  [kinetic]: '実弾',
  [explosive]: '爆発',
  [energy]: 'EN',
  [coral]: 'コーラル',
  [none]: 'N/A（盾など）',
} as const
