import { it as fcit } from '@fast-check/vitest'
import sinon from 'sinon'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { type Assembly, createAssembly } from '~core/assembly/assembly.ts'
import { armUnits, leftArmUnits } from '~data/arm-units.ts'
import { arms } from '~data/arms.ts'
import { backUnits, leftBackUnits } from '~data/back-units'
import { boosters } from '~data/booster.ts'
import { cores } from '~data/cores.ts'
import { expansions } from '~data/expansions.ts'
import { fcses } from '~data/fces.ts'
import { generators } from '~data/generators.ts'
import { heads } from '~data/heads'
import { legs } from '~data/legs.ts'
import { genAssembly } from '~spec/helper.ts'

describe('assembly', () => {
  let sut: Assembly

  beforeEach(() => {
    sut = createAssembly({
      rightArmUnit: armUnits[0],
      leftArmUnit: leftArmUnits[0],
      rightBackUnit: backUnits[0],
      leftBackUnit: leftBackUnits[0],
      head: heads[0],
      core: cores[0],
      arms: arms[0],
      legs: legs[0],
      booster: boosters[0],
      fcs: fcses[0],
      generator: generators[0],
      expansion: expansions[0],
    })
  })

  describe('ap', () => {
    it('should return total AP of the assembly', () => {
      const expected = 1250 + 3580 + 2430 + 4240

      expect(sut.ap).toStrictEqual(expected)
    })
  })
  describe('weight', () => {
    it('should return total weight of the weight', () => {
      const expected =
        // unit
        4210 +
        4180 +
        3960 +
        2700 +
        // frame
        4600 +
        16100 +
        10480 +
        19720 +
        // inner
        1820 +
        80 +
        3420

      expect(sut.weight).toStrictEqual(expected)
    })
  })
  describe('load', () => {
    it('should return total weight without leg', () => {
      const expected =
        // unit
        4210 +
        4180 +
        3960 +
        2700 +
        // frame
        4600 +
        16100 +
        10480 +
        // inner
        1820 +
        80 +
        3420

      expect(sut.load).toStrictEqual(expected)
    })
  })
  describe('withinLoadLimit', () => {
    let sandbox: sinon.SinonSandbox
    beforeEach(() => {
      sandbox = sinon.createSandbox()
    })
    afterEach(() => {
      sandbox.restore()
    })

    describe('over load limit', () => {
      fcit.prop([genAssembly()])(
        'should behave as not within load limit',
        (assembly) => {
          const stubAssembly = sandbox.stub(assembly, 'loadLimit')

          stubAssembly.value(0) // 積載上限0なら必ず積載超過

          expect(assembly.withinLoadLimit).toBe(false)
        },
      )
    })
    describe('within load limit', () => {
      fcit.prop([genAssembly()])(
        'should behave as within load limit',
        (assembly) => {
          const stubAssembly = sandbox.stub(assembly, 'loadLimit')

          stubAssembly.value(Infinity)

          expect(assembly.withinLoadLimit).toBe(true)
        },
      )
    })
    describe('load equals with load limit', () => {
      it('should behave as within load limit', () => {
        const stubAssembly = sandbox.stub(sut, 'loadLimit')

        stubAssembly.value(sut.load)

        expect(sut.withinLoadLimit).toBe(true)
      })
    })
  })

  describe('energy', () => {
    describe.each([
      {
        core: cores[0],
        generator: generators[0],
        expectedEnLoad: 2466,
        expectedOutput: 2158,
        within: false,
      },
      {
        core: cores[0],
        generator: generators[1],
        expectedEnLoad: 2466,
        expectedOutput: 2490,
        within: true,
      },
      {
        core: cores[3],
        generator: generators[0],
        expectedEnLoad: 2488,
        expectedOutput: 2652,
        within: true,
      },
    ])(
      'when core is $core, generator is $generator',
      ({ core, generator, expectedEnLoad, expectedOutput, within }) => {
        beforeEach(() => {
          sut.core = core
          sut.generator = generator
        })

        it(`energy load should be ${expectedOutput}`, () => {
          expect(sut.enLoad).toBe(expectedEnLoad)
        })
        it(`energy output should be ${expectedOutput}`, () => {
          expect(sut.enOutput).toBe(expectedOutput)
        })
        it(`within energy output is ${within}`, () => {
          expect(sut.withinEnOutput).toBe(within)
        })
      },
    )
  })
})
