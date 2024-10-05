import type { Assembly } from '#core/assembly/assembly'

import type { ValidationResult } from './result'

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
