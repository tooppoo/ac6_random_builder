import type { Assembly } from '~core/assembly/assembly.ts'
import { BaseCustomError } from '~core/utils/error.ts'

import { notEquipped } from '~data/types/base/classification.ts'

import type { Validator } from './base.ts'
import { failure, success, type ValidationResult } from './result.ts'

export const notOverEnergyOutput: Validator = {
  name: 'notOverEnergyOutput',
  validate(assembly: Assembly): ValidationResult {
    return assembly.withinEnOutput
      ? success(assembly)
      : failure([
          new ValidationError({ validationName: this.name }, 'EN output error'),
        ])
  },
} as const

export const notCarrySameUnitInSameSide: Validator = {
  name: 'notCarrySameUnitInSameSide',
  validate(assembly: Assembly): ValidationResult {
    const errors = (() => {
      const rightErrors =
        assembly.rightArmUnit.classification !== notEquipped &&
        assembly.rightBackUnit.classification !== notEquipped &&
        assembly.rightArmUnit.name === assembly.rightBackUnit.name
          ? [
              new ValidationError(
                { validationName: this.name },
                `right arm unit and right back unit is same(${assembly.rightArmUnit.name})`,
              ),
            ]
          : []
      const leftErrors =
        assembly.leftArmUnit.classification !== notEquipped &&
        assembly.leftBackUnit.classification !== notEquipped &&
        assembly.leftArmUnit.name === assembly.leftBackUnit.name
          ? [
              new ValidationError(
                { validationName: this.name },
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
  name: 'totalCoamNotOverMax',
  validate(assembly: Assembly): ValidationResult {
    return assembly.coam <= max
      ? success(assembly)
      : failure([
          new ValidationError(
            { validationName: this.name },
            `total coam of assembly(${assembly.coam}) over max(${max})`,
          ),
        ])
  },
})

export const totalLoadNotOverMax = (max: number): Validator => ({
  name: 'totalLoadNotOverMax',
  validate(assembly: Assembly): ValidationResult {
    return assembly.load <= max
      ? success(assembly)
      : failure([
          new ValidationError(
            { validationName: this.name },
            `total load of assembly(${assembly.load}) over max(${max})`,
          ),
        ])
  },
})

export class ValidationError extends BaseCustomError<{
  validationName: string
}> {
  get validatorName(): string {
    return this.customArgument.validationName
  }
}
