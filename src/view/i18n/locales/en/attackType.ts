import {
  coral,
  energy,
  explosive,
  kinetic,
  none,
} from '~data/types/unit/attack_type.ts'

export const enAttackType = {
  [kinetic]: 'kinetic',
  [explosive]: 'explosive',
  [energy]: 'EN',
  [coral]: 'coral',
  [none]: 'N/A（i.e. shield）',
} as const
