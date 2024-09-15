import type { VERSION as v1_06_1 } from '@ac6_assemble_tool/parts/versions/v1.06.1'
import type { VERSION as v1_07 } from '@ac6_assemble_tool/parts/versions/v1.07'

export function getCandidates(
  version: v1_06_1,
): Promise<typeof import('@ac6_assemble_tool/parts/versions/v1.06.1')>
export function getCandidates(
  version: v1_07,
): Promise<typeof import('@ac6_assemble_tool/parts/versions/v1.07')>
export function getCandidates(version: string) {
  return import(`@ac6_assemble_tool/parts/versions/${version}`)
}
