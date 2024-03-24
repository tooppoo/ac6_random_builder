import type { Assembly } from '~core/assembly/assembly.ts'

import type { ValidationResult } from './result.ts'

export interface Validator {
  readonly name: string

  validate(assembly: Assembly): ValidationResult
}
