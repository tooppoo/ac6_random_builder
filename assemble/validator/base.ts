import {Assembly} from "../assembly";
import {ValidationResult} from "./result";

export interface Validator {
  validate(assembly: Assembly): ValidationResult
}
