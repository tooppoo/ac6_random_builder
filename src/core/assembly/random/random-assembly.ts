import type { Assembly } from '~core/assembly/assembly.ts'
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
const innerSecretKey = '__init__' as const

export class RandomAssembly {
  static init(): RandomAssembly {
    return new RandomAssembly({
      [genInnerSecretKey(`notOverEnergyOutput`)]: notOverEnergyOutput,
      [genInnerSecretKey(`notCarrySameUnitInSameSide`)]:
        notCarrySameUnitInSameSide,
    })
  }

  private constructor(
    private readonly _validators: Record<string, Validator>,
  ) {}

  addValidator(key: string, validator: Validator): RandomAssembly {
    if (isInnerSecretKey(key)) {
      logger.warn(
        `${key} is inner secret key format, this is not allowed. so ignored`,
      )

      return this
    }
    return new RandomAssembly({ ...this._validators, [key]: validator })
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
    return Object.values(this._validators).reduce(
      (r, v) => r.concat(v.validate(assembly)),
      success(assembly),
    )
  }
}

function genInnerSecretKey(key: string) {
  return `${innerSecretKey}${key}` as const
}
function isInnerSecretKey(key: string): boolean {
  return key.startsWith(innerSecretKey)
}
