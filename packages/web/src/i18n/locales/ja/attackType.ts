import {
  coral,
  energy,
  explosive,
  kinetic,
  none,
} from '@ac6_assemble_tool/parts/types/unit/attack_type'

export const jaAttackType = {
  [kinetic]: '実弾',
  [explosive]: '爆発',
  [energy]: 'EN',
  [coral]: 'コーラル',
  [none]: 'N/A（盾など）',
} as const
