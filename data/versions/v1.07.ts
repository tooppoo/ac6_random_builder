import { apply } from '~data/versions/patches.ts'

import { candidates as v1_06_1 } from './v1.06.1.ts'

export const version = 'v1.07' as const
export type VERSION = typeof version

export const candidates = apply(v1_06_1, [
  // define patches for v1.07
])
