import { Candidates, Order } from '#parts/types/candidates'

export type Regulation = Readonly<{
  version: string
  candidates: Candidates
  orders: Order
}>
