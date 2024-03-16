import { it as fcit } from '@fast-check/vitest'
import sinon from 'sinon'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { type Assembly, createAssembly } from '~core/assembly/assembly.ts'
import { candidates } from '~core/assembly/candidates.ts'
import { randomBuild } from '~core/assembly/random/random-builder.ts'
import { genRandomizer } from '~spec/helper.ts'

describe('assembly', () => {
  let sut: Assembly

  beforeEach(() => {
    sut = createAssembly({
      rightArmUnit: candidates.rightArmUnits[0],
      leftArmUnit: candidates.leftArmUnits[0],
      rightBackUnit: candidates.rightBackUnits[0],
      leftBackUnit: candidates.leftBackUnits[0],
      head: candidates.heads[0],
      core: candidates.cores[0],
      arms: candidates.arms[0],
      legs: candidates.legs[0],
      booster: candidates.boosters[0],
      fcs: candidates.fcses[0],
      generator: candidates.generators[0],
      expansion: candidates.expansions[0],
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
      fcit.prop([genRandomizer()])(
        'should behave as not within load limit',
        (i) => {
          sut = randomBuild(candidates, () => i)
          const stubAssembly = sandbox.stub(sut, 'loadLimit')

          stubAssembly.value(0) // 積載上限0なら必ず積載超過

          expect(sut.withinLoadLimit).toBe(false)
        },
      )
    })
    describe('within load limit', () => {
      fcit.prop([genRandomizer()])(
        'should behave as within load limit',
        (i) => {
          sut = randomBuild(candidates, () => i)
          const stubAssembly = sandbox.stub(sut, 'loadLimit')

          stubAssembly.value(Infinity)

          expect(sut.withinLoadLimit).toBe(true)
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
})
