import {Assembly} from "../assembly.ts";
import {ValidationResult} from "./result.ts";

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
