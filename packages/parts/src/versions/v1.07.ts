import { candidates as v1_06_1, orders as order_v1_06_1 } from './v1.06.1'

import type { Order } from '~parts/types/candidates'
import { apply } from '~parts/versions/patches'

export const version = 'v1.07' as const
export type VERSION = typeof version

export const candidates = apply(v1_06_1, [
  // define patches for v1.07
])

export const orders: Order = order_v1_06_1
