import type { Assembly } from '~core/assembly/assembly.ts'
import type { Candidates } from '~core/assembly/candidates.ts'
import { logger } from '~core/utils/logger.ts'
import { randomBuild, type Randomizer } from './random-builder.ts'
import type { Validator } from './validator/base.ts'
import { success, type ValidationResult } from './validator/result.ts'
import { notOverEnergyOutput } from './validator/validators.ts'

type AssembleOption = Readonly<{
  /** 乱数生成器 */
  random?: Randomizer
}>
const defaultOption: Required<AssembleOption> = {
  random: () => Math.random(),
}

export class RandomAssembly {
  static init(): RandomAssembly {
    return new RandomAssembly([notOverEnergyOutput])
  }

  private constructor(private readonly validators: Validator[]) {}

  addValidator(validator: Validator): RandomAssembly {
    return new RandomAssembly([...this.validators, validator])
  }

  assemble(
    candidates: Candidates,
    option: AssembleOption = defaultOption,
  ): Assembly {
    const { random } = { ...defaultOption, ...option }

    return this.validate(randomBuild(candidates, random)).fold(
      (errors) => {
        logger.warn({ errors })

        return this.assemble(candidates, option)
      },
      (a) => a,
    )
  }

  validate(assembly: Assembly): ValidationResult {
    return this.validators.reduce(
      (r, v) => r.concat(v.validate(assembly)),
      success(assembly),
    )
  }
}
