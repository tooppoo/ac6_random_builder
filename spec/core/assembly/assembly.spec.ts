import { describe, expect, it } from 'vitest'
import { createAssembly } from '~core/assembly/assembly.ts'
import { candidates } from '~core/assembly/candidates.ts'

describe('assembly', () => {
  const sut = createAssembly({
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
})
