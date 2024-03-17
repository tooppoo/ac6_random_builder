import { armNotEquipped } from '~data/arm-units'
import { candidates } from '~data/versions/v1.06.1.ts'
import {
  notCarrySameUnitInSameSide,
  notOverEnergyOutput,
} from '~core/assembly/random/validator/validators'
import { notEquipped as notEquippedClass } from '~data/types/base/classification.ts'
import { genAssembly } from '~spec/helper.ts'
import { it as fcit } from '@fast-check/vitest'
import sinon from 'sinon'
import { afterEach, beforeEach, describe, expect } from 'vitest'

describe('validator', () => {
  describe('not over energy output', () => {
    let sandbox: sinon.SinonSandbox
    beforeEach(() => {
      sandbox = sinon.createSandbox()
    })
    afterEach(() => {
      sandbox.restore()
    })

    describe.each([{ withinEnOutput: true }, { withinEnOutput: false }])(
      'when within en output is $withinEnLoad',
      ({ withinEnOutput }) => {
        fcit.prop([genAssembly()])(
          `is energy enough -> ${withinEnOutput}`,
          (assembly) => {
            const stubAssembly = sinon.stub(assembly, 'withinEnOutput')
            stubAssembly.value(withinEnOutput)

            expect(notOverEnergyOutput.validate(assembly).isSuccess).toBe(
              withinEnOutput,
            )
          },
        )
      },
    )
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
              assembly.rightBackUnit = assembly.rightArmUnit = armNotEquipped
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
              assembly.leftBackUnit = assembly.leftArmUnit = armNotEquipped
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
              assembly.rightBackUnit = assembly.rightArmUnit = armNotEquipped
              assembly.leftBackUnit = assembly.leftArmUnit = armNotEquipped

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
        const exclude = <
          T extends { name: string },
          U extends { name: string },
        >(
          xs: readonly T[],
          ex: readonly U[],
        ): readonly T[] => xs.filter((x) => !ex.find((e) => e.name == x.name))

        // 腕武器と肩武器の候補が重ならないように調整
        const rightArmUnits = halfSlice(candidates.rightArmUnits)
        const rightBackUnits = exclude(candidates.rightBackUnits, rightArmUnits)
        const leftArmUnits = halfSlice(candidates.leftArmUnits)
        const leftBackUnits = exclude(candidates.leftBackUnits, leftArmUnits)

        console.log(
          rightArmUnits.map((x) => x.name),
          rightBackUnits.map((x) => x.name),
          leftArmUnits.map((x) => x.name),
          leftBackUnits.map((x) => x.name),
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
