import type { Assembly } from '~core/assembly/assembly.ts'
import { BaseCustomError } from '~core/utils/error.ts'
import { logger } from '~core/utils/logger.ts'
import type { Candidates } from '~data/types/candidates.ts'
import {
  defaultRandomBuildOption,
  randomBuild,
  type RandomBuildOption,
} from './random-builder.ts'
import type { Validator } from './validator/base.ts'
import { success, type ValidationResult } from './validator/result.ts'
import {
  notCarrySameUnitInSameSide,
  notOverEnergyOutput,
} from './validator/validators.ts'

export class RandomAssembly {
  static init(
    config: RandomAssemblyConfig = defaultAssemblyConfig,
  ): RandomAssembly {
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
    option: RandomBuildOption = defaultRandomBuildOption,
  ): Assembly {
    this.tryCount += 1

    const opt = { ...defaultRandomBuildOption, ...option }

    try {
      return this.validate(randomBuild(candidates, opt)).fold(
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

const innerSecretKey = '__inner__' as const
function genInnerSecretKey(key: string) {
  return `${innerSecretKey}${key}` as const
}
function isInnerSecretKey(key: string): boolean {
  return key.startsWith(innerSecretKey)
}

type RandomAssemblyConfig = Readonly<{
  limit: number
}>
const defaultAssemblyConfig: RandomAssemblyConfig = {
  limit: 1000,
}
