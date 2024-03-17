import type { Assembly } from '~core/assembly/assembly.ts'
import { sum } from '~core/utils/array.ts'
import { notEquipped } from '~data/types/base/classification.ts'
import type { Validator } from './base.ts'
import { failure, success, type ValidationResult } from './result.ts'

export const notOverEnergyOutput: Validator = {
  validate(assembly: Assembly): ValidationResult {
    const totalEnLoad = sum(
      [
        assembly.rightArmUnit,
        assembly.leftArmUnit,
        assembly.rightArmUnit,
        assembly.leftBackUnit,
        assembly.head,
        assembly.core,
        assembly.arms,
        assembly.legs,
        assembly.booster,
        assembly.fcs,
      ].map((p) => p.en_load),
    )
    const totalEnOutput = Math.floor(
      assembly.generator.en_output *
        (assembly.core.generator_output_adjective * 0.01),
    )

    return totalEnOutput >= totalEnLoad
      ? success(assembly)
      : failure([new Error('EN output error')])
  },
}

export const notCarrySameUnitInSameSide: Validator = {
  validate(assembly: Assembly): ValidationResult {
    const errors = (() => {
      const rightErrors =
        assembly.rightArmUnit.classification !== notEquipped &&
        assembly.rightBackUnit.classification !== notEquipped &&
        assembly.rightArmUnit.name === assembly.rightBackUnit.name
          ? [
              new Error(
                `right arm unit and right back unit is same(${assembly.rightArmUnit.name})`,
              ),
            ]
          : []
      const leftErrors =
        assembly.leftArmUnit.classification !== notEquipped &&
        assembly.leftBackUnit.classification !== notEquipped &&
        assembly.leftArmUnit.name === assembly.leftBackUnit.name
          ? [
              new Error(
                `left arm unit and left back unit is same(${assembly.leftArmUnit.name})`,
              ),
            ]
          : []

      return [...rightErrors, ...leftErrors]
    })()

    return errors.length === 0 ? success(assembly) : failure(errors)
  },
}
