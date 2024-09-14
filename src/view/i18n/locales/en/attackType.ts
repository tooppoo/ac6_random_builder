import {
  coral,
  energy,
  explosive,
  kinetic,
  none,
} from '@ac6_assemble_tool/parts/types/unit/attack_type'

export const enAttackType = {
  [kinetic]: 'kinetic',
  [explosive]: 'explosive',
  [energy]: 'EN',
  [coral]: 'coral',
  [none]: 'N/A（i.e. shield）',
} as const
