import { createAssembly } from '~core/assembly/assembly.ts'
import { candidates } from '~core/assembly/candidates.ts'
import { armUnits, notEquipped } from '~data/arm-units'
import { arms } from '~data/arms'
import { backUnits } from '~data/back-units'
import { boosters } from '~data/booster'
import { cores } from '~data/cores'
import { notEquipped as expNotEquipped } from '~data/expansions'
import { fcses } from '~data/fces'
import { generators } from '~data/generators'
import { heads } from '~data/heads'
import { legs, type TwoLegs } from '~data/legs'
import {
  notCarrySameUnitInSameSide,
  notOverEnergyOutput,
} from '~core/assembly/random/validator/validators'
import { notEquipped as notEquippedClass } from '~data/types/base/classification.ts'
import { genAssembly } from '~spec/helper.ts'
import { it as fcit } from '@fast-check/vitest'
import { describe, expect, it } from 'vitest'

describe('validator', () => {
  describe('not over energy output', () => {
    const baseAssembly = {
      rightArmUnit: armUnits.find((u) => u.name.includes('RANSETSU-RF'))!,
      leftArmUnit: armUnits.find((u) => u.name.includes('RANSETSU-RF'))!,
      rightBackUnit: backUnits.find((b) => b.name.includes('SHAO-WEI'))!,
      leftBackUnit: backUnits.find((b) => b.name.includes('SHAO-WEI'))!,

      head: heads.find((h) => h.name === 'VE-44B')!,
      arms: arms.find((a) => a.name === 'VE-46A')!,
      legs: legs.find((a) => a.name.includes('CRAWLER'))! as TwoLegs,

      booster: boosters.find((b) => b.name.includes('BST-G1/P10'))!,
      fcs: fcses.find((f) => f.name.includes('WLT 001'))!,
      generator: generators.find((g) => g.name.includes('JOSO'))!,

      expansion: expNotEquipped,
    } as const

    describe(`base is ${JSON.stringify(baseAssembly)}`, () => {
      describe.each([
        {
          core: cores.find((c) => c.name.includes('JAILBREAK'))!,
          expected: false,
        },
        {
          core: cores.find((c) => c.name.includes('NACHTREIHER'))!,
          expected: false,
        },
        { core: cores.find((c) => c.name.includes('VP-40S'))!, expected: true },
      ])('when core is $a', ({ core, expected }) => {
        it(`should return ${expected} by isSuccess`, () => {
          const assembly = createAssembly({ ...baseAssembly, core })

          expect(notOverEnergyOutput.validate(assembly).isSuccess).toBe(
            expected,
          )
        })
      })
    })
  })

  describe('not carry same unit in same side hand and back', () => {
    describe('when carry same unit', () => {
      const candidatesForTest = (() => {
        const withoutNotEquipped = <T extends { classification: string }>(
          p: T,
        ) => p.classification !== notEquippedClass

        return {
          ...candidates,
          rightArmUnits: candidates.rightArmUnits.filter(withoutNotEquipped),
          leftArmUnits: candidates.leftArmUnits.filter(withoutNotEquipped),
          rightBackUnits: candidates.rightBackUnits.filter(withoutNotEquipped),
          leftBackUnits: candidates.leftBackUnits.filter(withoutNotEquipped),
        }
      })()

      describe('at right side', () => {
        fcit.prop([genAssembly(candidatesForTest)])(
          'should evaluate as invalid',
          (assembly) => {
            assembly.rightBackUnit = assembly.rightArmUnit
            assembly.leftArmUnit = candidatesForTest.leftArmUnits[0]
            assembly.leftBackUnit = candidatesForTest.leftBackUnits[0]

            expect(
              notCarrySameUnitInSameSide.validate(assembly).isSuccess,
            ).toBe(false)
          },
        )

        describe('when not equipped', () => {
          fcit.prop([genAssembly(candidatesForTest)])(
            'should evaluate as valid. "not equipped" is allowed',
            (assembly) => {
              assembly.rightBackUnit = assembly.rightArmUnit = notEquipped
              assembly.leftArmUnit = candidatesForTest.leftArmUnits[0]
              assembly.leftBackUnit = candidatesForTest.leftBackUnits[0]

              expect(
                notCarrySameUnitInSameSide.validate(assembly).isSuccess,
              ).toBe(true)
            },
          )
        })
      })
      describe('at left side', () => {
        fcit.prop([genAssembly(candidatesForTest)])(
          'should evaluate as invalid',
          (assembly) => {
            assembly.leftBackUnit = assembly.leftArmUnit
            assembly.rightArmUnit = candidatesForTest.rightArmUnits[0]
            assembly.rightBackUnit = candidatesForTest.rightBackUnits[0]

            expect(
              notCarrySameUnitInSameSide.validate(assembly).isSuccess,
            ).toBe(false)
          },
        )
        describe('when not equipped', () => {
          fcit.prop([genAssembly(candidatesForTest)])(
            'should evaluate as valid. "not equipped" is allowed',
            (assembly) => {
              assembly.leftBackUnit = assembly.leftArmUnit = notEquipped
              assembly.rightArmUnit = candidatesForTest.rightArmUnits[0]
              assembly.rightBackUnit = candidatesForTest.rightBackUnits[0]

              expect(
                notCarrySameUnitInSameSide.validate(assembly).isSuccess,
              ).toBe(true)
            },
          )
        })
      })
      describe('at both side', () => {
        fcit.prop([genAssembly(candidatesForTest)])(
          'should evaluate as invalid',
          (assembly) => {
            assembly.rightBackUnit = assembly.rightArmUnit
            assembly.leftBackUnit = assembly.leftArmUnit

            expect(
              notCarrySameUnitInSameSide.validate(assembly).isSuccess,
            ).toBe(false)
          },
        )
        describe('when not equipped', () => {
          fcit.prop([genAssembly(candidatesForTest)])(
            'should evaluate as valid. "not equipped" is allowed',
            (assembly) => {
              assembly.rightBackUnit = assembly.rightArmUnit = notEquipped
              assembly.leftBackUnit = assembly.leftArmUnit = notEquipped

              expect(
                notCarrySameUnitInSameSide.validate(assembly).isSuccess,
              ).toBe(true)
            },
          )
        })
      })
    })
    describe('when not carry same unit at same side', () => {
      const candidatesForTest = (() => {
        const halfSlice = <T>(xs: readonly T[]): readonly T[] =>
          xs.slice(0, Math.floor(xs.length / 2))

        // 腕武器と肩武器の候補が重ならないように調整
        const rightArmUnits = halfSlice(candidates.rightArmUnits)
        const rightBackUnits = candidates.rightBackUnits.slice(
          rightArmUnits.length + 1,
        )
        const leftArmUnits = halfSlice(candidates.leftArmUnits)
        const leftBackUnits = candidates.leftBackUnits.slice(
          leftArmUnits.length + 1,
        )

        return {
          ...candidates,
          rightArmUnits,
          rightBackUnits,
          leftArmUnits,
          leftBackUnits,
        }
      })()

      fcit.prop([genAssembly(candidatesForTest)])(
        'should evaluate as valid',
        (assembly) => {
          expect(notCarrySameUnitInSameSide.validate(assembly).isSuccess).toBe(
            true,
          )
        },
      )
    })
  })
})
