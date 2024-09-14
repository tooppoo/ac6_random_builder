import {
  assemblyToSearch,
  searchToAssembly,
} from '~view/pages/index/interaction/share'

import { it } from '@fast-check/vitest'
import fc from 'fast-check'
import { describe, expect } from 'vitest'

import {
  genAssembly,
  genCandidates,
} from '~spec/spec-helper/property-generator'

describe('query', () => {
  it.prop([
    genCandidates().chain((candidates) =>
      fc.record({
        candidates: fc.constant(candidates),
        assembly: genAssembly(candidates),
      }),
    ),
  ])(
    'can inter-convert between assembly and query',
    ({ assembly, candidates }) => {
      expect(
        searchToAssembly(assemblyToSearch(assembly, candidates), candidates),
      ).toStrictEqual(assembly)
    },
  )
})
