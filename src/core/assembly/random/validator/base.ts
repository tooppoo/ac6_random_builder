import {Assembly} from "~core/assembly/assembly.ts";
import {ValidationResult} from "src/core/assembly/random/validator/result.ts";

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
