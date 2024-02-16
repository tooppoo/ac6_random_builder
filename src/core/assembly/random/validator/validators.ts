import type { Assembly } from '~core/assembly/assembly.ts'
import { sum } from '~core/utils/array.ts'
import type { Validator } from './base.ts'
import { failure, success, ValidationResult } from './result.ts'

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
