import type { Assembly } from '~core/assembly/assembly.ts'

import type { ValidationResult } from './result.ts'

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
