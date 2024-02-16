import type * as Category from '~data/types/base/category.ts'
import type * as Classification from '~data/types/base/classification.ts'
import type { Manufacture } from '~data/types/base/manufacture.ts'
import type { ACParts, WithEnLoad } from '~data/types/base/types.ts'

export const defineFCS = <M extends Manufacture>(d: FCS<M>) => d
export type FCS<M extends Manufacture> = Readonly<{
  /** */
  close_range_assist: number
  medium_range_assist: number
  long_range_assist: number

  missile_lock_correction: number
  multi_lock_correction: number
}> &
  ACParts<Classification.FCS, M, Category.FCS> &
  WithEnLoad
