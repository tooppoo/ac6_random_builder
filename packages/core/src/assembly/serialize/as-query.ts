import {
  type Assembly,
  type AssemblyKey,
  createAssembly,
  type RawAssembly,
} from '#core/assembly/assembly'

import {
  armNotEquipped,
  backNotEquipped,
  boosterNotEquipped,
  expansionNotEquipped,
} from '@ac6_assemble_tool/parts/not-equipped'
import type { Candidates } from '@ac6_assemble_tool/parts/types/candidates'

export function assemblyToSearch(
  assembly: Assembly,
  candidates: Candidates,
): URLSearchParams {
  const toIndex = (key: AssemblyKey): string =>
    `${candidates[key].findIndex((c) => c.name === assembly[key].name)}`

  const query: AssemblyQuery = {
    rau: toIndex('rightArmUnit'),
    lau: toIndex('leftArmUnit'),
    rbu: toIndex('rightBackUnit'),
    lbu: toIndex('leftBackUnit'),

    h: toIndex('head'),
    c: toIndex('core'),
    a: toIndex('arms'),
    l: toIndex('legs'),

    b: toIndex('booster'),
    f: toIndex('fcs'),
    g: toIndex('generator'),

    e: toIndex('expansion'),
  }

  return Object.entries(query).reduce((search, [key, value]) => {
    search.set(key, value)

    return search
  }, new URLSearchParams())
}

export function searchToAssembly(
  search: URLSearchParams,
  candidates: Candidates,
): Assembly {
  const query = (() => {
    const q: Record<string, string> = {}

    for (const [k, v] of search.entries()) {
      q[k] = v
    }

    return q as AssemblyQuery
  })()

  const i = (key: keyof AssemblyQuery, fallback: number = -1): number =>
    query[key] ? parseInt(query[key], 10) : fallback
  return createAssembly({
    rightArmUnit: candidates.rightArmUnit[i('rau')] || armNotEquipped,
    leftArmUnit: candidates.leftArmUnit[i('lau')] || armNotEquipped,
    rightBackUnit: candidates.rightBackUnit[i('rbu')] || backNotEquipped,
    leftBackUnit: candidates.leftBackUnit[i('lbu')] || backNotEquipped,

    head: candidates.head[i('h', 0)],
    core: candidates.core[i('c', 0)],
    arms: candidates.arms[i('a', 0)],
    legs: candidates.legs[i('l', 0)],

    booster: candidates.booster[i('b', 0)] || boosterNotEquipped,
    fcs: candidates.fcs[i('f', 0)],
    generator: candidates.generator[i('g', 0)],

    expansion: candidates.expansion[i('e')] || expansionNotEquipped,
  } as RawAssembly)
}

/**
 * クエリ長を抑えるため、キーは略称を使用
 */
type AssemblyQuery = Readonly<
  Record<
    /** RIGHT ARM UNIT */
    | 'rau'
    /** LEFT ARM UNIT */
    | 'lau'
    /** RIGHT BACK UNIT */
    | 'rbu'
    /** LEFT BACK UNIT */
    | 'lbu'

    /** HEAD */
    | 'h'
    /** CORE */
    | 'c'
    /** ARMS */
    | 'a'
    /** LEGS */
    | 'l'

    /** BOOSTER */
    | 'b'
    /** FCS */
    | 'f'
    /** GENERATOR */
    | 'g'

    /** EXPANSION */
    | 'e',
    string
  >
>
