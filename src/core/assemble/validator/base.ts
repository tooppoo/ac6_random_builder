import {Assembly} from "~core/assemble/assembly.ts";
import {ValidationResult} from "./result.ts";

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
