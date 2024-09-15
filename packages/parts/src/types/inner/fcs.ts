import type * as Category from '~parts/types/base/category'
import type * as Classification from '~parts/types/base/classification'
import type { Manufacture } from '~parts/types/base/manufacture'
import type { ACParts } from '~parts/types/base/types'

export const defineFCS = <M extends Manufacture>(d: FCS<M>) => d
export type FCS<M extends Manufacture> = Readonly<{
  /** */
  close_range_assist: number
  medium_range_assist: number
  long_range_assist: number

  missile_lock_correction: number
  multi_lock_correction: number
}> &
  ACParts<Classification.FCS, M, Category.FCS>
