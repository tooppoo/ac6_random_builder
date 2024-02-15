import {Assembly} from "~core/assembly/assembly.ts";
import {ValidationResult} from "./result.ts";

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
