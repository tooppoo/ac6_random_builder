import type { Assembly } from '~core/assembly/assembly.ts'
import { BaseCustomError } from '~core/utils/error.ts'
import { logger } from '~core/utils/logger.ts'
import type { Candidates } from '~data/types/candidates.ts'
import { randomBuild, type Randomizer } from './random-builder.ts'
import type { Validator } from './validator/base.ts'
import { success, type ValidationResult } from './validator/result.ts'
import {
  notCarrySameUnitInSameSide,
  notOverEnergyOutput,
} from './validator/validators.ts'

type AssembleOption = Readonly<{
  /** 乱数生成器 */
  random?: Randomizer
}>
const defaultOption: Required<AssembleOption> = {
  random: () => Math.random(),
}
const innerSecretKey = '__inner__' as const

type RandomAssemblyConfig = Readonly<{
  limit: number
}>
export class RandomAssembly {
  static init(config: RandomAssemblyConfig = { limit: 10000 }): RandomAssembly {
    return new RandomAssembly(
      {
        [genInnerSecretKey(`notOverEnergyOutput`)]: notOverEnergyOutput,
        [genInnerSecretKey(`notCarrySameUnitInSameSide`)]:
          notCarrySameUnitInSameSide,
      },
      config,
    )
  }

  private tryCount: number = 0

  private constructor(
    private readonly _validators: Record<string, Validator>,
    private readonly config: RandomAssemblyConfig,
  ) {}

  addValidator(key: string, validator: Validator): RandomAssembly {
    if (isInnerSecretKey(key)) {
      throw new OverwriteInnerSecretValidatorError(key)
    }
    return new RandomAssembly(
      { ...this._validators, [key]: validator },
      this.config,
    )
  }
  getValidator(key: string): Validator | null {
    return this._validators[key] || null
  }
  get validators(): Validator[] {
    return Object.values(this._validators)
  }

  assemble(
    candidates: Candidates,
    option: AssembleOption = defaultOption,
  ): Assembly {
    this.tryCount += 1

    const { random } = { ...defaultOption, ...option }

    try {
      return this.validate(randomBuild(candidates, random)).fold(
        (errors) => {
          logger.warn({ errors })

          if (this.tryCount >= this.config.limit) {
            throw new OverTryLimitError(
              this.config.limit,
              `over limit of try(${this.config.limit})`,
            )
          }

          return this.assemble(candidates, option)
        },
        (a) => a,
      )
    } finally {
      this.tryCount = 0
    }
  }

  validate(assembly: Assembly): ValidationResult {
    return Object.values(this._validators).reduce(
      (r, v) => r.concat(v.validate(assembly)),
      success(assembly),
    )
  }
}

export class OverTryLimitError extends BaseCustomError<number> {
  get limit(): number {
    return this.customArgument
  }
}
export class OverwriteInnerSecretValidatorError extends BaseCustomError<string> {
  get key(): string {
    return this.customArgument
  }
}

function genInnerSecretKey(key: string) {
  return `${innerSecretKey}${key}` as const
}
function isInnerSecretKey(key: string): boolean {
  return key.startsWith(innerSecretKey)
}
