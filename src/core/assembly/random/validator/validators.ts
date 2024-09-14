import type { Assembly } from '~core/assembly/assembly.ts'
import { BaseCustomError } from '~core/utils/error.ts'

import { notEquipped } from '@ac6_assemble_tool/parts/types/base/classification'

import type { Validator } from './base.ts'
import { failure, success, type ValidationResult } from './result.ts'

export const notOverEnergyOutputName = 'notOverEnergyOutput'
export const notOverEnergyOutput: Validator = {
  validate(assembly: Assembly): ValidationResult {
    return assembly.withinEnOutput
      ? success(assembly)
      : failure([
          new ValidationError(
            {
              validationName: notOverEnergyOutputName,
              adjustable: false,
            },
            'EN output error',
          ),
        ])
  },
} as const

export const notCarrySameUnitInSameSideName = 'notCarrySameUnitInSameSide'
export const notCarrySameUnitInSameSide: Validator = {
  validate(assembly: Assembly): ValidationResult {
    const errors = (() => {
      const rightErrors =
        assembly.rightArmUnit.classification !== notEquipped &&
        assembly.rightBackUnit.classification !== notEquipped &&
        assembly.rightArmUnit.name === assembly.rightBackUnit.name
          ? [
              new ValidationError(
                {
                  validationName: notCarrySameUnitInSameSideName,
                  adjustable: false,
                },
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
                {
                  validationName: notCarrySameUnitInSameSideName,
                  adjustable: false,
                },
                `left arm unit and left back unit is same(${assembly.leftArmUnit.name})`,
              ),
            ]
          : []

      return [...rightErrors, ...leftErrors]
    })()

    return errors.length === 0 ? success(assembly) : failure(errors)
  },
}

export const totalCoamNotOverMaxName = 'totalCoamNotOverMax'
export const totalCoamNotOverMax = (max: number): Validator => ({
  validate(assembly: Assembly): ValidationResult {
    return assembly.coam <= max
      ? success(assembly)
      : failure([
          new ValidationError(
            { validationName: totalCoamNotOverMaxName, adjustable: true },
            `total coam of assembly(${assembly.coam}) over max(${max})`,
          ),
        ])
  },
})

export const totalLoadNotOverMaxName = 'totalLoadNotOverMax'
export const totalLoadNotOverMax = (max: number): Validator => ({
  validate(assembly: Assembly): ValidationResult {
    return assembly.load <= max
      ? success(assembly)
      : failure([
          new ValidationError(
            { validationName: totalLoadNotOverMaxName, adjustable: true },
            `total load of assembly(${assembly.load}) over max(${max})`,
          ),
        ])
  },
})

export type ValidationName =
  | typeof notOverEnergyOutputName
  | typeof notCarrySameUnitInSameSideName
  | typeof totalCoamNotOverMaxName
  | typeof totalLoadNotOverMaxName

export class ValidationError extends BaseCustomError<{
  validationName: ValidationName
  adjustable: boolean
}> {
  get validatorName(): ValidationName {
    return this.customArgument.validationName
  }

  /**
   * 入力を調整することで回避の可能性を上げられる場合はtrue
   * 入力を調整することで回避の可能性を上げることが難しい or できない場合はfalse
   */
  get adjustable(): boolean {
    return this.customArgument.adjustable
  }
}
