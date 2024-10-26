import type { Regulation } from '@ac6_assemble_tool/parts/versions/regulation.types'
import * as regulation from '@ac6_assemble_tool/parts/versions/v1.07'

export type PageData = {
  regulation: Regulation
}
export function load(): PageData {
  return {
    regulation,
  }
}
