import { latest as regulation } from '$lib/regulation'

import type { Regulation } from '@ac6_assemble_tool/parts/versions/regulation.types'

export type PageData = {
  regulation: Regulation
}
export function load(): PageData {
  return {
    regulation,
  }
}
