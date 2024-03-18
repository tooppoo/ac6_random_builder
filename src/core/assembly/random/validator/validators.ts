import type { Assembly } from '~core/assembly/assembly.ts'
import { notEquipped } from '~data/types/base/classification.ts'
import type { Validator } from './base.ts'
import { failure, success, type ValidationResult } from './result.ts'

export const notOverEnergyOutput: Validator = {
  validate(assembly: Assembly): ValidationResult {
    return assembly.withinEnOutput
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

export const totalCoamNotOverMax = (max: number): Validator => ({
  validate(assembly: Assembly): ValidationResult {
    return assembly.coam <= max
      ? success(assembly)
      : failure([
          new Error(
            `total coam of assembly(${assembly.coam}) over max(${max})`,
          ),
        ])
  },
})

export const totalLoadNotOverMax = (max: number): Validator => ({
  validate(assembly: Assembly): ValidationResult {
    return assembly.load <= max
      ? success(assembly)
      : failure([
          new Error(
            `total load of assembly(${assembly.load}) over max(${max})`,
          ),
        ])
  },
})
